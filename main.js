import { extractColorsFromImage, getTopColors } from "./modules/colors";
import { getDetails, getUser } from "./modules/http.request"
import { navHeader, header, aside, mainFooter, footer } from "./modules/layouts";
import { asidePlaylists, reloadRecentlyPlayed, reloadSpotiPlaylist } from "./modules/reload";
import { scrollToX } from "./modules/scrollFunction";
import { token } from "./modules/token";
import { usersCurrentTime } from "./modules/usersCurrentTime";


usersCurrentTime()
let header_place = document.querySelector("header")
let aside_place = document.querySelector("aside")
let nav_header_place = document.querySelector(".nav_header")
let main_footer = document.querySelector(".main_footer")
let footer_place = document.querySelector("footer")
header(header_place)
aside(aside_place)
navHeader(nav_header_place)
mainFooter(main_footer)
footer(footer_place)
const allScopes = [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-library-read',
    'user-library-modify',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-top-read',
    'user-follow-read',
    'user-follow-modify',
    'user-read-email',
    // Добавьте сюда другие скоупы, если они вам нужны
];
let playlists = document.querySelector(".playlists")
let recently_played = document.querySelector(".recently_played")
let spotify_playlists = document.querySelector(".spotify_playlists")
let focus = document.querySelector(".focus")
let container = document.querySelector(".container")
let canvas = document.querySelector(".content_after")

scrollToX(focus)
scrollToX(spotify_playlists)

const initialColor = [0, 0, 0, 0.0]; // Начальный цвет с прозрачностью [R, G, B, A]
const targetColor = [18, 18, 18, 1.0]; // Целевой цвет с прозрачностью [R, G, B, A]

container.addEventListener('scroll', () => {
    const currentScrollTop = container.scrollTop;

    if (currentScrollTop > 50) {
        const progress = Math.min((currentScrollTop - 50) / 100, 1); // Прогресс от 0 до 1
        const newColor = blendColors(initialColor, targetColor, progress);
        nav_header_place.style.background = `rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, ${newColor[3]})`;
    } else {
        nav_header_place.style.background = `rgba(${initialColor[0]}, ${initialColor[1]}, ${initialColor[2]}, ${initialColor[3]})`;
    }
});

// Функция для плавного перехода между цветами
function blendColors(startColor, endColor, progress) {
    const blendedColor = [];
    for (let i = 0; i < 4; i++) {
        blendedColor[i] = startColor[i] + (endColor[i] - startColor[i]) * progress;
    }
    return blendedColor;
}

