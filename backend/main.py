import os
import time
import json
import random
from typing import Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import google.generativeai as genai

app = FastAPI(title="Mr. 360 AI Engine - KKR vs SRH Edition")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GEMINI_API_KEY")
has_api_key = False
if api_key:
    genai.configure(api_key=api_key)
    has_api_key = True
else:
    print("WARNING: GEMINI_API_KEY not set. Running in MOCK SIMULATION mode for UI demonstration.")

def get_mock_data(feature_type: str) -> Dict[str, Any]:
    time.sleep(1.5) # Simulate API latency
    if feature_type == 'shot-insights':
        zones = ["Good Length", "Yorker", "Short", "Full Toss", "Bouncer", "Wide Outside Off"]
        return {
            "shot_efficiency": f"{random.randint(60, 99)}%",
            "pitch_zone": random.choice(zones),
            "predicted_runs": random.choice([0, 1, 2, 4, 6])
        }
    elif feature_type == 'live-voice':
        commentaries = [
            "Shreyas Iyer with a beautiful cover drive! Hyderabad ki garmi mein SRH ke pasine chhoot rahe hain!",
            "Pat Cummins steamrolls in... Oof! Beaten by pace. KKR needs to hold their nerves here.",
            "What a shot! Ekdum rocket ki tarah boundary ke bahar. Pin-drop silence in the Rajiv Gandhi Stadium!",
            "Huge appeal by Cummins! Umpire says no. The Hyderabad crowd is roaring!"
        ]
        return {"commentary": random.choice(commentaries)}
    elif feature_type == 'gate-guide':
        gates = [
            "Gate 4: Smooth entry (5 min wait).",
            "Gate 7: Overcrowded (35 min wait) - Move to Gate 3 immediately.",
            "Gate 1: Moderate crowd (15 min wait). Safe to proceed.",
            "Gate 3: Temporary VVIP movement. Hold position."
        ]
        return {
            "gate_status": random.choice(gates),
            "density_percentage": random.randint(20, 95)
        }
    elif feature_type == 'food-meter':
        comments = [
            "Fresh, piping hot Hyderabadi Biryani. Excellent aroma and perfect portion size.",
            "Samosas look a bit dry, but acceptable for standard stadium fare.",
            "Perfectly chilled beverage. Highly recommended for this Hyderabad heat.",
            "Snack combo looks slightly stale. Quality score reduced."
        ]
        return {
            "quality_score": random.randint(5, 10),
            "comments": random.choice(comments)
        }
    elif feature_type == 'health-analyzer':
        foods = [
            {
                "food_name": "Hyderabadi Biryani",
                "health_score": 6,
                "calories": 450,
                "protein": "22g",
                "carbs": "55g",
                "fat": "18g",
                "verdict": "Moderate",
                "tip": "Rice zyada hai, raita ke saath khao aur portion chhota rakho."
            },
            {
                "food_name": "Samosa",
                "health_score": 3,
                "calories": 262,
                "protein": "4g",
                "carbs": "30g",
                "fat": "15g",
                "verdict": "Unhealthy",
                "tip": "Deep fried hai bhai, better option: Baked samosa ya sprout chaat."
            },
            {
                "food_name": "Grilled Chicken Wrap",
                "health_score": 9,
                "calories": 320,
                "protein": "28g",
                "carbs": "30g",
                "fat": "8g",
                "verdict": "Healthy",
                "tip": "Excellent choice! High protein, low fat. Stadium ka best option."
            }
        ]
        chosen = random.choice(foods)
        return {
            "detected_foods": [chosen],
            "healthiest_pick": chosen["food_name"],
            "recommendation": f"{chosen['food_name']} mein {chosen['calories']} calories hain. {chosen['tip']}"
        }
    return {"status": "mocked"}

