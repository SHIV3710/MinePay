import { connectdatabse } from "@/app/database";
import { ExtractTokenData } from "@/app/helpers/ExtractTokenData";
import { Conversation } from "@/app/models/Conversation";
import { NextResponse } from "next/server";


connectdatabse();

async function addUserNamesToSet(conversations:any) {

    let Users = new Set();

    for (const conv of conversations) {
        await Users.add(conv.Participants[0]);
        await Users.add(conv.Participants[1]);
    }
    return Array.from(Users);
}

export async function GET(request:Request){
    try {
    
        const Token = request.headers.get("token") || "";

        const { data } = await ExtractTokenData(Token);
        
        const UserId = data;

        const conversations = await Conversation.find({
            Participants: {$in:[UserId]},

        },).populate("Participants","Name").select(["-Messages"])

        const res =  await addUserNamesToSet(conversations);

        return NextResponse.json({
            Conversations:res,
        },{status:200});

        
    } catch (error:any) {
        
        return NextResponse.json({
            Error:error.message,
        },{status:500})
    }
}



