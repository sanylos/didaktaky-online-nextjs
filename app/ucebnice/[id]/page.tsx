// @ts-nocheck
import { supabase } from '@/api'
import { redirect } from 'next/navigation'


export async function generateStaticParams() {
    return [{ id: 'Ernest-Hemingway' }]

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
    return (
        <div>AutorPage {JSON.stringify(data)}</div>
    )
}

export default AutorPage