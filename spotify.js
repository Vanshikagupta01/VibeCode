document.getElementById("spotifyLoginBtn").addEventListener("click", () => {
    // Redirect to Spotify Authorization URL
    const clientId = "YOUR_SPOTIFY_CLIENT_ID"; // Replace with your Spotify Client ID
    const redirectUri = "http://localhost:5500/spotify.html"; // Update for production
    const scope = "user-read-private user-read-email user-modify-playback-state user-read-playback-state";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
});

// Function to get the token from URL after redirect
function getTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get("access_token");
}

// Store token for API calls
const accessToken = getTokenFromUrl();
if (accessToken) {
    localStorage.setItem("spotify_access_token", accessToken);
}
