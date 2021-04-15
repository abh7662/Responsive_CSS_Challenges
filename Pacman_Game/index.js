const width = 28
const grid = document.querySelector(".grid")
const score = document.querySelector("#score")
score.textContent = 0
const newGridArray = []
let currentScore = 0
//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

for(let i of layout){
    const newGrid = document.createElement("div")
    if(i == 0){
        newGrid.classList.add("pac-dots")
    }
    else if(i == 1){
        newGrid.classList.add("wall")
    }
    else if(i == 2){
        newGrid.classList.add("ghost-lair")
    }
    else if(i == 3){
        newGrid.classList.add("power-pellet")
    }
    else if(i == 4){
        newGrid.classList.add("empty")
    }
    grid.appendChild(newGrid)
    newGridArray.push(newGrid)
}
// console.log(newGridArray)

let pacmanCurrentIndex = 500
newGridArray[pacmanCurrentIndex].classList.add("pacman")
//remove the pacman classList and then change cueent postion of pacman and then reassign the pacman classlist
function control(e){
    pacDotEaten()
    powerPalletEaten()
    CheckgameOver()
    checkForWin()
    switch(e.keyCode){
        
        case 37:
            newGridArray[pacmanCurrentIndex].classList.remove("pacman")
            if(!newGridArray[pacmanCurrentIndex-1].classList.contains("ghost-lair") && !newGridArray[pacmanCurrentIndex-1].classList.contains("wall") && pacmanCurrentIndex % width !== 0){
                pacmanCurrentIndex--
            }
            
            newGridArray[pacmanCurrentIndex].classList.add("pacman")
            // newGridArray[pacmanCurrentIndex].classList.remove("pacman")

            // if(pacmanCurrentIndex % width === 0 && newGridArray[pacmanCurrentIndex+(width-1)].classList.contains("empty")){
            //     pacmanCurrentIndex = pacmanCurrentIndex+width-1
            //     // console.log("hero")

            // }
            // newGridArray[pacmanCurrentIndex].classList.add("pacman")

            // console.log("left")
            break
        case 39:
            newGridArray[pacmanCurrentIndex].classList.remove("pacman")
            if(!newGridArray[pacmanCurrentIndex+1].classList.contains("ghost-lair") && !newGridArray[pacmanCurrentIndex+1].classList.contains("wall") && pacmanCurrentIndex % width !== 27){
                pacmanCurrentIndex++
            }
            newGridArray[pacmanCurrentIndex].classList.add("pacman")
            // console.log("right")
            break
        case 38:
            newGridArray[pacmanCurrentIndex].classList.remove("pacman")
            if(!newGridArray[pacmanCurrentIndex-width].classList.contains("ghost-lair") && !newGridArray[pacmanCurrentIndex-width].classList.contains("wall") && pacmanCurrentIndex - width > 0){
                pacmanCurrentIndex -= width 
            }
            newGridArray[pacmanCurrentIndex].classList.add("pacman")
            // console.log("up")
            break
        case 40:
            newGridArray[pacmanCurrentIndex].classList.remove("pacman")
            if(!newGridArray[pacmanCurrentIndex+width].classList.contains("ghost-lair") && !newGridArray[pacmanCurrentIndex+width].classList.contains("wall") && pacmanCurrentIndex + width < width * width){
                pacmanCurrentIndex += width 
            }
            newGridArray[pacmanCurrentIndex].classList.add("pacman")
            // console.log("down")
            break
    }
}

document.addEventListener("keydown", control)

function pacDotEaten(){
    if(newGridArray[pacmanCurrentIndex].classList.contains("pac-dots")){
        newGridArray[pacmanCurrentIndex].classList.remove("pac-dots")
        currentScore++
    }
    score.textContent = currentScore

}

