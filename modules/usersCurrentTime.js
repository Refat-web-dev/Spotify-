export function usersCurrentTime() {
    var today = new Date()
    var curHr = today.getHours()
    let multi_title = document.querySelector(".multi_title a")
    let canvas = document.querySelector(".content_after")
    if (curHr < 12) {
        multi_title.innerHTML = 'Good morning'
        canvas.style.background = "#2e2e2e71"
    } else if (curHr < 18) {
        multi_title.innerHTML = 'Good afternoon'
        canvas.style.background = "#3d3d3d71"
    } else {
        multi_title.innerHTML = 'Good evening'
        canvas.style.background = "#2e2e2e71"
    }
}