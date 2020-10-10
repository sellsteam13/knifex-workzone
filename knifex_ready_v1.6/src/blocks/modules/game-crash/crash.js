class Crash {
    constructor(parent, props) {
        // var's
        this.parent = document.querySelector(parent);
        this.baseFPS = props.baseFPS ? props.baseFPS : 60;
        this.maxBaseCoeffs = props.baseCoeff ? props.baseCoeff : 4;
        this.intervalHolder;
        this.coeffsIntervalHolder;
        this.maxCoeffsIntervalHolder;
        this.timeIntervalHolder;
        this.timerIntervalHolder;
        this.isPlaying = false;
        this.isInserted = false;
        this.globalActuallCoeff = 1;
        this.strokeWidth = props.strokeWidth ? props.strokeWidth : 2;
        this.coeffsHolder = props.actuallCoeffsHolderClass ? props.actuallCoeffsHolderClass : null;
        this.maxCoeffHolder = props.intermediateCoeffHolderClass ? props.intermediateCoeffHolderClass : null;
        this.timeHolder = props.timeHolderClass ? props.timeHolderClass : null;
        this.backAnimationHolder = props.backAnimationHolderClass ? props.backAnimationHolderClass : null;
        this.timerHolder = props.timerHolderClass ? props.timerHolderClass : null;
        // gradients
        this.progressGradient = {
            firstColor: props.progressGradient ? props.progressGradient.firstColor : "rgba(189,121,255,1)",
            secondColor: props.progressGradient ? props.progressGradient.secondColor : "rgba(46,112,255,0)"
        };
        this.strokeGradient = {
            firstColor: props.strokeGradient ? props.strokeGradient.firstColor : "rgba(189,121,255,1)",
            secondColor: props.strokeGradient ? props.strokeGradient.secondColor : "rgba(46,112,255,1)"
        };
        this.finishGradient = {
            firstColor: props.finishGradient ? props.finishGradient.firstColor : "rgba(211,46,65,.9)",
            secondColor: props.finishGradient ? props.finishGradient.secondColor : "rgba(211,46,65,0)"
        };
        // layout
        this.graphLayout = `
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" >
                <defs>
                    <linearGradient id="progress-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="${this.progressGradient.firstColor}"></stop>
                        <stop offset="100%" stop-color="${this.progressGradient.secondColor}"></stop>
                    </linearGradient>
                    <linearGradient id="stroke-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="${this.strokeGradient.firstColor}"></stop>
                        <stop offset="100%" stop-color="${this.strokeGradient.secondColor}"></stop>
                    </linearGradient>
                    <linearGradient id="finish-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="${this.finishGradient.firstColor}"></stop>
                        <stop offset="100%" stop-color="${this.finishGradient.secondColor}"stop>
                    </linearGradient>
                    <clipPath id="graph-bg-mask">
                        <path class="clip-path" stroke-width="${this.strokeWidth}" fill="none" d="M0,${this.parent.offsetHeight} C${0.66 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${0.5 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${this.parent.offsetWidth},${this.parent.offsetHeight}V${this.parent.offsetHeight} H0"></path>
                    </clipPath>
                </defs>
                <rect class="rect" x="0" y="${this.parent.offsetHeight}" width="${this.parent.offsetWidth}" height="0" clip-path="url(#graph-bg-mask)"></rect>
                <path class="path" stroke="url(#stroke-gradient)" stroke-width="${props.strokeWidth}" fill="none" d="M0,${this.parent.offsetHeight} C216,${this.parent.offsetHeight} 162.5,${this.parent.offsetHeight} ${this.parent.offsetWidth},${this.parent.offsetHeight}"></path>
            </svg>
        `;
        // updating layout to default state
        this.updateLayout = () => {
            this.parent.querySelector('.path').setAttribute('d', `M0,${this.parent.offsetHeight - 2} C${0.66 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${0.5 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${this.parent.offsetWidth},${this.parent.offsetHeight - 2}`);
            this.parent.querySelector('.clip-path').setAttribute('d', `M0,${this.parent.offsetHeight} C${0.66 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${0.5 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${this.parent.offsetWidth},${this.parent.offsetHeight}V${this.parent.offsetHeight} H0`);
            this.parent.querySelector('.rect').setAttribute('y', `${this.parent.offsetHeight}`);
            this.parent.querySelector('.rect').setAttribute('width', `${this.parent.offsetWidth}`);
            this.parent.querySelector('.rect').setAttribute('height', `0`);
        };
        // function to insert HTML layout
        this.insertHTML = () => {
            this.parent.innerHTML = this.graphLayout;
            this.parent.querySelector('.path').classList.add('is-filled');
            this.isInserted = true;
        };
        // base growing rate
        this.growingRate = (ms) => {
            let r = 0.00006;
            return Math.floor(100 * Math.pow(Math.E, r * ms));
        };
        // function to getting rid of the fractional part of a number
        this.getDecimal = (num) => {
            let result;
            let initialNum = Math.abs(num);
            let roundedNum = Math.round(initialNum);

            if (roundedNum > initialNum) {
                result = roundedNum - initialNum - 1;
                result = Math.abs(result);
                result = +result.toFixed(10);
            } else {
                result = initialNum - roundedNum;
                result = +result.toFixed(10);
            }
            return result;
        };
        // resetting all intervals
        this.resetInterval = () => {
            clearInterval(this.intervalHolder);
            clearInterval(this.coeffsIntervalHolder);
            clearInterval(this.maxCoeffsIntervalHolder);
            clearInterval(this.timeIntervalHolder);
            clearInterval(this.timerIntervalHolder);
            this.timerIntervalHolder = null;
            this.intervalHolder = null;
            this.coeffsIntervalHolder = null;
            this.maxCoeffsIntervalHolder = null;
            this.timeIntervalHolder = null;
        };
        // creating basic layout
        this.insertHTML();
    };
    // render graph
    renderGraph(renderedCoeff) {
        const mainPath = this.parent.querySelector('.path');
        const mainRect = this.parent.querySelector('.rect');
        const mask = this.parent.querySelector('.clip-path');
        if (renderedCoeff > -1) {
            // Changing svg graph
            mainPath.setAttribute('d', `M0,${this.parent.offsetHeight - 2} C${0.66 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${0.5 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${this.parent.offsetWidth},${renderedCoeff}`);
            mask.setAttribute('d', `M0,${this.parent.offsetHeight - 2} C${0.66 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${0.5 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${this.parent.offsetWidth},${renderedCoeff}V${this.parent.offsetHeight} H0`);
            mainRect.setAttribute('y', `${renderedCoeff}`);
            mainRect.setAttribute('width', `${this.parent.offsetWidth}`);
            mainRect.setAttribute('height', `${this.parent.offsetHeight - renderedCoeff}`);
        } else {
            // Changing svg graph
            mainPath.setAttribute('d', `M0,${this.parent.offsetHeight - 2} C${0.66 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${0.5 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${this.parent.offsetWidth},${0}`);
            mask.setAttribute('d', `M0,${this.parent.offsetHeight - 2} C${0.66 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${0.5 * this.parent.offsetWidth},${this.parent.offsetHeight - 2} ${this.parent.offsetWidth},${0}V${this.parent.offsetHeight} H0`);
            mainRect.setAttribute('y', `${0}`);
            mainRect.setAttribute('width', `${this.parent.offsetWidth}`);
            mainRect.setAttribute('height', `${this.parent.offsetHeight - 0}`);
        }
    };
    // start crash
    startGrowing(timestamp = Date.now()) {
        if (!this.isPlaying && this.isInserted) {
            // val's
            this.isPlaying = true;
            let newCoeff;
            let coeff;
            // el's
            const mainPath = this.parent.querySelector('.path');
            const mainRect = this.parent.querySelector('.rect');
            const mask = this.parent.querySelector('.clip-path');
            // adding/removing styling classes
            mainRect.classList.remove('is-gradient-finish');
            mainRect.classList.add('is-gradient-progress');
            if (this.coeffsHolder != null) {
                document.querySelector(this.coeffsHolder).classList.remove('is-colored-red');
            }
            // game
            this.intervalHolder = setInterval(() => {
                // Current coeff
                coeff = (this.growingRate(Date.now() - timestamp) / 100);
                this.globalActuallCoeff = coeff;
                // Final render
                newCoeff = this.parent.offsetHeight - ((this.parent.offsetHeight / this.maxBaseCoeffs) * (this.getDecimal(coeff) + (Number.parseInt(coeff) - 1)));
                this.renderGraph(newCoeff);
            }, 1000 / this.baseFPS);
            if (this.coeffsHolder != null) {
                const holder = document.querySelector(this.coeffsHolder);
                this.coeffsIntervalHolder = setInterval(() => {
                    holder.innerHTML = coeff + 'x';
                }, 1000 / (this.baseFPS / 12));
            }
            if (this.maxCoeffHolder != null) {
                let futureCoeff = 4;
                const holder = document.querySelector(this.maxCoeffHolder);
                holder.querySelector('span').innerHTML = this.maxBaseCoeffs + 'x';
                this.maxCoeffsIntervalHolder = setInterval(() => {
                    if (Number.parseInt(futureCoeff) < coeff) {
                        futureCoeff = coeff * 1.5;
                        const oldSpan = holder.querySelector('span');
                        holder.insertAdjacentHTML('afterbegin', `<span class="new-coeff">${Math.ceil(futureCoeff)}x</span>`);
                        const createdSpan = holder.querySelector('.new-coeff');
                        setTimeout(() => {
                            oldSpan.classList.add('is-fade-out');
                            createdSpan.classList.add('is-fade-in');
                        }, 100);
                        setTimeout(() => {
                            oldSpan.parentNode.removeChild(oldSpan);
                        }, 1200);
                    }
                }, 1000);
            }
            if (this.timeHolder != null) {
                const timesInner = document.querySelector(this.timeHolder);
                this.timeIntervalHolder = setInterval(() => {
                    let passedTimeMinutes = parseInt(((Date.now() - timestamp) / (1000 * 60)) % 60);
                    let passedTimeSeconds = parseInt(((Date.now() - timestamp) / (1000)) % 60);
                    let passedTimeGeneral = 60 * passedTimeMinutes + passedTimeSeconds;
                    if (passedTimeGeneral > 18 && passedTimeGeneral % 2 == 0) {
                        const times = Array.from(timesInner.querySelectorAll('span'));
                        const newEl = document.createElement('span');
                        newEl.innerHTML = passedTimeGeneral;
                        timesInner.appendChild(newEl);
                        newEl.style.width = '0';
                        newEl.style.opacity = '0';
                        times[0].style.width = '0';
                        times[0].style.opacity = '0';
                        setTimeout(() => {
                            times[0].parentNode.removeChild(times[0]);
                            newEl.style.width = '10%';
                            newEl.style.opacity = '1';
                        }, 375);
                    }
                }, 1000);
            }
            if (this.backAnimationHolder != null) {
                const animationInner = document.querySelector(this.backAnimationHolder);
                animationInner.classList.remove('is-crashed');
                animationInner.classList.add('is-shown');
            }
            if (this.timerHolder != null) {
                const timerInner = document.querySelector(this.timerHolder);
                timerInner.classList.remove('is-shown');
                clearInterval(this.timerIntervalHolder);
                this.timerIntervalHolder = null;
            }
        }
    };
    // stop crash
    stopGrowing() {
        if (this.isInserted && this.isPlaying) {
            this.isPlaying = false;
            const mainRect = this.parent.querySelector('.rect');
            mainRect.classList.remove('is-gradient-progress');
            mainRect.classList.add('is-gradient-finish');
            if (this.backAnimationHolder != null) {
                const animationInner = document.querySelector(this.backAnimationHolder);
                animationInner.classList.add('is-crashed');
            }
            if (this.coeffsHolder != null) {
                document.querySelector(this.coeffsHolder).classList.add('is-colored-red');
            }
            if (this.timerHolder != null) {
                const timerInner = document.querySelector(this.timerHolder);
                timerInner.classList.remove('is-shown');
            }

            // reRender graph after resizing and 500 ms :)
            window.addEventListener('resize', () => {
                let btwCoeff = this.parent.offsetHeight - ((this.parent.offsetHeight / this.maxBaseCoeffs) * (this.getDecimal(this.globalActuallCoeff) + (Number.parseInt(this.globalActuallCoeff) - 1)));;
                setTimeout(() => {
                    this.renderGraph(btwCoeff);
                }, 500)
            });

            this.resetInterval();
        }
    };
    // reset crash
    resetGraph() {
        if (this.isInserted) {
            this.isPlaying = false;
            this.globalActuallCoeff = 1;
            if (this.backAnimationHolder != null) {
                const animationInner = document.querySelector(this.backAnimationHolder);
                animationInner.classList.remove('is-shown');
                animationInner.classList.remove('is-crashed');
            }
            this.updateLayout();
            if (this.coeffsHolder != null) {
                document.querySelector(this.coeffsHolder).classList.remove('is-colored-red');
                document.querySelector(this.coeffsHolder).innerHTML = '';
            }
            if (this.maxCoeffHolder != null) {
                document.querySelector(this.maxCoeffHolder).querySelector('span').innerHTML = this.maxBaseCoeffs + 'x';
            }
            if (this.timeHolder != null) {
                const timesInner = document.querySelector(this.timeHolder);
                const times = Array.from(timesInner.querySelectorAll('span'));
                times.forEach(each => {
                    each.innerHTML = times.indexOf(each) * 2;
                });
            }
            if (this.timerHolder != null) {
                const timerInner = document.querySelector(this.timerHolder);
                timerInner.classList.remove('is-shown');
            }
            this.resetInterval();
        }
    };
    // bind timer
    bindTimer(ms) {
        if (this.timerHolder != null && !this.isPlaying && !isNaN(ms) && typeof ms == 'number' && ms > 100) {
            const timerInner = document.querySelector(this.timerHolder);
            let time = ms / 1000;
            timerInner.classList.add('is-shown');
            this.timerIntervalHolder = setInterval(() => {
                if (time != 0) {
                    time = time - 0.1;
                    time = time.toFixed(1);
                    timerInner.innerHTML = time + 'сек.';
                } else {
                    clearInterval(this.timerIntervalHolder);
                    this.timerIntervalHolder = null;
                }
            }, 100);
        }
    };
    // crash after render
    crashOnCoeff(settedCoeff) {
        if (!this.isPlaying && settedCoeff >= 1 && typeof settedCoeff == 'number') {
            let finalTime = 16666.666667 * Math.log(0.01 * (settedCoeff * 100));
            // setting actual settedCoeff
            if (this.coeffsHolder != null) {
                const holder = document.querySelector(this.coeffsHolder);
                holder.classList.add('is-colored-red');
                holder.innerHTML = settedCoeff.toFixed(2) + 'x';
            }
            // rendering graph
            let newCoeff;
            // el's
            const mainPath = this.parent.querySelector('.path');
            const mainRect = this.parent.querySelector('.rect');
            const mask = this.parent.querySelector('.clip-path');
            if (mainRect && mainPath && mask) {
                // adding/removing styling classes
                mainRect.classList.add('is-gradient-finish');
                mainRect.classList.remove('is-gradient-progress');
                // Final render
                newCoeff = this.parent.offsetHeight - ((this.parent.offsetHeight / this.maxBaseCoeffs) * (this.getDecimal(settedCoeff) + (Number.parseInt(settedCoeff) - 1)));
                this.renderGraph(newCoeff);
            }
            // reRender graph after resizing
            window.addEventListener('resize', () => {
                let btwCoeff = this.parent.offsetHeight - ((this.parent.offsetHeight / this.maxBaseCoeffs) * (this.getDecimal(settedCoeff) + (Number.parseInt(settedCoeff) - 1)));;
                setTimeout(() => {
                    this.renderGraph(btwCoeff);
                }, 500)
            });
        }
    };
}

window.Crash = Crash;

export default Crash;