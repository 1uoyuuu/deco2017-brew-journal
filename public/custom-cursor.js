(function () {

    const follower = document.querySelector('#cursor');
    window.addEventListener("mousedown", ()=>{
        follower.style.opacity = "0";
        follower.style.transition = "opacity 200ms ease";
    });
    window.addEventListener("mouseup", ()=>{
        follower.style.opacity = "1";
    });

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const ease = 0.1;

    function easeTo() {
        const followerBounds = follower.getBoundingClientRect();

        const dX = mouseX - (followerBounds.left + 6);
        const dY = mouseY - (followerBounds.top + 6);

        posX += dX * ease;
        posY += dY * ease;
    }

    function update() {
        easeTo();
        follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        requestAnimationFrame(update);
    }

    function setCoords(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    document.onmousemove = setCoords;
    update();
})();


