// script.js
document.body.style.margin = 0
document.body.style.overflow = "hidden"

const cnv = document.getElementById ("canvas")
const ctx = cnv.getContext ("2d")

let isDragging = false
let color = "white"

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

class DisappearingCircle {
    // atributes //
    constructor (size, col, pos) {
        this.pos = pos
        this.size = size
        this.col = col
    }

    // methods //
    animate () {
        this.size -= 0.08
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

const circlesArray = []

function handleMouseDown (event) {
    color = randomColor ()
    const pos = { x: event.offsetX, y: event.offsetY }
    circlesArray.push (new DisappearingCircle (30, color, pos))
    isDragging = true   
}

function handleMouseMove (event) {
    if (!isDragging) return
    const pos = { x: event.offsetX, y: event.offsetY }
    circlesArray.push (new DisappearingCircle (30, color, pos))
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

            //remove the circle from the array if it's no longer alive//
            circlesArray.splice (index, 1)

            // skip the rest of the loop for this circle //
            return
        }
        circle.animate ()
        circle.draw ()
    })
   

    requestAnimationFrame (drawFrame)
}

drawFrame ()