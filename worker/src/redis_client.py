import redis
from .config import REDIS_HOST, REDIS_PORT, REDIS_PASSWORD


def get_redis_connection():
    return redis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        password=REDIS_PASSWORD,
        decode_responses=True,
    )
