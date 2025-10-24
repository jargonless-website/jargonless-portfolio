# syntax=docker/dockerfile:1

FROM python:3.11-slim

# Security / reproducibility
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install deps in one layer
RUN pip install --no-cache-dir fastapi uvicorn[standard]

# Copy only what you need
COPY main.py .

# Expose FastAPI default port
EXPOSE 8000

# Healthcheck for Compose
HEALTHCHECK --interval=15s --timeout=3s --retries=5 \
  CMD python -c "import urllib.request,sys; sys.exit(0) if urllib.request.urlopen('http://localhost:8000/api/health').getcode()==200 else 1" || exit 1

# Start the server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
