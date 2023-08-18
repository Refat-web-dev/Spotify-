export function reloadSpotiPlaylist(arr, place) {

    place.innerHTML = ""

    for (let el of arr) {

        let item = document.createElement("div")
        let item_img = document.createElement("div")
        let img = document.createElement("img")
        let play = document.createElement("button")
        let triangle = document.createElement("img")
        let item_title = document.createElement("h3")
        let item_descr = document.createElement("p")

        item.classList.add("item")
        item_img.classList.add("item_img")
        play.classList.add("play")
        item_title.classList.add("item_title")
        item_descr.classList.add("item_descr")
        img.src = `${el.images[0].url}`
        triangle.src = "/icons/play.svg"
        item_descr.innerHTML = el.description.slice(0, 30) + "..."
        let ln = el.name.length
        if (ln > el.name.slice(0, 14)) {
            item_title.innerHTML = el.name.slice(0, 14) + "..."
        } else {
            item_title.innerHTML = el.name.slice(0, 14)
        }
        item.append(item_img, item_title, item_descr)
        item_img.append(img, play)
        play.append(triangle)

        place.append(item)
    }
}