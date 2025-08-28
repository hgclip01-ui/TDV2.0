"use strict";

class Tower extends Sprite {
    constructor({position = {x: 0, y:0}, imageSrc, towerClass}){
        super({position, imageSrc});
        this.width = 192;
        this.height = 192;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2 - 30
        };
        this.projectiles = [];
        this.target = null;
        this.lastShot = 0;
        this.isGonnaBeDead = false;
        this.towerClass = towerClass;
        this.towerPrice = 5;
        this.incomingDamage = 0;
        this.healthIncrease = 20;
        this.specialButton;
        this.timer = 0;
        this.attackSpeedIncrease = 35;
        this.projectileSpeedIncrease = 0.35;  
        this.counting = true;
        this.specialCost = 200;
        this.speedProjectile = false;
        this.showTowerRange = false;
        
        this.hasExploded = false;
        this.isDisabled = false;

        this.pausedTime = 0;
        this.startTime = 0;

        this.state = "normal";
        this.stateExpiry = 0;

        this.getTowerStats(towerClass);
        if(towerClass !== "SpeedProjectile") this.createSpecial();
        this.prevProjSpeed = this.projectileSpeed;
        this.health = this.maxHealth;
    }

    getTowerStats(towerClass){
        switch(towerClass){
            case "Common":
                this.projectileColor = 'rgb(150, 150, 150)';
                this.attackSpeed = 200;
                this.previousSpeed = this.attackSpeed;
                this.maxHealth = 100;
                this.towerDamage = 5;
                this.radius = 500;
                this.projectileSpeed = 5;
                this.fireRateTime = 5000;
                this.commonActive = false;
                break;
            case "Ice":
                this.projectileColor = 'rgb(50, 170, 255)';
                this.attackSpeed = 230;
                this.previousSpeed = this.attackSpeed;
                this.maxHealth = 100;
                this.towerDamage = 5;
                this.radius = 500;
                this.projectileSpeed = 5;
                this.slowedMS = 1500;
                this.slowedMSIncrease = 250;
                this.icedMS = 3000;
                break;
            case "Lightning":
                this.projectileColor = 'rgb(255, 255, 100)';
                this.attackSpeed = 230;
                this.previousSpeed = this.attackSpeed;
                this.maxHealth = 100;
                this.towerDamage = 5;
                this.radius = 400;
                this.projectileSpeed = 5;
                this.strikedEnemies = 2;
                this.strikeDamage = 1.2;
                break;
            case "Sniper":
                this.projectileColor = 'rgb(100, 255, 100)';
                this.attackSpeed = 400;
                this.previousSpeed = this.attackSpeed;
                this.maxHealth = 100;
                this.towerDamage = 10;
                this.radius = 700;
                this.projectileSpeed = 10;
                break;
            case "Heal":
                this.maxHealth = 300;
                this.specialHealAmount = 70;
                this.towerPrice = 100;
                this.radius = 500;
                break;
            case "AttackBoost":
                this.maxHealth = 300;
                this.boostAttackAmount = 3 * 1000;
                this.attackBoost = false;
                this.towerPrice = 100;
                this.radius = 500;
                break;
            case "SpeedProjectile":
                this.maxHealth = 300;
                this.towerPrice = 100;
                this.radius = 500;
                break;
        }
    }
    
    explode() {
        if(this.hasExploded == true) return;
        this.hasExploded = true;
        layer2Anim.push(new Effect({
            x: this.position.x,
            y: this.position.y
        }, 0, 480, img.explosions, 160, 160, 192, 192, 6, 700));
    }
    
    healthBoostEffect(){
        layer3Anim.push(new Effect({
            x: this.position.x + 10,
            y: this.position.y + 35
        }, 0, 0, img.specialEffects, 100, 100, 40, 40, 4, 1000, 4));
        setTimeout(() =>{
            layer3Anim.splice(layer3Anim.length - 1, 1);
        }, 2 * 1000)
    }

    attackBoostEffect(){
        layer3Anim.push(new Effect({
            x: this.position.x + 35,
            y: this.position.y + 10
        }, 0, 100, img.specialEffects, 100, 100, 40, 40, 4, 2000, 16));
        setTimeout(() =>{
            layer3Anim.splice(layer3Anim.length - 1, 1);
        }, 2 * 1000)
    }

    strikedEffect(){
        layer3Anim.push(new Effect({
            x: this.center.x - 13,
            y: this.center.y - 100
        }, 0, 0, img.lightningStrike, 135.5, 252, 20, 100, 7, 200, 35));
        setTimeout(() =>{
            layer3Anim.splice(layer3Anim.length - 1, 1);
        }, 2 * 1000)
    }

    draw(){
        super.draw();
        if(this.stateExpiry != 0 && this.stateExpiry < window.performance.now() && !gamePaused) {
            this.stateExpiry = 0;
            this.state = "normal";
        }

        // health bar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(this.position.x + 60, this.position.y - 20, this.width - 120, 10);

        ctx.fillStyle = 'rgb(0, 230, 46)';
        ctx.fillRect(this.position.x + 60, this.position.y - 20, (this.width - 120) * this.health / this.maxHealth, 10);
    }

    showRange(){
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
    }

    // fungsi upgrade dihapus karena tower hanya 1 level
}

let duration = 0;
let duration2 = 0;

function createTower({position, towerType}) {
    return new Tower({position, imageSrc: "assets/images/sprites/towers/" + towerType + "-tower-1.png", towerClass: towerType});
}
