// Card Flip Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle the flip class on the card-inner element
            const cardInner = this.querySelector('.card-inner');
            
            // If card is not flipped, close any open cards first
            if (!cardInner.classList.contains('is-flipped')) {
                // Unflip other cards
                document.querySelectorAll('.card-inner.is-flipped').forEach(flippedCard => {
                    flippedCard.classList.remove('is-flipped');
                });
            }
            
            // Toggle the current card
            cardInner.classList.toggle('is-flipped');
            
            // Add slight 3D rotation effect based on mouse position
            card.addEventListener('mousemove', handleCardMouseMove);
            
            // Remove rotation effect when leaving card
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'translateY(-5px)';
            });
        });
    });
    
    // Copy functionality for ESP32 and ESP8266 JSON links
    const copyEsp32Button = document.getElementById('copyEsp32');
    const copyEsp8266Button = document.getElementById('copyEsp8266');
    const esp32Notification = document.getElementById('esp32Notification');
    const esp8266Notification = document.getElementById('esp8266Notification');
    
    copyEsp32Button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card flip when clicking button
        const link = 'https://dl.espressif.com/dl/package_esp32_index.json';
        copyToClipboard(link, esp32Notification);
    });
    
    copyEsp8266Button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card flip when clicking button
        const link = 'http://arduino.esp8266.com/stable/package_esp8266com_index.json';
        copyToClipboard(link, esp8266Notification);
    });
    
    // Close cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.card')) {
            document.querySelectorAll('.card-inner.is-flipped').forEach(card => {
                card.classList.remove('is-flipped');
            });
        }
    });
    
    // Add entrance animations
    animateCards();
});

// Function to copy text to clipboard
function copyToClipboard(text, notificationElement) {
    navigator.clipboard.writeText(text)
        .then(() => {
            // Show confirmation
            notificationElement.classList.add('show');
            
            // Hide after 2 seconds
            setTimeout(() => {
                notificationElement.classList.remove('show');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

// Function to handle card 3D effect on mouse move
function handleCardMouseMove(e) {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    
    // Calculate mouse position relative to the card
    const mouseX = e.clientX - cardRect.left;
    const mouseY = e.clientY - cardRect.top;
    
    // Calculate rotation based on mouse position
    const rotateY = ((mouseX / cardWidth) - 0.5) * 5; // Max 5deg rotation
    const rotateX = ((mouseY / cardHeight) - 0.5) * -5; // Max 5deg rotation
    
    // Apply rotation to the card, and keep the translateY(-5px) effect
    card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// Function to animate cards on page load
function animateCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Set initial state (hidden and translated down)
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        // Animate in with delay based on index
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100)); // 100ms delay between each card
    });
}

// Add preloading for better performance
window.addEventListener('load', function() {
    // After everything is loaded, add a class to the body to enable transitions
    document.body.classList.add('loaded');
});