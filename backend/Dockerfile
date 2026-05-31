# Python ka base image
FROM python:3.11-slim

# Working directory set karein
WORKDIR /app

# Pehle requirements copy karein aur install karein (Fast build ke liye)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Baaki saara code copy karein
COPY . .

# Port 8000 ko expose karein (FastAPI default)
EXPOSE 8000

# App chalane ki command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]