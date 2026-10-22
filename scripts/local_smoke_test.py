from __future__ import annotations

import argparse
import json
import time
from pathlib import Path

import requests


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--api", default="http://localhost:8000", help="Backend API origin")
    parser.add_argument("--video", required=True, help="Path to a local video file")
    parser.add_argument("--timeout-seconds", type=int, default=900, help="How long to wait for completion")
    args = parser.parse_args()

    video_path = Path(args.video)
    if not video_path.exists():
        raise SystemExit(f"Video not found: {video_path}")

    with video_path.open("rb") as handle:
        response = requests.post(
            f"{args.api}/api/runs",
            files={"file": (video_path.name, handle, "video/mp4")},
            timeout=120,
        )
    response.raise_for_status()
    payload = response.json()
    run_id = payload["id"]
    print(f"Created run {run_id}")

    deadline = time.time() + args.timeout_seconds
    latest = None
    while time.time() < deadline:
        latest = requests.get(f"{args.api}/api/runs/{run_id}", timeout=30).json()
        print(f"{latest['status']}: {round(latest['progress'] * 100)}% - {latest['progress_message']}")
        if latest["status"] in {"completed", "failed"}:
            break
        time.sleep(2)

    if latest is None:
        raise SystemExit("No run details were returned by the API.")
    if latest["status"] == "failed":
        raise SystemExit(json.dumps(latest, indent=2))
    print(json.dumps(latest, indent=2))


if __name__ == "__main__":
    main()
