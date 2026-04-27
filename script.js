let playerName = null;
let actions = [];
let inventory = [];

let waterChestItems = ["Water Staff", "Mermaid's Tear", "Aqua Shield", "Tidal Wave Amulet", "Coral Crown", "Siren's Song Scroll"];
let fireChestItems = ["Flaming Sword", "Phoenix Feather", "Dragon's Breath Potion", "Fire Gem", "Lava Boots", "Inferno Cloak"];

let waterChestItemsReceived = [];
let fireChestItemsReceived = [];

let waterChestOpened = false;
let fireChestOpened = false;

let state = "start";

const buttonSound = new Audio('sound/start-game.mp3');
const forestSound = new Audio('sound/forest.mp3');
const fireSound = new Audio('sound/fire.mp3');
const waterSound = new Audio('sound/atlantis.mp3');

restartGameFlow();

/* ---------------- CHEST ---------------- */

function chest(type) {
    let { c1, c2 } = resetButtons();

    let isOpened = (type === "water") ? waterChestOpened : fireChestOpened;

    c1.textContent = "Open the Chest";
    c2.textContent = isOpened ? "Continue Your Journey!" : "Leave it Alone";

    buttonSound.play();

    let chestItemsReceived =
        type === "water" ? waterChestItemsReceived : fireChestItemsReceived;

    c1.addEventListener("click", function () {
        c2.textContent = "Continue Your Journey!";
        if ((type === "water" && waterChestOpened) ||
            (type === "fire" && fireChestOpened)) {
            return;
        }

        if (type === "water") {
            waterChestOpened = true;
        } else {
            fireChestOpened = true;
        }

        let chestItems = type === "water"
            ? [...waterChestItems]
            : [...fireChestItems];

        chestItemsReceived.length = 0;

        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * chestItems.length);
            let item = chestItems[randomIndex];

            chestItemsReceived.push(i === 2 ? "and " + item : item);

            inventory.push(item);
            chestItems.splice(randomIndex, 1);
        }

        let chestName = type.charAt(0).toUpperCase() + type.slice(1);

        actions.push("Opened the " + chestName + " Chest and found " + chestItemsReceived.join(", "));
        document.getElementById("yourActions").textContent = actions.join(", ");

        document.getElementById("storyTxt").textContent =
            "You opened the " + chestName + " Chest and found " + chestItemsReceived.join(", ") + "!";

        document.getElementById("inventory").textContent = inventory.join(", ");

        c1.disabled = true;
        c1.textContent = "Already opened!";
    });

    c2.addEventListener("click", function () {

        let openedNow = (type === "water") ? waterChestOpened : fireChestOpened;

        if (!openedNow) {
            state = "forest";

            stopAllSounds();

            document.body.style.backgroundImage = "url('image/forest.jpg')";
            document.body.style.backgroundSize = "100% 100%";

            forestSound.loop = true;
            forestSound.volume = 0.5;
            forestSound.play();

            actions.push("Returned to the forest");
            document.getElementById("yourActions").textContent = actions.join(", ");

            setupInitialChoices();
            return;
        }

        state = "afterChest";

        let chestName = type.charAt(0).toUpperCase() + type.slice(1);

        stopAllSounds();

        area2(chestItemsReceived, chestName);
    });
}

/* ---------------- FOREST ---------------- */

function setupInitialChoices() {
    if (state !== "forest") return;

    let { c1, c2 } = resetButtons();

    document.getElementById("storyTxt").textContent =
        "You find yourself in a mysterious forest. Two paths lie ahead. Which way do you go?";

    c1.textContent = "Go Left";
    c2.textContent = "Go Right";

    c1.addEventListener("click", function () {
        if (state !== "forest") return;

        stopAllSounds();
        actions.push("Went Left");
        document.getElementById("yourActions").textContent = actions.join(", ");

        document.body.style.backgroundImage = "url('image/atlantis.jpg')";
        document.body.style.backgroundSize = "cover";

        document.getElementById("storyTxt").textContent =
            "You entered Atlantis. A glowing chest sits before you...";

        waterSound.loop = true;
        waterSound.volume = 0.25;
        waterSound.play();

        state = "waterChest";
        chest("water");
    });

    c2.addEventListener("click", function () {
        if (state !== "forest") return;

        stopAllSounds();
        actions.push("Went Right");
        document.getElementById("yourActions").textContent = actions.join(", ");

        document.body.style.backgroundImage = "url('image/underworld.jpg')";
        document.body.style.backgroundSize = "cover";

        document.getElementById("storyTxt").textContent =
            "You descended into the Underworld. A burning chest waits...";

        fireSound.loop = true;
        fireSound.volume = 0.5;
        fireSound.play();

        state = "fireChest";
        chest("fire");
    });
}

