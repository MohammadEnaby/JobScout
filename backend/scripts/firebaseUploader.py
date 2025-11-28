import json
import os
import sys
from typing import List, Dict

# Add the parent directory (backend) to sys.path so we can import core.firebase
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

try:
    from core.firebase import db
except ImportError as e:
    print(f"[X] Failed to import firebase client: {e}")
    print("   Make sure you are running this script from the correct environment.")
    raise SystemExit(1)


STRUCTURED_PATH = os.path.join(parent_dir, "Data", "structuered_jobs.json")


def load_structured_jobs(path: str = STRUCTURED_PATH) -> List[Dict]:
    if not os.path.exists(path):
        raise FileNotFoundError(f"'{path}' does not exist.")
    if os.path.getsize(path) == 0:
        raise ValueError(f"'{path}' is empty.")

    with open(path, "r", encoding="utf-8") as fh:
        data = json.load(fh)

    if not isinstance(data, list) or not data:
        raise ValueError(f"'{path}' must contain a non-empty list of jobs.")

    return data


def upload_to_firebase(jobs: List[Dict]) -> None:
    """
    Uploads the list of jobs to the 'jobs' collection in Firestore.
    """
    if not jobs:
        print("[!] No jobs to upload.")
        return

    print(f"[>] Uploading {len(jobs)} jobs to Firebase...")
    
    collection_ref = db.collection("jobs")
    
    count = 0
    for job in jobs:
        try:
            # Use a unique ID if available, otherwise let Firestore generate one
            # Assuming 'id' or 'job_id' might be in the dict, or we just add.
            # If we want to avoid duplicates, we should pick a stable ID.
            # For now, we'll just add them.
            
            # If the job has an 'id', use it as the document ID
            doc_id = job.get("id")
            if doc_id:
                collection_ref.document(str(doc_id)).set(job)
            else:
                collection_ref.add(job)
            
            count += 1
            # Optional: Print progress every 10 jobs
            if count % 10 == 0:
                print(f"   ... uploaded {count} jobs")
                
        except Exception as e:
            print(f"[X] Error uploading job {job.get('title', 'Unknown')}: {e}")

    print(f"[OK] Successfully uploaded {count} jobs to Firestore.")


def main():
    try:
        jobs = load_structured_jobs()
    except Exception as err:
        print(f"[X] Cannot upload: {err}")
        raise SystemExit(1)

    try:
        upload_to_firebase(jobs)
    except Exception as err:
        print(f"[X] Firebase upload failed: {err}")
        raise SystemExit(1)

    print("[OK] Firebase upload step completed.")


if __name__ == "__main__":
    main()

