import { getDetails, getUser } from "./modules/http.request"
import { reloadSpotiPlaylist } from "./modules/reload";
import { scrollToX } from "./modules/scrollFunction";

let spotify_playlists = document.querySelector(".spotify_playlists")
let reg = document.querySelectorAll(".reg")
let focus = document.querySelector(".focus")
let nav_header = document.querySelector(".nav_header")
let container = document.querySelector(".container")

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

scrollToX(focus)
scrollToX(spotify_playlists)

reg.forEach(btn => {
    btn.onclick = () => {

        location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read%20user-read-recently-played`)

    }
})

localStorage.setItem("token", JSON.stringify(location.href.split('access_token=').at(-1)))

let audio = document.getElementById("audio");
let progress = document.querySelector(".progress");
let line = document.querySelector(".parent_line");
let btnPlay = document.querySelector(".controls .play img");
let btnPrev = document.querySelector(".prev");
let btnNext = document.querySelector(".next");
let currentTime = document.querySelector(".currentTime");
let duration = document.querySelector(".duration");
let isPlaying = false
let playlist = [];
console.log(btnPlay);

let treck; // Переменная с индексом трека

// Событие перед загрузкой страницы
window.onload = function () {
    treck = 0; // Присваиваем переменной ноль
}

function switchTreck(numTreck) {
    // Меняем значение атрибута src
    audio.src = playlist[numTreck];
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

duration.innerHTML = "00:30"

audio.ontimeupdate = () => {
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

// btnPlay.addEventListener("click", function () {

//     isPlaying = !isPlaying
//     if (isPlaying) {
//         audio.play(); // Запуск песни
//         // Запуск интервала
//         var audioPlay = setInterval(function () {
//             // Получаем значение на какой секунде песня
//             let audioTime = Math.round(audio.currentTime);
//             // Получаем всё время песни
//             let audioLength = Math.round(audio.duration)
//             // Назначаем ширину элементу time
//             time.style.width = (audioTime * 100) / audioLength + '%';
//             // Сравниваем, на какой секунде сейчас трек и всего сколько времени длится
//             // И проверяем что переменная treck меньше четырёх
//             if (audioTime == audioLength && treck < 3) {
//                 treck++; // То Увеличиваем переменную
//                 switchTreck(treck); // Меняем трек
//                 // Иначе проверяем тоже самое, но переменная treck больше или равна четырём
//             } else if (audioTime == audioLength && treck >= 3) {
//                 treck = 0; // То присваиваем treck ноль
//                 switchTreck(treck); // Меняем трек
//             }
//         }, 10)

//     } else {
//         audio.pause(); // Останавливает песню
//         clearInterval(audioPlay) // Останавливает интервал
//     }

// });

btnPrev.addEventListener("click", function () {
    btnPlay.src = "/icons/pause.svg"
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
        // if (!res) {
        //     location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read%20user-read-recently-played`)

        // }
        console.log(res.data);
    })

getDetails("/browse/featured-playlists")
    .then(res => {
        // if (!res) {
        //     location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read%20user-read-recently-played`)

        // }
        reloadSpotiPlaylist(res.data.playlists.items, spotify_playlists)

        let btns = document.querySelectorAll(".item_img")
        btns.forEach(btn => {
            btn.onclick = () => {
                playlist.length = 0
                getDetails(`/playlists/${btn.id.split("/").at(-2)}/tracks`)
                    .then(res => {
                        for (let track of res.data.items) {
                            if (track.track.preview_url) playlist.push(track.track.preview_url)
                        }
                        treck = 0
                        switchTreck(treck); // Меняем песню.
                        console.log(playlist);
                        btnPrev.addEventListener("click", function () {
                            btnPlay.src = "/icons/pause.svg"
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
                            // Проверяем что переменная treck больше трёх
                            if (treck < playlist.length - 1) { // Если да, то
                                treck++; // Увеличиваем её на один
                                switchTreck(treck); // Меняем песню
                            } else { // Иначе
                                treck = 0; // Присваиваем ей ноль
                                switchTreck(treck); // Меняем песню
                            }
                        });
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
    });

getDetails("/me/player/recently-played")
    .then(res => {
        // if (!res) {
        //     location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read%20user-read-recently-played`)
        // }
        playlist.length = 0
        for (let track of res.data.items) {
            if (track.track.preview_url) playlist.push(track.track.preview_url)
        }
        console.log(playlist);
        btnPrev.addEventListener("click", function () {
            btnPlay.src = "/icons/pause.svg"
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
            // Проверяем что переменная treck больше трёх
            if (treck < playlist.length - 1) { // Если да, то
                treck++; // Увеличиваем её на один
                switchTreck(treck); // Меняем песню
            } else { // Иначе
                treck = 0; // Присваиваем ей ноль
                switchTreck(treck); // Меняем песню
            }
        });
    })
