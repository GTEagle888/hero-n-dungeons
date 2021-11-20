function nextLevel () {
    scene.setTileMap(maps[currentLevel])
    scene.placeOnRandomTile(hero, 7)
    for(let index = 0; index <3; index++) {
        let enemy = sprites.create(enemyImgs[currentLevel], SpriteKind.Enemy)
        scene.placeOnRandomTile(enemy, 1)
        enemy.setFlag(SpriteFlag.BounceOnWall, true)
        enemy.setVelocity(20, 20)
        let enemyLife = enemyLifePoints[currentLevel]
        sprites.setDataNumber(enemy, "life", 3)
    }
    currentLevel = currentLevel + 1
}
scene.onHitTile(SpriteKind.Player, 5, function (sprite) {
    game.over(true)
})
scene.onHitTile(SpriteKind.Player, 2, function (sprite) {
    nextLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (Player, enemy) {
    info.changeLifeBy(-1)
    enemy.destroy()
    
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (Proj, enemy) {
   enemy.startEffect(effects.fire,200);
    info.changeScoreBy(1);

    Proj.destroy()

    let enemyLife= sprites.readDataNumber(enemy, "life") -1

    if(enemyLife == 0){
        enemy.destroy()
       
}else{
        sprites.setDataNumber(enemy, "life" , enemyLife)

        enemy.sayText(enemyLife+"/3", 200)
    } 
})
let facing = "left"
controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    hero.setImage(img`
        . . . . . . . . . . . . . . . .
        . . . . . f f f f f f . . . . .
        . . . . f 2 f e e e e f f . . .
        . . . f 2 2 2 f e e e e f f . .
        . . . f e e e e f f e e e f . .
        . . f e 2 2 2 2 e e f f f f . .
        . . f 2 e f f f f 2 2 2 e f . .
        . . f f f e e e f f f f f f f .
        . . f e e 4 4 f b e 4 4 e f f .
        . . f f e d d f 1 4 d 4 e e f .
        . f d d f d d d d 4 e e e f . .
        . f b b f e e e 4 e e f . . . .
        . f b b e d d 4 2 2 2 f . . . .
        . . f b e d d e 4 4 4 f f . . .
        . . . f f e e f f f f f f . . .
        . . . . f f f . . . f f . . . .
    `)
    facing = "left"
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    hero.setImage(img`
        . . . . . . . . . . . . . . . .
        . . . . . f f f f f f . . . . .
        . . . f f e e e e f 2 f . . . .
        . . f f e e e e f 2 2 2 f . . .
        . . f e e e f f e e e e f . . .
        . . f f f f e e 2 2 2 2 e f . .
        . . f e 2 2 2 f f f f e 2 f . .
        . f f f f f f f e e e f f f . .
        . f f e 4 4 e b f 4 4 e e f . .
        . f e e 4 d 4 1 f d d e f f . .
        . . f e e e 4 d d d d f d d f .
        . . . . f e e 4 e e e f b b f .
        . . . . f 2 2 2 4 d d e b b f .
        . . . f f 4 4 4 e d d e b f . .
        . . . f f f f f f e e f f . . .
        . . . . f f . . . f f f . . . .
    `)
    facing = "right"
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    hero.setImage(img`
        . . . . . . . . . . . . . . . .
        . . . . . . f f f f . . . . . .
        . . . . f f e e e e f f . . . .
        . . . f e e e f f e e e f . . .
        . . . f f f f 2 2 f f f f . . .
        . . f f e 2 e 2 2 e 2 e f f . .
        . . f e 2 f 2 f f f 2 f e f . .
        . . f f f 2 f e e 2 2 f f f . .
        . . f e 2 f f e e 2 f e e f . .
        . f f e f f e e e f e e e f f .
        . f f e e e e e e e e e e f f .
        . . . f e e e e e e e e f . . .
        . . . e f f f f f f f f 4 e . .
        . . . 4 f 2 2 2 2 2 e d d 4 . .
        . . . e f f f f f f e e 4 . . .
        . . . . f f f . . . . . . . . .
    `)
    facing = "up"
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    hero.setImage(img`
        . . . . . . . . . . . . . . . .
        . . . . . . f f f f . . . . . .
        . . . . f f f 2 2 f f f . . . .
        . . . f f f 2 2 2 2 f f f . . .
        . . f f f e e e e e e f f f . .
        . . f e e 2 2 2 2 2 2 e f f . .
        . f f e 2 f f f f f f 2 e f f .
        . f f f f f e e e e f f f f f .
        . . f e f b f 4 4 f b f e f . .
        . . f e 4 1 f d d f 1 4 e f . .
        . . e f f f f d d d 4 e f . . .
        . . f d d d d f 2 2 2 f e f . .
        . . f b b b b f 2 2 2 f 4 e . .
        . . f b b b b f 5 4 4 f . . . .
        . . . f c c f f f f f f . . . .
        . . . . f f . . . f f f . . . .
    `)
    facing = "down"
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    let Proj = img`
        . . . . . . . . . . . . . . . .
        2 . . . . . . . . . . . . . . .
        2 4 2 . . . . . . . . . . . . .
        4 4 4 2 . . . . . . . . . . . .
        4 4 4 2 5 5 5 5 5 5 5 5 5 5 5 .
        4 4 4 4 5 5 5 5 5 5 5 5 5 5 5 .
        4 4 4 4 2 5 5 5 5 5 5 5 5 . . .
        4 4 4 2 2 . . . . . . . . . . .
        2 2 2 2 . . . . . . . . . . . .
        . . . 2 . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    let p: Image = null
    let vx = 0;
    let vy = 0;
    if(facing == "left"){
        p = Proj.rotated(180)
        vx = -100
    }
    if (facing == "right") {
        p = Proj
        vx = 100
    }  
    if(facing == "up"){
        p = Proj.rotated(-90)
        vy = -100
      }
    if (facing == "down") {
        p = Proj.rotated(90)
        vy = 100
    }  
  let projectile = sprites.createProjectileFromSprite(Proj, hero, vx, vy)
})

let currentLevel = 0
let maps: Image[] = []
let hero: Sprite = null
hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . f f f f f f . . . . . 
    . . . . f 2 f e e e e f f . . . 
    . . . f 2 2 2 f e e e e f f . . 
    . . . f e e e e f f e e e f . . 
    . . f e 2 2 2 2 e e f f f f . . 
    . . f 2 e f f f f 2 2 2 e f . . 
    . . f f f e e e f f f f f f f . 
    . . f e e 4 4 f b e 4 4 e f f . 
    . . f f e d d f 1 4 d 4 e e f . 
    . f d d f d d d d 4 e e e f . . 
    . f b b f e e e 4 e e f . . . . 
    . f b b e d d 4 2 2 2 f . . . . 
    . . f b e d d e 4 4 4 f f . . . 
    . . . f f e e f f f f f f . . . 
    . . . . f f f . . . f f . . . . 
    `, SpriteKind.Player)
controller.moveSprite(hero)
scene.cameraFollowSprite(hero)
scene.setTile(15, img`
    . . . . . c c b b b . . . . . . 
    . . . . c b d d d d b . . . . . 
    . . . . c d d d d d d b b . . . 
    . . . . c d d d d d d d d b . . 
    . . . c b b d d d d d d d b . . 
    . . . c b b d d d d d d d b . . 
    . c c c c b b b b d d d b b b . 
    . c d d b c b b b b b b b b d b 
    c b b d d d b b b b b d d b d b 
    c c b b d d d d d d d b b b d c 
    c b c c c b b b b b b b d d c c 
    c c b b c c c c b d d d b c c b 
    . c c c c c c c c c c c b b b b 
    . . c c c c c b b b b b b b c . 
    . . . . . . c c b b b b c c . . 
    . . . . . . . . c c c c . . . . 
    `, true)
scene.setTile(14, img`
    . . b d b . . . . . b b b b . . 
    . c b d d b . . . b b d d d b . 
    . b c c b . . . b c d d d d b . 
    . . . . . . b b c c b d b b b . 
    . . . . . b d d b c c b b b c . 
    . . b b b c d d b b c c c c . . 
    . b d d d b c b b c . . . . . . 
    c b d d d d c c c c . b b b . . 
    c c b b b b c c c . b d d d b . 
    . c c c b b . . b c b b d d b b 
    . b b . . . . . b c c b b b b . 
    b d d b b . . . . . c c c b . . 
    b b d d b c . . b b b b b b b . 
    . b c c c b . b d d d b b c b . 
    . . . . . . b d d d b c c b . . 
    . . . . . . b b b c c c b . . . 
    `, true)
scene.setTile(1, img`
    d d d d d d d d d d d d d d d d 
    d d d 1 1 d d d d d d d d b d d 
    d d d 1 1 d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d b d d d d d d b b d d d d d 
    d d d d d d d d d b b d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d b d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    1 1 d d d d d d d d d d d d d d 
    1 1 d d d d d d d d d d b d d d 
    d d d d d d 1 d d d d d d d d d 
    d d d d d d d d d d d d d d d d 
    d d d d d d d d d d d d d d b d 
    `, false)
scene.setTileMap(img`
    f f f e f f f f e f 
    f 1 1 1 1 1 1 1 1 f 
    e 1 1 1 1 1 1 1 1 e 
    7 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 e 
    f 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 2 f 
    `)
scene.setTile(2, img`
    c c c c c c c c c c c c c c c c 
    c c c c c c c c c c c b b b b c 
    c c c c c c c c c c c b b b b c 
    c c c c c c c c c c c b b b b c 
    c c c c c c b b b b c b b b b c 
    c c c c c c b b b b c b b b b c 
    c c c c c c b b b b c b b b b c 
    c c c c c c b b b b c b b b b c 
    c b b b b c b b b b c b b b b c 
    c b b b b c b b b b c d d d d c 
    c b b b b c b b b b b b b b b c 
    c b b b b c d d d d b b b b b c 
    c b b b b c b b b b b b b b b c 
    c b b b b b b b b b b b b b b c 
    c d d d d b b b b b b b b b b c 
    c b b b b b b b b b b b b b b c 
    `, true)
scene.setTile(7, img`
    d d d d d d d d d d d d d d b c 
    d d d d d d d d d d d d d d b c 
    c c b c c b c c b c c b c c b c 
    c b d c b d c b d c b d c b d c 
    c b d c b d c b d c b d c b d c 
    c b d c b d c b d c b d c b d c 
    c b d c b d c b d c b d c b d c 
    c b d c b d c b d c b d c b d c 
    c b d c b d c b d c b d c b d c 
    c b d c b d c b d c b d c b d c 
    c b d c b d c b d c b d c b d c 
    c b d c b d c b d c b d c b d c 
    c b d c b d c b d c b d c b d c 
    c c b c c b c c b c c b c c b c 
    d d d d d d d d d d d d d d b c 
    d d d d d d d d d d d d d d b c 
    `, false)
scene.setTile(5, img`
    . . b b b b b b b b b b b b . . 
    . b e 4 4 4 4 4 4 4 4 4 4 e b . 
    b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
    b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
    b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
    b e e 4 4 4 4 4 4 4 4 4 4 e e b 
    b e e e e e e e e e e e e e e b 
    b e e e e e e e e e e e e e e b 
    b b b b b b b d d b b b b b b b 
    c b b b b b b c c b b b b b b c 
    c c c c c c b c c b c c c c c c 
    b e e e e e c b b c e e e e e b 
    b e e e e e e e e e e e e e e b 
    b c e e e e e e e e e e e e c b 
    b b b b b b b b b b b b b b b b 
    . b b . . . . . . . . . . b b . 
    `, true)
maps = [img`
    1 1 1 1 1 1 e e 1 1 1 1 1 1 1 1 
    7 1 1 1 1 1 1 1 1 1 1 1 e 1 1 1 
    1 1 1 1 1 1 e e 1 1 1 1 e 1 1 1 
    1 1 e 1 1 1 1 e 1 1 f 1 e 1 1 1 
    1 1 e 1 1 f 1 e e 1 1 f 1 1 1 1 
    1 1 1 1 1 f f 1 1 1 1 f 1 1 1 1 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    f 1 1 1 1 e e e 1 1 1 1 1 e 1 1 
    1 1 1 e 1 1 1 e e 1 1 f 1 e 1 1 
    1 1 e e 1 1 1 1 1 1 1 f 1 1 1 1 
    1 e e 1 1 1 1 1 1 1 1 f 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 e e 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 e 1 1 
    1 1 1 1 1 1 1 1 1 f f 1 1 1 1 1 
    1 f f f f f 1 f f 1 1 1 5 1 1 1 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
let enemyImgs = [img`
    . . f f f . . . . . . . . f f f
    . f f c c . . . . . . f c b b c
    f f c c . . . . . . f c b b c .
    f c f c . . . . . . f b c c c .
    f f f c c . c c . f c b b c c .
    f f c 3 c c 3 c c f b c b b c .
    f f b 3 b c 3 b c f b c c b c .
    . c 1 b b b 1 b c b b c c c . .
    . c 1 b b b 1 b b c c c c . . .
    c b b b b b b b b b c c . . . .
    c b 1 f f 1 c b b b b f . . . .
    f f 1 f f 1 f b b b b f c . . .
    f f 2 2 2 2 f b b b b f c c . .
    . f 2 2 2 2 b b b b c f . . . .
    . . f b b b b b b c f . . . . .
    . . . f f f f f f f . . . . . .
`, img`
    . . . . f f f f f . . .
    . . f f e e e e e f . .
    . f f e e e e e e e f .
    f f f f e e e e e e e f
    f f f f f e e e 4 e e f
    f f f f e e e 4 4 e e f
    f f f f 4 4 4 4 4 e f f
    f f 4 e 4 f f 4 4 e f f
    . f 4 d 4 d d d d f f .
    . f f f 4 d d b b f . .
    . . f e e 4 4 4 e f . .
    . . 4 d d e 1 1 1 f . .
    . . e d d e 1 1 1 f . .
    . . f e e f 6 6 6 f . .
    . . . f f f f f f . . .
    . . . . f f f . . . . .
`, img`
    ........................bbbbbbbbbbbbbbbbbbb..................................
    ......................bbb5555555555555555bbbbb...............................
    .....................bb5555555555555555555555bbb......bbc....................
    ....................bb5555555555555555555555555bbb..cbbcc....................
    ...................bb5555555555555555555555555555bccbbccc....................
    ...................b5555555555555555555555555555555ccccc.....................
    ..................bb555b555555555bd55555555555555555cccc.....................
    ..................b5555b555555555bb555555555555555555ccc.....................
    ..................c555555555555555555555555bccc5555555cc.....ccc.............
    ..................c55555bccccc5555555555555ccc1c5555555ccccccbbc.............
    ..................c5555bccccccccb5555555555dcbbc55555555cccbbbcc.............
    ..................c555bddcccccccccb1555555555555555555555ccbccc..............
    ..................c555bcdcccccccccc11b55555555555555555555ccccc..............
    ...................c55ccbcccccccccc11cc5555555555555555555dcccc..............
    ...................c55ccccccccccccc1bccb1555555bb5555555555dcc...............
    ....................c5cccccccccccccccccb1155555b55555555555dcc...............
    ....................c55ccccccccccccccccc1bccccb555555555555ddc...............
    .....................c55cccccccccccccccccccccc555555555555dddccccbbc.........
    ......................c55ccccccb333cc333bcccc555555555555555ddccbbcc.........
    ......................cc55dccc3333bc333333ccb555555555555555ddcccccc.........
    .......................cc555c33333b3333333cc555555555555555dddccccc..........
    ........................ccb533333b33333333c5555555555555555d55dcccc..........
    .........................cb533333b3333333b55d55555555555555555dcccc..........
    .........................cd533333b33b133b55dd5555555555555555dddccc..........
    .................cccc....c5513333333b11355dd55555555555555ddddddcc...........
    ................c55bcc...c5513333333b1155dd5555555555555555dddddcc...........
    ................c55bbc...c5533333333b555dd55555555555555555ddddddccc.........
    ..............ccc55bddc..cb553133133555dd555555555cccc5555dddddddcccccc......
    .............c55bb5bdddc..c55513313555dd5555555555c55ccccddddddddcccccc......
    .............c55dbbbdddcc..cd5555555dbdd5555555555cb5555ccccdddddccccc.......
    .............c555bddbbb5c..cbbbbbbbbbddd5555555ccccbb55bb5dbcddddbccc........
    ..............bbbbddb555ccccddbbbbbddddd5555555c55ccbbbb5555bcddddcc.........
    .............cdd555b555bdbb5dddddddddddd5555555bb5555db5555555cdddc..........
    ...........ccbbb555bbbb5dbb5ddddddddddd555555555bb55ddbccbb555ccddcc.........
    ...........c555bb5555555bb555dddddddddd5555555555bc5ddddddbb555cdddcc........
    ...........c5555b5555555b5555ddddddddd555555555555c55dddbbbb555cbdddc........
    ............cbbb555555dbb555555dddddd5555555555555cc5ddbb5555555bbbddc.......
    .............cbb55555ddb555555555555555555555555555c55db55555555dbbbdcc......
    ..............cccddddddb555555555555555555555555555cc555bbb555555dddddc......
    ................ccddddb55555555555555555555555555555c55555dd555555ddddc......
    .................cddddb5555555555555555555555555555dcc5555dd5555555dddc......
    ..cc.............ccddbd555555555555555555555555555d5dc555dd55555555dddc......
    ..c5bb............ccdbd5555555555555555555555555555ddcc555555555555dddc......
    ..c55b.............ccbd555555555555555555555555555ddddc555555555555ddcc......
    ..cb5bb.............cbdd5555555555555555555555555d5dddcc5555555555dddcc......
    ..cb55b..............cdd555555555555555555555555d55ddddccc5555555dddcc.......
    ..cb55b..............cddd555555555555555555d555d55dddddddccc555ddddcc........
    ..c555b..............cdd55555dd555555555555555dddddddddddddcccccccccc........
    .cb555bb.............cbdd5555dd5555555555555dddddddddddddddddddddddccc.......
    .cb555bb............ccbddd5d55555555dd55555555dddddddddddddddddddddcccc......
    .c55555b...........cccbbddddddd555555555ddd55dddddddddddddddddddddbccc.......
    cb55555b..........cccbbbbdddd55ddd5555ddddddddddddddddddddddddddddbcc........
    cb55555b........bccbbbd5555dd555dd5555d55ddddddddddddddddd55ddddbbbc.........
    c5555555bb....bbbddbb5555555ddddddddddd55dddddddddddddddd55ddddddbbc.........
    c55555555bbbbbbddddc555555555dddddddddddddddddddddddddddd5dd5555ddbc.........
    cd5555555555ddddddc5555555555ddddddddddddddddddddddddddddd55555555dc.........
    cd5555555555dddddcc5555555555dddddddddddddddddddddddddd55d555555555cc........
    cdd55555555ddddddc55555555555dddddddddddddddddddddddddd5555555555555c........
    cddd555555ddddddcc5555555555ddddddddddddddddddddddddddddd55555555555cc.......
    ccddddddddddddddc55555555555ddddddddddddddddddddddddddddd555555555555c.......
    .cddddddddddddddc555555555555dddddddddddddddddddddddddddd555555555555c.......
    .ccddddddddddddcc555555555555ddddddddddddddddddbddddddddd555555555555cc......
    ..ccdddddddddddcc5555555dd55dddddddddddddddddddbdddddddd5d555555555555c......
    ...ccddddddddddccd5555dddddddddddddbbddddddddddbddddddddd5555555555555c......
    ....cccddddddddcddddddddddddddddddbbddddddddddbbbdddddddddd55555555555c......
    ......cccdddddccdddddddddddddddddccccccccccccbbbbddddddddddd555555555dc......
    ........cccccccdddddddddddddddddccc........ccccbbbdddddddddddd5555555dcc.....
    ............ccc555555dddddddddccc.............cccbddddddddddddd55555ddccc....
    .............c55555555ddddddccc..................ccdddddddddddddddddddccc....
    ...........ccdddccd555dddccccc....................ccdddddddddddd5555555dc....
    ..........ccdddccdddddcddcc........................cccddddddddd55555555dcc...
    ..........ccdddcdddccccddc...........................ccccccdddd555ddddccddcc.
    ..........ccccccddcccccdcc...............................ccddddddccddddccddcc
    ...............cdc.....ccc................................cccccdddccddddcddcc
    ...............cc...........................................ccccdddccccdccccc
    ...............................................................ccccc..ccc....
`]

let enemyLifePoints = [3,5,7]
