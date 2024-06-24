import { NextRequest, NextResponse } from 'next/server'
import { ExtractTokenData } from './app/helpers/ExtractTokenData';

export async function middleware(request: NextRequest) {


    const Token = request.headers.get("token");
  
    if (Token) {
      NextResponse.next();
    }
    

 
   
}


export const config = {
  matcher: [
    '/api/addcard',
    '/api/getallcard/:path*',
    '/api/removecard',
    '/api/transaction',
    '/api/loaduser',
    '/api/updatecard'],
}