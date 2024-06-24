import { connectdatabse } from "@/app/database";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
var jwt = require('jsonwebtoken');

connectdatabse();

export async function PUT(request:Request){
    try {
        const { Email, Password } = await request.json();

        let user = await User.findOne({ Email });
        
        if (!user) throw new Error("No User Found");

        let hash = await bcrypt.compare(Password, user.Password || "");

        if (!hash) throw new Error("Incorrect Password");

        const token = jwt.sign({ data: user.id }, process.env.SECRET_KEY, { expiresIn: '10h' });
        
        return NextResponse.json({
            success: true,
            User: user,
            Token: token,
        })
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            Error:error.message,
        })
    }
}
