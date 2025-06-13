from recommendation_engine import recommend_for_learner
import json
import os

# === Paths (corrected to local directory) ===
LEARNER_FILE = 'learner_profiles.json'
OUTPUT_DIR = 'recommendations/'

# === Load learner profiles ===
with open(LEARNER_FILE) as f:
    learners = json.load(f)

# === Ensure output directory exists ===
os.makedirs(OUTPUT_DIR, exist_ok=True)

# === Run recommendation for each learner ===
for learner in learners:
    learner_id = learner['learner_id']
    recommended = recommend_for_learner(learner)

    output = {
        'learner_id': learner_id,
        'recommended_concepts': recommended
    }

    output_path = os.path.join(OUTPUT_DIR, f'recommendations_{learner_id}.json')
    with open(output_path, 'w') as f:
        json.dump(output, f, indent=4)

    print(f"[✔] Recommendations saved for {learner_id}: {recommended}")
