const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const restartButton = document.querySelector('.restart-btn')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colorSet = ['#7a0f0f', '#aa4394', '#8131af', '#593ed3', 
    '#35978f', '#90ad3e', '#dbbf40', '#336399', '#27db10', '#d1ce0c']

let time = 0
let score = 0
let interval = 0

startButton.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

restartButton.addEventListener('click', (event) => restartGame(event) )

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle(getRandomColor())
    }
})
 
function startGame() {
    timeEl.parentNode.style.display = "flex"
    score = 0
    timeEl.innerHTML = `00:${time}`
    interval = setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
    console.log("startGame")
}

function decreaseTime() {
    if (time ===0) {
        finishGame()
    } else {
        let current =--time
        if (current < 10) { current = `0${current}` } 
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {    
    timeEl.parentNode.style.display = "none" 
    board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle(circleColor) {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size) 
    
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = circleColor 

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colorSet.length )
    return colorSet[index]
}

function restartGame(event) {    
    if(event.target.classList.contains('restart-btn')) {
        if(time > 0) {
            time = 0
            finishGame()
        } else {
            board.innerHTML = ""            
            clearInterval(interval)
            screens.forEach(element => element.classList.remove('up'))
        }
    }
}