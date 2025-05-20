const jokeText = document.getElementById('joke-text');
const emojiButtons = document.querySelectorAll('.emoji-btn');
const emojiScreen = document.getElementById('emoji-screen');
const jokeScreen = document.getElementById('joke-screen');
const jokeImage = document.getElementById('joke-image');
const tryAgainBtn = document.getElementById('try-again');

// Array of dad jokes with their corresponding image search terms
const dadJokes = [
    {
        joke: "Why don't eggs tell jokes? They'd crack each other up!",
        imageTerm: "egg cracking"
    },
    {
        joke: "What do you call a fake noodle? An impasta!",
        imageTerm: "pasta noodles"
    },
    {
        joke: "How does a penguin build its house? Igloos it together!",
        imageTerm: "penguin igloo"
    },
    {
        joke: "Why did the scarecrow win an award? Because he was outstanding in his field!",
        imageTerm: "scarecrow field"
    },
    {
        joke: "Why don't scientists trust atoms? Because they make up everything!",
        imageTerm: "atom science"
    },
    {
        joke: "What do you call a can opener that doesn't work? A can't opener!",
        imageTerm: "can opener"
    },
    {
        joke: "Why did the bicycle fall over? Because it was two-tired!",
        imageTerm: "fallen bicycle"
    },
    {
        joke: "What do you call a bear with no teeth? A gummy bear!",
        imageTerm: "gummy bear"
    },
    {
        joke: "Why don't skeletons fight each other? They don't have the guts!",
        imageTerm: "skeleton cartoon"
    },
    {
        joke: "What do you call a fish with no eyes? Fsh!",
        imageTerm: "fish cartoon"
    }
];

// Function to get a random joke
function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * dadJokes.length);
    return dadJokes[randomIndex];
}

// Function to switch screens
function switchScreen(from, to) {
    from.classList.remove('active');
    to.classList.add('active');
}

// Function to load a random image from Unsplash
async function loadImage(searchTerm) {
    // Using Unsplash Source API with proper dimensions and quality
    const unsplashUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(searchTerm)}`;
    jokeImage.src = unsplashUrl;
    
    // Add error handling for image loading
    jokeImage.onerror = () => {
        // Fallback to a default image if loading fails
        // jokeImage.src = 'https://www.pexels.com/photo/close-up-photo-of-cat-with-its-eyes-closed-1183434/';
        const randomNumber = Math.floor(Math.random() * 10);
        if (randomNumber < 5) {
        jokeImage.src = 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Nyesom_Wike_%282015%29.jpg';
    } else {
        jokeImage.src = '/public/bird.jpg';
    }
    };
}

// Add click event listeners to emoji buttons
emojiButtons.forEach(button => {
    button.addEventListener('click', async () => {
        // Add a small animation
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);

        // Get and display a random joke
        const jokeData = getRandomJoke();
        jokeText.textContent = jokeData.joke;
        
        // Load relevant image
        await loadImage(jokeData.imageTerm);
        
        // Switch to joke screen
        switchScreen(emojiScreen, jokeScreen);
    });
});

// Add click event listener to try again button
tryAgainBtn.addEventListener('click', () => {
    switchScreen(jokeScreen, emojiScreen);
}); 