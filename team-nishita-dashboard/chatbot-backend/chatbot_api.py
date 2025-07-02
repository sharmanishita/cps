from dotenv import load_dotenv
load_dotenv()
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient

app = Flask(__name__)
CORS(app)

client = InferenceClient(
    provider="together",  # or "huggingface" if using Hugging Face Inference Endpoints
    api_key=os.environ["HF_TOKEN"],
)

MODEL_NAME = "mistralai/Mixtral-8x7B-Instruct-v0.1"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('message', '')

    completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": user_input
            }
        ],
    )

    reply = completion.choices[0].message.content
    return jsonify({'reply': reply})

if __name__ == "__main__":
    app.run(port=5005)
