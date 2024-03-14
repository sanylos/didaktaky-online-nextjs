// @ts-nocheck
import { supabase } from '@/api'
import { redirect } from 'next/navigation'


export async function generateStaticParams() {
    const { data } = await supabase
        .from('ucebnice_category_content')
        .select('id')
    return data;

}

export async function getContent(params) {
    const { data, error } = await supabase
        .from('ucebnice_category_content')
        .select('*, ucebnice_content_articles(*)')
        .eq('id', params.id)
        .order('order_number', { referencedTable: 'ucebnice_content_articles', ascending: true })
        .single();
    if (error) {
        console.log(error)
        //redirect('/ucebnice')
    }
    return data;
}

export async function generateMetadata({ params }) {
    const data = await getContent(params)
    return {
        title: data.name,
        description: data.meta_description
    }
}

export const revalidate = 60;

const AutorPage = async ({ params }) => {
    const data = await getContent(params);
    return (
        <div>
            {data?.ucebnice_content_articles?.map(article => (
                <div style={{ fontFamily: 'Roboto' }} key={article.id} id={article.id}>
                    <div className='d-flex flex-row align-items-center'>
                        <a className='fs-1 text-secondary me-2 fw-bold' style={{ textDecoration: 'none' }} href={'#' + article.id}>#</a>
                        <h2 className='fw-semibold' dangerouslySetInnerHTML={{ __html: article.title }}></h2>
                    </div>
                    <h5 className="fst-italic" dangerouslySetInnerHTML={{ __html: article.subtitle }}></h5>
                    <p dangerouslySetInnerHTML={{ __html: article.content }}></p>
                </div>
            ))}
        </div >
    )
}

export default AutorPage