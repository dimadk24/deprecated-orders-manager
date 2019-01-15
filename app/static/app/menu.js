(function () {
    const body = document.body;
    document.getElementById('menu-toggle').addEventListener('click', () => {
        body.classList.toggle('menu--opened')
    });
})();
