import './style.css'

document.addEventListener("DOMContentLoaded",()=>{
    const dino = document.querySelector(".dino")
    const grid = document.querySelector(".grid");
    let position =0
    const GRAVITY =0.9
    let isJumping = false;
/**
 * @param {KeyboardEvent} e 
 */
    function control (e){
        if(e.code === "Space"){
            jump()
        }
    }
    
      function jump(){
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
    document.addEventListener("keydown",control);
  

  

});

