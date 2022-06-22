function zensin () {
    if (cuteBot.tracking(cuteBot.TrackingState.L_R_unline)) {
        if (cuteBot.kyori2()) {
            cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
            if (cuteBot.kyori()) {
                cuteBot.motors(30, -29)
            } else {
                cuteBot.motors(30, 0)
            }
        } else {
            cuteBot.motors(30, 30)
            cuteBot.closeheadlights()
        }
    } else if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
        cuteBot.stopcar()
        cuteBot.motors(-21, -21)
        basic.pause(1000)
        cuteBot.stopcar()
        cuteBot.motors(30, 0)
        basic.pause(500)
    } else if (cuteBot.tracking(cuteBot.TrackingState.L_line_R_unline)) {
        cuteBot.motors(30, -23)
        basic.pause(100)
    } else if (cuteBot.tracking(cuteBot.TrackingState.L_line_R_unline)) {
        cuteBot.motors(-24, 30)
        basic.pause(100)
    } else {
        cuteBot.motors(30, 30)
    }
}
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 5000; index++) {
        zensin()
    }
    basic.showIcon(IconNames.Diamond)
})
