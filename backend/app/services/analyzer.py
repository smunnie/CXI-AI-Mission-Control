# # import json
# # from app.services.llm_client import call_claude
# from app.schemas.mission import MissionControlResponse
# from app.services.prompts import SYSTEM_PROMPT, build_user_prompt
# from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage



# async def analyze_with_claude(data: dict) -> MissionControlResponse:
#     user_prompt = build_user_prompt(data)
#     schema = MissionControlResponse.model_json_schema()

#     async for result in query(
#         prompt=user_prompt,
#         options=ClaudeAgentOptions(
#             system_prompt=SYSTEM_PROMPT,
#             output_format={"type": "json_schema", "schema": schema},
#         ),
#     ):
#         if isinstance(result, ResultMessage) and result.structured_output:
#             return MissionControlResponse.model_validate(result.structured_output)

#     raise ValueError("Claude returned an unstructured response")




import asyncio
import os
from anthropic import Anthropic
from anthropic._exceptions import OverloadedError
from app.schemas.mission import MissionControlResponse
from app.services.prompts import SYSTEM_PROMPT, build_user_prompt
from dotenv import load_dotenv

load_dotenv()

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

MAX_RETRIES = 3
INITIAL_BACKOFF = 2.0  # seconds


async def analyze_with_claude(data: dict) -> MissionControlResponse:
    user_prompt = build_user_prompt(data)

    response = client.messages.parse(
    model="claude-sonnet-4-5",
    system = SYSTEM_PROMPT,
    messages=[{"role": "user", "content": f"{SYSTEM_PROMPT} {user_prompt}"}],
    max_tokens=4096,
    output_format=MissionControlResponse,
    )   
    
    return response.parsed_output
    
