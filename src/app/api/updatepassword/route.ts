import { ExtractTokenData } from "@/app/helpers/ExtractTokenData";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function PUT(request:Request) {
    try {
        let Token = request.headers.get("token") || "";
        const { data } = await ExtractTokenData(Token);
        
        const { OldPassword, NewPassword } = await request.json();

        const user = await User.findById(data);

        if (!user) throw new Error("Please Login!");

        let hash = await bcrypt.compare(OldPassword, user.Password || "");

        if (!hash) throw new Error("Incorrect Old Password");

        let HashPassword = bcrypt.hashSync(NewPassword, 10);

        user.Password = HashPassword;
        await user.save();

        return NextResponse.json({
            Message: "Updated Successfully",
        })


        
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            Error:error.message,
        })
    }
}