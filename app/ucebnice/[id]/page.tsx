// @ts-nocheck
import { supabase } from '@/api'
import { redirect } from 'next/navigation'


export async function generateStaticParams() {
    const { data } = await supabase
        .from('ucebnice_categories')
        .select('*')

    return data?.map(dataItem => dataItem.id);
}

export async function getContent(params) {
    const { data, error } = await supabase
        .from('ucebnice_category_content')
        .select('*, ucebnice_content_articles(*)')
        .eq('id', params.slug[1])
        .order('order_number', { referencedTable: 'ucebnice_content_articles', ascending: true })
        .single();
    if (error) {
        console.log(error)
        redirect('/ucebnice')
    }
    return data;
}

export const revalidate = 60;

const CategoryPage = () => {
    return (
        <div>CategoryPage</div>
    )
}

export default CategoryPage