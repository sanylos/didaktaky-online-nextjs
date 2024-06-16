//@ts-nocheck
import { MetadataRoute } from 'next'
import { links } from '@/app/data/links'

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemap: MetadataRoute.Sitemap = [
        ...links.map(link => (
            {
                url: process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + link.href,
                lastModified: new Date()
            }
        )),
        ...links.filter(link => link.dropdown).flatMap(link => link.dropdown?.map(dropdownLink => (
            {
                url: process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + link.href + '/' + dropdownLink.href,
                lastModified: new Date()
            }
        ))),
    ]
    return sitemap
}