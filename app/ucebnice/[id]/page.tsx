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
        .select('*')
        .eq('id', params.id)
        .single();
    console.log(data);
    if (error) {
        redirect('/ucebnice')
    }
    return data;
}



const AutorPage = async ({ params }) => {
    const data = await getContent(params);
    console.log(data);
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div >
    )
}

export default AutorPage