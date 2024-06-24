import { NextResponse } from "next/server";
import { Card } from "../models/Card"
import bcrypt from "bcryptjs";

export const CheckUserPin = async (Pin: string, CardId: string) => {
    const card = await Card.findById(CardId);
    console.log(Pin,card.Pin);

    const res = await bcrypt.compare(Pin,card.Pin);
    return res;
}