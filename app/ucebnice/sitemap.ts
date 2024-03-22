// @ts-nocheck
import { supabase } from '@/api'
import { MetadataRoute } from 'next'

export default async function sitemap() {
    const { data } = await supabase
        .from('ucebnice_categories')
        .select('*, ucebnice_subcategories(*, ucebnice_category_content(*))')

    const urls = [];
    data.map(category => {
        category.ucebnice_subcategories.map(subcategory => {
            subcategory.ucebnice_category_content.map(content => {
                const url = process.env.NEXT_PUBLIC_PRODUCTION_URL + '/ucebnice/' + category.id + '/' + subcategory.id + '/' + content.id;
                urls.push({ url });
            });
        });
    });
    return urls
}