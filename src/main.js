//voici le code avec le son ceci n est pas encore complet 
import './style.css'
import { audioManager } from './audioManager';

document.addEventListener("DOMContentLoaded",()=>{
    const dino = document.querySelector(".dino")
    const grid = document.querySelector(".grid");
    let position =0
    const GRAVITY =0.9
    let isJumping = false;
    let isGameOver=false;

    if (!isGameOver) audioManager.playBGM()
/**
 * @param {KeyboardEvent} e 
 */
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
            //move down
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
            //move up
            position += 30
            count++
            position = position * GRAVITY
            dino.style.bottom = position + 'px'
        }, 20)
    }

    function generateObstacles(){
        let obstaclePosition =1000
        const obstacle =document.createElement("div");
        obstacle.className="obstacle"
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'

        let timerId = setInterval(function()){

        }
    }
    generateObstacles()
    document.addEventListener("keydown",control);
  

  

});

