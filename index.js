//GLOBAL ELEMENTS

//Intro Game
const introScreenContainer = document.getElementById("introContainer");
const theBtnStart = document.getElementById("btnStart");
const theBtnRules = document.getElementById("btnRules");

//Rules Screen
const rulesScreen = document.getElementById("rulesScreen");
let faq = document.getElementsByClassName("faq-page");
let i;
for (i = 0; i < faq.length; i++) {
  faq[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let body = this.nextElementSibling;
    if (body.style.display === "block") {
      body.style.display = "none";
    } else {
      body.style.display = "block";
    }
  });
}
const thebtnBack = document.getElementById("btnBack");

//Game Screen
let gameScreen = document.getElementById("gameScreen");
let gameArea = document.getElementById("gameArea");
// let h1Score = document.getElementById("h1score");
// let gameBorders = gameArea.getBoundingClientRect(); // Assign the value to gameBorders here

//GameOver Screen
const gameOverDiv = document.getElementById("gameOver");

//my counter
let mycounter = document.querySelector("#myCounter span");
let counter = 0;

//Fire events when everything is fully loaded
window.addEventListener("DOMContentLoaded", function () {
  theBtnStart.addEventListener("click", displayGameScreen);
  theBtnRules.addEventListener("click", displayRules);
  thebtnBack.addEventListener("click", hideRules);
});

//Pressed Keys
const pressedKeys = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false,
};

function displayRules() {
  rulesScreen.classList.remove("hidden");
  rulesScreen.classList.add("visible");
}

function hideRules() {
  rulesScreen.classList.remove("visible");
  rulesScreen.classList.add("hidden");
}

function displayGameScreen() {
  introScreenContainer.classList.remove("visible");
  introScreenContainer.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  gameScreen.classList.add("visible");

  startGame();
}

function startGame() {
  new Game();
}

class Entities {
  constructor(name, speed) {
    this.name = name || "ennemy";
    this.speed = speed || 4;
    this.array = [];
    this.elementBorders;
    this.arrayElementBorders = [];
    this.gameArea = document.getElementById("gameArea");
    console.log(this.gameArea);
    this.element = this.createEntities();
    this.x = gameArea.offsetWidth + gameArea.offsetLeft - 16;
    this.randomYPosition();
  }

  // Create points or enemies
  createEntities() {
    const div = document.createElement("div");
    div.classList.add("entities");
    gameArea.append(div);
    return div;
  }

  isOutOfBound() {
    const entityBounding = this.element.getBoundingClientRect();
    const gameBorders = gameArea.getBoundingClientRect();

    if (entityBounding.left < gameBorders.left) {
      return true;
    }
    return false;
  }

  remove() {
    this.element.remove();
  }

  setPosition() {
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
  }

  move() {
    this.x -= this.speed;
    this.setPosition();
  }
  randomYPosition() {
    const elementBorders = this.element.getBoundingClientRect();
    const maxY = gameBorders.top + elementBorders.height;
    const minY = gameBorders.bottom - 10 - elementBorders.height * 1.2;

    // Random spawn for Y; X remains the same
    this.y = Math.floor(Math.random() * (maxY - minY) + minY);
  }
}

class Points extends Entities {
  constructor(name, speed, life, pointsValue) {
    super(name, speed, life);
    this.pointsValue = pointsValue || 5;
    this.speed = 8;
    // this.goodElement = this.createEntities();
  }

  createEntities() {
    super.createEntities;
    const div = document.createElement("div");
    div.classList.add("points");
    gameArea.append(div);
    return div;
  }

  move() {
    super.move;
    this.x -= this.speed;
    this.setPosition();
  }
}

//the class to build my Player
class Player {
  constructor() {
    this.player = this.createPlayer();
    this.gameArea = document.getElementById("gameArea");
    //console.log(this.gameArea);
    this.gameBorders = gameArea.getBoundingClientRect();
    console.log(this.gameBorders);
    this.playerBorders = this.setPosition();

    console.log("this.player.style.left 2: " + this.player.style.left);
    console.log("this.player.style.bottom 2: " + this.player.style.bottom);
    window.addEventListener("keydown", (e) => this.handlePressedKeys(e)); //create a window event which fires a function; bind this = refers to the Player class
    window.addEventListener("keyup", (e) => this.handleReleasedKeys(e)); //create a window event which fires a function; bind this = refers to the Player class
    this.animate();
    this.speed = 10;

    console.log("this.player.style.left 3: " + this.player.style.left);
    console.log("this.player.style.bottom 3: " + this.player.style.bottom);
    this.attackDamage = 20;
  }

  createPlayer() {
    const div = document.createElement("div");
    div.id = "player";
    gameScreen.appendChild(div);
    return div;
  }

  //Set up the position of my player
  setPosition() {
    //Mark positions to place the player
    const positionX = this.gameBorders.left;
    const positionY = this.gameBorders.top;
    console.log("positionX: " + positionX);
    console.log("positionY: " + positionY);

    //placing my player in the gameArea
    console.log("this.player.style.left: " + this.player.style.left);
    console.log("this.player.style.bottom: " + this.player.style.bottom);
    this.player.style.left = positionX + "px";
    this.player.style.bottom = positionY + "px";
    console.log("this.player.style.left: " + this.player.style.left);
    console.log("this.player.style.bottom: " + this.player.style.bottom);

    return this.player.getBoundingClientRect();
  }

