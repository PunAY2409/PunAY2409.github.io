document.body.style.margin = 0
document.body.style.overflow = "hidden"

const cnv = document.getElementById ("canvas")
const ctx = cnv.getContext ("2d")

const clickPositions = []

function setSize () {
    cnv.width = window.innerWidth
    cnv.height = window.innerHeight
}

setSize ()
window.onresize = setSize

function drawFrame (ms) {
    ctx.clearRect (0, 0, cnv.width, cnv.height) /* Show transparent linear gradient on background */
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.lineWidth = 10
    ctx.fillStyle = "turquoise"
    cnv.style.cursor = "circle"
}

drawFrame ()

function handleClick (clickEvent) {
    console.log (clickEvent)
}

function handleMove (moveEvent) {
    clickPositions.push ({
        x: moveEvent.clientX, 
        y: moveEvent.clientY
    })
}

cnv.onclick = handleClick
cnv.onmousemove = handleMove



