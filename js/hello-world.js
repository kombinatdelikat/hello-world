"use strict";

let currentProgressUpdate;
let cancelCurrentProgressUpdate = function () {
    if (currentProgressUpdate) {
        window.cancelAnimationFrame(currentProgressUpdate);
    }
};
let updateProgress = function (from, to, apply) {
    cancelCurrentProgressUpdate();
    let current = from;
    let factor = from > to ? -1 : 1;
    let step = () => {
        current += factor;
        apply.call(this, current);

        // call next step, if target isn't reached
        if ((from < to && current < to) || (from > to && current > to)) {
            currentProgressUpdate = window.requestAnimationFrame(() => step());
        }
    };

    // call first step initially
    currentProgressUpdate = window.requestAnimationFrame(() => step());
};
let setProgress = function () {
    let progress = Reveal.getProgress();
    let progressElement = document.querySelector('object.progress');
    let slideBarElement = progressElement.contentDocument.querySelector('#progress-mask > rect');

    updateProgress(
        parseInt(slideBarElement.getAttribute('width')),
        progress * 150,
        (step) => slideBarElement.setAttribute('width', step)
    );
};

// More info https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    history: true,
    progress: false,
    controls: false,
    overview: false,
    help: false,
    hideAddressBar: true,

    // More info https://github.com/hakimel/reveal.js#dependencies
    dependencies: [
        {src: 'plugin/loop-fragments/loop-fragments.js'},
        {src: 'plugin/markdown/marked.js'},
        {src: 'plugin/markdown/markdown.js'},
        {src: 'plugin/notes/notes.js', async: true},
        {src: 'plugin/highlight/highlight.js', async: true, callback: () => hljs.initHighlightingOnLoad()}
    ]
});
Reveal.addEventListener('ready', (ev) => setProgress(ev));
Reveal.addEventListener('slidechanged', (ev) => setProgress(ev));
