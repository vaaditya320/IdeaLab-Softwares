const cards = document.querySelectorAll('.card-inner');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Unflip other cards
        cards.forEach(c => c !== card && c.classList.remove('is-flipped'));
        // Flip the current card
        card.classList.toggle('is-flipped');
    });
});
