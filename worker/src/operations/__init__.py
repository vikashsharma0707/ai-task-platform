from .uppercase import process_uppercase
from .lowercase import process_lowercase
from .reverse_string import process_reverse_string
from .word_count import process_word_count

OPERATION_MAP = {
    "uppercase": process_uppercase,
    "lowercase": process_lowercase,
    "reverse_string": process_reverse_string,
    "word_count": process_word_count,
}

__all__ = ["OPERATION_MAP"]
