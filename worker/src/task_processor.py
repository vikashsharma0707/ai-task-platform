import logging
from datetime import datetime, timezone
from bson import ObjectId
from .db import get_db
from .operations import OPERATION_MAP

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)


def _append_log(db, task_id: str, message: str):
    db.tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$push": {"logs": {"message": message, "timestamp": datetime.now(timezone.utc)}}},
    )


def process_task(task_id: str):
    db = get_db()
    logger.info(f"Processing task {task_id}")

    db.tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"status": "running", "updatedAt": datetime.now(timezone.utc)}},
    )
    _append_log(db, task_id, "Task picked up by worker")

    task = db.tasks.find_one({"_id": ObjectId(task_id)})
    if not task:
        logger.error(f"Task {task_id} not found in DB")
        return

    operation = task.get("operation")
    input_text = task.get("inputText", "")

    handler = OPERATION_MAP.get(operation)
    if not handler:
        _append_log(db, task_id, f"Unknown operation: {operation}")
        db.tasks.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"status": "failed", "updatedAt": datetime.now(timezone.utc)}},
        )
        return

    try:
        _append_log(db, task_id, f"Executing operation: {operation}")
        result = handler(input_text)
        _append_log(db, task_id, f"Operation completed successfully")

        db.tasks.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {
                    "status": "success",
                    "result": result,
                    "updatedAt": datetime.now(timezone.utc),
                }
            },
        )
        logger.info(f"Task {task_id} completed successfully")
    except Exception as exc:
        logger.exception(f"Task {task_id} failed: {exc}")
        _append_log(db, task_id, f"Error: {str(exc)}")
        db.tasks.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"status": "failed", "updatedAt": datetime.now(timezone.utc)}},
        )
