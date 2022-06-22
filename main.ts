let len2 = 0
let l = 0
let dis = 0
let dis2 = 0
function mae () {
    if (cuteBot.tracking(cuteBot.TrackingState.L_R_unline)) {
        if (cuteBot.kyori2()) {
            basic.pause(50)
            cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
            if (cuteBot.kyori()) {
                basic.pause(50)
                cuteBot.motors(30, -29)
            } else {
                basic.pause(50)
                cuteBot.motors(30, 0)
            }
        } else {
            basic.pause(50)
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
input.onButtonPressed(Button.A, function () {
    len2 = 0
    l = 0
    dis = 50
    前進(dis, l, len2)
    basic.clearScreen()
    l = 0
    dis = 30
    len2 = 500
    前進(dis, l, len2)
    custom.fo1()
    len2 = 1000
    前進(dis, l, len2)
    custom.fo7()
    len2 = 500
    前進(dis, l, len2)
    len2 = 1500
    前進(dis, l, len2)
    custom.fo4()
    custom.fo1()
    len2 = 1000
    前進(dis, l, len2)
    custom.fo7()
    len2 = 500
    前進(dis, l, len2)
    basic.showIcon(IconNames.Heart)
})
function 前進 (数値: number, 数値2: number, 数値3: number) {
    dis2 = 50
    while (l <= len2) {
        basic.pause(50)
        dis2 = 50
        if (cuteBot.kyori()) {
            custom.fo1()
            custom.fo4()
            custom.fo7()
        } else if (cuteBot.tracking(cuteBot.TrackingState.L_R_unline)) {
            cuteBot.motors(25, 25)
            l += 1
        } else if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
            cuteBot.stopcar()
            basic.pause(100)
            cuteBot.motors(-30, -30)
            basic.pause(1000)
            custom.fo7()
        } else if (cuteBot.tracking(cuteBot.TrackingState.L_unline_R_line)) {
            cuteBot.motors(-20, 30)
            basic.pause(200)
        } else if (cuteBot.tracking(cuteBot.TrackingState.L_line_R_unline)) {
            cuteBot.motors(30, -20)
            basic.pause(200)
        } else {
            cuteBot.motors(25, 25)
        }
    }
    cuteBot.stopcar()
}
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 5000; index++) {
        mae()
    }
    basic.showIcon(IconNames.Diamond)
})
control.inBackground(function () {
    while (!(input.buttonIsPressed(Button.AB))) {
        basic.pause(100)
        if (cuteBot.kyori2()) {
            music.playTone(220, music.beat(BeatFraction.Half))
            basic.pause(100)
            music.playTone(220, music.beat(BeatFraction.Double))
        } else {
            music.stopAllSounds()
            cuteBot.closeheadlights()
        }
    }
    music.stopAllSounds()
})
