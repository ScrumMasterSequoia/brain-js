const config = {
    inputSize: 3, 
    inputRange: 0-1, 
    hiddenLayers: [20, 20], 
    outputSize: 1, 
    learningRate: 0.01, 
    decayRate: 0.999,
    binaryThresh: 0.5, // ¯\_(ツ)_/¯ threshold for binary activation, supported for activation type 'step'
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

const net = new brain.NeuralNetwork(config);
const data = [{"input":{"r":0,"g":0,"b":0},"output":[1]},{"input":{"r":1,"g":1,"b":1},"output":[0]},{"input":{"r":0.05506940957647588,"g":0.7877734348226044,"b":0.9602091547033493},"output":[0]},{"input":{"r":0.34163003184732776,"g":0.7957487595616977,"b":0.08237880926328423},"output":[0]},{"input":{"r":0.26937444244164244,"g":0.13262324783282597,"b":0.4722533365193966},"output":[1]},{"input":{"r":0.5202680659247529,"g":0.535314256732744,"b":0.9102948779236657},"output":[0]},{"input":{"r":0.21304599500093735,"g":0.5296351127717436,"b":0.7896515704829188},"output":[0]},{"input":{"r":0.03420010462605294,"g":0.7015077403951857,"b":0.4142168543131979},"output":[0]},{"input":{"r":0.5181531148152569,"g":0.2654630752998002,"b":0.8683880684511707},"output":[0]},{"input":{"r":0.2964297339082276,"g":0.30411408490612435,"b":0.22061136283677318},"output":[1]},{"input":{"r":0.5541313851574676,"g":0.819444703122,"b":0.22681121809875848},"output":[0]},{"input":{"r":0.8161990917969146,"g":0.08702647529759133,"b":0.7460051143123261},"output":[0]},{"input":{"r":0.08703300309379358,"g":0.13674468348492574,"b":0.19564259744816437},"output":[1]},{"input":{"r":0.9392497961917283,"g":0.4072733717703083,"b":0.7153482656301671},"output":[0]},{"input":{"r":0.8921426809412827,"g":0.25411916631807374,"b":0.5673818831876403},"output":[0]},{"input":{"r":0.25902683403905735,"g":0.5567721566050234,"b":0.6814824802328239},"output":[0]},{"input":{"r":0.7822122465625225,"g":0.6194012131810349,"b":0.8296498669330412},"output":[0]},{"input":{"r":0.742525095536211,"g":0.2991966190418487,"b":0.11867319649739128},"output":[1]},{"input":{"r":0.3162724981347005,"g":0.4580947439316456,"b":0.6355493697369761},"output":[0]},{"input":{"r":0.09033613704128984,"g":0.11333995806737374,"b":0.9118976459458761},"output":[1]}]
net.train(data)

const colorElement = document.getElementById('color');
const guessElement = document.getElementById('guess');
const whiteButton = document.getElementById('white-button');
const blackButton = document.getElementById('black-button');
const printButton = document.getElementById('print-button');

let color;
function setRandomColor() {
    color = {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    }
    const guess = net.run(color)[0];
    guessElement.style.color = guess > 0.5 ? '#fff' : '#000';
    guessElement.innerHTML = guess > 0.5 ? "White text lookes better" : "Black text looks better";
    colorElement.style.backgroundColor = `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`;
}

setRandomColor();

whiteButton.addEventListener('click', () => {
    chooseColor(1);
})

blackButton.addEventListener('click', () => {
    chooseColor(0);
})

printButton.addEventListener('click', print)

function chooseColor(output) {
    data.push({input: color, output: [output]})
    setRandomColor();
}

function print() {
console.log(JSON.stringify(data));
}

// uncomment to see the diagram and output logs

const diagram = document.getElementById('diagram');
diagram.innerHTML = brain.utilities.toSVG(net)
console.log(net.run({r: 0, g: 0, b: 0})) // [1] white
console.log(net.run({r: 1, g: 1, b: 1})) // [0] black
console.log(net.run({r: 0.09033613704128984,"g":0.11333995806737374,"b":0.9118976459458761})) // [1] white