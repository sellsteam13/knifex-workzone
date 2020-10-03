import "./import/modules";

document.addEventListener("DOMContentLoaded", () => {
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf('CriOS') == -1 &&
        navigator.userAgent.indexOf('FxiOS') == -1;
    if (isSafari) document.body.classList.add('is-safari');
});