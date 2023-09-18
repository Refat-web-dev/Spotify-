import { getDetails, getUser } from "./modules/http.request"
import { reloadSpotiPlaylist } from "./modules/reload";
import { scrollToX } from "./modules/scrollFunction";
import { token } from "./modules/token";


let spotify_playlists = document.querySelector(".spotify_playlists")
let focus = document.querySelector(".focus")
let nav_header = document.querySelector(".nav_header")
let container = document.querySelector(".container")

scrollToX(focus)
scrollToX(spotify_playlists)

const initialColor = [0, 0, 0, 0.0]; // Начальный цвет с прозрачностью [R, G, B, A]
const targetColor = [18, 18, 18, 1.0]; // Целевой цвет с прозрачностью [R, G, B, A]

container.addEventListener('scroll', () => {
    const currentScrollTop = container.scrollTop;

    if (currentScrollTop > 50) {
        const progress = Math.min((currentScrollTop - 50) / 100, 1); // Прогресс от 0 до 1
        const newColor = blendColors(initialColor, targetColor, progress);
        nav_header.style.background = `rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, ${newColor[3]})`;
    } else {
        nav_header.style.background = `rgba(${initialColor[0]}, ${initialColor[1]}, ${initialColor[2]}, ${initialColor[3]})`;
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
    location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read%20user-read-recently-played`)
    localStorage.setItem("token", JSON.stringify(location.href.split('access_token=').at(-1)))
}


let audio = document.getElementById("audio");
let progress = document.querySelector(".progress");
let line = document.querySelector(".parent_line");
let volume = document.querySelector(".volume img");
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
});

volume.onclick = () => {
    if (audio.volume !== 0) {
        audio.volume = 0
        volume_progressed.style.width = 0 + "px";
    } else {
        audio.volume = currentVolume
        volume_progressed.style.width = currentVolume * 100 + "px";
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

        let btns = document.querySelectorAll(".item_img")

        btns.forEach(btn => {
            btn.onclick = () => {

                isPlaying = true
                btnPlay.src = "/icons/pause.svg"
                playlist.length = 0

                getDetails(`/playlists/${btn.id.split("/").at(-2)}/tracks`)
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
        let btns = document.querySelectorAll(".item_img")

        btns.forEach(btn => {
            btn.onclick = () => {

                isPlaying = true
                btnPlay.src = "/icons/pause.svg"
                playlist.length = 0

                getDetails(`/playlists/${btn.id.split("/").at(-2)}/tracks`)
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

        audio.src = playlist[treck].preview_url;
        track_name.innerHTML = playlist[treck].name;
        track_author.innerHTML = playlist[treck].artists[0].name;
        track_img.src = playlist[treck].album.images.at(-1).url;

        console.log(playlist[treck].preview_url, playlist[treck].name);
        console.log(playlist);
        console.log(playlist[treck]);
    })
