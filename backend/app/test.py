import os
from anthropic import Anthropic

client = Anthropic(api_key = ANTHROPIC_API_KEY)

message = client.messages.create(
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": "Hello, Claude",
        }
    ],
    model="claude-sonnet-4-5",
)
print(message.content)