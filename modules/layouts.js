export function header(place) {
    place.innerHTML = ""

    // Header

    // let header = document.createElement("header")
    let tabs = document.createElement("div")
    let home_tab = document.createElement("div")
    let home_icon = document.createElement("div")
    let home_text = document.createElement("span")
    let search_tab = document.createElement("div")
    let search_icon = document.createElement("div")
    let search_text = document.createElement("span")

    // header.classList.add("header")
    tabs.classList.add("tabs")
    home_icon.classList.add("home_icon")
    home_tab.classList.add("home_tab")
    home_tab.classList.add("active_tab")
    search_tab.classList.add("search_tab")
    search_icon.classList.add("search_icon")
    home_text.innerHTML = "Home"
    search_text.innerHTML = "Search"
    tabs.append(home_tab, search_tab)
    home_tab.append(home_icon, home_text)
    search_tab.append(search_icon, search_text)
    place.append(tabs)
}

export function aside(place) {
    place.innerHTML = ""

    // Aside

    // let aside = document.createElement("aside")
    let library = document.createElement("div")
    let library_top = document.createElement("div")
    let library_head = document.createElement("div")
    let library_icon = document.createElement("div")
    let library_title = document.createElement("h2")
    let library_btns = document.createElement("div")
    let create = document.createElement("div")
    let fullWidth = document.createElement("div")
    let fullWidth_img = document.createElement("img")
    let library_main = document.createElement("div")
    let tags = document.createElement("div")
    let playlist_tag = document.createElement("p")
    let podcast_shows_tag = document.createElement("p")
    let library_find = document.createElement("div")
    let find = document.createElement("input")
    let period = document.createElement("select")
    let option = document.createElement("option")
    let playlists = document.createElement("div")

    library.classList.add("library")
    library_top.classList.add("library_top")
    library_head.classList.add("library_head")
    library_icon.classList.add("library_icon")
    library_btns.classList.add("library_btns")
    create.classList.add("create")
    fullWidth.classList.add("create")
    fullWidth.classList.add("fullWidth")
    library_main.classList.add("library_main")
    tags.classList.add("tags")
    library_find.classList.add("library_find")
    find.classList.add("find")
    period.classList.add("period")
    playlists.classList.add("playlists")
    fullWidth_img.src = "/icons/arrow_right.svg"
    find.type = "text"
    find.placeholder = "Search in Your Library"
    find.name = "find"
    period.name = "period"

    library_title.innerHTML = "Your Library"
    playlist_tag.innerHTML = "Playlist"
    podcast_shows_tag.innerHTML = "Podcast & Shows"
    option.innerHTML = "Recents"

    library.append(library_top, playlists)
    library_top.append(library_head, library_main)
    library_head.append(library_icon, library_btns)
    library_icon.append(library_title)
    library_btns.append(create, fullWidth)
    fullWidth.append(fullWidth_img)
    library_main.append(tags, library_find)
    tags.append(playlist_tag, podcast_shows_tag)
    library_find.append(find, period)
    period.append(option)
    place.append(library)
}
export function navHeader(place) {
    place.innerHTML = ""
    // Nav_header

    // let main = document.createElement("main")
    // let nav_header = document.createElement("div")
    let nav_inner_header = document.createElement("div")
    let nav_btns = document.createElement("div")
    let prev_page = document.createElement("button")
    let prev_page_img = document.createElement("img")
    let next_page = document.createElement("button")
    let next_page_img = document.createElement("img")
    let other_btns = document.createElement("div")
    let sign_up = document.createElement("button")
    let login = document.createElement("button")
    let account = document.createElement("button")
    let account_img = document.createElement("img")
    // let container = document.createElement("div")
    // let content = document.createElement("div")
    // let content_after = document.createElement("div")
    // let block = document.createElement("div")

    // nav_header.classList.add("nav_header")
    nav_inner_header.classList.add("nav_inner_header")
    nav_inner_header.classList.add("main_cont")
    nav_btns.classList.add("nav_btns")
    prev_page.classList.add("prev_page")
    next_page.classList.add("next_page")
    other_btns.classList.add("other_btns")
    sign_up.classList.add("sign_up")
    sign_up.classList.add("reg")
    login.classList.add("login")
    login.classList.add("reg")
    account.classList.add("account")
    // container.classList.add("container")
    // content.classList.add("content")
    // content_after.classList.add("content_after")
    // block.classList.add("block")
    // block.classList.add("main_cont")

    prev_page_img.src = "/icons/prev_page.svg"
    next_page_img.src = "/icons/next_page.svg"

    sign_up.innerHTML = "Explore Premium"
    login.innerHTML = `<img src="/icons/install.svg">Install App`
    account_img.src = "/icons/account.svg"

    // main.append(nav_header, container)
    nav_inner_header.append(nav_btns, other_btns)
    nav_btns.append(prev_page, next_page)
    prev_page.append(prev_page_img)
    next_page.append(next_page_img)
    other_btns.append(sign_up, login, account)
    account.append(account_img)
    // container.append(content)
    // content.append(content_after, block)

    place.append(nav_inner_header)
    // place.append(header, aside, main)
}
let obj = {
    "Company": ["About", "Jobs", "For the Record"],
    "Communities": ["For Artists", "Developers", "Advertising", "Investors", "Vendors"],
    "Useful links": ["Support", "Free Mobile App"]
}