function powerPalletEaten(){
    if(newGridArray[pacmanCurrentIndex].classList.contains("power-pellet")){
        newGridArray[pacmanCurrentIndex].classList.remove("power-pellet")
        currentScore+=10
        score.textContent = currentScore
        ghosts.forEach(ghost => {
            ghost.isScared = true
        })
        setTimeout(() => {
            ghosts.forEach(ghost => ghost.isScared = false)
            }, 100000)

    }
}
class Ghost{
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)

]


ghosts.forEach(ghost => {
    newGridArray[ghost.startIndex].classList.add(ghost.className)
    newGridArray[ghost.startIndex].classList.add("ghost")
    })

ghosts.forEach(ghost => moveGhost(ghost))
function moveGhost(ghost){
    console.log("mov ghost")
    const directions = [-1, +1, +width, -width]
    let direction = directions[Math.floor(Math.random()*directions.length)]
    console.log(direction)

    ghost.timerId = setInterval(() => {
        if(!newGridArray[ghost.currentIndex+direction].classList.contains("ghost") && !newGridArray[ghost.currentIndex+direction].classList.contains("wall")){
            newGridArray[ghost.currentIndex].classList.remove(ghost.className)
            newGridArray[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
            
            ghost.currentIndex += direction
            newGridArray[ghost.currentIndex].classList.add(ghost.className)
            newGridArray[ghost.currentIndex].classList.add("ghost")
            
        }else{
            direction = directions[Math.floor(Math.random()*directions.length)]
        }
        if(ghost.isScared){
            newGridArray[ghost.currentIndex].classList.add("scared-ghost")
        }

        if(ghost.isScared && newGridArray[ghost.currentIndex].classList.contains("pacman")){
            // console.log("hell")
            newGridArray[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            ghost.currentIndex = ghost.startIndex
            currentScore += 100
            score.textContent = currentScore
            newGridArray[ghost.currentIndex].classList.add(ghost.className, "ghost")

        }
        CheckgameOver()
        checkForWin()
    },ghost.speed)
}

//check for game over

function CheckgameOver(){
    if(newGridArray[pacmanCurrentIndex].classList.contains("ghost") && !newGridArray[pacmanCurrentIndex].classList.contains("scared-ghost")){
        // console.log("abhi")
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keydown",control)
        score.textContent = "Game Over"
    }
}

//check for win

function checkForWin(){
    if(currentScore === 274){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keydown",control)
        score.textContent = "Congrats!!! you won the game :)"

    }

}
// function controlup(e){
//     newGridArray[pacmanCurrentIndex].classList.remove("pacman")
//             if(pacmanCurrentIndex - width > 0){
//                 pacmanCurrentIndex -= width 
//             }
//             newGridArray[pacmanCurrentIndex].classList.add("pacman")
//             // console.log("up")
// }
// function controlDown(e){
//     newGridArray[pacmanCurrentIndex].classList.remove("pacman")
//             if(pacmanCurrentIndex + width < width * width){
//                 pacmanCurrentIndex += width 
//             }
//             newGridArray[pacmanCurrentIndex].classList.add("pacman")
//             // console.log("down")
// }
// function controlRight(e){
//     newGridArray[pacmanCurrentIndex].classList.remove("pacman")
//             if(pacmanCurrentIndex % width !== width -1){
//                 pacmanCurrentIndex++
//             }
//             newGridArray[pacmanCurrentIndex].classList.add("pacman")
// }
// function controlLeft(e){
//     newGridArray[pacmanCurrentIndex].classList.remove("pacman")
//             if(pacmanCurrentIndex % width !== 0){
//                 pacmanCurrentIndex--
//             }
//             newGridArray[pacmanCurrentIndex].classList.add("pacman")
// }
// const clickUp = document.querySelector(".up")
// const clickDown = document.querySelector(".down")
// const clickRight = document.querySelector(".right")
// const clickLeft = document.querySelector(".left")
// clickUp.addEventListener("click",controlup)
// clickDown.addEventListener("click",controlDown)
// clickRight.addEventListener("click",controlRight)
// clickLeft.addEventListener("click",controlLeft)