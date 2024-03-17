import { supabase } from '@/api'
import { MetadataRoute } from 'next'

export default async function sitemap() {
    const { data, error } = await supabase
        .from('ucebnice_category_content')
        .select('id')
    console.log(data)
    console.log(error)
    return data?.map((site) => ({
        url: process.env.NEXT_PUBLIC_PRODUCTION_URL + '/ucebnice/' + site.id,
        lastModified: new Date(),
    }))
}