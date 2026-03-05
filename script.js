const circle = document.getElementById('circle');
const scoreboard = document.getElementById('scoreboard');

let score = 0; // Initial score
const circleRadius = 50; // Radius of the circle in pixels
const avoidanceDistance = 100; // Distance to avoid the mouse

// Initialize random position
circle.style.top = `${Math.random() * (window.innerHeight - circleRadius)}px`;
circle.style.left = `${Math.random() * (window.innerWidth - circleRadius)}px`;

// Move the circle to a random position
function moveCircleRandomly() {
    const randomX = Math.random() * (window.innerWidth - circleRadius);
    const randomY = Math.random() * (window.innerHeight - circleRadius);
    circle.style.top = `${randomY}px`;
    circle.style.left = `${randomX}px`;
}

// Check if the mouse is near the circle and move it
function avoidMouse(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Get the circle's position
    const rect = circle.getBoundingClientRect();
    const circleX = rect.left + rect.width / 2;
    const circleY = rect.top + rect.height / 2;

    // Calculate the distance between the mouse and the circle's center
    const distance = Math.hypot(mouseX - circleX, mouseY - circleY);

    // If the mouse is too close, move the circle away
    if (distance < avoidanceDistance) {
        const angle = Math.atan2(circleY - mouseY, circleX - mouseX);

        // New position based on the angle to move the circle away
        let newX = circleX + Math.cos(angle) * avoidanceDistance;
        let newY = circleY + Math.sin(angle) * avoidanceDistance;

        // Ensure the circle stays within bounds
        newX = Math.min(Math.max(newX, circleRadius), window.innerWidth - circleRadius);
        newY = Math.min(Math.max(newY, circleRadius), window.innerHeight - circleRadius);

        circle.style.left = `${newX - circleRadius / 2}px`;
        circle.style.top = `${newY - circleRadius / 2}px`;

        // Add a "thinking" effect to indicate the circle is reacting
        circle.classList.add('thinking');
        setTimeout(() => circle.classList.remove('thinking'), 200);
    }
}

// Update the scoreboard when the circle is clicked
circle.addEventListener('click', () => {
    score += 10; // Add 10 points
    scoreboard.textContent = `Score: ${score}`; // Update the scoreboard

    // Move the circle to a random position after being caught
    moveCircleRandomly();
});

// Make the circle move randomly every 3 seconds
setInterval(moveCircleRandomly, 3000);

// Event listener for mouse movement
document.addEventListener('mousemove', avoidMouse);
