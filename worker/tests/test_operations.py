import pytest
from src.operations.uppercase import process_uppercase
from src.operations.lowercase import process_lowercase
from src.operations.reverse_string import process_reverse_string
from src.operations.word_count import process_word_count


def test_uppercase():
    assert process_uppercase("hello world") == "HELLO WORLD"
    assert process_uppercase("") == ""
    assert process_uppercase("ABC") == "ABC"


def test_lowercase():
    assert process_lowercase("HELLO WORLD") == "hello world"
    assert process_lowercase("") == ""


def test_reverse_string():
    assert process_reverse_string("hello") == "olleh"
    assert process_reverse_string("abcd") == "dcba"
    assert process_reverse_string("") == ""


def test_word_count():
    assert process_word_count("hello world") == "2"
    assert process_word_count("one two three four five") == "5"
    assert process_word_count("") == "0"
    assert process_word_count("  multiple   spaces  ") == "2"
