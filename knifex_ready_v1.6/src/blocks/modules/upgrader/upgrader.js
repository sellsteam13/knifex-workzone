import ProgressBar from 'progressbar.js';
const upgraderStateCircle = document.querySelector('.upgrader-main-circle__track');
if (upgraderStateCircle) {
    var progressBar = new ProgressBar.Circle(upgraderStateCircle, {
        strokeWidth: 2,
        color: '#4DB283',
        trailColor: '#1C1C40',
    });
    const setCircleProgress = (progressNum, durationNum, callback) => {
        let animatingAngle = -360 * progressNum / 2 + 'deg';
        upgraderStateCircle.style.transform = `rotate(${animatingAngle})`;
        progressBar.animate(progressNum, {
            duration: durationNum ? durationNum : 1000
        }, callback);
    };

    const resetCircleProgress = () => {
        progressBar.animate(0);
    };

    window.setCircleProgress = setCircleProgress;
    window.resetCircleProgress = resetCircleProgress;
}