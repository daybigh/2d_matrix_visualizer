var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d'); 
const u = 40
let t = 20

canvas.width = 20 * u;
canvas.height = 20 * u;

ctx.translate(canvas.width / 2, canvas.height / 2)

function matrixMult(matrix, vector) {
    return [vector[0] * matrix[0][0] + vector[1] * matrix[0][1], vector[0] * matrix[1][0] + vector[1] * matrix[1][1]]
}


function displayBaseGrid() {
    //base vertical
    for (var i = -t; i <= t; i ++) {
        ctx.beginPath()
        for (var j = -t; j <= t; j++) {
            let vec = [i, j]
            let vec2 = [i, j + 1]
            ctx.lineTo(u * vec[0], -u * vec[1])
        }
        if (i == 0) {
            ctx.strokeStyle = "rgb(255, 255, 255)"
        } else {
            ctx.strokeStyle = "grey"
        }
        ctx.stroke()
        }

    //base horizontal
    for (var i = -t; i <= t; i ++) {
        ctx.beginPath()
        for (var j = -t; j <= t; j++) {
            let vec = [j, i]
            let vec2 = [j + 1, i]
            ctx.lineTo(u * vec[0], -u * vec[1])
        }
        if (i == 0) {
            ctx.strokeStyle = "rgb(255, 255, 255)"
        } else {
            ctx.strokeStyle = "grey"
        }
        ctx.stroke()
        }
}




// Transformed grid
function displayTransformedGrid(m) {

    for (var i = -t; i <= t; i ++) {
        ctx.beginPath()
        for (var j = -t; j <= t; j++) {
            let vec = matrixMult(m, [i, j])
            ctx.lineTo(u * vec[0], -u * vec[1])
    }
    ctx.strokeStyle = "cyan"
    ctx.stroke()
    }

    for (var i = -t; i <= t; i ++) {
        ctx.beginPath()
        for (var j = -t; j <= t; j++) {
            let vec = matrixMult(m, [j, i])
            ctx.lineTo(u * vec[0], -u * vec[1])
    }
    ctx.strokeStyle = "cyan"
    ctx.stroke()
    }
}

function temp() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    displayBaseGrid()
    let b = [
        [document.getElementById('m00').value, document.getElementById('m01').value],
        [document.getElementById('m10').value, document.getElementById('m11').value]
    ]    
    displayTransformedGrid(b)
}

displayBaseGrid()

















