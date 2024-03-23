// @ts-nocheck
import { supabase } from '@/api'
import { redirect } from 'next/navigation'


export async function generateStaticParams() {
    const { data } = await supabase
        .from('ucebnice_categories')
        .select('id')

    return data;
}

export async function getContent(params) {
    const { data, error } = await supabase
        .from('ucebnice_categories')
        .select('*, ucebnice_subcategories(*, ucebnice_category_content(*))')
        .eq('id', params.id)
        .order('order_priority', { referencedTable: 'ucebnice_subcategories', ascending: true })

    if (error) {
        console.log(error)
        redirect('/ucebnice')
    }
    return data;
}

export const revalidate = 60;

const CategoryPage = async ({ params }) => {
    const data = await getContent(params)
    console.log(data)
    console.log(params.id)
    return (
        <div>CategoryPage
            {JSON.stringify(data)}
        </div>
    )
}

export default CategoryPage