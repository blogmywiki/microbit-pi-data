input.onButtonPressed(Button.A, function () {
    logData()
})
function logData () {
    basic.showIcon(IconNames.Heart)
    serial.writeString("" + convertToText(input.temperature()) + ":" + convertToText(input.lightLevel()))
    basic.clearScreen()
}
serial.redirectToUSB()
loops.everyInterval(60000, function () {
    logData()
})
