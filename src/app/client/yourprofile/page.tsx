"use client"

import Navbar from '@/components/Navbar,'
import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { AddCard, ChangePassword, LoadUserCards, UpdateUserProfile } from '@/app/apicalls'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { setmessage, usererror } from '@/Redux/UserSlice'
import SingleTransaction from '@/components/SingleTransaction'


const Page = () => {
  
  const {Name, Email, Cards,Error,Message,Transactions} = useSelector((state:any) => state.User) 
  const dispatch = useDispatch();
  const [UserName, setUserName] = useState<string>(Name);
  const [UserEmail, setUserEmail] = useState<string>(Email);
  const [OldPassword, setOldPassword] = useState<string>("");
  const [NewPassword, setNewPassword] = useState<string>("");
  const { toast } = useToast()

  const [NewCard, setNewCard] = useState({
    CardNumber: "",
    ExpireDate: Date(),
    Pin : "",
    Amount:0,
  })

  useEffect(() => {
    LoadUserCards(dispatch);
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
  }, [Error,Message])
  
  const ShowAddCardToast = (Title:any, Description:any) => {
  toast({
            title: Title,
            description: Description,
      })
  }
  function getRandomColor() {
    const letters = '012345678BCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 14)];
    }
    return color;
  }  

  
  const HandleAddCard = async () => {
    await AddCard(NewCard.CardNumber, NewCard.ExpireDate, NewCard.Pin, NewCard.Amount, dispatch);
    ShowAddCardToast("New Card", "Card Added Successfully");
   
  }

  const HandleUpdateProfile = async (e: any) => {
    e.preventDefault();
    await UpdateUserProfile(UserEmail, UserName, dispatch);
  }

  const HandleChangePassword = async (e: any) => {
    e.preventDefault();
    await ChangePassword(OldPassword, NewPassword, dispatch); 
    setOldPassword("");
    setNewPassword("");
  }

  return (
    <div className='h-screen w-screen flex flex-col gap-2'>
      <Navbar />
      <div className="h-200 w-screen flex flex-col items-center justify-center gap-5 font-medium">
        <form className='flex flex-col gap-5 items-center justify-center' method='POST' onSubmit={HandleUpdateProfile}>

        <ul className='flex gap-5 items-center'>
            <li>Name</li>
          <li className='w-120'><Input type='text' placeholder='Name' value={UserName} onChange={(e)=>setUserName(e.target.value)} required/></li>
        </ul>
        <ul className='flex gap-5 items-center'>
            <li>Email</li>
            <li className='w-120'><Input type='email' placeholder='Email' value={UserEmail} onChange={(e)=>setUserEmail(e.target.value)} required/></li>
        </ul>
        <div className='flex flex-col items-center justify-center gap-5'>
          <div className='w-120 flex items-center justify-end ml-12'>
            <Button type="submit" className='px-2 h-8 rounded-sm bg-green-500 text-white hover:text-black'>Save Changes</Button>
        </div>
        </div>
        </form>

        <div className='w-150 md:w-130 flex justify-between'>

          {/* Password */}

         <Dialog>
          <DialogTrigger>Change Password</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Your Password</DialogTitle>
            </DialogHeader>
            <form method='POST' onSubmit={HandleChangePassword}>
              <DialogFooter className='flex flex-col items-center gap-5 justify-center'>
                <Input type='password' placeholder='Old Password' className='w-130' value={OldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                <Input type='password' placeholder='New Password' className='w-130' value={NewPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <DialogClose disabled={!OldPassword || !NewPassword}>
                  <Button type='submit' className='px-2 h-8 rounded-sm bg-green-500 text-white hover:text-black' disabled={!OldPassword || !NewPassword}>Save Changes</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>


        <Drawer>
          <DrawerTrigger>Transaction History</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Your Transactions</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter className=' h-180 flex gap-5 flex-wrap overflow-y-scroll items-center'>
              {
                Transactions.map((item:any,index:any)=>{
                  return <SingleTransaction key={item._id} item={item}/>
                  })
              }
              <DrawerClose>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
          </Drawer> 


        {/* Cards */}
        <Drawer>
          <DrawerTrigger>Your Cards</DrawerTrigger>
          <DrawerContent className='h-150 w-screen'>
          <DrawerHeader>
            <DrawerTitle>Your Cards</DrawerTitle>
            <DrawerDescription>These are all the cards you own</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className='h-170 w-screen items-center justify-center relative ' >
              <Carousel className='w-160'>
                <CarouselContent>
                {
                  Cards.map((item:any) => {
                    return <CarouselItem key={item._id} className='flex items-center justify-center relative'>
                    <div className='h-120 w-150  bg-red-100 rounded-md flex justify-center items-center flex-col md:w-120' style={{background:getRandomColor()}}>
                      <span className='text-2xl'>{item.CardNumber}</span>
                      <div className='flex items-center gap-3'>
                        <span className='text-sm'>{Name}</span>
                        <span>{item.ExpireDate}</span>
                      </div>
                        <span>Amount- Rs.{item.Amount}</span>
                    </div>
                  </CarouselItem>
                })
              } 
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
 

                  <Dialog >
                  <DialogTrigger className='absolute add-card'>Add Card</DialogTrigger>
                  <DialogContent className='absolute'>
                    <DialogHeader>
                      <DialogTitle>Add a New Card</DialogTitle>
                      </DialogHeader>
                    <DialogFooter className='flex flex-col items-center gap-5 justify-center'>
                      <Input type='text' placeholder='Card Number' onChange={(e) => setNewCard(prevState => ({
                          ...prevState,["CardNumber"]:e.target.value
                        }))} maxLength={12} className='w-130'/>
                      <Input type='date' placeholder='ExpireDate' className='w-130' onChange={(e) => setNewCard(prevState => ({
                          ...prevState,["ExpireDate"]:e.target.value
                        }))}/>
                      <Input type='text' placeholder='Pin' maxLength={4} className='w-130' onChange={(e) => setNewCard(prevState => ({
                          ...prevState,["Pin"]:e.target.value
                        }))}/>
                      <Input type='number' placeholder='Amount' min={1000} className='w-130' onChange={(e) => setNewCard(prevState => ({
                          ...prevState,["Amount"]:parseInt(e.target.value)
                      }))} />    
                      <DrawerClose disabled={!NewCard.CardNumber || !NewCard.ExpireDate || !NewCard.Amount || !NewCard.CardNumber || !NewCard.Pin}>

                        <Button className='px-2 h-8 rounded-sm bg-green-500 text-white hover:text-black' onClick={HandleAddCard} disabled={!NewCard.CardNumber || !NewCard.ExpireDate || !NewCard.Amount || !NewCard.CardNumber || !NewCard.Pin}>Add Card</Button>
                      </DrawerClose>
                      </DialogFooter>
                  </DialogContent>
          </Dialog>
            </DrawerFooter>
        </DrawerContent>
      </Drawer>

      </div>
      </div>
    </div>
  )
}

export default Page