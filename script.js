const screen = document.getElementById('screen')
let lastSymbol = null
let calcOut = '0'

function buttonClick(value) {
    if (isNaN(value))
        addSymbol(value)
    else
        addNumber(value)

    if (calcOut.length > 18)
        addSymbol('←')

    screen.innerText = calcOut
}

function addNumber(value) {
    lastSymbol = value
    if (calcOut === '0') {
        calcOut = value
        return
    }
    calcOut += value
}

function addSymbol(value) {
    if (calcOut === '0')
        return

    switch(value) {
        case 'C':
            calcOut = '0'
            break;
        case '←':
            calcOut = calcOut.substring(0, calcOut.length - 1)
            calcOut = calcOut.length === 0 ? '0' : calcOut
            lastSymbol = calcOut[calcOut.length - 1]
            break;
        case '=':
            doCalc()
            lastSymbol = null
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            if (isNaN(lastSymbol))
                calcOut = calcOut.substring(0, calcOut.length - 1)
            calcOut += value
            lastSymbol = value
    }
}

function doCalc() {

}

document.querySelector('.calc-buttons').
addEventListener('click', event => buttonClick(event.target.innerText))