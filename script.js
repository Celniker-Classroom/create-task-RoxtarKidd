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
let victoryLeft = false;
let victoryRight = false;

let lastChestType = null;

const buttonSound = new Audio('sound/start-game.mp3');
const forestSound = new Audio('sound/forest.mp3');
const fireSound = new Audio('sound/fire.mp3');
const waterSound = new Audio('sound/atlantis.mp3');
const waterDragonSound = new Audio('sound/waterDragonMusic.mp3');
const fireDragonSound = new Audio('sound/fireDragonMusic.mp3');
const chestSound = new Audio('sound/chest.mp3');
const victorySound = new Audio('sound/victory.mp3');
const menuMusic = new Audio('sound/Menu.mp3');
const ultVictory = new Audio('sound/ultimateVictory.mp3')
let menuMusicStarted = false;

restartGameFlow();

/* ---------------- CHEST ---------------- */

function chest(type) {
    lastChestType = type;

    buttonSound.play();
    let { c1, c2 } = resetButtons();

    let isOpened = (type === "water") ? waterChestOpened : fireChestOpened;

    c1.textContent = "Open the Chest";
    c2.textContent = isOpened ? "Continue Your Journey!" : "Leave it Alone";

    let chestItemsReceived =
        type === "water" ? waterChestItemsReceived : fireChestItemsReceived;

    c1.addEventListener("click", function () {
        chestSound.play();
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
            state = "leftAlone"
            setupInitialChoices();
            return;
        }

        state = "afterChest";

        let chestName = type.charAt(0).toUpperCase() + type.slice(1);

        area2(chestName);
    });
}

/* ---------------- FOREST ----------------
This sets up the "Go Left" and "Go Right" choices in the forest area, and depending on the state of the story,
the storyTxt will be different.*/

function setupInitialChoices() {
    if (state !== "forest" && state !== "leftAlone") return;

    let { c1, c2 } = resetButtons();

    c1.textContent = "Go Left";
    c2.textContent = "Go Right";

    if (state === "leftAlone") {
        let chestName = lastChestType === "water" ? "Water" : "Fire";

        document.getElementById("storyTxt").textContent =
            "You left the " + chestName + " Chest and returned to the forest.";
    }

    else if (!victoryLeft && !victoryRight) {
        document.getElementById("storyTxt").textContent =
            "You find yourself in a mysterious forest. Two paths lie ahead. Which way do you go?";
    }

    else if (victoryLeft && !victoryRight) {
        document.getElementById("storyTxt").textContent =
            "You beat the Water Dragon and ran back to the forest. Go right?";
    }

    else if (!victoryLeft && victoryRight) {
        document.getElementById("storyTxt").textContent =
            "You beat the Fire Dragon and ran back to the forest. Go Left?";
    }

    if (victoryLeft) {
        c1.textContent = "Water Dragon Defeated";
        c1.disabled = true;
    }
    
    if (victoryRight) {
        c2.textContent = "Fire Dragon Defeated";
        c2.disabled = true;
    }

    c1.addEventListener("click", function () {
        if (state !== "forest" && state !== "leftAlone") return;

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
        c1.disabled = false;
        c2.disabled = false;
        state = "waterChest";
        chest("water");
    });

    c2.addEventListener("click", function () {
        if (state !== "forest" && state !== "leftAlone") return;

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
        c1.disabled = false;
        c2.disabled = false;
        state = "fireChest";
        chest("fire");
    });
}

/* ---------------- GAME FLOW ---------------- 
This is the function that is called when the start button is hit.*/


