// @ts-nocheck
import { supabase } from '@/api'
import { redirect } from 'next/navigation'
import Article from '@/app/components/ucebnice/Article';
import ArticleTitle from '@/app/components/ucebnice/ArticleTitle';

export async function generateStaticParams() {
    const { data } = await supabase
        .from('ucebnice_category_content')
        .select('id')
    return data;

}

export async function getContent(params) {
    const { data, error } = await supabase
        .from('ucebnice_category_content')
        .select('*, ucebnice_content_articles(*), ucebnice_questions(*)')
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

const ContentPage = async ({ params }) => {
    const data = await getContent(params);
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 col-lg-10'>
                    <h1 className='fw-semibold mb-0' style={{ fontFamily: 'Roboto' }}>{data?.name}</h1>
                    <h2 style={{ fontFamily: 'Roboto', fontSize: '1.125rem' }} dangerouslySetInnerHTML={{ __html: data?.subtitle }}></h2>
                    {data?.ucebnice_content_articles?.map(article => (
                        <Article key={article.id} article={article}></Article>
                    ))}
                    {data.ucebnice_questions &&
                        <div id="flashcards">
                            <ArticleTitle title="Flashcards" id="flashcards" />
                            <div className='accordion' id="accordionQuestions">
                                {data?.ucebnice_questions.map(question => (
                                    <div key={question.id} className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#collapse' + question.id} aria-expanded="true" aria-controls={'collapse' + question.id}>
                                                <span dangerouslySetInnerHTML={{ __html: question.title }}></span>
                                            </button>
                                        </h2>
                                        <div id={'collapse' + question.id} className="accordion-collapse collapse" data-bs-parent="#accordionQuestions">
                                            <div className="accordion-body">
                                                <p dangerouslySetInnerHTML={{ __html: question.answer }}></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                {data?.description &&
                    <div className='my-2 col-sm-0 col-lg-2 alert alert-light h-100'>
                        <p>{data?.description}</p>
                    </div>}


            </div>
        </div>
    )
}

export default ContentPage