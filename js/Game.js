class Game {
  constructor() { }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();
    car1 = createSprite(width / 2 - 50, height - 100, 10, 10)
    car1.addImage(car1_img)
    car1.scale = 0.07

    car2 = createSprite(width / 2 + 140, height - 100, 10, 10)
    car2.addImage(car2_img)
    car2.scale = 0.07
    cars = [car1, car2]
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }
  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10
      player.update();
    }
  }

  play() {
    this.handleElements()
    Player.getPlayersInfo()
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6)
      var index = 0;
      for (var plr in allPlayers) {
        index = index + 1
        var x = allPlayers[plr].positionX
        var y = height - allPlayers[plr].positionY
        cars[index - 1].position.x = x
        cars[index - 1].position.y = y


        if (index === player.index) {
          stroke(10)
          fill("red")
          ellipse(x, y, 60, 60)
          camera.position.x = cars[index - 1].positionX
          camera.position.y = cars[index - 1].positionY
        }
      }
    
    this.handlePlayerControls();
    drawSprites()
    }
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    })
  }
}
