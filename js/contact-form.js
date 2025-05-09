// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Form validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('الرجاء ملء جميع الحقول المطلوبة');
                return false;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('الرجاء إدخال بريد إلكتروني صحيح');
                return false;
            }
            
            // Here you would normally send the data to a server
            // For now, we'll just show a success message
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
            contactForm.reset();
        });
    }
});
