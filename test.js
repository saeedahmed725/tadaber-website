// Test script for Tadaber Data Deletion Policy
// Run with: node test.js

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Tadaber Data Deletion Policy Setup');
console.log('============================================');

// Test 1: Check if required files exist
const requiredFiles = [
    'data-deletion.html',
    'server.js',
    'package.json',
    '.env.example'
];

console.log('\n📁 Checking required files:');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} - Found`);
    } else {
        console.log(`❌ ${file} - Missing`);
    }
});

// Test 2: Check if data-deletion.html has required elements
console.log('\n🔍 Checking HTML structure:');
try {
    const htmlContent = fs.readFileSync('data-deletion.html', 'utf8');
    
    const checks = [
        { name: 'Arabic direction (dir="rtl")', test: /dir="rtl"/ },
        { name: 'Form element', test: /<form.*id="deletionForm"/ },
        { name: 'Full Name field', test: /id="fullName"/ },
        { name: 'Email field', test: /id="email"/ },
        { name: 'User ID field', test: /id="userId"/ },
        { name: 'Message field', test: /id="message"/ },
        { name: 'Submit button', test: /type="submit"/ },
        { name: 'AOS animations', test: /data-aos/ },
        { name: 'Back button to main site', test: /href="index\.html"/ }
    ];
    
    checks.forEach(check => {
        if (check.test.test(htmlContent)) {
            console.log(`✅ ${check.name} - Found`);
        } else {
            console.log(`❌ ${check.name} - Missing`);
        }
    });
} catch (error) {
    console.log('❌ Error reading data-deletion.html:', error.message);
}

// Test 3: Check package.json
console.log('\n📦 Checking package.json:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredDeps = ['express', 'nodemailer', 'cors', 'helmet', 'express-rate-limit', 'dotenv'];
    
    requiredDeps.forEach(dep => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            console.log(`✅ ${dep} - Found`);
        } else {
            console.log(`❌ ${dep} - Missing`);
        }
    });
} catch (error) {
    console.log('❌ Error reading package.json:', error.message);
}

// Test 4: Check server.js structure
console.log('\n🖥️  Checking server.js:');
try {
    const serverContent = fs.readFileSync('server.js', 'utf8');
    
    const serverChecks = [
        { name: 'Express setup', test: /require\(['"]express['"]\)/ },
        { name: 'Nodemailer setup', test: /require\(['"]nodemailer['"]\)/ },
        { name: 'CORS middleware', test: /app\.use\(cors/ },
        { name: 'Rate limiting', test: /rateLimit/ },
        { name: 'Delete request endpoint', test: /\/api\/delete-request/ },
        { name: 'Email configuration', test: /createTransporter/ },
        { name: 'Arabic email content', test: /طلب حذف بيانات/ }
    ];
    
    serverChecks.forEach(check => {
        if (check.test.test(serverContent)) {
            console.log(`✅ ${check.name} - Found`);
        } else {
            console.log(`❌ ${check.name} - Missing`);
        }
    });
} catch (error) {
    console.log('❌ Error reading server.js:', error.message);
}

// Test 5: Check integration with main website
console.log('\n🔗 Checking main website integration:');
try {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    const indexEnContent = fs.readFileSync('index_en.html', 'utf8');
    
    if (/data-deletion\.html/.test(indexContent)) {
        console.log('✅ Arabic version - Link found');
    } else {
        console.log('❌ Arabic version - Link missing');
    }
    
    if (/data-deletion\.html/.test(indexEnContent)) {
        console.log('✅ English version - Link found');
    } else {
        console.log('❌ English version - Link missing');
    }
} catch (error) {
    console.log('❌ Error checking main website files:', error.message);
}

// Test 6: Check environment setup
console.log('\n🔧 Checking environment setup:');
if (fs.existsSync('.env')) {
    console.log('✅ .env file exists');
    
    try {
        const envContent = fs.readFileSync('.env', 'utf8');
        if (/EMAIL_USER/.test(envContent)) {
            console.log('✅ EMAIL_USER variable found');
        } else {
            console.log('❌ EMAIL_USER variable missing');
        }
        
        if (/EMAIL_PASS/.test(envContent)) {
            console.log('✅ EMAIL_PASS variable found');
        } else {
            console.log('❌ EMAIL_PASS variable missing');
        }
    } catch (error) {
        console.log('❌ Error reading .env file');
    }
} else {
    console.log('⚠️  .env file not found (use .env.example as template)');
}

console.log('\n🎯 Test Summary:');
console.log('================');
console.log('✅ If all items show checkmarks, your setup is complete!');
console.log('❌ If any items show X marks, please review the setup instructions.');
console.log('⚠️  Warning items are optional but recommended.');
console.log('\n📋 Next steps:');
console.log('1. Run: npm install');
console.log('2. Copy .env.example to .env and configure email settings');
console.log('3. Test locally: npm start');
console.log('4. Deploy to your preferred platform');
console.log('\n📖 See README-DATA-DELETION.md for detailed instructions.');
