var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d'); 
const u = 4

canvas.width = 1900;
canvas.height = 800;

let l = 300

ctx.translate(canvas.width / 2, canvas.height / 2)

function drawSpan(vector, offset, c) {
    ctx.beginPath()
    ctx.moveTo(0 + offset[0] , -(0 + offset[1]))
    ctx.lineTo(l * vector[0] + offset[0], -(l * vector[1]) - offset[1])
    if (c == 1) {
        ctx.strokeStyle = "cyan"
    }
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0 + offset[0] , -(0 + offset[1]))
    ctx.lineTo(-(l * vector[0]) + offset[0], l * vector[1] - offset[1])
    if (c == 1) {
        ctx.strokeStyle = "cyan"
    }
    ctx.stroke()
}

function matrixMult(matrix, vector) {
    return [vector[0] * matrix[0][0] + vector[1] * matrix[0][1], vector[0] * matrix[1][0] + vector[1] * matrix[1][1]]
}

m = [
    [2, 1], 
    [2, 2]
    ]

let t = 80

// Base grid
// for (var i = 0; i < t; i++) {
//     for (var j = 0; j < t; j++) {
//         drawSpan([1, 0], [u * i, u * j], 0)
//         drawSpan([0, 1], [u * i, u * j], 0)
//     }
// }


//base dots
for (var i = -t; i < t; i++) {
    for (var j = -t; j < t; j++) {
        ctx.fillRect(u * i, -u * j, 2, 2)
    }
}

//transformed dots
for (var i = -t; i < t; i++) {
    for (var j = -t; j < t; j++) {
        let vec = matrixMult(m, [i, j])
        ctx.fillStyle = "red"
        ctx.fillRect(u * vec[0], -u * vec[1], 2, 2)
    }
}


















// for (var i = -4; i < 5; i++) {
//     ctx.beginPath();
//     ctx.moveTo(- canvas.width / 4, u * i)
//     ctx.lineTo(canvas.width / 4, u * i)
//     ctx.stroke()
// }

// for (var i = -6; i < 7; i++) {
//     ctx.beginPath();
//     ctx.moveTo(u * i, -canvas.height / 4)
//     ctx.lineTo(u * i, canvas.height / 4)
//     ctx.stroke();
// }








