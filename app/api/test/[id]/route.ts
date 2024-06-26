// @ts-nocheck
import { NextResponse } from 'next/server';
import { supabase } from "@/api";

export async function GET(request: Request, context: any) {
    const { params } = context;

    const { data, error } = await supabase
        .from('userTests')
        .select('*')
        .eq('id', params.id);

    if (error) {
        return NextResponse.error(new Error("Failed to fetch data."));
    }

    return NextResponse.json({
        data
    });
}
