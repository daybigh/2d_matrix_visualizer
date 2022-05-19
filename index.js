var canvas = document.querySelector('canvas');

canvas.width = 1920;
canvas.height = 800;

var c = canvas.getContext('2d'); 

// backround grid

for (var i = -100; i < 100; i++) {
    c.beginPath();
    c.moveTo(40 * i, 0);
    c.lineTo(40 * i, window.innerHeight);
    c.strokeStyle = "lightgray"
    c.stroke();
};

for (var i = -100; i < 100; i++) {
    c.beginPath();
    c.moveTo(0, 40 * i);
    c.lineTo(window.innerWidth , 40 * i);
    c.strokeStyle = "lightgray"
    c.stroke();
};

// where ihat and jhat get mapped to



// x-axis
// for (var i = -100; i < 200; i++) {
//     c.beginPath();
//     c.moveTo(0, 40 * i);
//     c.lineTo(window.innerWidth , 40 * i);
//     c.strokeStyle = "rgb(64, 136, 245)";
//     c.stroke();
// }

// c.beginPath();
// c.translate(canvas.width / 2, canvas.height / 2);
// c.rotate(Math.PI * (0));
// c.moveTo(-(canvas.width / 2), 0);
// c.lineTo((canvas.width / 2), 0);
// c.strokeStyle = "rgb(64, 136, 245)";
// c.stroke();

for (var i = -100; i < 200; i++) {
    c.beginPath();
    c.translate(canvas.width / 2, 40 * i);
    c.rotate(Math.PI * (0.2));
    c.translate(-canvas.width / 2, -40 * i)
    c.moveTo(-(canvas.width) * 2, 40 * i);
    c.lineTo((canvas.width) * 2, 40 * i);
    c.strokeStyle = "rgb(64, 136, 245)";
    c.stroke();
    c.closePath();
    c.setTransform(1, 0, 0, 1, 0, 0)
};

for (var i = -100; i < 200; i++) {
    c.beginPath();
    c.translate(40 * i, canvas.height / 2);
    c.rotate(Math.PI * (0.2));
    c.translate(-40 * i, -canvas.height / 2)
    c.moveTo(40 * i, -canvas.height * 2);
    c.lineTo(40 * i, canvas.height * 2);
    c.strokeStyle = "rgb(64, 136, 245)";
    c.stroke();
    c.closePath();
    c.setTransform(1, 0, 0, 1, 0, 0)
};





