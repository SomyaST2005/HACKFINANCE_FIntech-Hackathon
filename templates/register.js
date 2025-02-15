document.addEventListener("DOMContentLoaded", function () {
    const chooseFace = document.getElementById("chooseFace");
    const chooseFingerprint = document.getElementById("chooseFingerprint");
    const faceSection = document.getElementById("faceSection");
    const fingerprintSection = document.getElementById("fingerprintSection");
    const captureFace = document.getElementById("captureFace");
    const scanFingerprint = document.getElementById("scanFingerprint");
    const registerButton = document.getElementById("register");
    const statusMessage = document.getElementById("status");
    let biometricType = null;

    // Face Recognition Setup
    chooseFace.addEventListener("click", function () {
        biometricType = "Face";
        faceSection.classList.remove("hidden");
        fingerprintSection.classList.add("hidden");

        // Start Camera for Face Recognition
        const video = document.getElementById("faceCam");
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error("Camera access denied: ", err);
                alert("Camera access is required for face recognition.");
            });
    });

    // Fingerprint Setup
    chooseFingerprint.addEventListener("click", function () {
        biometricType = "Fingerprint";
        fingerprintSection.classList.remove("hidden");
        faceSection.classList.add("hidden");
    });

    // Capture Face (Simulated for Now)
    captureFace.addEventListener("click", function () {
        statusMessage.textContent = "Face Captured Successfully!";
        statusMessage.style.color = "lightgreen";
    });

    // Scan Fingerprint (Simulated for Now)
    scanFingerprint.addEventListener("click", function () {
        statusMessage.textContent = "Fingerprint Captured Successfully!";
        statusMessage.style.color = "lightgreen";
    });

    // Register User
    registerButton.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!name || !email || !username || !password || !biometricType) {
            statusMessage.textContent = "All fields and biometric selection are required!";
            statusMessage.style.color = "red";
            return;
        }

        // Simulating Backend API Call (Send Data to Backend Later)
        const userData = {
            name,
            email,
            username,
            password,
            biometricType,
        };

        console.log("User Registered:", userData);
        statusMessage.textContent = "Registration Successful! Redirecting to login...";
        statusMessage.style.color = "lightgreen";

        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to login page
        }, 2000);
    });
});