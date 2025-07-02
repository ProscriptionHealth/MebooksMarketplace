#!/bin/bash

# Mebooks.ai Deployment Script
# Deploys the vector search backend to Google Cloud Platform

set -e

# Configuration
PROJECT_ID=${GOOGLE_CLOUD_PROJECT_ID}
REGION=${GOOGLE_CLOUD_LOCATION:-us-central1}
VECTOR_SERVICE_NAME="mebooks-vector-search"
EXPRESS_SERVICE_NAME="mebooks-express-backend"
FRONTEND_SERVICE_NAME="mebooks-frontend"
VECTOR_IMAGE_NAME="gcr.io/${PROJECT_ID}/${VECTOR_SERVICE_NAME}"
EXPRESS_IMAGE_NAME="gcr.io/${PROJECT_ID}/${EXPRESS_SERVICE_NAME}"
FRONTEND_IMAGE_NAME="gcr.io/${PROJECT_ID}/${FRONTEND_SERVICE_NAME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Mebooks.ai deployment...${NC}"

# Check if required environment variables are set
if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}❌ GOOGLE_CLOUD_PROJECT_ID environment variable is required${NC}"
    exit 1
fi

if [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo -e "${RED}❌ GOOGLE_APPLICATION_CREDENTIALS environment variable is required${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Project ID: ${PROJECT_ID}${NC}"
echo -e "${YELLOW}🌍 Region: ${REGION}${NC}"

# Enable required APIs
echo -e "${YELLOW}🔧 Enabling required APIs...${NC}"
gcloud services enable \
    aiplatform.googleapis.com \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    storage.googleapis.com \
    bigquery.googleapis.com \
    --project=$PROJECT_ID

# Build and push Vector Search Docker image
echo -e "${YELLOW}🐳 Building and pushing Vector Search image...${NC}"
gcloud builds submit \
    --tag $VECTOR_IMAGE_NAME \
    --project=$PROJECT_ID

# Deploy Vector Search to Cloud Run
echo -e "${YELLOW}🚀 Deploying Vector Search to Cloud Run...${NC}"
gcloud run deploy $VECTOR_SERVICE_NAME \
    --image $VECTOR_IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --allow-unauthenticated \
    --memory 2Gi \
    --cpu 2 \
    --timeout 300 \
    --concurrency 80 \
    --max-instances 10 \
    --set-env-vars="GOOGLE_CLOUD_PROJECT_ID=$PROJECT_ID,GOOGLE_CLOUD_LOCATION=$REGION" \
    --set-env-vars-from-file=.env

# Get Vector Search service URL
VECTOR_SERVICE_URL=$(gcloud run services describe $VECTOR_SERVICE_NAME \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --format="value(status.url)")

# Build and push Express Backend Docker image
echo -e "${YELLOW}🐳 Building and pushing Express Backend image...${NC}"
gcloud builds submit \
    --tag $EXPRESS_IMAGE_NAME \
    --dockerfile=Dockerfile.express \
    --project=$PROJECT_ID

# Deploy Express Backend to Cloud Run
echo -e "${YELLOW}🚀 Deploying Express Backend to Cloud Run...${NC}"
gcloud run deploy $EXPRESS_SERVICE_NAME \
    --image $EXPRESS_IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --allow-unauthenticated \
    --memory 1Gi \
    --cpu 1 \
    --timeout 300 \
    --concurrency 80 \
    --max-instances 10 \
    --set-env-vars="VECTOR_SEARCH_SERVICE_URL=$VECTOR_SERVICE_URL,NODE_ENV=production" \
    --set-env-vars-from-file=.env

# Get Express Backend service URL
EXPRESS_SERVICE_URL=$(gcloud run services describe $EXPRESS_SERVICE_NAME \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --format="value(status.url)")

# Build and push Frontend Docker image
echo -e "${YELLOW}🐳 Building and pushing Frontend image...${NC}"
gcloud builds submit \
    --tag $FRONTEND_IMAGE_NAME \
    --dockerfile=Dockerfile.frontend \
    --project=$PROJECT_ID

# Deploy Frontend to Cloud Run
echo -e "${YELLOW}🚀 Deploying Frontend to Cloud Run...${NC}"
gcloud run deploy $FRONTEND_SERVICE_NAME \
    --image $FRONTEND_IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --allow-unauthenticated \
    --memory 512Mi \
    --cpu 1 \
    --timeout 300 \
    --concurrency 80 \
    --max-instances 10 \
    --set-env-vars="VITE_VECTOR_SEARCH_API_URL=$EXPRESS_SERVICE_URL" \
    --set-env-vars-from-file=.env

# Get Frontend service URL
SERVICE_URL=$(gcloud run services describe $FRONTEND_SERVICE_NAME \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --format="value(status.url)")

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Service URL: ${SERVICE_URL}${NC}"

# Test the deployments
echo -e "${YELLOW}🧪 Testing deployments...${NC}"

# Test Vector Search Service
if curl -f "${VECTOR_SERVICE_URL}/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Vector Search health check passed!${NC}"
else
    echo -e "${RED}❌ Vector Search health check failed!${NC}"
fi

# Test Express Backend Service
if curl -f "${EXPRESS_SERVICE_URL}/api/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Express Backend health check passed!${NC}"
else
    echo -e "${RED}❌ Express Backend health check failed!${NC}"
fi

# Test Frontend Service
if curl -f "${SERVICE_URL}" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend health check passed!${NC}"
else
    echo -e "${RED}❌ Frontend health check failed!${NC}"
fi

echo -e "${GREEN}🎉 Mebooks.ai full-stack application is now live!${NC}"
echo -e "${YELLOW}📝 Service URLs:${NC}"
echo -e "Frontend: ${SERVICE_URL}"
echo -e "Express Backend: ${EXPRESS_SERVICE_URL}"
echo -e "Vector Search: ${VECTOR_SERVICE_URL}" 