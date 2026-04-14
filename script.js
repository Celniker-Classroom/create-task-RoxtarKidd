let playerName = null

// Validate name input in real-time
document.getElementById("name").addEventListener("input", function() {
    playerName = this.value.trim();
    if (playerName === "") {
        nameBtn.disabled = true;
    } else {
        nameBtn.disabled = false;
    }
});
document.getElementById("nameBtn").addEventListener("click", function() {
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
    document.getElementById("header").textContent = playerName + "'s Adventure";
    document.getElementById("nameBtn").disabled = true;
    document.getElementById("name").disabled = true;
    document.getElementById("storyTxt").textContent = "Welcome, " + playerName + "! Click the Start button to begin your story!";
});

document.getElementById("startBtn").addEventListener("click", function() {
    document.getElementById("storyTxt").textContent = "Your adventure begins now. You find yourself in a mysterious forest. Do you want to go left or right?";
    document.getElementById("c1").textContent = "Go Left";
    document.getElementById("c2").textContent = "Go Right";
});