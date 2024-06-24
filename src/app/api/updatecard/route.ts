import { Card } from "@/app/models/Card";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectdatabse } from "@/app/database";
import { ExtractTokenData } from "@/app/helpers/ExtractTokenData";

connectdatabse();

export async function PUT(request : Request) {
    try {

        const Token = request.headers.get("token") || "";

        const { data } = await ExtractTokenData(Token);
 
        const { Id, CardNumber, ExpireDate ,Pin} = await request.json();

        let card = await Card.findById(Id);

        if (!card) throw new Error('Wrong Card');

        if (ExpireDate) {

            const [day, month, year] = ExpireDate.split("/").map(Number);
            const inputDate = new Date(year, month - 1, day);
            const today = new Date();
        
            if (inputDate < today) {
                throw new Error("This Card is Expire");
            }
        }

        let HashDate = card.ExpireDate;
        let HashPin = card.Pin;

        if (ExpireDate) HashDate = bcrypt.hashSync(ExpireDate, 10);
        if (Pin) HashPin = bcrypt.hashSync(Pin, 10);
        
        let newCard = await Card.findByIdAndUpdate(Id, {
            $set: {
                CardNumber: CardNumber || card.CardNumber,
                Owner: data || card.Owner,
                ExpireDate: HashDate,
                Pin : HashPin,
            },
        },{new: true},);

        return NextResponse.json({
            Card:newCard,
        })

    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
        })
    }
}