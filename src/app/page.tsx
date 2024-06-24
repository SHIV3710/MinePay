
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast"
import { setmessage, usererror } from "@/Redux/UserSlice";


export default function Home() {
  const { Email ,Error ,Message, Loading} = useSelector((state:any) => state.User);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const ShowAddCardToast = (Title:any, Description:any) => {
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
  }, [Error, Message])
  return (
    <div className="h-screen w-screen m-0 p-0 sm:h-full">

    </div>
  );
}
