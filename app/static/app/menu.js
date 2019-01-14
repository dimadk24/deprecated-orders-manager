(function () {
    const nav = document.getElementById('nav');
    document.getElementById('menu-toggle').addEventListener('click', () => {
        nav.classList.toggle('menu--opened')
    });
})();
