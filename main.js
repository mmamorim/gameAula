
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let plataformas;
let boneco, inimigo;
let cursors;

function preload() {

    this.load.image('fundo', './assets/space3.png');
    this.load.image('plataforma', './assets/plataforma.png');
    this.load.spritesheet('dude',
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('dudeInimigo',
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

}

function create() {

    this.add.image(400, 300, 'fundo');
    boneco = this.physics.add.sprite(100, 50, 'dude');
    inimigo = this.physics.add.sprite(600, 50, 'dude');

    plataformas = this.physics.add.staticGroup();
    plataformas.create(100, 400, 'plataforma');
    plataformas.create(600, 300, 'plataforma');
    plataformas.create(100, 200, 'plataforma');

    boneco.setBounce(0.2);
    boneco.setCollideWorldBounds(true);
    this.physics.add.collider(boneco, plataformas);

    inimigo.setBounce(0.2);
    inimigo.setCollideWorldBounds(true);
    this.physics.add.collider(inimigo, plataformas);

    this.physics.add.collider(inimigo, boneco);

    this.anims.create({
        key: 'esquerda',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'parado',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'direita',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    inimigo.setVelocityX(-160);
    inimigo.anims.play('esquerda', true);

    cursors = this.input.keyboard.createCursorKeys();

}

function update() {

    if(inimigo.body.x < 400) {
        inimigo.setVelocityX(160);
        inimigo.anims.play('direita', true);
    } else {
        if(inimigo.body.x > 600) {
            inimigo.anims.play('esquerda', true);
            inimigo.setVelocityX(-160);
        }
    }

    if (cursors.left.isDown) {
        boneco.setVelocityX(-260);
        boneco.anims.play('esquerda', true);
    }
    else if (cursors.right.isDown) {
        boneco.setVelocityX(260);
        boneco.anims.play('direita', true);
    }
    else {
        boneco.setVelocityX(0);
        boneco.anims.play('parado');
    }

    if (cursors.up.isDown && boneco.body.touching.down) {
        boneco.setVelocityY(-530);
    }

}