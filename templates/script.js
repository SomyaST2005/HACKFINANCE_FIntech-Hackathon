document.addEventListener("DOMContentLoaded", function () {
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const chooseFaceBtn = document.getElementById("chooseFace");
    const chooseFingerprintBtn = document.getElementById("chooseFingerprint");
    const faceSection = document.getElementById("faceSection");
    const fingerprintSection = document.getElementById("fingerprintSection");
    const faceCam = document.getElementById("faceCam");
    const captureFaceBtn = document.getElementById("captureFace");
    const scanFingerprintBtn = document.getElementById("scanFingerprint");
    const loginBtn = document.getElementById("login");
    const statusText = document.getElementById("status");

    let faceCaptured = false;
    let fingerprintCaptured = false;
    let selectedMethod = null;

    // User chooses Face Authentication
    chooseFaceBtn.addEventListener("click", () => {
        selectedMethod = "face";
        faceSection.classList.remove("hidden");
        fingerprintSection.classList.add("hidden");
        statusText.textContent = "Face authentication selected.";
    });

    // User chooses Fingerprint Authentication
    chooseFingerprintBtn.addEventListener("click", () => {
        selectedMethod = "fingerprint";
        fingerprintSection.classList.remove("hidden");
        faceSection.classList.add("hidden");
        statusText.textContent = "Fingerprint authentication selected.";
    });

    // Face Authentication (To be integrated with OpenCV later)
    captureFaceBtn.addEventListener("click", async () => {
        if (selectedMethod !== "face") return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            faceCam.srcObject = stream;
            faceCam.play();
            faceCaptured = true;
            statusText.textContent = "Face scanned successfully!";
        } catch (error) {
            console.error("Camera access error:", error);
            statusText.textContent = "Error accessing camera!";
        }
    });

    // Fingerprint Authentication (To be integrated with OpenCV later)
    scanFingerprintBtn.addEventListener("click", () => {
        if (selectedMethod !== "fingerprint") return;

        fingerprintCaptured = true;
        statusText.textContent = "Fingerprint scanned successfully!";
    });

    // Login Logic
    loginBtn.addEventListener("click", async () => {
        const username = usernameField.value;
        const password = passwordField.value;

        if (!username || !password) {
            statusText.textContent = "Username & Password are required!";
            return;
        }

        if (selectedMethod === "face" && !faceCaptured) {
            statusText.textContent = "Please complete Face scan!";
            return;
        }

        if (selectedMethod === "fingerprint" && !fingerprintCaptured) {
            statusText.textContent = "Please complete Fingerprint scan!";
            return;
        }

        // Send login + biometric data to backend
        const response = await fetch("http://localhost:5000/verify-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, selectedMethod, faceCaptured, fingerprintCaptured })
        });

        const result = await response.json();
        statusText.textContent = result.message;
    });
});
