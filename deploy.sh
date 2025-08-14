#!/bin/bash

# Deployment script for Human-Technology Catalyst
echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Checking project structure..."

# Check environment files
print_status "Checking environment configuration..."

if [ ! -f "backend/.env" ]; then
    print_warning "Backend .env file not found. Copy from env.template and configure."
    echo "  cp backend/env.template backend/.env"
fi

if [ ! -f "frontend/.env.local" ]; then
    print_warning "Frontend .env.local file not found. Copy from env.template and configure."
    echo "  cp frontend/env.template frontend/.env.local"
fi

# Test frontend build
print_status "Testing frontend build..."
cd frontend
if npm run build > /dev/null 2>&1; then
    print_status "✅ Frontend build successful"
else
    print_error "❌ Frontend build failed"
    cd ..
    exit 1
fi
cd ..

# Test backend imports
print_status "Testing backend..."
cd backend
if source venv_new/bin/activate && python -c "from app.main import app; print('Backend OK')" > /dev/null 2>&1; then
    print_status "✅ Backend imports successful"
else
    print_error "❌ Backend imports failed"
    cd ..
    exit 1
fi
cd ..

# Check deployment configurations
print_status "Checking deployment configurations..."

if [ -f "frontend/vercel.json" ]; then
    print_status "✅ Frontend Vercel config found"
else
    print_warning "Frontend Vercel config not found"
fi

if [ -f "backend/vercel.json" ]; then
    print_status "✅ Backend Vercel config found"
else
    print_warning "Backend Vercel config not found"
fi

# Summary
echo ""
print_status "🎉 Pre-deployment checks completed!"
echo ""
echo "Next steps:"
echo "1. Configure environment variables (see DEPLOYMENT_GUIDE.md)"
echo "2. Set up Firebase projects and authentication"
echo "3. Deploy backend: cd backend && vercel --prod"
echo "4. Deploy frontend: cd frontend && vercel --prod"
echo "5. Update CORS settings with production domain"
echo ""
print_status "See DEPLOYMENT_GUIDE.md for detailed instructions"
