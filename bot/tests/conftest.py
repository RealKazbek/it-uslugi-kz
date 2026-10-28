"""Shared fixtures: a real FSMContext over MemoryStorage and a mocked backend client."""

from unittest.mock import AsyncMock

import pytest
from aiogram.fsm.context import FSMContext
from aiogram.fsm.storage.base import StorageKey
from aiogram.fsm.storage.memory import MemoryStorage

from app.config import Settings
from app.services.backend import BackendClient
from tests.factories import ADMIN_CHAT_ID, CLIENT_CHAT_ID, USER_ID


@pytest.fixture
def settings() -> Settings:
    return Settings(
        bot_token="123456:test-token-not-real",
        admin_chat_id=ADMIN_CHAT_ID,
        backend_url="http://backend.test",
        internal_api_token="internal-test-token",
        site_url="https://site.test",
    )


@pytest.fixture
def backend() -> AsyncMock:
    return AsyncMock(spec=BackendClient)


@pytest.fixture
def state() -> FSMContext:
    key = StorageKey(bot_id=1, chat_id=CLIENT_CHAT_ID, user_id=USER_ID)
    return FSMContext(storage=MemoryStorage(), key=key)