  handlePressedKeys(event) {
    switch (event.code) {
      // event.code // event.code = have the key code of the pressed key
      case "ArrowLeft":
        pressedKeys.left = true;
        break; // left key is pressed
      case "ArrowRight":
        pressedKeys.right = true;
        break; // right key is pressed
      case "ArrowUp":
        pressedKeys.up = true;
        break; // up key is pressed
      case "ArrowDown":
        pressedKeys.down = true;
        break; // down key is pressed
      case "Space":
        pressedKeys.space = true;
    }
    this.animate();
  }

  handleReleasedKeys(event) {
    switch (event.code) {
      // event.code // event.code = have the key code of the pressed key
      case "ArrowLeft":
        pressedKeys.left = false;
        break; // left key is not pressed
      case "ArrowRight":
        pressedKeys.right = false;
        break; // right key is not pressed
      case "ArrowUp":
        pressedKeys.up = false;
        break; // up key is not pressed
      case "ArrowDown":
        pressedKeys.down = false;
        break; // down key is not pressed
      case "Space":
        pressedKeys.space = false;
    }
    this.animate();
  }

  animate() {
    if (
      pressedKeys.left === true &&
      this.playerBorders.left > this.gameBorders.left + 10
    ) {
      this.move("left");
    }

    if (
      pressedKeys.right === true &&
      this.playerBorders.right < this.gameBorders.right - 10
    ) {
      this.move("right");
    }

    if (pressedKeys.down === true && this.playerBorders.y > 44) {
      this.move("down");
    }

    if (pressedKeys.up === true && this.playerBorders.y < 529) {
      this.move("up");
    }
  }

  move(direction) {
    switch (direction) {
      case "left":
        this.playerBorders.x -= this.speed;
        break;
      case "right":
        this.playerBorders.x += this.speed;
        break;
      case "up":
        this.playerBorders.y += this.speed;
        break;
      case "down":
        this.playerBorders.y -= this.speed;
        break;
    }
    this.player.style.left = this.playerBorders.x + "px"; // style.left and bottom require a string so "px"
    this.player.style.bottom = this.playerBorders.y + "px";
  }
}

class Game {
  constructor() {
    this.player = new Player();
    this.entities = [];
    this.points = [];
    this.dectectionInterval = null;
    this.frames = 0;
    this.animate();
  }

  animate() {
    this.intervalId = setInterval(() => {
      this.frames++;
      if (this.frames % 60 === 0) {
        this.entities.push(new Entities());
        this.points.push(new Points());
      }

      //loopt through array of entities
      let indexToRemove = null;
      this.entities.forEach((entity, index) => {
        entity.move();
        if (entity.isOutOfBound()) {
          entity.remove();
          indexToRemove = index;
        }
        this.checkCollision(entity);
      });
      if (indexToRemove !== null) {
        this.entities.splice(indexToRemove, 1);
      }

      //loop through array of points
      this.points.forEach((point, index) => {
        point.move();
        if (point.isOutOfBound()) {
          point.remove();
          indexToRemove = index;
          this.points.splice(indexToRemove, 1);
          // console.log("APRES", this.points.length);
        }
        this.gainPoint(point);
      });
    }, 1000 / 15);
  }

  checkCollision(entity) {
    const playerBounding = this.player.player.getBoundingClientRect();
    const entityBounding = entity.element.getBoundingClientRect();
    // console.log(entityBounding);

    const isInX =
      entityBounding.left <= playerBounding.right &&
      entityBounding.right >= playerBounding.left;
    const isInY =
      entityBounding.bottom >= playerBounding.top &&
      entityBounding.top <= playerBounding.bottom;

    const inInXExtended =
      entityBounding.left + 32 <= playerBounding.right &&
      entityBounding.right - 32 >= playerBounding.left;

    const inInYExtended =
      entityBounding.bottom + 32 >= playerBounding.top &&
      entityBounding.top - 32 <= playerBounding.bottom;

    if (pressedKeys.space && inInXExtended && inInYExtended) {
      entity.remove();
      let indexRemove = this.entities.indexOf(entity);
      this.entities.slice(indexRemove, 1);
      // console.log(this.entities);
    } else if (isInX && isInY) {
      this.gameOver();
    }
  }

  gainPoint(point) {
    // console.log(point);

    const playerBounding = this.player.player.getBoundingClientRect();
    const pointBounding = point.element.getBoundingClientRect();
    // console.log(pointBounding);

    const pointIsinX =
      pointBounding.left <= playerBounding.right &&
      pointBounding.right >= playerBounding.left;

    const pointIsinY =
      pointBounding.bottom >= playerBounding.top &&
      pointBounding.top <= playerBounding.bottom;

    if (pointIsinX && pointIsinY) {
      const isPoints = point.pointsValue;
      // console.log(isPoints);
      counter += isPoints;
      mycounter.innerHTML = counter;
      // console.log(counter);
    }
  }

  gameOver() {
    // console.log("gameover");
    clearInterval(this.intervalId);
    gameOverDiv.classList.remove("hidden");
    gameOverDiv.classList.add("display");
    let finalCounter = document.querySelector("#gameOver span");
    finalCounter.innerHTML = counter;
  }
}

function animateImage() {
  setInterval(() => {
    let sprite = this.element;
    let currentPositionX = window.getComputedStyle(
      this.element
    ).backgroundPositionX;
    let x = parseInt(currentPositionX);
    x -= 36;
    sprite.style.backgroundPositionX = x + "px";
  }, 125);
}