if (!token) {
    location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=${allScopes.join('%20')}`)
    localStorage.setItem("token", JSON.stringify(location.href.split('access_token=').at(-1)))
}


let audio = document.getElementById("audio");
let progress = document.querySelector(".progress");
let line = document.querySelector(".parent_line");
let volume = document.querySelector(".volume img");
let liked = document.querySelector(".player_left .actions button img");
let volume_line = document.querySelector(".volume_parent");
let volume_progressed = document.querySelector(".volume_progressed");
let btnPlay = document.querySelector(".controls .play img");
let btnPrev = document.querySelector(".prev");
let btnNext = document.querySelector(".next");
let currentTime = document.querySelector(".currentTime");
let duration = document.querySelector(".duration");
let track_name = document.querySelector(".track_name");
let track_author = document.querySelector(".track_author");
let track_img = document.querySelector(".track_img");
let isPlaying = false
let playlist = [];

liked.onclick = () => {
    liked.src = "/icons/heart_active.svg"
}

duration.innerHTML = "00:30"

let treck; // Переменная с индексом трека

// Событие перед загрузкой страницы
window.onload = function () {
    treck = 0; // Присваиваем переменной ноль
}

function switchTreck(numTreck) {
    track_name.innerHTML = playlist[numTreck].name;
    track_author.innerHTML = playlist[numTreck].artists[0].name;
    track_img.src = playlist[numTreck].album.images.at(-1).url;
    console.log(playlist[numTreck]);
    // Меняем значение атрибута src
    audio.src = playlist[numTreck].preview_url;
    // Назначаем время песни ноль
    audio.currentTime = 0;
    // Включаем песню
    audio.play();
}

btnPlay.onclick = () => {
    isPlaying = !isPlaying

    if (isPlaying) {
        audio.play()
        btnPlay.src = "/icons/pause.svg"
    }
    else {
        audio.pause()
        btnPlay.src = "/icons/play.svg"
    }

}


audio.ontimeupdate = (e) => {

    currentTime.innerHTML = `${Math.ceil(audio.currentTime)}`.length < 2 ? "00:0" + Math.ceil(audio.currentTime) : "00:" + Math.ceil(audio.currentTime)
    progress.style.width = (audio.currentTime * 100) / audio.duration + '%';
    if ((audio.currentTime * 100) / audio.duration === 100) {
        if (treck < playlist.length - 1) { // Если да, то
            treck++; // Увеличиваем её на один
            switchTreck(treck); // Меняем песню
        } else { // Иначе
            treck = 0; // Присваиваем ей ноль
            switchTreck(treck); // Меняем песню
        }
    }

}

let isMouseDown = false;
let volumeisMouseDown = false;

line.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    progress.style.width = e.offsetX + "px";
    audio.currentTime = e.offsetX / line.offsetWidth * audio.duration
});



line.addEventListener('mouseup', () => {
    audio.play()
    isMouseDown = false;
});

line.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    progress.style.width = e.offsetX + "px";
    audio.currentTime = e.offsetX / line.offsetWidth * audio.duration
    audio.pause()
});

let currentVolume = 1

volume_line.addEventListener('mousedown', (e) => {
    volumeisMouseDown = true;
    volume_progressed.style.width = e.offsetX + "px";
    audio.volume = e.offsetX / 100
    currentVolume = audio.volume
    console.log(currentVolume);
    if (currentVolume < 0.50) {
        volume.src = "/icons/low_volume.svg"
    } else {
        volume.src = "/icons/high_volume.svg"
    }
});



volume_line.addEventListener('mouseup', () => {
    volumeisMouseDown = false;
});

volume_line.addEventListener('mousemove', (e) => {
    if (!volumeisMouseDown) return;
    e.preventDefault();
    volume_progressed.style.width = e.offsetX + "px";
    audio.volume = e.offsetX / 100
    currentVolume = audio.volume
    if (currentVolume < 0.50) {
        volume.src = "/icons/low_volume.svg"
    } else {
        volume.src = "/icons/high_volume.svg"
    }
});

volume_line.addEventListener('mouseleave', (e) => {
    volumeisMouseDown = false;
});

volume.onclick = () => {
    if (audio.volume !== 0) {
        audio.volume = 0
        volume_progressed.style.width = 0 + "px";
        volume.src = "/icons/mute_volume.svg"
    } else {
        audio.volume = currentVolume
        volume_progressed.style.width = currentVolume * 100 + "px";
        if (currentVolume < 0.50) {
            volume.src = "/icons/low_volume.svg"
        } else {
            volume.src = "/icons/high_volume.svg"
        }
    }
}

btnPrev.addEventListener("click", function () {
    btnPlay.src = "/icons/pause.svg"
    isPlaying = true
    // Проверяем что переменная treck больше нуля
    if (treck > 0) {
        treck--; // Если верно, то уменьшаем переменную на один
        switchTreck(treck); // Меняем песню.
    } else { // Иначе
        treck = playlist.length - 1; // Присваиваем три
        switchTreck(treck); // Меняем песню
    }
});

btnNext.addEventListener("click", function () {
    btnPlay.src = "/icons/pause.svg"
    isPlaying = true
    // Проверяем что переменная treck больше трёх
    if (treck < playlist.length - 1) { // Если да, то
        treck++; // Увеличиваем её на один
        switchTreck(treck); // Меняем песню
    } else { // Иначе
        treck = 0; // Присваиваем ей ноль
        switchTreck(treck); // Меняем песню
    }
});

getUser("/me")
    .then(res => {
        if (!res) {
            location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read%20user-read-recently-played`)

        }
        console.log(res.data);
    })

