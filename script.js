let playerName = null;
let choice = 0;
let actions = []; 
let inventory = [];
let nagging = null;
chestItemsReceieved = [];

let waterChestItems = ["Water Staff", "Mermaid's Tear", "Aqua Shield", "Tidal Wave Amulet", "Coral Crown"];
let fireChestItems = ["Flaming Sword", "Phoenix Feather", "Dragon Scale Armor", "Fire Gem", "Lava Boots"];

function chest() {
    
    if (choice === "water" || choice === "fire") {

        document.getElementById("c1").textContent = "Open the Chest";
        document.getElementById("c2").textContent = "Leave it Alone";
    
    document.getElementById("c1").addEventListener("click", function() {
        let item;
        if (choice === "water") {
            for (i=0; i<3; i++) {
            item = waterChestItems[Math.floor(Math.random() * waterChestItems.length)];
                if (i === 2) {
                chestItemsReceieved.push("and " + item);
                }
                else {
                chestItemsReceieved.push(item);
                }
                inventory.push(item);
                sliceIndex = waterChestItems.indexOf(item);
                waterChestItems.splice(sliceIndex, 1);
            }
            choice  = null;
            document.getElementById("c1").disabled = true;
            document.getElementById("c2").disabled = true;
            document.getElementById("c1").textContent = "Coming Soon";
            document.getElementById("c2").textContent = "Coming Soon";
            actions.push("Opened the Water Chest and found " + chestItemsReceieved.join(", "));
        }
        else if (choice === "fire") {
            for (i=0; i<3; i++) {
            item = fireChestItems[Math.floor(Math.random() * fireChestItems.length)];
                if (i === 2) {
                chestItemsReceieved.push("and " + item);
                }
                else {
                chestItemsReceieved.push(item);
                }
                inventory.push(item);
                sliceIndex = fireChestItems.indexOf(item);
                fireChestItems.splice(sliceIndex, 1);
            }
            choice = null;
            document.getElementById("c1").disabled = true;
            document.getElementById("c2").disabled = true;
            document.getElementById("c1").textContent = "Coming Soon";
            document.getElementById("c2").textContent = "Coming Soon";
            actions.push("Opened the Fire Chest and found " + chestItemsReceieved.join(", "));
        }
        
        document.getElementById("yourActions").textContent = actions.join(", ");
        document.getElementById("storyTxt").textContent = "You opened the chest and found " + chestItemsReceieved.join(", ") + "! Your adventure will continue soon...";
        document.getElementById("inventory").textContent = inventory.join(", ");


    });

    }

    document.getElementById("c2").addEventListener("click", function() {
    
        actions.push("Left the Chest Alone");
        document.getElementById("yourActions").textContent = actions.join(", ");
        document.getElementById("storyTxt").textContent = "You decided to leave the chest alone. Your adventure will continue soon...";
        document.getElementById("c1").disabled = true;
        document.getElementById("c2").disabled = true;
        document.getElementById("c1").textContent = "Coming Soon";
        document.getElementById("c2").textContent = "Coming Soon";
    });

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
