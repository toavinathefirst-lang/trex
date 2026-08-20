import './style.css'
import { audioManager } from './audioManager';

document.addEventListener("DOMContentLoaded",()=>{
    const dino = document.querySelector(".dino")
    const grid = document.querySelector(".grid");
    const alert = document.getElementById("alert")
    const desert = document.getElementById("desert")   
    const body = document.body                          
    let position =0
    const GRAVITY =0.9
    let isJumping = false;
    let isGameOver=false;

    if (!isGameOver) audioManager.playBGM()

    function control (e){
        if(e.code === "Space"){
            if(!isJumping){
                jump()
            }
        }
    }

    function jump(){
        audioManager.playSFX("jump")
        isJumping = true
        let count = 0
        let timerId = setInterval(function() {
            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function() {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -=5
                    count--
                    position = position * GRAVITY
                    dino.style.bottom = position + 'px'
                }, 20)
            }
            position += 30
            count++
            position = position * GRAVITY
            dino.style.bottom = position + 'px'
        }, 20)
    }

    function generateObstacles(){
       if (!isGameOver) {
            let randomTime = Math.random() * 4000
            let obstaclePosition = 1000
            const obstacle = document.createElement('div')
            obstacle.classList.add('obstacle')
            grid.appendChild(obstacle)
            obstacle.style.left = obstaclePosition + 'px'

            let timerId = setInterval(function() {
                if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                    audioManager.stopBGM()
                    audioManager.playSFX("gameOver")
                    clearInterval(timerId)
                    alert.innerHTML = 'Game Over'
                    isGameOver = true

                    // pause des animations CSS
                    desert.style.animationPlayState = 'paused'
                    body.style.animationPlayState = 'paused'

                    while (grid.firstChild) {
                        grid.removeChild(grid.lastChild)
                    }
                }
                obstaclePosition -=10
                obstacle.style.left = obstaclePosition + 'px'
            }, 20)
            setTimeout(generateObstacles, randomTime)
        }
    }

    generateObstacles()
    document.addEventListener("keydown",control);
});