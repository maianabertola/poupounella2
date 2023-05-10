<h1>1. Poupounella</h1>

<article> Join Poupounella, a determined ballerina, on her quest to reach Galala, the grandest ballet of the year.
Help her collect Cloudollars and overcome monsters along the way. Will you fulfill Poupounella's dream?
Embark on this enchanting adventure now!</article>
<br>
<h1>2. Project Description</h1>
<article>This project was created as part of a school assignment to develop a video game using JavaScript, CSS, and HTML. The goal was to create an interactive game where a player character named Poupounella can navigate an area to collect points while avoiding or fighting enemies.</article>
<br>
<h1>3. Gameplay Overview</h1>
<article>Poupounella is the main character controlled by the player.
   The player can move Poupounella within the game area using keyboard inputs.
   Poupounella's objective is to collect points scattered throughout the area.
   However, enemies pose a threat to Poupounella's progress. The player must avoid them or engage in combat by pressing the spacebar at the right moment.
   The game features a scoring system that tracks the player's progress in collecting points</article>
   <br>

<h1>4. Learning Focus</h1>
<article>The primary objective of this project was to gain a deeper understanding of using classes, extending classes, and managing game logic with intervals in JavaScript. By developing this game, I aimed to enhance my knowledge of object-oriented programming concepts and the practical implementation of game mechanics.</article>
<br>
<h1>5. Biggest Challenges and Highlights</h1>
<article>My biggest challenge was effectively writing a game class that encompassed all the game animations, while coordinating the interactions between various classes such as the player, enemies, and points. Tracking their positions and movements and triggering corresponding functions for attacking enemies, gaining points, or losing the game proved to be a significant hurdle. However, I thoroughly enjoyed the process of utilizing and understanding how to extend classes. This allowed me to avoid repeating myself and save lines of code, leading to more efficient and maintainable code structure.</article>
<br>

```javascript
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
    gameAerea.append(div);
    return div;
  }

  move() {
    super.move;
    this.x -= this.speed;
    this.setPosition();
  }
}
```

Another aspect I loved was utilizing the DOM to dynamically update the score every time points were gained. Implementing a game-over popup, although still a work in progress, provided a rewarding experience as well. These features added depth and interactivity to the game, enhancing the overall player experience.

```javascript
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
```

<h1>5. Project Assessment</h1>
<article>While the aesthetic design of the game may not be visually appealing, the focus was primarily on the underlying JavaScript logic. I'm quite satisfied with the logical structure of the JavaScript code because, it WORKS. But I hope I will have time to improve the aestetic and also implement new features.</article>
<br>
<h1>6. How to play</h1>
<article>Launch the Game: Click the "Start" button to begin playing this masterpiece.</article>
<br>

**Control Poupounella:**
Use the arrow keys (up, down, left, and right) on your keyboard to move Poupounella in four directions: up, down, left, and right.
Navigate Poupounella through the game area to collect points.

**Engage in Combat:**
Press the spacebar on your keyboard to attack enemies.
Time your attacks correctly to make the enemies disappear.

**Avoid Enemies:**
Be careful! Avoid colliding with enemies, as they can hinder Poupounella's progress.

**Score Points:**
Collect as many points as possible to increase your score.
The more points you collect, the higher your score will be.

<h1>7. Thank you note</h1>
<article>Special thanks to my teachers and classmates for their unwavering support and motivation throughout the development of this game.</article>
<br>
<h1>8. About me</h1>
<article>I'm learning web development since april 2023. Previously, I worked as a senior consultant in digital marketing, specializing in brand and communication strategy for start-ups and large companies. My work involved creating websites for clients, where I handled UX writing, UX design, and project leadership.</article>
   <br>
<article>I decided to embrace a new chapter in my life and took on the exciting challenge of learning web development and expanding my skill set. Although I am still at the beginning of my journey, I am determined to continue improving my skills and staying motivated.</article>
<br>
   
<article>Feel free to explore my portfolio at www.we-are-ensemble.com to get a glimpse of my projects and witness my progress as a web developer.</article>
