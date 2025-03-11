const startupLines = document.querySelectorAll('.startup-line');
const startupContainer = document.getElementById('startup-container');
const typingSound = new Audio('kb_sounds.mp3'); // Load typing sound
typingSound.volume = 0.3; // Adjust volume if needed

let lineIndex = 0;
let charIndex = 0;
let originalText = [];

// Store the original text of each line
startupLines.forEach(line => {
    originalText.push(line.textContent);
    line.textContent = ''; // Clear the text initially
});

// Function to play the typing sound
function playTypingSound() {
    typingSound.currentTime = 0; // Reset audio to start
    typingSound.play();
}

// Function to stop the typing sound
function stopTypingSound() {
    typingSound.pause();
    typingSound.currentTime = 0; // Reset sound to avoid looping
}


function typeWriter() {
    if (lineIndex < startupLines.length) {
        const currentLine = startupLines[lineIndex];
        const text = originalText[lineIndex];

        // Stop typing sound if it's the "System Time" or "System Date" lines
        if (text.startsWith("System Time") || text.startsWith("System Date")) {
            stopTypingSound();
        } else {
            playTypingSound(); // Play sound for normal lines
        }

        currentLine.textContent = text.substring(0, charIndex + 1);

        if (charIndex < text.length) {
            charIndex++;
            setTimeout(typeWriter, 30); // Adjust speed (lower is faster)
        } else {
            charIndex = 0;
            lineIndex++;
            if (lineIndex === startupLines.length) {
                stopTypingSound(); // Ensure sound stops at the end
                setTimeout(fadeOut, 2000); // Delay 2 seconds after last line
            } else {
                setTimeout(typeWriter, 200);
            }
        }
    }
}




function fadeOut() {
    startupContainer.style.transition = 'opacity 2s';
    startupContainer.style.opacity = '0';
    setTimeout(() => {
        startupContainer.style.display = 'none';
        displayCyberOS(); // Display Cyber-OS after fade-out
    }, 2000);
}




function displayCyberOS() {
    const cyberOSDisplay = document.createElement('div');
    cyberOSDisplay.id = 'cyber-os-display';
    cyberOSDisplay.textContent = 'CYBER-OS';
    document.body.appendChild(cyberOSDisplay);

    // Get the glitch sound element and lower the volume
    const glitchSound = document.getElementById('glitch-sound');
    glitchSound.volume = 0.5; // Set volume to 20% (adjust as needed)

    setTimeout(() => {
        cyberOSDisplay.style.opacity = 1;

        setTimeout(() => {
            glitchSound.currentTime = 0; // Reset to start
            glitchSound.play(); // Play glitch sound
            
            cyberOSDisplay.classList.add('glitch-effect');

            setTimeout(() => {
                cyberOSDisplay.classList.remove('glitch-effect');
                cyberOSDisplay.style.opacity = 0;

                setTimeout(() => {
                    cyberOSDisplay.style.display = 'none';
                    window.location.href = "https://justzaixz.github.io/Cyber_Terminal_2/"; //I will change this later to the next website. The Second Terminal.
                }, 2000);
            }, 2000);

        }, 1000);
    }, 10);
}




function updateDateTime() {
    var currentdate = new Date();
    var dateString = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
    var timeString = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    const timeElement = Array.from(startupLines).find(line => line.textContent.startsWith("System Time:"));
    const dateElement = Array.from(startupLines).find(line => line.textContent.startsWith("System Date:"));

    if (timeElement) {
        timeElement.textContent = "System Time: " + timeString;
    }
    if (dateElement) {
        dateElement.textContent = "System Date: " + dateString;
    }
}




// Start typing animation
typeWriter();
updateDateTime();
setInterval(updateDateTime, 1000);
