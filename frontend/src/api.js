export const processFrame = async (blob, featureType, matchContext) => {
  const formData = new FormData();
  formData.append('frame', blob, 'frame.jpg');
  formData.append('feature_type', featureType);
  if (matchContext) {
    formData.append('match_context', JSON.stringify(matchContext));
  }

  const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://mr360-ai-886007865054.asia-south1.run.app';
  const response = await fetch(`${baseUrl}/process-360`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 503 || response.status === 429) {
      console.warn("Service Unavailable / Rate Limited. Backend retries exhausted.");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const result = await response.json();
  return result.data;
};

export const analyzeHealthFromImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('frame', imageFile, imageFile.name || 'food.jpg');
  formData.append('feature_type', 'health-analyzer');

  const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://mr360-ai-886007865054.asia-south1.run.app';
  const response = await fetch(`${baseUrl}/process-360`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
};
