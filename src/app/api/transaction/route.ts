import { ExtractTokenData } from "@/app/helpers/ExtractTokenData";
import { connectdatabse } from "@/app/database"
import { Card } from "@/app/models/Card";
import { Transaction } from "@/app/models/Transaction";
import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { CheckUserPin } from "@/app/helpers/CheckUserPin";
import { Conversation } from "@/app/models/Conversation";
import { Message } from "@/app/models/Message";

connectdatabse();

export async function PUT(request: Request) {


    const session = await mongoose.startSession();

    try {
        session.startTransaction(); 
        
        let Token = request.headers.get("token") || "";
        const { data } = await ExtractTokenData(Token);

        let { SenderCardId, RecieverCardNumber, Money, Pin } = await request.json();
        const Res = await CheckUserPin(Pin.toString(), SenderCardId.toString());


        if (!Res) throw new Error("Wrong Pin"); 
        
        let SenderCard = await Card.findByIdAndUpdate(SenderCardId, {
            $inc: { Amount: -Money }
        }, { session });

        
        if (!SenderCard || SenderCard.Amount < Money) {
            throw new Error("Insufficient Balance OR No senderCard Found")
        }

        let RecieverCard = await Card.findOneAndUpdate({CardNumber:RecieverCardNumber}, {
            $inc: { Amount: Money }
        }, { session });

        
        if (!RecieverCard) {
            throw new Error(" No Reciever Card Found")
        }

        const transaction = await Transaction.create([{
            SenderId: data,
            RecieverId: RecieverCard.Owner,
            SenderCard:SenderCard.CardNumber,
            RecieverCard:RecieverCard.CardNumber,
            Amount: Money,
        }],{session});

        console.log(transaction);

        let conversation = await Conversation.findOne({
            Participants: { $in: [SenderCard.Owner,RecieverCard.Owner] }
        });

        

        if(!conversation){
            let conv =  await Conversation.create([{
                Participants:[SenderCard.Owner,RecieverCard.Owner],
                Messages:[],
            }],{session});

            console.log(conv);
            conversation = conv[0];
        }

        console.log("conversation",conversation);

        const message = await Message.create([{
            SenderId:SenderCard.Owner,
            RecieverId:RecieverCard.Owner,
            Message:"",
            Transaction:transaction[0]._id,
        }],{session});


        conversation.Messages.push(message[0]._id);
        await conversation.save();
    
        await session.commitTransaction();

        return NextResponse.json({
            Transaction : transaction,
        })
    } catch (error : any) {
        console.log(error.message);
        await session.abortTransaction();
        return NextResponse.json({
            Error:error.message,
        })
    } finally {
        session.endSession();
    }
}

export async function GET(request:Request){
    try {
        
        let Token = request.headers.get("token") || "";
        const { data } = await ExtractTokenData(Token);

        const transctions = await Transaction.find({
            $or:[{SenderId:data},{RecieverId:data}]
        }).populate('SenderId RecieverId')

        return NextResponse.json({
            Transaction:transctions,
        },{status:200})

    } catch (error:any) {
        return NextResponse.json({
            Error:error.message,
        },{status:404});
    }
}