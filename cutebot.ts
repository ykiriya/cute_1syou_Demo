/**
 * Functions to Cutebot by ELECFREAKS Co.,Ltd.
 */

//% weight=5 color=#0fbc11  icon="\uf207" 
//%color=#0fbc11  block="教文学習2"
namespace cuteBot {
    const STM8_ADDRESSS = 0x10
    let _initEvents = true
    /**
    * Unit of Ultrasound Module
    */
    export enum SonarUnit {
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }
    /**
    * Select the motor on the left or right
    */
    export enum MotorsList {
        //% blockId="M1" block="M1"
        M1 = 0,
        //% blockId="M2" block="M2"
        M2 = 1
    }
    /**
    * Select the servo on the S1 or S2
    */
    export enum ServoList {
        //% block="S1"
        S1 = 0,
        //% block="S2"
        S2 = 1
    }
    /**
    * Select the RGBLights on the left or right
    */
    export enum RGBLights {
        //% blockId="Right_RGB" block="右LED"
        RGB_L = 1,
        //% blockId="Left_RGB" block="左LED"
        RGB_R = 0,
        //% blockId="ALL" block="全て"
        ALL = 3
    }
    /**
    * Status List of Tracking Modules
    */
    export enum TrackingState {
        //% block="● ●" enumval=0
        L_R_line,

        //% block="◌ ●" enumval=1
        L_unline_R_line,

        //% block="● ◌" enumval=2
        L_line_R_unline,

