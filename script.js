const cards = document.querySelectorAll('.card-inner');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Unflip other cards
        cards.forEach(c => c !== card && c.classList.remove('is-flipped'));
        // Flip the current card
        card.classList.toggle('is-flipped');
    });
});

document.getElementById('copyEsp8266').addEventListener('click', function() {
    const link = 'http://arduino.esp8266.com/stable/package_esp8266com_index.json'; // Replace with actual link
    navigator.clipboard.writeText(link)
})
document.getElementById('copyEsp32').addEventListener('click', function() {
    const link = 'https://dl.espressif.com/dl/package_esp32_index.json'; // Replace with actual link
    navigator.clipboard.writeText(link)
})