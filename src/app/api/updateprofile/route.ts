import { ExtractTokenData } from "@/app/helpers/ExtractTokenData";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function PUT(request: Request)  {
    try {

        let Token = request.headers.get("token") || "";
        const { data } = await ExtractTokenData(Token);
        
        const { Email, Name } = await request.json();

        const user = await User.findByIdAndUpdate(data, {
            Email: Email,
            Name: Name,
        }, { new: true });

        if (!user) throw new Error("Login Please!");

        return NextResponse.json({
            User:user,
        })
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            Error:error.message,
        })
    }
}