"""Per-user language and order-flow state kept in FSM storage."""

from aiogram.fsm.context import FSMContext

from app.texts.lookup import DEFAULT_LANG, Lang, parse_lang

LANG_KEY = "lang"


async def get_lang(state: FSMContext) -> Lang:
    data = await state.get_data()
    return parse_lang(data.get(LANG_KEY)) or DEFAULT_LANG


async def set_lang(state: FSMContext, lang: Lang) -> None:
    await state.update_data({LANG_KEY: lang})


async def reset_flow(state: FSMContext) -> None:
    """Drop the current flow but keep the language choice."""
    lang = await get_lang(state)
    await state.clear()
    await set_lang(state, lang)
