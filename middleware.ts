//@ts-nocheck
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.url.split('/').includes('admin'))
        return NextResponse.redirect(new URL('/auth', request.url))
}