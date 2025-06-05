# Tadaber Data Deletion Policy - Windows Deployment Script
# PowerShell script for deploying the data deletion policy website

Write-Host "🚀 Tadaber Data Deletion Policy Deployment" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "🔗 Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "📝 Please edit .env file with your email credentials:" -ForegroundColor Cyan
    Write-Host "   - EMAIL_USER: Your Gmail address" -ForegroundColor White
    Write-Host "   - EMAIL_PASS: Your Gmail App Password" -ForegroundColor White
    Write-Host ""
    Write-Host "🔗 To get Gmail App Password:" -ForegroundColor Cyan
    Write-Host "   1. Go to https://myaccount.google.com/" -ForegroundColor White
    Write-Host "   2. Enable 2-Factor Authentication" -ForegroundColor White
    Write-Host "   3. Go to Security > App passwords" -ForegroundColor White
    Write-Host "   4. Generate password for 'Mail'" -ForegroundColor White
    Write-Host "   5. Use that password in .env file" -ForegroundColor White
    Write-Host ""
    
    # Open .env file for editing
    try {
        Start-Process notepad ".env"
        Write-Host "📝 Opened .env file in Notepad for editing..." -ForegroundColor Green
    } catch {
        Write-Host "📝 Please manually edit .env file" -ForegroundColor Yellow
    }
    
    Read-Host "Press Enter after updating .env file"
}

Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Ask for deployment option
Write-Host ""
Write-Host "🌐 Choose deployment option:" -ForegroundColor Cyan
Write-Host "1. Run locally (for testing)" -ForegroundColor White
Write-Host "2. Deploy to Vercel" -ForegroundColor White
Write-Host "3. Deploy to Heroku" -ForegroundColor White
Write-Host "4. GitHub Pages (static only)" -ForegroundColor White
Write-Host "5. Open data deletion page in browser" -ForegroundColor White

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host "🏠 Starting local server..." -ForegroundColor Green
        Write-Host "📱 Visit: http://localhost:3000/data-deletion" -ForegroundColor Cyan
        Write-Host "📱 Or: http://localhost:3000/data-deletion.html" -ForegroundColor Cyan
        npm start
    }
    "2" {
        Write-Host "🔮 Deploying to Vercel..." -ForegroundColor Blue
        try {
            vercel --version | Out-Null
        } catch {
            Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
        }
        Write-Host "⚠️  Don't forget to set environment variables in Vercel dashboard:" -ForegroundColor Yellow
        Write-Host "   - EMAIL_USER" -ForegroundColor White
        Write-Host "   - EMAIL_PASS" -ForegroundColor White
        Write-Host "   - FRONTEND_URL" -ForegroundColor White
        vercel --prod
    }
    "3" {
        Write-Host "🚀 Deploying to Heroku..." -ForegroundColor Magenta
        try {
            heroku --version | Out-Null
        } catch {
            Write-Host "❌ Heroku CLI not found. Please install it first." -ForegroundColor Red
            Write-Host "🔗 https://devcenter.heroku.com/articles/heroku-cli" -ForegroundColor Yellow
            exit 1
        }
        
        $appName = Read-Host "Enter your app name"
        
        # Read email credentials from .env
        $envContent = Get-Content ".env"
        $emailUser = ($envContent | Where-Object { $_ -match "EMAIL_USER=" }) -replace "EMAIL_USER=", ""
        $emailPass = ($envContent | Where-Object { $_ -match "EMAIL_PASS=" }) -replace "EMAIL_PASS=", ""
        
        heroku create $appName
        heroku config:set EMAIL_USER=$emailUser --app $appName
        heroku config:set EMAIL_PASS=$emailPass --app $appName
        heroku config:set FRONTEND_URL=https://$appName.herokuapp.com --app $appName
        
        Write-Host "🔧 Deploying to Heroku..." -ForegroundColor Blue
        git add .
        git commit -m "Deploy data deletion policy"
        git push heroku main
    }
    "4" {
        Write-Host "📄 For GitHub Pages deployment:" -ForegroundColor Cyan
        Write-Host "1. Upload data-deletion.html to your repository" -ForegroundColor White
        Write-Host "2. Enable GitHub Pages in repository settings" -ForegroundColor White
        Write-Host "3. The form will use mailto fallback" -ForegroundColor White
        Write-Host "4. URL will be: https://yourusername.github.io/repository/data-deletion.html" -ForegroundColor White
        
        # Open GitHub repository if possible
        try {
            $gitRemote = git remote get-url origin
            if ($gitRemote -match "github.com") {
                $repoUrl = $gitRemote -replace "\.git$", ""
                Start-Process $repoUrl
                Write-Host "🔗 Opened GitHub repository in browser" -ForegroundColor Green
            }
        } catch {
            Write-Host "💡 Please manually open your GitHub repository" -ForegroundColor Yellow
        }
    }
    "5" {
        Write-Host "🌐 Opening data deletion page..." -ForegroundColor Green
        if (Test-Path "data-deletion.html") {
            $fullPath = (Resolve-Path "data-deletion.html").Path
            Start-Process $fullPath
            Write-Host "✅ Opened data-deletion.html in browser" -ForegroundColor Green
        } else {
            Write-Host "❌ data-deletion.html not found" -ForegroundColor Red
        }
    }
    default {
        Write-Host "❌ Invalid choice. Please run the script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Process complete!" -ForegroundColor Green
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   - Test the form functionality" -ForegroundColor White
Write-Host "   - Update Google Play Console with the URL" -ForegroundColor White
Write-Host "   - Monitor email delivery" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Useful links:" -ForegroundColor Cyan
Write-Host "   - Google Play Console: https://play.google.com/console" -ForegroundColor Blue
Write-Host "   - Gmail App Passwords: https://myaccount.google.com/apppasswords" -ForegroundColor Blue
Write-Host "   - Documentation: README-DATA-DELETION.md" -ForegroundColor Blue

# Keep window open
Read-Host "Press Enter to exit"
