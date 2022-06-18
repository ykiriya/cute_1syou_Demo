input.onButtonPressed(Button.A, function () {
    custom.fo1()
    custom.fo5()
    custom.fo3()
})
function zensin () {
    if (cuteBot.tracking(cuteBot.TrackingState.L_R_unline)) {
        if (cuteBot.kyori2()) {
            cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
            if (cuteBot.kyori()) {
                cuteBot.motors(30, -29)
            } else {
                cuteBot.motors(30, 10)
            }
        } else {
            cuteBot.motors(30, 30)
            cuteBot.closeheadlights()
        }
    } else if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
        cuteBot.stopcar()
        cuteBot.motors(-30, -30)
    } else {
    	
    }
}
input.onButtonPressed(Button.B, function () {
    custom.foo()
    custom.foo()
    custom.foo()
})
basic.forever(function () {
	
})
