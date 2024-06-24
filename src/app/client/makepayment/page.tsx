"use client"

import Navbar from '@/components/Navbar,'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { MakeATransaction } from '@/app/apicalls'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader/loader'
import { useToast } from "@/components/ui/use-toast"
import { setmessage, usererror } from '@/Redux/UserSlice'

const Page = () => {
  const {Cards,Loading,Message,Error} = useSelector((state:any)=>state.User);
  const [RecieverCardNumber,setRecieverCardNumber] = useState<number>()
  const [SenderCardId,setSenderCardId] = useState<string>("");
  const [Amount,setAmount] = useState<number>();
  const [Pin,setPin] = useState<number>();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();


  const handleMakeTransaction = async (e:any) => {
    e.preventDefault();
    await MakeATransaction(SenderCardId,RecieverCardNumber||0,Amount||0,Pin||0,dispatch);
    router.push("/client/home")
  }

  const ShowAddCardToast = async (Title:any, Description:any) => {
    toast({
              title: Title,
              description: Description,
        })
    }

  useEffect(() => {
    if (Error) {
      ShowAddCardToast("Error", Error)
      dispatch(usererror(""));
     }
    if (Message.Title && Message.Description) {
      ShowAddCardToast(Message.Title, Message.Description);
      dispatch(setmessage({ Title: "", Description: "" }));
    }
  }, [Error,Message])

  return (
    <div className='h-screen w-screen flex flex-col gap-10 items-center ' >
      <Navbar />
      <div className='h-180 w-screen flex items-center justify-center'>
          <form className="h-190 w-150  md:w-120 flex flex-col items-center justify-center  font-medium gap-5" onSubmit={handleMakeTransaction}>
              <div>Make a Payment</div>
             <Input type="number" placeholder="Reciever Card Number" min={100000000000} max={999999999999} required onChange={(e)=>setRecieverCardNumber(parseInt(e.target.value))} value={RecieverCardNumber}/>
             <Select onValueChange={(value:any)=>setSenderCardId(value)}>
              <SelectTrigger className="w-150 md:w-120">
                <SelectValue placeholder="Cards"  />
              </SelectTrigger>
              <SelectContent>
                {
                  Cards.map((item:any)=>{
                    return <SelectItem value={`${item._id}`|| "Card" } key={item._id}>{item.CardNumber}</SelectItem>
                  })
                }
              </SelectContent>
            </Select>
            <Input type='number' placeholder='Enter Amount' required onChange={(e)=>setAmount(parseInt(e.target.value))} value={Amount}/>
            <Input type='number' placeholder='Card Pin' min={1000} max={9999} required onChange={(e)=>setPin(parseInt(e.target.value))} value={Pin}/>
            <Button className='p-2' type='submit'>{Loading?<Loader/>:"Make Payment"}</Button>

      </form>
      </div>
    </div>
  )
}

export default Page