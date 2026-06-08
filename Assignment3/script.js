document.body.style.margin = 0
document.body.style.overflow = "hidden"

const cnv = document.getElementById ("canvas")
const ctx = cnv.getContext ("2d")

let drawing = false
let lastX = 0
let lastY = 0

function setSize () {
    cnv.width = window.innerWidth
    cnv.height = window.innerHeight
}

setSize ()
window.onresize = setSize

ctx.strokeStyle = "#FFFFED"
ctx.lineWidth = 15
ctx.lineCap = "round"
ctx.lineJoin = "round"
cnv.style.cursor = "crosshair"

// Get the coordinates of a pointer event relative to the canvas
function getCanvasPoint (action) {
    const rect = cnv.getBoundingClientRect ()
    return {
        x: action.clientX - rect.left,
        y: action.clientY - rect.top
    }
}

function startDrawing (action) {
    // Prevent the default behavior of the pointer event (e.g., scrolling, text selection)
    action.preventDefault ()
    drawing = true
    // Get the initial coordinates of the pointer event relative to the canvas
    const p = getCanvasPoint (action)
    lastX = p.x
    lastY = p.y
}

function draw (action) {
    if (!drawing) return
    // Prevent the default behavior of the pointer event (e.g., scrolling, text selection)
    action.preventDefault ()
    const p = getCanvasPoint (action)
    ctx.beginPath ()
    ctx.moveTo (lastX, lastY)
    ctx.lineTo (p.x, p.y)
    ctx.stroke ()
    lastX = p.x
    lastY = p.y
}

function stopDrawing () {
    drawing = false
}

cnv.addEventListener ("pointerdown", startDrawing)
cnv.addEventListener ("pointermove", draw)
cnv.addEventListener ("pointerup", stopDrawing)
cnv.addEventListener ("pointercancel", stopDrawing)
cnv.addEventListener ("pointerleave", stopDrawing)