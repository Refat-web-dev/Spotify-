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
        item.id = el.id
        item.classList.add("item")
        item_img.id = el.tracks.href
        item_img.classList.add("item_img")
        play.classList.add("play")
        item_title.classList.add("item_title")
        item_descr.classList.add("item_descr")
        img.src = `${el.images[0].url}`
        triangle.src = "/icons/playlist_play_icon.svg"
        item_descr.innerHTML = el.description.slice(0, 30) + "..."
        let ln = el.name.trim().length
        if (ln > el.name.slice(0, 15).length) {
            item_title.innerHTML = el.name.slice(0, 15) + "..."
        } else {
            item_title.innerHTML = el.name.slice(0, 15)
        }
        item.append(item_img, item_title, item_descr)
        item_img.append(img, play)
        play.append(triangle)

        place.append(item)

        item.onclick = () => {
            location.assign("/pages/playlist/?id=" + item.id)
        }
    }
}

export function reloadRecentlyPlayed(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {
        let playlist = document.createElement("div")
        let img = document.createElement("img")
        let playlist_title = document.createElement("div")
        let play = document.createElement("button")
        let play_img = document.createElement("img")

        playlist.classList.add("playlist")
        playlist_title.classList.add("playlist_title")
        play.classList.add("play")
        play.id = item.preview_url
        play_img.src = "/icons/playlist_play_icon.svg"
        img.src = `${item.album.images[2].url}`
        playlist_title.innerHTML = item.name

        playlist.append(img, playlist_title, play)
        play.append(play_img)
        place.append(playlist)
    }
}

export function asidePlaylists(arr, place) {
    place.innerHTML = ""

    for (let tracks of arr) {
        let library_playlist = document.createElement("div")
        let library_playlist_images = document.createElement("div")
        for (let i = 0; i < 4; i++) {
            let img = document.createElement("img")
            img.src = tracks.album.images[2].url
            library_playlist_images.append(img)
        }
        let library_playlist_info = document.createElement("div")
        let library_playlist_name = document.createElement("p")
        let library_playlist_owner = document.createElement("p")
        library_playlist.classList.add("library_playlist")
        library_playlist_images.classList.add("library_playlist_images")
        library_playlist_info.classList.add("library_playlist_info")
        library_playlist_name.classList.add("library_playlist_name")
        library_playlist_owner.classList.add("library_playlist_owner")

        library_playlist_name.innerHTML = tracks.artists[0].name
        if (tracks.album.name.length > 13) {

            library_playlist_owner.innerHTML = "Playlist: " + tracks.album.name.slice(0, 13) + "..."
        } else {
            library_playlist_owner.innerHTML = "Playlist: " + tracks.album.name
        }
        library_playlist.append(library_playlist_images, library_playlist_info)
        library_playlist_info.append(library_playlist_name, library_playlist_owner)

        place.append(library_playlist)
    }
}