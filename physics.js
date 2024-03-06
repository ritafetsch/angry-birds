////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
// Update and draw ground according to values defined in ground setup 
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}

////////////////////////////////////////////////////////////////
function setupPropeller(){
  propeller = Bodies.rectangle(150,480,200,15, {isStatic: true, angle:  angle});
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;

  push();
  fill(255);
  drawVertices(propeller.vertices);
  pop();
 
  
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
  
  
}

////////////////////////////////////////////////////////////////
// Update and draw birds
function drawBirds(){
  push();
  for (var i = 0; i < birds.length; i++) {
    drawVertices(birds[i].vertices);

    // Remove birds from array when off screen
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i]);
      birds.splice(i,1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  for (var x = 775; x < width; x += 80  ) {
    for (var y = 0; y < height-150 ; y += 80) {
      var box = Bodies.rectangle(x , y, 80, 80,);
      colors.push(random(255));
      World.add(engine.world, [box]);
      boxes.push(box);

    }
  }
  
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  for (var i = 0; i < boxes.length; i++) {
    fill(0,colors[i],0);
    drawVertices(boxes[i].vertices);
  }

  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  slingshotBird = Bodies.circle(250, 190, 20, {friction: 0, restitution: 0.95 });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  
  slingshotConstraint = Constraint.create({
    pointA: { x: 250, y:150 },
    bodyB: slingshotBird, 
    pointB: {x: 0, y:0},
    stiffness: 0.01,
    damping: 0.0001

  });
  

  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  fill(255);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
