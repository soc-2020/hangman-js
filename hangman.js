let words = ["mississippi", "concatenate", "normalization", "decentralized"];
let word = "";
let validLetters = [];
let invalidLetters = [];
let gameOver = false;

function startOver() {
    gameOver = false;
    validLetters = [];
    invalidLetters = [];
    word = words[Math.floor(Math.random() * words.length)];
    document.getElementById("result").innerHTML = "";
    displaySecretWord();
    displayLetters();
    drawCanvas();
}

function displaySecretWord() {
    let d = document.getElementById("word");
    let txt = word.charAt(0);
    for (var i = 1; i < word.length-1; i++) {
        if(validLetters.includes(word.charAt(i))) {
            txt += ' ' + word.charAt(i)
        }
        else {
            txt += ' _';
        }
    }
    txt += ' ' + word.charAt(word.length-1);
    d.innerHTML = txt;
}

function displayLetters() {
    let txt = "";
    for(let i = 97; i < 123; i++) {
        let ch = String.fromCharCode(i);
        if(validLetters.includes(ch)) {
            txt += "<span class='valid-letter'>" + ch + "</span> ";
        }
        else if(invalidLetters.includes(ch)) {
            txt += "<span class='invalid-letter'>" + ch + "</span> ";
        }
        else if(gameOver) {
            txt += "<span>" + ch + "</span> ";
        }
        else {
            txt += "<a href='#' onclick='playLetter(" + i + ");'>" + ch + "</a> ";
        }
    }
    document.getElementById("letter-list").innerHTML = txt;
}


function playLetter(i) {
    ch = String.fromCharCode(i);
    if(validLetters.includes(ch) || invalidLetters.includes(ch)) {
        // already selected
        return;
    }

    if(word.includes(ch)) {
        validLetters.push(ch);
    }
    else {
        invalidLetters.push(ch);
    }

    displaySecretWord();
    displayLetters();
    drawCanvas();
    checkIfFound();
}


function checkIfFound() {
    let w = document.getElementById("word").innerHTML;
    w = w.replace(/\s/g, '');
    if(word == w) {
        document.getElementById("result").innerHTML = "FOUND!";
        gameOver = true;
        displayLetters();
    }
    else if(invalidLetters.length >= 6) {
        document.getElementById("result").innerHTML = "LOST!";
        gameOver = true;
        displayLetters();
    }
}

function drawCanvas() {
    let canvas = document.querySelector('canvas');
    let context = canvas.getContext('2d');

    context.fillRect(10, 120, 100, 10);
    context.fillRect(20, 20, 7, 100);
    context.fillRect(20, 20, 50, 7);
    context.fillRect(20, 20, 50, 7);
    context.fillRect(64, 20, 3, 15);

    let wrong = invalidLetters.length;

    switch (wrong) {
        case 6:
            // Left leg
            context.beginPath();
            context.moveTo(66, 85);
            context.lineTo(52, 95);
            context.stroke();
        case 5:
            // Right leg
            context.beginPath();
            context.moveTo(66, 85);
            context.lineTo(80, 95);
            context.stroke();
        case 4:
            // Left hand
            context.beginPath();
            context.moveTo(66, 55);
            context.lineTo(52, 65);
            context.stroke();
        case 3:
            // Right hand
            context.beginPath();
            context.moveTo(66, 55);
            context.lineTo(80, 65);
            context.stroke();
        case 2:
            // Body
            context.beginPath();
            context.moveTo(66, 49);
            context.lineTo(66, 85);
            context.stroke();
        case 1:
            // Head
            context.beginPath();
            context.arc(66, 41, 8, 0, 2 * Math.PI);
            context.stroke();
    }
}