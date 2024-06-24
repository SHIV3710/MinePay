import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectdatabse } from "@/app/database";
import { User } from "@/app/models/User";
var jwt = require('jsonwebtoken');

connectdatabse();

export async function POST(request:Request) {
    try {

        let { Name, Email, Password} = await request.json();
        
        let user = await User.findOne({ Email });

        if (user) throw new Error("User already exists! Please Login");

        let HashPassword = bcrypt.hashSync(Password, 10);
        
        user = await User.create({
            Name, Email, Password: HashPassword,
        });

        const token = jwt.sign({ data: user.id }, process.env.SECRET_KEY, { expiresIn: '10h' });
        
        return NextResponse.json({
            success: true,
            User: user,
            Token: token,
        })
        
    } catch (error: any) {
        return NextResponse.json({
            Error:error.message,
        })
    }
}