def analyze_with_gemini(image_bytes: bytes, feature_type: str) -> Dict[str, Any]:
    if not has_api_key:
        return get_mock_data(feature_type)

    model = genai.GenerativeModel('gemini-1.5-flash')
    
    if feature_type == 'shot-insights':
        task_prompt = "Identify the frame-by-frame movement of the bat and ball. Output JSON with keys: 'shot_efficiency' (percentage string like '85%'), 'pitch_zone' (string e.g. 'Good Length', 'Yorker', 'Short'), and 'predicted_runs' (integer 0-6)."
    elif feature_type == 'live-voice':
        task_prompt = "Act as a witty Hinglish cricket commentator. Mention the intense Hyderabad heat and the KKR vs SRH rivalry. Output JSON with a single 'commentary' key containing a 1-2 sentence lively commentary."
    elif feature_type == 'gate-guide':
        task_prompt = "Analyze crowd density from image. Cross-reference with Rajiv Gandhi Stadium gate map. Issue live advisory. Output JSON with 'gate_status' (string advisory, e.g., 'Gate 4: Overcrowded (30 min wait) - Move to Gate 7'), and 'density_percentage' (integer 0-100)."
    elif feature_type == 'food-meter':
        task_prompt = "Rate this stadium food image (assume Hyderabad Biryani or snacks). Compare it to standard stadium hospitality benchmarks. Output JSON with 'quality_score' (1-10) and 'comments' (string evaluation of freshness and presentation)."
    elif feature_type == 'health-analyzer':
        task_prompt = """You are a nutrition expert AI. Analyze this food image carefully.
Detect ALL food items visible. For each food item, provide:
- food_name (string)
- health_score (integer 1-10, where 10 is healthiest)
- calories (integer, estimated per serving)
- protein (string like '22g')
- carbs (string like '55g')
- fat (string like '18g')
- verdict (string: 'Healthy', 'Moderate', or 'Unhealthy')
- tip (string: a short Hinglish health tip for this food)

Also determine the overall healthiest item.

Output JSON with these keys:
- 'detected_foods': array of food objects as described above
- 'healthiest_pick': string name of the healthiest food item
- 'recommendation': string - a 1-2 sentence Hinglish overall recommendation"""
    else:
        task_prompt = "Analyze the image. Output JSON."

    system_prompt = f"""
    You are Mr. 360 AI, an advanced cricket intelligence engine and you act as the 'all-seeing eye' of the stadium.
    Context: Live Match: KKR vs SRH at Rajiv Gandhi International Stadium, Hyderabad.
    You must process the visual feed precisely and provide highly dynamic, real-time insights that feel alive and accurate.
    Do not just give generic responses; adapt your response strictly to what the 'eye' (the image) sees.
    
    Task: {task_prompt}
    
    CRITICAL: Ensure output is ONLY valid JSON, with NO markdown formatting, NO backticks. Do not include any text outside the JSON object.
    """

    image_parts = [{"mime_type": "image/jpeg", "data": image_bytes}]
    
    response = model.generate_content([system_prompt, image_parts[0]])
    result_text = response.text.strip()
    
    if result_text.startswith("```json"):
        result_text = result_text.replace("```json", "", 1)
    if result_text.endswith("```"):
        result_text = result_text[::-1].replace("```", "", 1)[::-1]
    result_text = result_text.strip()

    try:
        return json.loads(result_text)
    except json.JSONDecodeError:
        return {"error": "Failed to parse JSON", "raw_output": result_text}

def process_with_retry(image_bytes: bytes, feature_type: str, max_retries: int = 3):
    retries = 0
    while retries < max_retries:
        try:
            return analyze_with_gemini(image_bytes, feature_type)
        except Exception as e:
            err_msg = str(e).lower()
            if "429" in err_msg or "503" in err_msg or "exhausted" in err_msg or "quota" in err_msg:
                retries += 1
                if retries >= max_retries:
                    raise HTTPException(status_code=503, detail="AI Service unavailable after retries.")
                print(f"Rate limited or Service Unavailable (429/503). Retrying in 15 seconds... (Attempt {retries}/{max_retries})")
                time.sleep(15)
            else:
                raise HTTPException(status_code=500, detail=str(e))

@app.post("/process-360")
async def process_360(
    feature_type: str = Form(...),
    frame: UploadFile = File(...)
):
    try:
        contents = await frame.read()
        result = process_with_retry(contents, feature_type)
        return {"success": True, "feature": feature_type, "data": result}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Serve React Frontend in Production (Cloud Run)
dist_path = "/app/frontend/dist" if os.path.exists("/app/frontend/dist") else os.path.join(os.path.dirname(__file__), "../frontend/dist")
if os.path.exists(dist_path):
    app.mount("/", StaticFiles(directory=dist_path, html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
