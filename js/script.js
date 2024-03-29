const mario = document.querySelector('.super-mario')
const pipe = document.querySelector('.pipe-game')
const score = document.querySelector('#score')
const gameOver = document.querySelector('#gameOver')
const jumpSound = document.querySelector('#jump')
const deathSound = document.querySelector('#death')
const restart = document.querySelector('#restart')
const myAudio = document.querySelector('#myAudio')
const level = document.querySelector('#level')

myAudio.play()

const jump = () => {
  mario.classList.add('jump-mario')
  jumpSound.play()

  setTimeout(() => {
    mario.classList.remove('jump-mario')
  }, 500)
}

const deathMario = () => {
  mario.classList.remove('super-mario')

  setTimeout(() => {
    mario.classList.add('death-mario')
  })
}

let intervalScore = null
let playerScore = 0
const scoreCounter = () => {
  playerScore++
  score.innerHTML = `Score ${playerScore}`
  pipe.style.animation =
    'pipe-animation ' +
    `${1.5 - Math.floor(playerScore / 25) / 150}` +
    's infinite linear'
  level.innerHTML = 'Level ' + `${Math.floor(playerScore / 50) + 1}`
  return
}
intervalScore = setInterval(scoreCounter, 400)
console.log(intervalScore)

const loopGame = setInterval(() => {
  const pipePosition = pipe.offsetLeft
  const marioPosition = parseInt(
    window.getComputedStyle(mario).bottom.replace('px', '')
  )

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none'
    pipe.style.left = `${pipePosition}px`

    mario.style.bottom = `${marioPosition}px`

    mario.src = '../assets/mario-game-over.png'
    mario.classList.add('death-mario')
    deathSound.play()
    myAudio.pause()

    clearInterval(intervalScore)
    gameOver.style.display = 'block'
    restart.style.display = 'block'
    mario.style.width = '75px'
    mario.style.marginLeft = '45px'

    clearInterval(loopGame)
  }
}, 10)

document.addEventListener('keypress', e => {
  if (e.key === 'Enter') window.location.reload()
})

document.addEventListener('keydown', jump)
document.addEventListener('touchstart', jump)
