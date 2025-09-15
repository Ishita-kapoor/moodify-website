let selectedMood = "";
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (username && email && password) {
                localStorage.setItem("user", JSON.stringify({ username, email }));
                alert("Signup Successful! Redirecting to Moodify...");
                window.location.href = "indexm.php";
            } else {
                alert("Please fill out all fields.");
            }
        });
    }
});
        function selectMood(mood) {
            selectedMood = mood;
        }
        function submitMood() {
            if (selectedMood) {
                window.location.href = `3content.html?mood=${selectedMood}`;
            } else {
                alert("Please select a mood first!");
            }
        }
const params = new URLSearchParams(window.location.search);
const mood = params.get("mood");
const moodData = {
    happy: {
        title: "You're Feeling Happy! 😊",
        description: "Enjoy some cheerful content!.",
        image: "https://th.bing.com/th/id/R.1c05de0609916e40f72cdc9669ee4d09?rik=%2f%2f1f3nZ5GJrdjQ&riu=http%3a%2f%2fweknowyourdreams.com%2fimages%2fhappy%2fhappy-06.jpg&ehk=eCiuP1pMTtYeV2q8MpK3C5Vm0l2ValarKRDdIfZzjpY%3d&risl=&pid=ImgRaw&r=0",
        quotes: [
            "Happiness is not something ready-made. It comes from your own actions. – Dalai Lama",
            "The purpose of our lives is to be happy. – Dalai Lama",
            "Do more of what makes you happy!"
        ],
        spotify: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0",
        activities: [
            "Take a walk in nature 🍃",
            "Write a gratitude journal ✍️",
            "Watch a feel-good movie 🎬"
        ]
    },
    sad: {
        title: "Feeling a Bit Down? 😢",
        image: "https://wonderfulengineering.com/wp-content/uploads/2016/03/Sad-Wallpaper-28.jpeg",
        description: "Here's something comforting.",
        quotes: [
            "Tough times never last, but tough people do. – Robert H. Schuller",
            "You are stronger than you think. – Unknown",
            "This too shall pass. – Persian Proverb"
        ],
        spotify: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1",
        activities: [
            "Listen to soothing music 🎵",
            "Try deep breathing exercises 🧘",
            "Talk to a friend 💬"
        ]
    },
    motivated: {
        title: "Let's Get Inspired! 💪",
        description: "You’re motivated!",
        image: "https://images.inc.com/uploaded_files/image/1920x1080/getty_497567776_358131.jpg",
        quotes: [
            "The only way to do great work is to love what you do. – Steve Jobs",
            "Dream big and dare to fail. – Norman Vaughan",
            "Push yourself, because no one else will do it for you."
        ],
        spotify: "https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP",
        activities: [
            "Write down your goals 📝",
            "Exercise or do yoga 💪",
            "Read an inspiring book 📖"
        ]
    },
    relaxed: {
        title: "Time to Unwind 🧘",
        description: "Relax with calming music, meditation, or peaceful scenery.",
        image: "https://th.bing.com/th/id/R.68d713ce3b62debd5d947d50733ccc5c?rik=CzNUnlgO%2b1TUTg&riu=http%3a%2f%2fwww.wellawareness.com.au%2fwp-content%2fuploads%2f2016%2f01%2f6-HOUR-Meditation-Music-Relax-Mind-Body-Inner-Peace-Relaxing-Music-Calming-Music-Soothing-172A.jpg&ehk=GhvaHlV6PH3rMIX9U4D%2f%2bSTyx0lD3Dm7%2fFZoAZV7GuY%3d&risl=&pid=ImgRaw&r=0",
        quotes: [
            "Almost everything will work again if you unplug it for a few minutes, including you. – Anne Lamott",
            "Relax, refresh, recharge. – Unknown",
            "Don't stress over things you can't control."
        ],
        spotify: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY",
        activities: [
            "Try guided meditation 🧘",
            "Read a book in a cozy spot 📚",
            "Take a warm bath 🛁"
        ]
    }
};
if (moodData[mood]) {
    document.getElementById("mood-title").innerText = moodData[mood].title;
    document.getElementById("mood-description").innerText = moodData[mood].description;
    document.getElementById("mood-image").src = moodData[mood].image;
    let quotesSection = document.getElementById("quotes-section");
    moodData[mood].quotes.forEach(quote => {
        let p = document.createElement("p");
        p.classList.add("quote");
        p.innerText = `"${quote}"`;
        quotesSection.appendChild(p);
    });
    let spotifyFrame = document.getElementById("spotify-frame");
    spotifyFrame.src = moodData[mood].spotify;
    let activitiesList = document.getElementById("activities-list");
    moodData[mood].activities.forEach(activity => {
        let li = document.createElement("li");
        li.innerText = activity;
        activitiesList.appendChild(li);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();  
        let valid = true;
        let errorMessage = "";
        const name = document.getElementById('name').value.trim();
        if (name === "") {
            valid = false;
            errorMessage += "Name is required.\n";
        }
        const regNo = document.getElementById('regNo').value.trim();
        const regNoPattern = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/; 
        if (!regNoPattern.test(regNo)) {
            valid = false;
            errorMessage += "Registration Number must be in the format: 23BCS0054.\n";
        }
        const year = document.getElementById('year').value;
        if (year === "") {
            valid = false;
            errorMessage += "Please select your year.\n";
        }
        const email = document.getElementById('email').value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            valid = false;
            errorMessage += "Please enter a valid email address.\n";
        }
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            valid = false;
            errorMessage += "Please select your gender.\n";
        }
        const hobbies = Array.from(document.querySelectorAll('input[name="hobby[]"]:checked'));
        if (hobbies.length === 0) {
            valid = false;
            errorMessage += "Please select at least one hobby.\n";
        } 
        if (valid) {
            alert("Form submitted successfully! 🎉");
            form.removeEventListener('submit', arguments.callee); 
            form.submit();  
        } else {
            alert(errorMessage);
        }
    });
});
