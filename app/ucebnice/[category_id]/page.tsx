// @ts-nocheck
import { supabase } from '@/api'
import { redirect } from 'next/navigation'
import NavigationSearch from '@/app/components/ucebnice/NavigationSearch';
import Navigation from '@/app/components/ucebnice/Navigation';


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
    console.log(data)
    return (
        <div className='container' style={{ fontFamily: 'Roboto' }}>
            <div className='row'>
                <h1 className='fw-semibold text-blue-1 mb-0'>{data?.name}</h1>
                <h4 className='fw-normal text-blue-4'>{data?.description}</h4>
            </div>
            <div className='row bg-secondary-subtle mx-1 rounded'>
                <h2 className='fw-semibold mb-0 pt-1 text-learn-5'>Obsah učebnice</h2>
                <div>
                    <NavigationSearch data={new Array(data)} />
                    <Navigation data={new Array(data)} isCollapsed={false} />
                </div>
            </div>
        </div>
    )
}

export default CategoryPage