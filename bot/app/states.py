"""FSM states. The language is kept in FSM data (see services/session.py)."""

from aiogram.fsm.state import State, StatesGroup


class OrderStates(StatesGroup):
    name = State()
    contact = State()
    message = State()
    confirm = State()