        //% block="◌ ◌" enumval=3
        L_R_unline
    }
    export enum Direction {
        //% block="Forward" enumval=0
        forward,
        //% block="Backward" enumval=1
        backward,
        //% block="Left" enumval=2
        left,
        //% block="Right" enumval=3
        right
    }
    /**
    * Line Sensor events    MICROBIT_PIN_EVT_RISE
    */
    export enum MbEvents {
        //% block="Found" 
        FindLine = DAL.MICROBIT_PIN_EVT_FALL,
        //% block="Lost" 
        LoseLine = DAL.MICROBIT_PIN_EVT_RISE
    }
    /**
     * Pins used to generate events
     */
    export enum MbPins {
        //% block="Left" 
        Left = DAL.MICROBIT_ID_IO_P13,
        //% block="Right" 
        Right = DAL.MICROBIT_ID_IO_P14
    }
    /**
     * TODO: Set the speed of left and right wheels. 
     * @param lspeed Left wheel speed , eg: 30
     * @param rspeed Right wheel speed, eg: 30
     */
    //% blockId=MotorRun block="左タイヤの速さ %lspeed\\% 右タイヤの速さ %rspeed\\%"
    //% lspeed.min=-50 lspeed.max=50
    //% rspeed.min=-50 rspeed.max=50
    //% weight=100
    export function motors(lspeed: number = 50, rspeed: number = 50): void {
        let buf = pins.createBuffer(4);
        if (lspeed > 50) {
            lspeed = 50;
        } else if (lspeed < -50) {
            lspeed = -50;
        }
        if (rspeed > 50) {
            rspeed = 50;
        } else if (rspeed < -50) {
            rspeed = -50;
        }
        if (lspeed > 0) {
            buf[0] = 0x01;    //左右轮 0x01左轮  0x02右轮
            buf[1] = 0x02;		//正反转0x02前进  0x01后退
            buf[2] = lspeed;	//速度
            buf[3] = 0;			//补位
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);  //写入左轮
        }
        else {
            buf[0] = 0x01;
            buf[1] = 0x01;
            buf[2] = lspeed * -1;
            buf[3] = 0;			//补位
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);  //写入左轮
        }
        if (rspeed > 0) {
            buf[0] = 0x02;
            buf[1] = 0x02;
            buf[2] = rspeed;
            buf[3] = 0;			//补位
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);  //写入左轮
        }
        else {
            buf[0] = 0x02;
            buf[1] = 0x01;
            buf[2] = rspeed * -1;
            buf[3] = 0;			//补位
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);  //写入左轮
        }

    }
    /**
    * TODO: stopcar
    */
    //% blockId=cutebot_stopcar block="止まる"
    //% weight=70
    export function stopcar(): void {
        motors(0, 0)
    }
    /**
    * TODO: Set LED headlights.
    */
    //% block="%lightのヘッドライトを $color色で点灯する"
    //% color.shadow="colorNumberPicker"
    //% weight=65
    export function colorLight(light: RGBLights, color: number) {
        let r: number, g: number, b: number = 0
        r = color >> 16
        g = (color >> 8) & 0xFF
        b = color & 0xFF
        singleheadlights(light, r, g, b)
    }
    /**
    * TODO: Select a headlights and set the RGB color.
    * @param R R color value of RGB color, eg: 0
    * @param G G color value of RGB color, eg: 128
    * @param B B color value of RGB color, eg: 255
    */
    //% inlineInputMode=inline
    //% blockId=RGB block="%light のヘッドライトを　赤:%r 緑:%g 青:%bで点灯する"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% weight=60
    export function singleheadlights(light: RGBLights, r: number, g: number, b: number): void {
        let buf = pins.createBuffer(4);
        if (light == 3) {
            buf[0] = 0x04;
            buf[1] = r;
            buf[2] = g;
            buf[3] = b;
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);
            buf[0] = 0x08;
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);
        }
        else {
            if (light == 0) {
                buf[0] = 0x04;
            }
            if (light == 1) {
                buf[0] = 0x08;
            }
            buf[1] = r;
            buf[2] = g;
            buf[3] = b;
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);
        }

    }
    /**
    * Close all headlights.
    */
    //% inlineInputMode=inline
    //% block="ヘッドライトを消す"
    //% weight=55
    export function closeheadlights(): void {
        let buf = pins.createBuffer(4);
        buf[0] = 0x04;
        buf[1] = 0;
        buf[2] = 0;
        buf[3] = 0;
        pins.i2cWriteBuffer(STM8_ADDRESSS, buf);
        buf[0] = 0x08;
        pins.i2cWriteBuffer(STM8_ADDRESSS, buf);
    }

    /**
    * Judging the Current Status of Tracking Module. 
    * @param state Four states of tracking module, eg: TrackingState.L_R_line
    */
    //% blockId=ringbitcar_tracking block="ライントレースセンサが %state"
    //% weight=50
    export function tracking(state: TrackingState): boolean {
        pins.setPull(DigitalPin.P13, PinPullMode.PullNone)
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone)
        let left_tracking = pins.digitalReadPin(DigitalPin.P13);
        let right_tracking = pins.digitalReadPin(DigitalPin.P14);
        if (left_tracking == 0 && right_tracking == 0 && state == 0) {
            return true;
        }
        else if (left_tracking == 1 && right_tracking == 0 && state == 1) {
            return true;
        }
        else if (left_tracking == 0 && right_tracking == 1 && state == 2) {
            return true;
        }
        else if (left_tracking == 1 && right_tracking == 1 && state == 3) {
            return true;
        }
        else {
            return false;
        }
    }

    //% block="15cmより近い"
    //% weight=52

    export function kyori(): boolean {
        let dis = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters)
        if (dis < 15 && dis > 2) {
            return true;
        }
        else {
            return false;
        }

    }


    //% block="30cmより近い"
    //% weight=51

    export function kyori2(): boolean {
        let dis = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters)
        if (dis < 30 && dis > 2) {
            return true;
        }
        else {
            return false;
        }

    }




    /**
    * Cars can extend the ultrasonic function to prevent collisions and other functions.. 
    * @param Sonarunit two states of ultrasonic module, eg: Centimeters
    */
    //% blockId=ultrasonic block="超音波センサの値 %unit"
    //% weight=35
    export function ultrasonic(unit: SonarUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(DigitalPin.P8, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P8, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P8, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P8, 0);
        // read pulse
        const d = pins.pulseIn(DigitalPin.P12, PulseValue.High, maxCmDistance * 50);
        switch (unit) {
            case SonarUnit.Centimeters:
                return Math.floor(d * 9 / 6 / 58);
            case SonarUnit.Inches:
                return Math.floor(d * 9 / 6 / 148);
            default:
                return d;
        }
    }

}
