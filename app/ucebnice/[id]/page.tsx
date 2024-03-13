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
        .single();
    console.log(data);
    if (error) {
        redirect('/ucebnice')
    }
    return data;
}

export const revalidate = 60;

const AutorPage = async ({ params }) => {
    const data = await getContent(params);
    console.log(data);
    return (
        <div>
            {data?.ucebnice_content_articles?.map(article => (
                <div key={article.id} id={article.id}>
                    <div className='d-flex flex-row align-items-center'>
                        <a className='fs-3 text-secondary' href={'#' + article.id}>#</a>
                        <h1 dangerouslySetInnerHTML={{ __html: article.title }}></h1>
                    </div>
                    <h3 dangerouslySetInnerHTML={{ __html: article.subtitle }}></h3>
                    <p style={{fontFamily: 'Roboto'}} dangerouslySetInnerHTML={{ __html: article.content }}></p>
                </div>
            ))}
        </div >
    )
}

export default AutorPage