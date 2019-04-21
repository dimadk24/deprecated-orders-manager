(function () {
    const ANIMATION_DURATION = 200;
    const FADEOUT_CLASS = 'menu--fade-out';
    const OPENED_CLASS = 'menu--opened';
    const body = document.body;
    document.getElementById('menu-toggle').addEventListener('click', () => {
        if (body.classList.contains(OPENED_CLASS)) {
            body.classList.add(FADEOUT_CLASS);
            setTimeout(() => body.classList.remove(FADEOUT_CLASS), ANIMATION_DURATION)
        }
        body.classList.toggle(OPENED_CLASS);
    });
})();
