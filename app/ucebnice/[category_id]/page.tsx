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
        .from('ucebnice_category_content')
        .select('*, ucebnice_content_articles(*)')
        .eq('id', params.content_id)
        .order('order_number', { referencedTable: 'ucebnice_content_articles', ascending: true })
        .single();
    if (error) {
        console.log(error)
        redirect('/ucebnice')
    }
    return data;
}

export async function generateMetadata({ params }) {
    const data = await getContent(params)
    const { data: categoryData } = await supabase
        .from('ucebnice_category_content')
        .select('ucebnice_subcategories(ucebnice_categories(name))')
        .eq('id', params.content_id)
        .single();

    const categoryName = categoryData?.ucebnice_subcategories.ucebnice_categories.name;

    return {
        title: categoryName + ' - ' + data?.name,
        description: data?.meta_description,
        openGraph: {
            title: categoryName + ' - ' + data?.name,
            description: data?.meta_description
        }
    }
}

export const revalidate = 60;

const CategoryPage = async ({ params }) => {
    const data = await getContent(params);
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 col-lg-10'>
                    <h1 className='fw-semibold mb-0' style={{ fontFamily: 'Roboto' }}>{data?.name}</h1>
                    <h2 style={{ fontFamily: 'Roboto', fontSize: '1.125rem' }} dangerouslySetInnerHTML={{ __html: data?.subtitle }}></h2>
                    {data?.ucebnice_content_articles?.map(article => (
                        <div key={article.id} id={article.id} style={{ fontFamily: 'Roboto', fontSize: '1.125rem' }}>
                            <div className='d-flex flex-row align-items-center'>
                                <a className='fs-1 text-secondary me-2 fw-bold' style={{ textDecoration: 'none' }} href={'#' + article.id}>#</a>
                                <h2 className='fw-semibold' dangerouslySetInnerHTML={{ __html: article.title }}></h2>
                            </div>
                            <h5 className="fst-italic" dangerouslySetInnerHTML={{ __html: article.subtitle }}></h5>
                            <p dangerouslySetInnerHTML={{ __html: article.content }}></p>
                        </div>
                    ))}
                </div>
                {data?.description &&
                    <div className='my-2 col-sm-0 col-lg-2 alert alert-light h-100'>
                        <p>{data?.description}</p>
                    </div>}

            </div>
        </div>
    )
}

export default CategoryPage