getDetails("/browse/featured-playlists")
    .then(res => {

        if (!res) {
            location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read%20user-read-recently-played`)
            localStorage.setItem("token", JSON.stringify(location.href.split('access_token=').at(-1)))
        }

        reloadSpotiPlaylist(res.data.playlists.items, spotify_playlists)

        let btns = document.querySelectorAll(".spotify_playlists .item_img .play")

        btns.forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation()
                console.log(btn);
                isPlaying = true
                btnPlay.src = "/icons/pause.svg"
                playlist.length = 0

                getDetails(`/playlists/${btn.parentElement.id.split("/").at(-2)}/tracks`)
                    .then(res => {
                        for (let track of res.data.items) {
                            if (track.track.preview_url) playlist.push(track.track)
                        }

                        treck = 0
                        switchTreck(treck); // Меняем песню.
                        console.log(playlist);
                    })
            }

        })
    })


const playlistIds = [
    "37i9dQZF1DX4sWSpwq3LiO",
    "37i9dQZF1DWZeKCadgRdKQ",
    "37i9dQZF1DX9sIqqvKsjG8",
    "37i9dQZF1DWZZbwlv3Vmtr",
    "37i9dQZF1DXa2SPUyWl8Y5",
    "37i9dQZF1DWUWUfWSLE7dn",
    "37i9dQZF1DX3DZBe6wPMXo",
    "37i9dQZF1DX7KrTMVQnM02"
];

// Массив для хранения результатов запросов
const playlistData = [];

// Выполните запросы для каждого плейлиста
const axiosPromises = playlistIds.map(playlistId => getDetails(`/playlists/${playlistId}`)
    .then(res => {
        playlistData.push(res.data); // Добавляем результат в массив
    })
    .catch(error => {
        console.error(`Error fetching playlist ${playlistId}:`, error);
    })
);

// Дождитесь завершения всех запросов
Promise.all(axiosPromises)
    .then(() => {
        reloadSpotiPlaylist(playlistData, focus);
        let btns = document.querySelectorAll(".focus .item_img .play")

        btns.forEach(btn => {
            btn.onclick = () => {

                isPlaying = true
                btnPlay.src = "/icons/pause.svg"
                playlist.length = 0

                getDetails(`/playlists/${btn.parentElement.id.split("/").at(-2)}/tracks`)
                    .then(res => {
                        for (let track of res.data.items) {
                            if (track.track.preview_url) playlist.push(track.track)
                        }

                        treck = 0
                        switchTreck(treck); // Меняем песню.
                        console.log(playlist);
                    })
            }
        })
    });

getDetails("/me/player/recently-played")
    .then(res => {
        // if (!res) {
        //     location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read%20user-read-recently-played`)
        // }
        playlist.length = 0
        for (let track of res.data.items) {
            if (track.track.preview_url) playlist.push(track.track)
        }


        reloadRecentlyPlayed(playlist.slice(0, 6), recently_played)
        asidePlaylists(playlist, playlists)
        let btns = document.querySelectorAll(".recently_played .play")

        btns.forEach((btn, i) => {
            btn.onclick = () => {
                isPlaying = true
                btnPlay.src = "/icons/pause.svg"
                treck = i
                audio.src = btn.id;
                audio.play()

                track_name.innerHTML = playlist[i].name;
                track_author.innerHTML = playlist[i].artists[0].name;
                track_img.src = playlist[i].album.images.at(-1).url;
            }
            btn.parentElement.onmouseenter = () => {
                extractColorsFromImage(playlist[i].album.images.at(-1).url)
                    .then(colors => {
                        const topColors = getTopColors(colors, 1)[0];
                        canvas.style.background = `rgba(${topColors}, 0.643)`
                        // Здесь можно использовать полученные цвета в вашем приложении
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                    });
            }
            btn.parentElement.onmouseleave = () => {
                usersCurrentTime()
            }
        })
        audio.src = playlist[0].preview_url;
        track_name.innerHTML = playlist[0].name;
        track_author.innerHTML = playlist[0].artists[0].name;
        track_img.src = playlist[0].album.images.at(-1).url;

    })
