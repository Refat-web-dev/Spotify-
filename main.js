import { getDetails, getUser } from "./modules/http.request"
import { reloadSpotiPlaylist } from "./modules/reload";
import { scrollToX } from "./modules/scrollFunction";

let spotify_playlists = document.querySelector(".spotify_playlists")
let reg = document.querySelectorAll(".reg")
let focus = document.querySelector(".focus")
let nav_header = document.querySelector(".nav_header")
let container = document.querySelector(".container")

const initialColor = [0, 0, 0, 0.5]; // Начальный цвет с прозрачностью [R, G, B, A]
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
console.log(spotify_playlists);

getDetails("/browse/featured-playlists")
    .then(res => {
        console.log(res.data.playlists.items);
        reloadSpotiPlaylist(res.data.playlists.items, spotify_playlists)
    })

// const playlistIds = [
//     "37i9dQZF1DX4sWSpwq3LiO",
//     "37i9dQZF1DWZeKCadgRdKQ",
//     "37i9dQZF1DX9sIqqvKsjG8",
//     "37i9dQZF1DWZZbwlv3Vmtr",
//     "37i9dQZF1DXa2SPUyWl8Y5",
//     "37i9dQZF1DWUWUfWSLE7dn",
//     "37i9dQZF1DX3DZBe6wPMXo",
//     "37i9dQZF1DX7KrTMVQnM02"
// ];

// // Массив для хранения результатов запросов
// const playlistData = [];

// // Выполните запросы для каждого плейлиста
// const axiosPromises = playlistIds.map(playlistId => getDetails(`/playlists/${playlistId}`)
//     .then(res => {
//         playlistData.push(res.data); // Добавляем результат в массив
//     })
//     .catch(error => {
//         console.error(`Error fetching playlist ${playlistId}:`, error);
//     })
// );

// // Дождитесь завершения всех запросов
// Promise.all(axiosPromises)
//     .then(() => {
//         console.log(playlistData);
//         reloadSpotiPlaylist(playlistData, focus);
//     });

reg.forEach(btn => {
    btn.onclick = () => {

        location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read`)

    }
})

localStorage.setItem("token", JSON.stringify(location.href.split('access_token=').at(-1)))

getUser("/me")
    .then(res => {
        console.log(res.data);
    })

getDetails("/browse/featured-playlists")
    .then(res => {
        console.log(res.data.playlists.items);
        reloadSpotiPlaylist(res.data.playlists.items, spotify_playlists)
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
        console.log(playlistData);
        reloadSpotiPlaylist(playlistData, focus);
    });
