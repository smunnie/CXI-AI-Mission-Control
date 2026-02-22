from datetime import datetime, timedelta


def filter_by_time(data: dict, days: int = 7):
    cutoff = datetime.utcnow() - timedelta(days=days)

    def within_range(item, key="timestamp"):
        if key not in item:
            return True
        item_time = datetime.fromisoformat(item[key].replace("Z", "+00:00"))
        return item_time >= cutoff

    filtered = {
        "emails": [e for e in data["emails"] if within_range(e)],
        "slack": [s for s in data["slack"] if within_range(s)],
        "jira": [
            j for j in data["jira"]
            if within_range(j, "updated_at")
        ],
    }

    return filtered