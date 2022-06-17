input.onButtonPressed(Button.A, function () {
    custom.fo1()
    custom.fo5()
    custom.fo3()
})
input.onButtonPressed(Button.B, function () {
    custom.foo()
    custom.foo()
    custom.foo()
})
basic.forever(function () {
    if (cuteBot.kyori()) {
        cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0xff0000)
    } else {
        cuteBot.closeheadlights()
    }
})
