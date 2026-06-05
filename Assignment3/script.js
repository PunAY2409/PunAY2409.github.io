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
    //ctx.fillStyle = "grey"
    //ctx.fillRect (0, 0, cnv.width, cnv.height)

    ctx.fillStyle = "turquoise"
    clickPositions.forEach (pos => {
        const x = pos.x + Math.random () * 10
        ctx.fillRect (x, pos.y, 10, 10)
    })

    window.requestAnimationFrame (drawFrame)
    // console.log (`${ Math.floor (ms) } milliseconds elapsed`)
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



