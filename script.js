const screen = document.querySelector('#screen')
let calcOut = '0'
let lastSymbol = null
let action = null

function buttonClick(value) {
    if (isNaN(value)) {
        addSymbol(value)
    }
    else
        addNumber(value)

    if (calcOut.length > 16)
        calcOut = calcOut.substring(0, calcOut.length - 1)

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
            lastSymbol = null
            action = null
            break;
        case '←':
            if (action === calcOut[calcOut.length - 1])
                action = null
            calcOut = calcOut.substring(0, calcOut.length - 1)
            calcOut = calcOut.length === 0 ? '0' : calcOut
            lastSymbol = calcOut[calcOut.length - 1]
            break;
        case '=':
            doCalc()
            action = null
            lastSymbol = calcOut[calcOut.length - 1]
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            if (action != null && isNaN(lastSymbol) === false) {
                doCalc()
                calcOut += value
                lastSymbol = value
                action = value
                break
            }

            if (isNaN(lastSymbol))
                calcOut = calcOut.substring(0, calcOut.length - 1)
            
            calcOut += value
            lastSymbol = value
            action = value
    }
}

function doCalc() {
    if (action === null)
        return
    
    let indexOfAction = calcOut.indexOf(action);
    if(calcOut[indexOfAction + 1] === undefined) {
        return
    }
    switch (action) {
        case '÷':
            calcOut = calcOut.substring(0, indexOfAction) /
                calcOut.substring(indexOfAction + 1)
            break
        case '×':
            calcOut = calcOut.substring(0, indexOfAction) *
                calcOut.substring(indexOfAction + 1)
            break
        case '−':
            calcOut = calcOut.substring(0, indexOfAction) -
                calcOut.substring(indexOfAction + 1)
            break
        case '+':
            calcOut = Number(calcOut.substring(0, indexOfAction)) +
                Number(calcOut.substring(indexOfAction + 1))
            break
    }
    calcOut = String(calcOut)
}

document.querySelector('.calc-buttons').
addEventListener('click', event => buttonClick(event.target.innerText))