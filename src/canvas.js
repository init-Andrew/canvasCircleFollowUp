const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

//const colors = ['#00bdff', '#4d39ce', '#088eff'];
//const colors = ['  #5B8EFC  ', '  #7E5BFC  ', ' #5BA9FC  ', '  #5B5BFC  '];
//const colors = ['  #2AA6E1  ', '  #3C56CF  ', ' #4E05BD  ', '  #3281D9  '];
const colors = [ '#005CEA', '#6DB6FF', '#2673FB', '#552FDA','#00bdff', '#4d39ce', '#088eff' ];
// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})
addEventListener('touchmove', e => {
    mouse.x = e.changedTouches[0].pageX
    mouse.y = e.changedTouches[0].pageY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
// Objects
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.07;
    this.distanceFromCenter = randomIntFromRange(40,150);
    this.lastMouse = {x: x, y: y};
    
    this.update = () => {
        const lastPoint = {x: this.x, y: this.y};
        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.10;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.10;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    }
    this.draw = lastPoint => {
        c.beginPath()
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }
}




// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 100; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    //c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'rgba(0, 0, 0, 0.04)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update();
    });
}

init()
animate()
