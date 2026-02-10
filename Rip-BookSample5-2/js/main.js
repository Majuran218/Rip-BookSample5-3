// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Memorial card hover effect enhancement
    const memorialCards = document.querySelectorAll('.memorial-card');
    memorialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for on-page anchors
            if (href !== '#') {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // Form validation for contact forms
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--accent-color)';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // In a real application, you would submit the form data to a server
                // For demo purposes, show a success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.backgroundColor = 'var(--primary-light)';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                        form.reset();
                    }, 2000);
                }, 1500);
            } else {
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please fill in all required fields.';
                errorMsg.style.color = 'var(--accent-color)';
                errorMsg.style.marginTop = '15px';
                errorMsg.style.fontWeight = '600';
                
                // Remove any existing error message
                const existingError = this.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                this.appendChild(errorMsg);
            }
        });
    });
    
    // Demo memorial data loading (in a real app, this would come from a database)
    function loadRecentMemorials() {
        // This is demo data - in reality, you would fetch this from an API
        const memorials = [
            {
                id: 1,
                name: "John A. Doe",
                years: "1948 - 2023",
                description: "Beloved father, grandfather, and community leader who touched countless lives through his volunteer work and kindness.",
                image: "images/memorial-1.jpg"
            },
            {
                id: 2,
                name: "Mary L. Smith",
                years: "1960 - 2022",
                description: "Cherished mother, teacher, and friend to all who knew her. She dedicated her life to education and family.",
                image: "images/memorial-2.jpg"
            },
            {
                id: 3,
                name: "Robert T. Johnson",
                years: "1955 - 2021",
                description: "Devoted husband, accomplished musician, and passionate advocate for local arts and culture.",
                image: "images/memorial-3.jpg"
            }
        ];
        
        // If we're on the homepage, we might want to display these
        const memorialGrid = document.querySelector('.memorial-grid');
        if (memorialGrid && memorialGrid.children.length <= 2) {
            // In a real app, we would dynamically generate cards here
            console.log('Loaded memorial data:', memorials);
        }
    }
    
    loadRecentMemorials();
    
    // Simulate a simple payment process
    window.processPayment = function(plan) {
        // In a real application, this would connect to a payment gateway like Stripe
        // For demo purposes, we'll simulate the process
        
        const paymentModal = document.createElement('div');
        paymentModal.className = 'payment-modal';
        paymentModal.style.position = 'fixed';
        paymentModal.style.top = '0';
        paymentModal.style.left = '0';
        paymentModal.style.width = '100%';
        paymentModal.style.height = '100%';
        paymentModal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        paymentModal.style.display = 'flex';
        paymentModal.style.justifyContent = 'center';
        paymentModal.style.alignItems = 'center';
        paymentModal.style.zIndex = '2000';
        
        paymentModal.innerHTML = `
            <div style="background-color: white; padding: 40px; border-radius: var(--border-radius); max-width: 500px; width: 90%; text-align: center;">
                <h3>Complete Your Purchase</h3>
                <p>You've selected the <strong>${plan}</strong> plan.</p>
                <p>This is a demo. In a real application, you would be redirected to a secure payment gateway.</p>
                
                <div style="margin: 30px 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Plan:</span>
                        <span>${plan}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Annual Fee:</span>
                        <span>${plan === 'Basic Memorial' ? '$29' : plan === 'Family Memorial' ? '$49' : '$19'}</span>
                    </div>
                    <hr style="margin: 20px 0;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem;">
                        <span>Total:</span>
                        <span>${plan === 'Basic Memorial' ? '$29' : plan === 'Family Memorial' ? '$49' : '$19'}</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button id="cancelPayment" class="btn-outline">Cancel</button>
                    <button id="confirmPayment" class="btn-primary">Proceed to Payment</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(paymentModal);
        
        document.getElementById('cancelPayment').addEventListener('click', function() {
            document.body.removeChild(paymentModal);
        });
        
        document.getElementById('confirmPayment').addEventListener('click', function() {
            // Simulate payment processing
            const confirmBtn = this;
            confirmBtn.textContent = 'Processing...';
            confirmBtn.disabled = true;
            
            setTimeout(() => {
                document.body.removeChild(paymentModal);
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.style.position = 'fixed';
                successMsg.style.top = '20px';
                successMsg.style.right = '20px';
                successMsg.style.backgroundColor = 'var(--primary-color)';
                successMsg.style.color = 'white';
                successMsg.style.padding = '15px 25px';
                successMsg.style.borderRadius = 'var(--border-radius)';
                successMsg.style.boxShadow = 'var(--shadow)';
                successMsg.style.zIndex = '2000';
                successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Payment successful! Redirecting to your dashboard...`;
                
                document.body.appendChild(successMsg);
                
                // Redirect to dashboard after a delay
                setTimeout(() => {
                    window.location.href = 'dashboard/index.html';
                }, 2000);
            }, 2000);
        });
    };
});


