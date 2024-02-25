// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/api";

export async function GET(request: NextRequest, context: any) {
    const { params } = context;
    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get('range');

    const { data, error } = await supabase
        .from('userTests')
        .select('*')
        .eq('user_id', params.id)
        .order('created_at', { ascending: false })
        .range(0, range)

    if (error) {
        return NextResponse.error(new Error("Failed to fetch data."));
    }

    return NextResponse.json({
        data
    });
}
