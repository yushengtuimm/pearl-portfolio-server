exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 30:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function processBackgroundColor(color) {
    let newColor = color;
    if (newColor.charAt(0) != '#') {
        newColor = '#' + newColor;
    }
    if (newColor.length == 7) {
        let validHex = true;
        for (let i = 1; i < 7; i++) {
            if (!isHex(newColor.charAt(i))) {
                validHex = false;
                break;
            }
        }
        if (validHex) {
            return '"' + newColor + '"';
        }
    }
}
function isHex(char) {
    return (char == '0' ||
        char == '1' ||
        char == '2' ||
        char == '3' ||
        char == '4' ||
        char == '5' ||
        char == '6' ||
        char == '7' ||
        char == '8' ||
        char == '9' ||
        char == 'a' ||
        char == 'b' ||
        char == 'c' ||
        char == 'd' ||
        char == 'e' ||
        char == 'f' ||
        char == 'A' ||
        char == 'B' ||
        char == 'C' ||
        char == 'D' ||
        char == 'E' ||
        char == 'F');
}
class Options {
    constructor() {
        this.quality = 100;
        this.density = 300;
        this.width;
        this.height;
        this.background = '"#FFFFFF"';
    }
    setDensity(density) {
        if (!density)
            return;
        if (density < 10 || density > 1000)
            throw new Error('Density should be a valid density number');
        this.density = density;
    }
    setQuality(quality) {
        if (!quality)
            return;
        if (quality < 1 || quality > 100)
            throw new Error('Quality should be a valid quality number');
        this.quality = quality;
    }
    setWidth(width) {
        if (!width)
            return;
        if (width < 1 || width > 10000)
            throw new Error('Width should be a valid width number');
        this.width = width;
    }
    setHeight(height) {
        if (!height)
            return;
        if (height < 1 || height > 10000)
            throw new Error('Height should be a valid height number');
        this.height = height;
    }
    setBackground(background) {
        if (!background)
            return;
        this.background = processBackgroundColor(background);
    }
    get options() {
        return [
            {
                key: 'quality',
                value: this.quality,
            },
            {
                key: 'density',
                value: this.density,
            },
            {
                key: 'width',
                value: this.width,
            },
            {
                key: 'height',
                value: this.height,
            },
            {
                key: 'background',
                value: this.background,
            },
        ].filter((option) => option.value);
    }
    get convertString() {
        return this.options.reduce((accumulator, currentValue) => accumulator + ' -' + currentValue.key + ' ' + currentValue.value, '');
    }
    static create({ density, quality, width, height, background, }) {
        const options = new Options();
        options.setDensity(density);
        options.setQuality(quality);
        options.setWidth(width);
        options.setHeight(height);
        options.setBackground(background);
        return options;
    }
}
exports.default = Options;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cfe4d4d6c29be63ea84b")
/******/ })();
/******/ 
/******/ }
;