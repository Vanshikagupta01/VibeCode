document.getElementById('startVoice').addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
        document.getElementById('codeOutput').value += event.results[0][0].transcript + "\n";
    };
    recognition.start();
});

const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let painting = false;
let color = "#000";
let size = 3;

canvas.width = 800;
canvas.height = 300;

function startPosition(e) {
    painting = true;
    draw(e);
}
function endPosition() {
    painting = false;
    ctx.beginPath();
}
function draw(e) {
    if (!painting) return;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
document.getElementById("clearCanvas").addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));
document.getElementById("colorPicker").addEventListener("change", (e) => color = e.target.value);
document.getElementById("brushSize").addEventListener("input", (e) => size = e.target.value);

document.querySelectorAll('.component').forEach(button => {
    button.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        const div = document.createElement("div");
        if (type === "button") {
            div.innerHTML = "<button class='btn-primary'>Click Me</button>";
        } else if (type === "input") {
            div.innerHTML = "<input type='text' placeholder='Enter text' class='input-field'>";
        } else if (type === "card") {
            div.innerHTML = "<div class='card'><h3>Card Title</h3><p>Card content here...</p></div>";
        }
        document.getElementById("generatedComponents").appendChild(div);
    });
});

document.getElementById('sendChat').addEventListener('click', () => {
    const input = document.getElementById('chatInput').value.toLowerCase();
    const chatBox = document.getElementById('chatBox');
    let response = "I don't have an answer for that.";
    
    const qa = {
        "what is the difference between synchronous and asynchronous programming?": "Synchronous programming executes line by line, while asynchronous allows tasks to run in parallel without blocking execution.",
        "how does the event loop work in javascript?": "The event loop allows JavaScript to handle asynchronous operations by managing the call stack and callback queue.",
        "what are the key features of react.js?": "React.js offers component-based architecture, virtual DOM, hooks, and state management for building efficient UIs.",
        "explain the concept of closures in javascript.": "A closure is a function that retains access to its outer scope variables even after the outer function has finished execution.",
        "how does a database index improve performance?": "A database index speeds up query performance by organizing data efficiently, reducing the need for full table scans."
    };
    
    if (qa[input]) {
        response = qa[input];
    }
    
    chatBox.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
    chatBox.innerHTML += `<p><strong>ChatGPT:</strong> ${response}</p>`;
    document.getElementById('chatInput').value = '';
});

document.getElementById("get-started").addEventListener("click", function() {
    alert("Welcome to Drawify Soundspace!");
});

document.querySelectorAll(".explore-btn").forEach(button => {
    button.addEventListener("click", function() {
        alert("Feature coming soon!");
    });
});
document.getElementById("spotifyLoginBtn").addEventListener("click", () => {
    // Redirect to Spotify Authorization URL
    const clientId = "YOUR_SPOTIFY_CLIENT_ID";
    const redirectUri = "http://localhost:5500"; // Change this to your hosted domain
    const scope = "user-read-private user-read-email user-modify-playback-state user-read-playback-state";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".feature-card").forEach(card => {
        card.addEventListener("click", function () {
            const link = this.getAttribute("data-link");
            if (link) {
                window.location.href = link;
            }
        });
    });
});
