import { Metadata, Viewport } from 'next';

const baseUrl = 'https://asamoahisaac.netlify.app';

export default function sitemap() {
    const routes = [''].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    return [...routes];
}
