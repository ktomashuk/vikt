import functools
import logging


def save_request_decorator(func):
    @functools.wraps(func)
    def wrapper_decorator(*args, **kwargs):
        # Before function
        logging.basicConfig(filename='anus.log', filemode='w', level=logging.INFO)
        value = func(*args, **kwargs)
        # After function
        data = args[1].data
        logging.info('MSG')
        return value
    return wrapper_decorator
