import { Card } from "@/app/models/Card";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectdatabse } from "@/app/database";
import { User } from "@/app/models/User";
import { ExtractTokenData } from "@/app/helpers/ExtractTokenData";

connectdatabse();

export async function POST(request:Request) {
    try {

        const Token = request.headers.get("token") || "";

        const { data } = await ExtractTokenData(Token);

        const { CardNumber, ExpireDate, Amount, Pin } = await request.json();


        let card = await Card.findOne({ CardNumber });

        if (card) {
            throw new Error("This card is linked to someone Else");
        }

        if (Pin.length != 4) throw new Error("Please provide a valid pin");

        const [day, month, year] = ExpireDate.split("/").map(Number);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        
        if (inputDate < today) {
            throw new Error("This Card is Expire");
        }

        const HashPin = bcrypt.hashSync(Pin, 10);
            
        const user = await User.findById(data);

        if (!user) {
            throw new Error("Please Login");
        }

        card = await Card.create({
            CardNumber,
            Owner : data,
            ExpireDate: ExpireDate,
            Amount,
            Pin:HashPin,
        });

        user.Cards.push(card);
        await user.save();

        return NextResponse.json({
            Card:card,  
        })


        
    } catch (error:any) {
        return NextResponse.json({
            Error:error.message,
        })
    }
}