import json
from pathlib import Path

# Resolve path relative to this file: services/loader.py -> app/data/
DATA_DIR = Path(__file__).resolve().parent.parent / "data"
print(DATA_DIR)


def load_json(filename: str):
    path = DATA_DIR / filename
    if not path.exists():
        raise FileNotFoundError(f"Data file not found: {path}")
    content = path.read_text(encoding="utf-8")
    if not content.strip():
        raise ValueError(f"Data file is empty: {path}")
    return json.loads(content)


def load_all_data():
    return {
        "emails": load_json("emails.json"),
        "slack": load_json("slack.json"),
        "jira": load_json("jira.json"),
    }