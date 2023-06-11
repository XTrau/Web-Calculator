const screen = document.getElementById('screen')
let calcOut = '0'

function buttonClick(value) {
    if (isNaN(value))
        addNumber(value)
    else
        addSymbol(value)
    screen.innerText = calcOut
}

document.querySelector('.calc-buttons').
addEventListener('click', event => buttonClick(event.target.innerText))