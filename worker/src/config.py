# import os
# from dotenv import load_dotenv

# load_dotenv()

# MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/ai-task-platform")
# REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
# REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))
# REDIS_PASSWORD = os.getenv("REDIS_PASSWORD") or None
# QUEUE_NAME = os.getenv("QUEUE_NAME", "tasks")
# WORKER_CONCURRENCY = int(os.getenv("WORKER_CONCURRENCY", "4"))


import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv(
    "MONGO_URI",
    os.getenv(
        "MONGODB_URI",
        "mongodb://mongodb:27017/aitask"
    )
)

REDIS_HOST = os.getenv("APP_REDIS_HOST", "redis")

REDIS_PORT = int(
    os.getenv("APP_REDIS_PORT", "6379")
)

REDIS_PASSWORD = os.getenv("REDIS_PASSWORD") or None

QUEUE_NAME = os.getenv("QUEUE_NAME", "tasks")

WORKER_CONCURRENCY = int(
    os.getenv("WORKER_CONCURRENCY", "4")
)