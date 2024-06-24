"use client"

import { LoadUserCards } from "@/app/apicalls"
import Navbar from "@/components/Navbar,"
import {  useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Page = () => {
  const {_id} = useSelector((state:any)=>state.User);
  const dispatch = useDispatch();
  useEffect(() => {
    if(_id)
      LoadUserCards(dispatch);
  }, [_id])
  return (
    <div className='h-screen w-screen flex flex-col gap-10 m-0 p-0'>
      <Navbar />
      <div className="h-190 w-200 flex items-center justify-center text-3xl font-medium text-center lg:text-6xl">Welcome to MinePay</div>
    </div>

  )
}

export default Page