function startGameFlow() {
    document.getElementById("restartBtn").disabled = false;
    document.getElementById("startBtn").disabled = true;
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

// This is the function that is called when the player hits the restart button.
function restartGameFlow() {
    victoryLeft = false;
    victoryRight = false;
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

    document.body.style.backgroundImage = "url('image/CYOA-Background.jpg')";
    document.body.style.backgroundSize = "cover";

    document.getElementById("header").textContent = "Enter your name here.";

    let nameInput = document.getElementById("name");
    let nameBtn = document.getElementById("nameBtn");
    let startBtn = document.getElementById("startBtn");
    let restartBtn = document.getElementById("restartBtn");

    nameInput.value = "";
    nameInput.disabled = false;

    nameBtn.disabled = true;
    startBtn.disabled = true;
    restartBtn.disabled = true;
}

/* ---------------- UI ---------------- 
Nothing will happen until the player types something. Then the music will start playing and the "Save Name"
button becomes enabled.*/

document.getElementById("name").addEventListener("input", function () {
    playerName = this.value.trim();
    document.getElementById("nameBtn").disabled = (playerName === "");

    if (!menuMusicStarted && playerName.length > 0) {
        menuMusicStarted = true;

        menuMusic.loop = true;
        menuMusic.volume = 0.5;
        menuMusic.play();
    }
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

/* ---------------- DRAGON ---------------- 
This is the function that is called when the player continues their journey. There is a water dragon to fight
as well as a fire dragon.*/

function area2(dragonType) {
    stopAllSounds();

    let { c1, c2 } = resetButtons();

    c1.disabled = false;
    c2.disabled = false;

    if (dragonType === "Water") {
        document.body.style.backgroundImage = "url('image/waterDragon.jpg')";
        waterDragonSound.loop = true;
        waterDragonSound.volume = 0.5;
        waterDragonSound.play();
    } else {
        document.body.style.backgroundImage = "url('image/fireDragon.jpg')";
        fireDragonSound.loop = true;
        fireDragonSound.volume = 0.5;
        fireDragonSound.play();
    }

    document.getElementById("storyTxt").textContent =
        "You encounter a fierce " + dragonType + " Dragon!";

    c1.textContent = "Fight Him!";
    c2.textContent = "Run Away!";

    c1.addEventListener("click", function () {

        victorySound.play();

        actions.push("You fought the Dragon and won!");
        document.getElementById("yourActions").textContent = actions.join(", ");

        stopAllSounds();

        state = "forest";

        document.body.style.backgroundImage = "url('image/forest.jpg')";
        document.body.style.backgroundSize = "100% 100%";

        forestSound.loop = true;
        forestSound.volume = 0.5;
        forestSound.play();

        document.getElementById("storyTxt").textContent =
            "You ran back into the forest...";

        if (dragonType === "Water") {
            victoryLeft = true;
        } else {
            victoryRight = true;
        }

        setupInitialChoices();

        if (victoryLeft && victoryRight) {
            gameOver();
        }
    });

    c2.addEventListener("click", function () {
        actions.push("Tried to leave but couldn't.");
        document.getElementById("yourActions").textContent = actions.join(", ");
    });
}

/* ---------------- HELPERS ---------------- */

function stopAllSounds() {
    [fireSound, waterSound, forestSound, waterDragonSound, fireDragonSound, menuMusic].forEach(s => {
        s.pause();
        s.currentTime = 0;
    });
}
//This will reset all buttons so no duplicate event listeners are made.
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
//When the player defeats both dragons, this function is called.
function gameOver() {
    stopAllSounds();
    ultVictory.play();
    document.body.style.backgroundImage = "url('image/victory.jpg')";
    document.body.style.backgroundSize = "cover";

    document.getElementById("storyTxt").textContent =
        "You have defeated both dragons and achieved ultimate victory!";

    document.getElementById("yourActions").textContent =
        actions.join(", ");

    document.getElementById("inventory").textContent =
        inventory.join(", ");

    let { c1, c2 } = resetButtons();

    c1.textContent = "Victory Achieved!";
    c2.textContent = "Victory Achieved!";
    c1.disabled = true;
    c2.disabled = true;
    document.body.style.backgroundImage = "url('image/CYOA-Background.jpg')";
    document.body.style.backgroundSize = "cover";
    nameInput.value = "";
    nameInput.disabled = false;
}