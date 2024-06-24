import { ExtractTokenData } from "@/app/helpers/ExtractTokenData";
import { connectdatabse } from "@/app/database";
import { Card } from "@/app/models/Card";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

connectdatabse();

export async function GET(request : Request, params : any) {
    try {

        const Token = request.headers.get("token") || "";

        const { data } = await ExtractTokenData(Token);
        
        const UserID = data;

        const user = await User.findById(UserID).populate({
            path: "Cards",
            model: Card,
        } );

        if (!user) throw new Error("Please Login");

        return NextResponse.json({
            Cards: user.Cards,
        })
        
    } catch (error:any) {
        return NextResponse.json({
            Error: error.message,
        })
    }
}