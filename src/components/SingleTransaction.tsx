import React, { useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useSelector } from 'react-redux'
  

const SingleTransaction = (Transaction : any) => {
    const {_id,Name} = useSelector((state:any)=>state.User);
  return (
    <div className='w-fit'>
        <Card>
        <CardHeader>
            <CardTitle style={{color:Transaction.item.SenderId._id == _id?"red":"green"}}>{Transaction.item.SenderId._id == _id? "Debited":"Credited"}</CardTitle>
            <CardDescription style={{color:Transaction.item.SenderId._id == _id?"red":"green"}}>{Transaction.item.SenderId._id == _id? "-":"+"} Rs. {Transaction.item.Amount}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>From: {Transaction.item.SenderId.Name}</p>
            <p>To: {Transaction.item.RecieverId.Name}</p>
        </CardContent>
        <CardFooter className='flex flex-col items-start'>
        <p>Debited from: {Transaction.item.SenderCard}</p>
        <p>Credited to: {Transaction.item.RecieverCard}</p>
        </CardFooter>
</Card>

    </div>
  )
}

export default SingleTransaction