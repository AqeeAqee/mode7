//no perf optimization yet.

game.stats=true
function Tranform (Input_background: Image, Output_background: Image, H: number, V: number, X0: number, Y0: number, A: number, B: number, C: number, D: number) {
    const AD_BC = A * D - B * C
    for (let y = 0; y <= scene.screenHeight(); y++) {
        for (let x = 0; x <= scene.screenWidth(); x++) {
            const x_X0 = x - X0
            const y_Y0 = y - Y0
            //get Input by Output
            const xInput = ((x_X0) * D - (y_Y0) * B) / (AD_BC) - H + X0
            const yInput = ((x_X0) * C - (y_Y0) * A) / (-AD_BC) - V + Y0
            Output_background.setPixel(x, y, Input_background.getPixel(Math.floor(xInput), Math.floor(yInput)))
        }
    }
    const x=Background.width,y=Background.height
    //get Output by Input
    const xOut = A * (x + H - X0) + B * (y + V - Y0) + X0
    const yOut = C * (x + H - X0) + D * (y + V - Y0) + Y0
    Output_background.drawCircle(xOut, yOut, 2, 2)

    let i=0
    Output_background.print("H="+Math.roundWithPrecision(H,3), 0, i++ * 10, 2)
    Output_background.print("V="+Math.roundWithPrecision(V,3), 0, i++ * 10, 2)
    Output_background.print("A="+Math.roundWithPrecision(A,3), 0, i++ * 10, 2)
    Output_background.print("B="+Math.roundWithPrecision(B,3), 0, i++ * 10, 2)
    Output_background.print("C="+Math.roundWithPrecision(C,3), 0, i++ * 10, 2)
    Output_background.print("D="+Math.roundWithPrecision(D,3), 0, i++ * 10, 2)
}
let A = 0.5//1
let B = -0.5//0
let C = 0.5//0
let D = 0.5//1
let H = 0
let V = 0
let Background = assets.image`Background`
let Transformed_background = image.create(scene.screenWidth(), scene.screenHeight())
scene.setBackgroundImage(Transformed_background)
game.onUpdate(function () {
    Tranform(Background, Transformed_background, H, V, 0.5 * Background.width, 0.5 * Background.height, A, B, C, D, )
    if (controller.A.isPressed()) {
        A += controller.dx(1)
        D += controller.dy(1)
    } else if (controller.B.isPressed()) {
        B += controller.dx(.1)
        C += controller.dy(.1)
    } else {
        H += controller.dx(10)
        V += controller.dy(10)
    }
})
