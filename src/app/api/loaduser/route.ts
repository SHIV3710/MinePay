import { connectdatabse } from "@/app/database";
import { ExtractTokenData } from "@/app/helpers/ExtractTokenData";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

connectdatabse();

export async function GET(request: Request) {
    try {
        let Token = request.headers.get("token") || "";
        const  {data}  = await ExtractTokenData(Token);

    
        const user = await User.findById(data);

        if (!user) throw new Error("Issue with Token");

        return NextResponse.json({
            User:user,
        })
    } catch (error:any) {
        return NextResponse.json({
            Error:"Please Login",
        })
    }
    

}