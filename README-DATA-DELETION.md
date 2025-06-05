# Tadaber Data Deletion Policy Website

This is a minimal Arabic website that complies with Google Play Console's user data deletion policy for the Tadaber app.

## Features

- ✅ Clean, responsive design in Arabic
- ✅ Contact form for data deletion requests
- ✅ Email functionality with both server and fallback options
- ✅ Integrated with main app website
- ✅ AOS animations and smooth transitions
- ✅ Rate limiting and security measures

## Files Structure

```
├── data-deletion.html      # Main data deletion policy page
├── server.js              # Node.js server for email handling
├── package.json           # Node.js dependencies
├── .env.example          # Environment variables example
└── README-DATA-DELETION.md # This file
```

## Deployment Options

### Option 1: GitHub Pages (Static Only)
For simple hosting with mailto fallback:

1. Upload `data-deletion.html` to your GitHub repository
2. Enable GitHub Pages in repository settings
3. The form will use mailto fallback (opens user's email client)

### Option 2: Server Deployment (Recommended)
For full email functionality:

#### Prerequisites
- Node.js 14+ installed
- Gmail account with App Password enabled

#### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Email Settings**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```
   EMAIL_USER=your_gmail_app_address
   EMAIL_PASS=your_gmail_app_password
   PORT=3000
   FRONTEND_URL=https://yourdomain.com
   ```

3. **Generate Gmail App Password**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Enable 2-Factor Authentication
   - Go to Security > App passwords
   - Generate password for "Mail"
   - Use this password in `.env` file

4. **Run Locally**
   ```bash
   npm start
   ```
   Visit: `http://localhost:3000/data-deletion`

5. **Deploy to Production**
   
   **Heroku:**
   ```bash
   heroku create tadaber-deletion-policy
   heroku config:set EMAIL_USER=your_gmail_app_address
   heroku config:set EMAIL_PASS=your_app_password
   git push heroku main
   ```
   
   **Vercel:**
   ```bash
   vercel --prod
   ```
   Add environment variables in Vercel dashboard.

   **Railway:**
   ```bash
   railway login
   railway new
   railway add
   railway deploy
   ```

## Features Explanation

### Security Features
- Rate limiting (5 requests per 15 minutes per IP)
- CORS protection
- Input validation and sanitization
- Helmet.js security headers

### Email Features
- Sends confirmation email to user
- Sends notification email to admin
- Fallback to mailto if server unavailable
- Arabic email templates

### Form Features
- Required field validation
- Email format validation
- Loading states and feedback
- Responsive design
- RTL Arabic support

## Integration with Main Website

The data deletion page is integrated with your main website:

1. **Footer Links**: Added buttons in both English and Arabic versions
2. **Consistent Design**: Uses same color scheme (#0E6D5E) and fonts
3. **Smooth Navigation**: Back button to return to main site
4. **Responsive**: Works on all device sizes

## Customization

### Colors
Main brand color is defined as `#0E6D5E`. To change:
```css
:root {
  --brand-color: #0E6D5E;
}
```

### Text Content
All text is in Arabic and can be easily modified in the HTML file.

### Email Templates
Email templates are in `server.js` and can be customized in the `/api/delete-request` endpoint.

## Google Play Console Compliance

This implementation meets Google Play Console requirements:

1. ✅ **Accessible Policy**: Clear URL for data deletion policy
2. ✅ **User-Friendly**: Simple form for deletion requests
3. ✅ **Confirmation**: Email confirmation to users
4. ✅ **Processing**: Admin notification system
5. ✅ **Timeline**: 30-day processing commitment stated

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check Gmail App Password is correct
   - Verify 2FA is enabled on Gmail account
   - Check spam folder

2. **Form not submitting**
   - Check console for JavaScript errors
   - Verify server is running (if using Node.js option)
   - Check network connectivity

3. **Styling issues**
   - Ensure CSS files are properly linked
   - Check browser console for 404 errors
   - Verify file paths are correct

## Testing

Test the form with:
```bash
curl -X POST http://localhost:3000/api/delete-request \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "اسم تجريبي",
    "email": "test@example.com",
    "userId": "12345",
    "message": "رسالة تجريبية"
  }'
```

## Support

For technical support or questions:
- Email: tadabar.app@gmail.com
- GitHub: [Repository Issues](https://github.com/saeedahmed725/tadaber-website/issues)

---

Made with ❤️ for Tadaber App Users
