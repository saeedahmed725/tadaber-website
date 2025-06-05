const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ['https://saeedahmed725.github.io', 'http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean),
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many deletion requests from this IP, please try again later.'
});

app.use('/api/delete-request', limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'saeedahmedsaeed726@gmail.com',
        pass: process.env.EMAIL_PASS // Use App Password for Gmail
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/data-deletion', (req, res) => {
    res.sendFile(__dirname + '/data-deletion.html');
});

// Handle data deletion requests
app.post('/api/delete-request', async (req, res) => {
    try {
        const { fullName, email, userId, message } = req.body;

        // Validate required fields
        if (!fullName || !email || !userId) {
            return res.status(400).json({
                success: false,
                message: 'الاسم الكامل والبريد الإلكتروني ومعرف المستخدم مطلوبة'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'البريد الإلكتروني غير صحيح'
            });
        }

        // Prepare email content
        const emailContent = `
طلب حذف بيانات مستخدم - تطبيق تدبر
=====================================

معلومات المستخدم:
الاسم الكامل: ${fullName}
البريد الإلكتروني: ${email}
معرف المستخدم: ${userId}

رسالة إضافية:
${message || 'لا توجد رسالة إضافية'}

تفاصيل إضافية:
تاريخ الطلب: ${new Date().toLocaleString('ar-SA')}
عنوان IP: ${req.ip}

يرجى معالجة هذا الطلب خلال 30 يوماً وفقاً لسياسات متجر جوجل بلاي.
        `;

        // Send email to admin
        const mailOptions = {
            from: process.env.EMAIL_USER || 'saeedahmedsaeed726@gmail.com',
            to: 'saeedahmedsaeed726@gmail.com',
            subject: 'طلب حذف بيانات مستخدم - تطبيق تدبر',
            text: emailContent,
            replyTo: email
        };

        await transporter.sendMail(mailOptions);

        // Send confirmation email to user
        const confirmationOptions = {
            from: process.env.EMAIL_USER || 'saeedahmedsaeed726@gmail.com',
            to: email,
            subject: 'تأكيد استلام طلب حذف البيانات - تطبيق تدبر',
            text: `
عزيزي/عزيزتي ${fullName}،

شكراً لك على تواصلك معنا.

تم استلام طلب حذف البيانات الخاص بك بنجاح. سنقوم بمعالجة طلبك خلال 30 يوماً من تاريخ اليوم.

تفاصيل الطلب:
- معرف المستخدم: ${userId}
- تاريخ الطلب: ${new Date().toLocaleDateString('ar-SA')}

ستتلقى تأكيداً نهائياً عبر البريد الإلكتروني عند اكتمال عملية حذف البيانات.

إذا كان لديك أي استفسارات، يرجى الرد على هذا البريد.

مع تحيات فريق تطبيق تدبر
            `
        };

        await transporter.sendMail(confirmationOptions);

        res.json({
            success: true,
            message: 'تم إرسال طلبك بنجاح! ستتلقى تأكيداً عبر البريد الإلكتروني.'
        });

    } catch (error) {
        console.error('Error processing deletion request:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 Email service configured for: ${process.env.EMAIL_USER || 'saeedahmedsaeed726@gmail.com'}`);
});

module.exports = app;
