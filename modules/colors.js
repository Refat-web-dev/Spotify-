export async function extractColorsFromImage(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const image = new Image();
        image.src = URL.createObjectURL(blob);

        return new Promise((resolve, reject) => {
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;

                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, image.width, image.height);

                const imageData = context.getImageData(0, 0, image.width, image.height);
                const pixels = imageData.data;

                const colors = [];

                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const rgb = `${r}, ${g}, ${b}`;
                    colors.push(rgb);
                }

                resolve(colors);
            };

            image.onerror = (error) => {
                reject(error);
            };
        });
    } catch (error) {
        console.error('Ошибка при извлечении цветов:', error);
        return [];
    }
}
// Выберем 10 наиболее часто встречающихся цветов
export function getTopColors(colors, count = 10) {
    const colorCounts = {};

    // Подсчитаем количество каждого цвета
    colors.forEach(color => {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
    });

    // Отсортируем цвета по количеству
    const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);

    // Вернем указанное количество наиболее часто встречающихся цветов
    return sortedColors.slice(0, count);
}