let social_links = ["/icons/inst.svg", "/icons/twitt.svg", "/icons/fb.svg"]

export function mainFooter(place) {

    place.innerHTML = ""

    let links = document.createElement("nav")
    let copyright = document.createElement("div")
    let p = document.createElement("p")
    let links_left = document.createElement("div")
    let links_right = document.createElement("div")

    for (let categ in obj) {

        let list = document.createElement("div")
        let h3 = document.createElement("h3")
        let ul = document.createElement("ul")
        list.classList.add("list")
        h3.innerHTML = categ
        list.append(h3, ul)
        links_left.append(list)

        for (let link of obj[categ]) {

            let li = document.createElement("li")
            let a = document.createElement("a")
            a.href = "#"
            a.innerHTML = link
            li.append(a)
            ul.append(li)

        }
    }

    for (let link of social_links) {
        let a = document.createElement("a")
        let img = document.createElement("img")

        a.href = "#"
        img.src = link
        a.append(img)
        links_right.append(a)
    }

    links.classList.add("links")
    copyright.classList.add("copyright")
    links_left.classList.add("links_left")
    links_right.classList.add("links_right")

    p.innerHTML = "© 2023 Spotify AB"
    links.append(links_left, links_right)
    copyright.append(p)
    place.append(links, copyright)
}
export function footer(place) {
    place.innerHTML = ""
    let player = document.createElement("div")
    let player_left = document.createElement("div")
    let track_img = document.createElement("img")
    let track_info = document.createElement("div")
    let track_name = document.createElement("h2")
    let track_author = document.createElement("p")
    let actions = document.createElement("div")
    let heart = document.createElement("button")
    let heart_img = document.createElement("img")
    let player_center = document.createElement("div")
    let audio = document.createElement("audio")
    let controls = document.createElement("div")
    let mix = document.createElement("button")
    let prev = document.createElement("button")
    let play = document.createElement("button")
    let next = document.createElement("button")
    let replay = document.createElement("button")
    let mix_img = document.createElement("img")
    let prev_img = document.createElement("img")
    let play_img = document.createElement("img")
    let next_img = document.createElement("img")
    let replay_img = document.createElement("img")
    let main_line = document.createElement("div")
    let currentTime = document.createElement("span")
    let parent_line = document.createElement("div")
    let line = document.createElement("div")
    let progress = document.createElement("div")
    let progress_bar = document.createElement("div")
    let duration = document.createElement("span")
    let player_right = document.createElement("div")
    let controls2 = document.createElement("div")
    let act_now_playing = document.createElement("button")
    let clue_now_playing = document.createElement("span")
    let img_now_playing = document.createElement("img")
    let act_lyrics = document.createElement("button")
    let clue_lyrics = document.createElement("span")
    let img_lyrics = document.createElement("img")
    let act_queue = document.createElement("button")
    let clue_queue = document.createElement("span")
    let img_queue = document.createElement("img")
    let act_connect = document.createElement("button")
    let clue_connect = document.createElement("span")
    let img_connect = document.createElement("img")
    let act_volume = document.createElement("div")
    let clue_volume = document.createElement("span")
    let img_volume = document.createElement("img")
    let volume_parent = document.createElement("div")
    let volume_progress_bar = document.createElement("div")
    let volume_progressed = document.createElement("div")
    let volume_point = document.createElement("div")
    let act_picture = document.createElement("button")
    let clue_picture = document.createElement("span")
    let img_picture = document.createElement("img")

    player.classList.add("player")
    player_left.classList.add("player_left")
    track_img.classList.add("track_img")
    track_info.classList.add("track_info")
    track_name.classList.add("track_name")
    track_author.classList.add("track_author")
    actions.classList.add("actions")
    player_center.classList.add("player_center")
    controls.classList.add("controls")
    mix.classList.add("mix")
    prev.classList.add("prev")
    play.classList.add("play")
    next.classList.add("next")
    replay.classList.add("replay")
    main_line.classList.add("main_line")
    currentTime.classList.add("currentTime")
    parent_line.classList.add("parent_line")
    line.classList.add("line")
    progress.classList.add("progress")
    progress_bar.classList.add("progress-bar")
    duration.classList.add("duration")
    player_right.classList.add("player_right")
    controls2.classList.add("controls")
    act_now_playing.classList.add("act")
    clue_now_playing.classList.add("clue")
    act_lyrics.classList.add("act")
    clue_lyrics.classList.add("clue")
    act_queue.classList.add("act")
    clue_queue.classList.add("clue")
    act_connect.classList.add("act")
    act_connect.classList.add("connect")
    clue_connect.classList.add("clue")
    act_volume.classList.add("act")
    act_volume.classList.add("volume")
    clue_volume.classList.add("clue")
    volume_parent.classList.add("volume_parent")
    volume_progress_bar.classList.add("volume_progress_bar")
    volume_progressed.classList.add("volume_progressed")
    volume_point.classList.add("volume_point")
    act_picture.classList.add("act")
    act_picture.classList.add("picture")
    clue_picture.classList.add("clue")
    img_picture.classList.add("img")

    track_img.src = "/images/ab67616d00004851e787cffec20aa2a396a61647.png"
    track_name.innerHTML = "Cruel Summer"
    track_author.innerHTML = "Taylor Swift"

    heart_img.src = "/icons/heart.svg"

    audio.id = "audio"

    mix_img.src = "/icons/remix.svg"
    prev_img.src = "/icons/prev.svg"
    play_img.src = "/icons/play.svg"
    next_img.src = "/icons/next.svg"
    replay_img.src = "/icons/replay.svg"

    currentTime.innerHTML = "--:--"
    duration.innerHTML = "--:--"

    clue_now_playing.innerHTML = "Now Playing View"
    img_now_playing.src = "/icons/now_playing.svg"

    clue_lyrics.innerHTML = "Lyrics"
    img_lyrics.src = "/icons/lyrics.svg"

    clue_queue.innerHTML = "Queue"
    img_queue.src = "/icons/queue.svg"

    clue_connect.innerHTML = "Connect to a device"
    img_connect.src = "/icons/connect.svg"

    clue_volume.innerHTML = "Mute"
    img_volume.src = "/icons/volume.svg"

    clue_picture.innerHTML = "Picture in picture"
    img_picture.src = "/icons/pictureInpicture.svg"

    player.append(player_left, player_center, player_right)
    player_left.append(track_img, track_info, actions)
    track_info.append(track_name, track_author)
    actions.append(heart)
    heart.append(heart_img)
    player_center.append(audio, controls, main_line)
    controls.append(mix, prev, play, next, replay)
    mix.append(mix_img)
    prev.append(prev_img)
    play.append(play_img)
    next.append(next_img)
    replay.append(replay_img)
    main_line.append(currentTime, parent_line, duration)
    parent_line.append(line)
    line.append(progress)
    progress.append(progress_bar)
    player_right.append(controls2)
    controls2.append(act_now_playing, act_lyrics, act_queue, act_connect, act_volume, act_picture)
    act_now_playing.append(clue_now_playing, img_now_playing)
    act_lyrics.append(clue_lyrics, img_lyrics)
    act_queue.append(clue_queue, img_queue)
    act_connect.append(clue_connect, img_connect)
    act_volume.append(clue_volume, img_volume, volume_parent)
    volume_parent.append(volume_progress_bar)
    volume_progress_bar.append(volume_progressed)
    volume_progressed.append(volume_point)
    act_picture.append(clue_picture, img_picture)

    place.append(player)
}