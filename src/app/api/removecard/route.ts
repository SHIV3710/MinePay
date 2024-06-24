import { ExtractTokenData } from "@/app/helpers/ExtractTokenData";
import { connectdatabse } from "@/app/database";
import { Card } from "@/app/models/Card";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

connectdatabse();

export async function DELETE(request:Request) {
    try {

        const Token = request.headers.get("token") || "";

        const { data } = await ExtractTokenData(Token);
        
        const { CardID } = await request.json();

        let card = await Card.findById(CardID);

        if (!card) throw new Error("Error in Card Removal");

        const user = await User.findById(card.Owner);

        const index = user.Cards.indexOf(CardID);
        user.Cards.splice(index, 1);
        await user.save();

        card = await Card.findByIdAndDelete(CardID);
        
        return NextResponse.json({
            Message:"Card Removed Successfully",    
        })

    } catch (error:any) {
        return NextResponse.json({
            Error: error.message,
        })
    }
}