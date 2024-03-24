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
        .eq('id', params.category_id)
        .order('order_priority', { referencedTable: 'ucebnice_subcategories', ascending: true })
        .single();

    if (error) {
        console.log(error)
        redirect('/ucebnice')
    }
    return data;
}

export async function generateMetadata({ params }) {
    const { data } = await supabase
        .from('ucebnice_categories')
        .select('*')
        .eq('id', params.category_id)
        .single();

    return {
        title: data.name + ' - Elektronická učebnice',
        description: data.meta_description,
        openGraph: {
            title: data.name + ' - Elektronická učebnice',
            description: data.meta_description
        }
    }
}

export const revalidate = 60;

const CategoryPage = async ({ params }) => {
    const data = await getContent(params);
    console.log(data.ucebnice_subcategories)
    return (
        <div className='container'>
            <div className='row'>

            </div>
        </div>
    )
}

export default CategoryPage