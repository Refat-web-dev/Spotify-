export function scrollToX(cont) {

    let isMouseDown = false;
    let startX;
    let scrollLeft;

    cont.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - cont.offsetLeft;
        scrollLeft = cont.scrollLeft;
    });

    cont.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    cont.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    cont.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - cont.offsetLeft;
        const walk = (x - startX);
        cont.scrollLeft = scrollLeft - walk * 3;
    });
}
export function scrollToY(cont) {

    let isMouseDown = false;
    let startY;
    let scrollTop;
    let bg = getComputedStyle(cont).getPropertyValue("background").split(")")[0] + ")"

    cont.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startY = e.pageY - cont.offsetTop;
        scrollTop = cont.scrollTop;
        console.log(bg);
    });

    cont.addEventListener('mouseleave', () => {
        isMouseDown = false;
        cont.style.background = bg
        cont.style.opacity = "1"
    });

    cont.addEventListener('mouseup', () => {
        cont.style.background = bg
        cont.style.opacity = "1"
        isMouseDown = false;
    });

    cont.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const y = e.pageY - cont.offsetTop;
        const walk = (y - startY) * 2;
        cont.scrollTop = scrollTop - walk;
        cont.style.background = "#0000007f"
    });
}