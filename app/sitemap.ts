import { MetadataRoute } from 'next'
import { links } from '@/app/data/links'

export default function sitemap(): MetadataRoute.Sitemap {
    return links.map(link => ({
        url: process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + link.href,
        lastModified: new Date()
    }))
}