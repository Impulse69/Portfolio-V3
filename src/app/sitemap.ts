import { Metadata, Viewport } from 'next';

const baseUrl = 'https://isaacasamoahjunior.com';

export default function sitemap() {
    const routes = ['', '/#work', '/#about', '/#contact'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    return [...routes];
}
