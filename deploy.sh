#!/bin/bash

# Tadaber Data Deletion Policy - Deployment Script
# This script helps deploy the data deletion policy website

echo "🚀 Tadaber Data Deletion Policy Deployment"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Creating .env file from template..."
    cp .env.example .env
    echo "📝 Please edit .env file with your email credentials:"
    echo "   - EMAIL_USER: Your Gmail address"
    echo "   - EMAIL_PASS: Your Gmail App Password"
    echo ""
    echo "🔗 To get Gmail App Password:"
    echo "   1. Go to https://myaccount.google.com/"
    echo "   2. Enable 2-Factor Authentication"
    echo "   3. Go to Security > App passwords"
    echo "   4. Generate password for 'Mail'"
    echo "   5. Use that password in .env file"
    echo ""
    read -p "Press Enter after updating .env file..."
fi

echo "✅ Dependencies installed"

# Ask for deployment option
echo ""
echo "🌐 Choose deployment option:"
echo "1. Run locally (for testing)"
echo "2. Deploy to Vercel"
echo "3. Deploy to Heroku"
echo "4. GitHub Pages (static only)"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🏠 Starting local server..."
        echo "📱 Visit: http://localhost:3000/data-deletion"
        npm start
        ;;
    2)
        echo "🔮 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        echo "⚠️  Don't forget to set environment variables in Vercel dashboard:"
        echo "   - EMAIL_USER"
        echo "   - EMAIL_PASS"
        echo "   - FRONTEND_URL"
        vercel --prod
        ;;
    3)
        echo "🚀 Deploying to Heroku..."
        if ! command -v heroku &> /dev/null; then
            echo "❌ Heroku CLI not found. Please install it first."
            echo "🔗 https://devcenter.heroku.com/articles/heroku-cli"
            exit 1
        fi
        
        read -p "Enter your app name: " app_name
        
        # Read email credentials from .env
        EMAIL_USER=$(grep EMAIL_USER .env | cut -d '=' -f2)
        EMAIL_PASS=$(grep EMAIL_PASS .env | cut -d '=' -f2)
        
        heroku create $app_name
        heroku config:set EMAIL_USER=$EMAIL_USER --app $app_name
        heroku config:set EMAIL_PASS=$EMAIL_PASS --app $app_name
        heroku config:set FRONTEND_URL=https://$app_name.herokuapp.com --app $app_name
        
        echo "🔧 Deploying to Heroku..."
        git add .
        git commit -m "Deploy data deletion policy"
        git push heroku main
        ;;
    4)
        echo "📄 For GitHub Pages deployment:"
        echo "1. Upload data-deletion.html to your repository"
        echo "2. Enable GitHub Pages in repository settings"
        echo "3. The form will use mailto fallback"
        echo "4. URL will be: https://yourusername.github.io/repository/data-deletion.html"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo "📋 Next steps:"
echo "   - Test the form functionality"
echo "   - Update Google Play Console with the URL"
echo "   - Monitor email delivery"
echo ""
echo "🔗 Useful links:"
echo "   - Google Play Console: https://play.google.com/console"
echo "   - Gmail App Passwords: https://myaccount.google.com/apppasswords"
echo "   - Documentation: README-DATA-DELETION.md"
