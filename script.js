let playerName = null;
let actions = [];
let inventory = [];
let chestItemsReceived = [];
let waterChestItems = ["Water Staff", "Mermaid's Tear", "Aqua Shield", "Tidal Wave Amulet", "Coral Crown"];
let fireChestItems = ["Flaming Sword", "Phoenix Feather", "Dragon's Breath Potion", "Fire Gem", "Lava Boots"];
let chestTypes = ["water", "fire"];
let chestType = null;

function setupInitialChoices() {
    let c1 = document.getElementById("c1");
    let c2 = document.getElementById("c2");

    c1.addEventListener("click", function handleLeft() {
        if (this.textContent === "Go Left") {
            actions.push("Went Left");
            document.getElementById("storyTxt").textContent = "You entered Atlantis. Oh look, a chest!";
            chest("water");
        }
    });

    c2.addEventListener("click", function handleRight() {
        if (this.textContent === "Go Right") {
            actions.push("Went Right");
            document.getElementById("storyTxt").textContent = "You entered the Underworld. Oh look, a chest!";
            chest("fire");
        }
    });
}

function startGameFlow() {
    document.getElementById("storyTxt").textContent = "You find yourself in a forest. Go left or right?";
    document.getElementById("yourActions").textContent = "Your Actions will appear here...";
    document.getElementById("inventory").textContent = "Your Inventory will appear here...";

    let c1 = document.getElementById("c1");
    let c2 = document.getElementById("c2");

    c1.replaceWith(c1.cloneNode(true));
    c2.replaceWith(c2.cloneNode(true));
    

    c1 = document.getElementById("c1");
    c2 = document.getElementById("c2");
    c1.disabled = false;
    c2.disabled = false;
    c1.textContent = "Go Left";
    c2.textContent = "Go Right";

    document.getElementById("startBtn").disabled = true;

    setupInitialChoices();
}

function chest(type) {
    chestItemsReceived = [];
    let c1 = document.getElementById("c1");
    let c2 = document.getElementById("c2");

    c1.replaceWith(c1.cloneNode(true));
    c2.replaceWith(c2.cloneNode(true));
    c1 = document.getElementById("c1");
    c2 = document.getElementById("c2");

    c1.textContent = "Open the Chest";
    c2.textContent = "Leave it Alone";

    c1.addEventListener("click", function () {
        let chestItems = type === "water" ? [...waterChestItems] : [...fireChestItems];

        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * chestItems.length);
            let item = chestItems[randomIndex];
            if (i === 2) {
                chestItemsReceived.push("and " + item);
            } else {
                chestItemsReceived.push(item);
            }
            inventory.push(item);
            chestItems.splice(randomIndex, 1);
        }

        let chestName = type === "water" ? "Water" : "Fire";
        actions.push("Opened the " + chestName + " Chest and found " + chestItemsReceived.join(", "));

        document.getElementById("yourActions").textContent = actions.join(", ");
        document.getElementById("storyTxt").textContent =
            "You opened the chest and found " + chestItemsReceived.join(", ") + "! Your adventure will continue soon...";
        document.getElementById("inventory").textContent = inventory.join(", ");

        c1.disabled = true;
        c2.disabled = true;
        c1.textContent = "Coming Soon";
        c2.textContent = "Coming Soon";
        document.getElementById("restartBtn").disabled = false;
    });

    c2.addEventListener("click", function () {
        actions.push("Left the Chest Alone");
        document.getElementById("yourActions").textContent = actions.join(", ");
        document.getElementById("storyTxt").textContent =
            "You decided to leave the chest alone. Your adventure will continue soon...";

        c1.disabled = true;
        c2.disabled = true;
        c1.textContent = "Coming Soon";
        c2.textContent = "Coming Soon";
        document.getElementById("restartBtn").disabled = false;
    });

}

document.getElementById("name").addEventListener("input", function () {
    playerName = this.value.trim();
    document.getElementById("nameBtn").disabled = (playerName === "");
});

document.getElementById("nameBtn").addEventListener("click", function () {
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
    document.getElementById("header").textContent = playerName + "'s Adventure";
    document.getElementById("nameBtn").disabled = true;
    document.getElementById("name").disabled = true;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("storyTxt").textContent = "Welcome, " + playerName + "! Click the Start button to begin!";
});


document.getElementById("startBtn").addEventListener("click", function () {
    startGameFlow();
});


document.getElementById("restartBtn").addEventListener("click", function () {

    actions = [];
    inventory = [];
    chestItemsReceived = [];
    chestType = null;


    document.getElementById("header").textContent = playerName + "'s Adventure";
    document.getElementById("yourActions").textContent = "";
    document.getElementById("inventory").textContent = "";

    startGameFlow();
    document.getElementById("restartBtn").disabled = true;
});


