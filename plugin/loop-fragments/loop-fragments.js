
let resetFragmentAttribute = 'data-fragment-reset';

let getResetFragmentElement = function (elements) {
    return elements.filter((fragmentElement) => fragmentElement.hasAttribute(resetFragmentAttribute))[0]
};

let checkFragmentLoopable = function (event) {
    let resetFragmentElement = getResetFragmentElement(event.fragments);
    if (resetFragmentElement !== undefined) {
        // we are sliding automatically hitting the looper, so loop
        if (Reveal.isAutoSliding()) {
            let resetTarget = parseInt(resetFragmentElement.getAttribute(resetFragmentAttribute), 10);
            Reveal.navigateFragment(resetTarget, 0);
        }
        // the fragment has been hit manually, so go on
        else {
            Reveal.next();
        }
    }
};

let skipLoopFragment = function (event) {
    let resetFragmentElement = getResetFragmentElement(event.fragments);
    if (resetFragmentElement !== undefined && !Reveal.isAutoSliding()) {
        Reveal.prev();
    }
};

Reveal.addEventListener('fragmentshown', (ev) => checkFragmentLoopable(ev));
Reveal.addEventListener('fragmenthidden', (ev) => skipLoopFragment(ev));