/* ---------------- GAME FLOW ---------------- */

function startGameFlow() {
    document.getElementById("restartBtn").disabled = false;
    stopAllSounds();

    forestSound.loop = true;
    forestSound.volume = 0.5;
    forestSound.play();

    document.body.style.backgroundImage = "url('image/forest.jpg')";
    document.body.style.backgroundSize = "100% 100%";

    buttonSound.play();

    let { c1, c2 } = resetButtons();

    c1.disabled = false;
    c2.disabled = false;

    c1.textContent = "Go Left";
    c2.textContent = "Go Right";

    state = "forest";
    setupInitialChoices();
}

function restartGameFlow() {
    stopAllSounds();

    document.body.style.backgroundImage = "url('image/CYOA-Background.jpg')";
    document.body.style.backgroundSize = "cover";

    document.getElementById("storyTxt").textContent = "Story text will appear here...";
    document.getElementById("yourActions").textContent = "Your actions will appear here...";
    document.getElementById("inventory").textContent = "Your inventory will appear here...";

    let c1 = document.getElementById("c1");
    let c2 = document.getElementById("c2");

    c1.replaceWith(c1.cloneNode(true));
    c2.replaceWith(c2.cloneNode(true));

    c1 = document.getElementById("c1");
    c2 = document.getElementById("c2");

    c1.disabled = true;
    c2.disabled = true;
    

    c1.textContent = "Choice 1";
    c2.textContent = "Choice 2";

    actions = [];
    inventory = [];
    playerName = null;

    waterChestOpened = false;
    fireChestOpened = false;

    waterChestItemsReceived = [];
    fireChestItemsReceived = [];

    state = "start";

    document.getElementById("name").value = "";
    document.getElementById("name").disabled = false;
    document.getElementById("nameBtn").disabled = true;
    document.getElementById("restartBtn").disabled = true;
}

/* ---------------- UI ---------------- */

document.getElementById("name").addEventListener("input", function () {
    playerName = this.value.trim();
    document.getElementById("nameBtn").disabled = (playerName === "");
});

document.getElementById("nameBtn").addEventListener("click", function () {
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

    document.getElementById("header").textContent = playerName + "'s Adventure";

    document.getElementById("name").disabled = true;
    document.getElementById("nameBtn").disabled = true;
    document.getElementById("startBtn").disabled = false;

    document.getElementById("storyTxt").textContent =
        "Welcome, " + playerName + "! Click Start to begin.";

    buttonSound.play();
});

document.getElementById("startBtn").addEventListener("click", startGameFlow);

document.getElementById("restartBtn").addEventListener("click", restartGameFlow);

/* ---------------- DRAGON ---------------- */

function area2(items, dragonType) {
    let { c1, c2 } = resetButtons();

    document.getElementById("storyTxt").textContent =
        "You encounter a fierce " + dragonType + " Dragon!";

    c1.textContent = "Fight Him!";
    c2.textContent = "Run Away!";

    c1.addEventListener("click", function () {
        actions.push("You fought the Dragon and won!");
        document.getElementById("yourActions").textContent = actions.join(", ");
    });

    c2.addEventListener("click", function () {
        actions.push("Tried to leave but couldn't.");
        document.getElementById("yourActions").textContent = actions.join(", ");
    });
}

/* ---------------- HELPERS ---------------- */

function stopAllSounds() {
    [buttonSound, fireSound, waterSound, forestSound].forEach(s => {
        s.pause();
        s.currentTime = 0;
    });
}

function resetButtons() {
    let oldC1 = document.getElementById("c1");
    let oldC2 = document.getElementById("c2");

    let newC1 = oldC1.cloneNode(true);
    let newC2 = oldC2.cloneNode(true);

    oldC1.replaceWith(newC1);
    oldC2.replaceWith(newC2);

    return {
        c1: document.getElementById("c1"),
        c2: document.getElementById("c2")
    };
}