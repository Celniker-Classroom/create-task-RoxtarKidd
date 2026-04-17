let playerName = null;
let actions = []; 
let inventory = [];
let chestItemsReceived = [];

let chestTypes = ["water", "fire"];
let chestType = null;

let waterChestItems = ["Water Staff", "Mermaid's Tear", "Aqua Shield", "Tidal Wave Amulet", "Coral Crown"];
let fireChestItems = ["Flaming Sword", "Phoenix Feather", "Dragon Scale Armor", "Fire Gem", "Lava Boots"];

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

        let chestItems;

        if (type === "water") {
        chestItems = [...waterChestItems];
        }

        else {
        chestItems = [...fireChestItems];
        }

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

        let chestName;
        if (type === "water") {
            chestName = "Water";
        } else {
            chestName = "Fire";
        }

        actions.push("Opened the " + chestName + " Chest and found " + chestItemsReceived.join(", "));

        document.getElementById("yourActions").textContent = actions.join(", ");
        document.getElementById("storyTxt").textContent =
        "You opened the chest and found " + chestItemsReceived.join(", ") + "! Your adventure will continue soon...";
        document.getElementById("inventory").textContent = inventory.join(", ");

        c1.disabled = true;
        c2.disabled = true;
        c1.textContent = "Coming Soon";
        c2.textContent = "Coming Soon";
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
    });
}


document.getElementById("name").addEventListener("input", function () {
    playerName = this.value.trim();
    document.getElementById("nameBtn").disabled = (playerName === "");
});

document.getElementById("nameBtn").addEventListener("click", function () {
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

    document.getElementById("header").textContent = playerName + "'s Adventure";
    document.getElementById("yourActions").textContent = actions.join(", ");

    document.getElementById("nameBtn").disabled = true;
    document.getElementById("name").disabled = true;
    document.getElementById("startBtn").disabled = false;

    document.getElementById("storyTxt").textContent =
        "Welcome, " + playerName + "! Click the Start button to begin!";
});

document.getElementById("startBtn").addEventListener("click", function () {
    document.getElementById("c1").disabled = false;
    document.getElementById("c2").disabled = false;

    document.getElementById("storyTxt").textContent =
        "You find yourself in a forest. Go left or right?";

    document.getElementById("c1").textContent = "Go Left";
    document.getElementById("c2").textContent = "Go Right";

    document.getElementById("startBtn").disabled = true;
});

document.getElementById("c1").addEventListener("click", function () {
    if (this.textContent === "Go Left") {
        actions.push("Went Left");

        document.getElementById("storyTxt").textContent =
            "You entered Atlantis. Oh look, a chest!";

        chestType = chestTypes[0];
        chest(chestType);
    }
});

document.getElementById("c2").addEventListener("click", function () {
    if (this.textContent === "Go Right") {
        actions.push("Went Right");

        document.getElementById("storyTxt").textContent =
            "You entered the Underworld. Oh look, a chest!";

        chestType = chestTypes[1];
        chest(chestType);
    }
});