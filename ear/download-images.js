
import fs from 'fs';
import https from 'https';
import path from 'path';

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            const fileStream = fs.createWriteStream(filepath);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded: ${filepath}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

const images = [
    {
        url: 'https://images.unsplash.com/photo-1625246333195-bf4f32c80381?q=80&w=1920&auto=format&fit=crop',
        path: 'src/assets/login-bg.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop', // Sunset field
        path: 'src/assets/register-bg.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1920&auto=format&fit=crop', // Wheat close up
        path: 'src/assets/home-poster.jpg'
    }
];

(async () => {
    for (const img of images) {
        try {
            await downloadImage(img.url, path.join(process.cwd(), img.path));
        } catch (e) {
            console.error(`Failed to download ${img.path}:`, e);
        }
    }
})();
