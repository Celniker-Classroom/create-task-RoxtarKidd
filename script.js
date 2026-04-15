let playerName = null;
let choice = 0;
let actions = []; 
let inventory = [];
let nagging = null;
i = 0;

let waterChestItems = ["Water Staff", "Mermaid's Tear", "Aqua Shield", "Tidal Wave Amulet", "Coral Crown"];
let fireChestItems = ["Flaming Sword", "Phoenix Feather", "Dragon Scale Armor", "Fire Gem", "Lava Boots"];

function chest() {
    // Change button text to represent the chest interaction
    document.getElementById("c1").textContent = "Open the Chest";
    document.getElementById("c2").textContent = "Leave it Alone";

    // Set up the "Open" button (c1)
    document.getElementById("c1").onclick = function() {
        let item;
        if (choice === "water") {
            item = waterChestItems[Math.floor(Math.random() * waterChestItems.length)];
        } else if (choice === "fire") {
            item = fireChestItems[Math.floor(Math.random() * fireChestItems.length)];
        }
        
        actions.push("Opened the Chest and found " + item);
        document.getElementById("yourActions").textContent = actions.join(", ");
        inventory.push(item);
        document.getElementById("inventory").textContent = inventory.join(", ");
        document.getElementById("storyTxt").textContent = "You opened the chest and found: " + item + "! Your adventure will continue soon...";

    };

    document.getElementById("c2").onclick = function() {
    
    for (let i = 0; i < 3; i++) {
        if (i === 0) {
            nagging = "Nah, you should open it! ";
        }
        if (i === 1) {
            nagging = "Are you sure?";
        }
        else if (i > 1) {
            nagging = "Are you sure? "+ "x" + i;
        }
        document.getElementById("storyTxt").textContent = nagging;
    }
    
    document.getElementById("storyTxt").textContent = nagging;
    actions.push("Tried to leave, but was nagged");
    document.getElementById("yourActions").textContent = actions.join(", ");
document.getElementById("c1").disabled = true;
document.getElementById("c2").disabled = true;
};
}

// Name Logic
document.getElementById("name").addEventListener("input", function() {
    playerName = this.value.trim();
    document.getElementById("nameBtn").disabled = (playerName === "");
});

document.getElementById("nameBtn").addEventListener("click", function() {
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
    document.getElementById("header").textContent = playerName + "'s Adventure";
    document.getElementById("yourActions").textContent = actions.join(", ");
    document.getElementById("nameBtn").disabled = true;
    document.getElementById("name").disabled = true;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("storyTxt").textContent = "Welcome, " + playerName + "! Click the Start button to begin!";
});

// Start Logic
document.getElementById("startBtn").addEventListener("click", function() {
    document.getElementById("c1").disabled = false;
    document.getElementById("c2").disabled = false;
    document.getElementById("storyTxt").textContent = "You find yourself in a forest. Go left or right?";
    document.getElementById("c1").textContent = "Go Left";
    document.getElementById("c2").textContent = "Go Right";
    document.getElementById("startBtn").disabled = true;
});

// Movement Logic (Moved outside the 'if' statement)
document.getElementById("c1").addEventListener("click", function() {
    if (this.textContent === "Go Left") {
        actions.push("Went Left");
        document.getElementById("storyTxt").textContent = "You entered Atlantis. Oh look, a chest!";
        choice = "water";
        chest();
    }
});

document.getElementById("c2").addEventListener("click", function() {
    if (this.textContent === "Go Right") {
        actions.push("Went Right");
        document.getElementById("storyTxt").textContent = "You entered a fiery cave. Oh look, a chest!";
        choice = "fire";
        chest();
    }
});
