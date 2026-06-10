// script.js
document.body.style.margin = 0
document.body.style.overflow = "hidden"

const cnv = document.getElementById ("canvas")
const ctx = cnv.getContext ("2d")
const bgm = document.getElementById ("bgm")
bgm.volume = 0.2

let isDragging = false
let color = "white"
let audioIsEnabled = false

function startBGM () {}

window.addEventListener ("MouseDown", startBGM, {once=true}) // start background music when user loads the page
window.addEventListener ("touchstart", startBGM, {once=true}) // start background music when user clicks anywhere on the page

// play the background music if audio is enabled and loop it //
function toggleAudio () {
    if (!audioIsEnabled) {
    const bgm = new Audio ("assets/jazz.mp3")
    bgm.loop = true
    bgm.play ()
    audioIsEnabled = true
}
}

function setSize () {
    cnv.width = window.innerWidth
    cnv.height = window.innerHeight
}

setSize ()
window.onresize = setSize

function randomColor () {
    const r = Math.floor (Math.random () * 256)
    const g = Math.floor (Math.random () * 256)
    const b = Math.floor (Math.random () * 256)
    return `rgb(${ r }, ${ g }, ${ b })`
}

// Add one more class - Particle
class Particle {
    // define your initialisation

    // functions to animate and draw the particle -- same functions to DisappearingCircle but different in some way
    constructor (size, col, pos) {
        this.pos = { x: pos.x, y: pos.y }
        this.size = size
        this.col = col
        this.vel = {
            x: (Math.random () - 0.5) * 1.6, // random velocity in x direction
            y: (Math.random () - 0.5) * 1.6,  // random velocity in y direction
        }
    }

    animate () {
        this.pos.x += this.vel.x // update the position based on velocity
        this.pos.y += this.vel.y // update the position based on velocity
        this.size -= 0.02 // decrease the size to make it disappear over time
    }

    draw () {
        if (this.size <= 0) return
        ctx.fillStyle = this.col
        ctx.beginPath ()
        ctx.arc (this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI)
        ctx.fill ()
    }

    isAlive () {
        return this.size > 0
    }
}

// Individual Circle //
class DisappearingCircle {
    // attributes //
    constructor (size, col, pos) {
        this.pos = pos
        this.size = size
        this.col = col
    }

    // methods //
    animate () {
        this.size -= 0.12
    }

    draw () {
        if (this.size <= 0) return
        ctx.fillStyle = this.col
        ctx.beginPath ()
        ctx.arc (this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI)
        ctx.fill ()
    }

    isAlive () {
        return this.size > 0
    }
}

// All the circles that become the trail //
const circlesArray = []

function handleMouseDown (event) {
    color = randomColor ()
    const pos = { x: event.offsetX, y: event.offsetY }
    circlesArray.push (new DisappearingCircle (20, color, pos))
    isDragging = true   
}
   

function handleMouseMove (event) {
    if (!isDragging) return
    const pos = { x: event.offsetX, y: event.offsetY }
    circlesArray.push (new DisappearingCircle (16, color, pos))
}

function handleMouseUp (event) {
    isDragging = false
}

cnv.addEventListener ("mousedown", handleMouseDown)
cnv.addEventListener ("mousemove", handleMouseMove)
cnv.addEventListener ("mouseup", handleMouseUp)

function drawFrame () {
    
    // clear the canvas
    ctx.clearRect (0, 0, cnv.width, cnv.height)

    circlesArray.forEach ((circle, index) => {
        if (!circle.isAlive ()) {
            createParticles (circle.pos, circle.col) // create particles at the position of the circle with the same color
            //remove the circle from the array if it's no longer alive//
            circlesArray.splice (index, 1)
            // skip the rest of the loop for this circle //
            return
        }
        circle.animate ()
        circle.draw ()
    })
    
    // particle forloop
   particlesArray.forEach ((particle, index) => {
        if (!particle.isAlive ()) {
            particlesArray.splice (index, 1)
            return
        }
        particle.animate ()
        particle.draw ()
    })

    requestAnimationFrame (drawFrame)
}

// All the particles
const particlesArray = []

// create particles function
function createParticles (pos, col) {
    for (let i = 0; i < 8; i++) {
        particlesArray.push (new Particle (10, col, pos))
    }
}


drawFrame ()
