// @ts-nocheck
import { supabase } from '@/api'
import { MetadataRoute } from 'next'

export default async function sitemap() {
    const { data } = await supabase
        .from('ucebnice_categories')
        .select('*, ucebnice_subcategories(*, ucebnice_category_content(*))')

    const urls = [];
    let url;
    data.map(category => {
        url = process.env.NEXT_PUBLIC_PRODUCTION_URL + '/ucebnice/' + category.id;
        urls.push({ url }); // PUSH category URL
        category.ucebnice_subcategories.map(subcategory => {
            subcategory.ucebnice_category_content.map(content => {
                url = process.env.NEXT_PUBLIC_PRODUCTION_URL + '/ucebnice/' + category.id + '/' + content.id;
                urls.push({ url }); // PUSH content URL
            });
        });
    });
    return urls
}