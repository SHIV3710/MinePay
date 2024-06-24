"use client"

import { LoadUser, LoginUser } from '@/app/apicalls'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from "@/components/ui/use-toast"
import { setmessage, usererror } from '@/Redux/UserSlice'
import Loader from '@/components/Loader/loader'


const Page = () => {

  const [UserEmail, setUserEmail] = useState<string>("");
  const [UserPassword, setUserPassword] = useState<string>("");
  const { toast } = useToast()
  const router = useRouter();

  const { Email ,Error ,Message, Loading} = useSelector((state:any) => state.User);
  const dispatch = useDispatch();

  useEffect(() => {
    LoadUser(dispatch);
  }, [])

  useEffect(() => {
    if (Error) {
      ShowAddCardToast("Error", Error)
      dispatch(usererror(""));
     }
    if (Message.Title && Message.Description) {
      ShowAddCardToast(Message.Title, Message.Description);
      dispatch(setmessage({ Title: "", Description: "" }));
    }
  }, [Error, Message])
  
  const ShowAddCardToast = (Title:any, Description:any) => {
  toast({
            title: Title,
            description: Description,
      })
  }
  useEffect(() => {
    if (Email) { 
      router.push("/client/home")
    }
  },[Email])

  const HandleLoginUser = async (e: any) => {
    e.preventDefault();
    await LoginUser(UserEmail, UserPassword, dispatch); 
    setUserEmail("");
    setUserPassword("");    
  }
   return (
      <div className='h-screen w-screen flex items-center justify-center bg-no-repeat bg-cover' style={{background:`url(${`https://imgs.search.brave.com/OswiSy3iBPRIV7a28QCe1Cy9fJK0oyA6EkfwCxzFBEA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDcwOTQ1/NTkuanBn`})`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
          <div className='h-160 w-190 rounded-md flex flex-col items-center justify-center gap-4 backdrop-blur-md md:w-130'>
              <div className='font-bold text-4xl'>MinePay</div>
              <div className='text-1xl font-medium'>Welcome Back</div>
        <form className='h-120 w-170 flex flex-col items-center gap-4 md:w-120' method='POST' onSubmit={HandleLoginUser}>
           <Input type="email" placeholder="Email" onChange={e => setUserEmail(e.target.value)} value={UserEmail} />
           <Input type="password" placeholder="Password" onChange={e => setUserPassword(e.target.value)} value={UserPassword} />
           <Button type='submit' className='px-4 py-2'>{Loading?<Loader/>:"Login" }</Button>
              </form>
              <div className='flex items-center gap-1 text-sm'>Don't have an Account <Button variant={"link"} onClick={()=>router.push("/client/register")}>Register Here</Button> </div>
              
          </div>
    </div>
  )
}

export default Page