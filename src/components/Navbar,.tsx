import React, { useEffect, useState } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useTheme } from 'next-themes';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setuser } from '@/Redux/UserSlice';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { GetAllTransactions } from '@/app/apicalls';


const Navbar = () => {
    const { setTheme } = useTheme();
    const [Mode, setMode] = useState("");
    const router = useRouter();
    const { Email , Transactions} = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    
    useEffect(() => {
    if (typeof window !== undefined) {
      if (!Email) {
        router.push("/client/login");
      }
      if (localStorage.getItem("theme")) {
        setMode(localStorage.getItem("theme") || "light");
      }
    }
    }, [])
    

    const HandleChangeTheme = (value:string) => {
    if (typeof window !== undefined) {
      setTheme(value);
      setMode(value); 
     }
    }

  const HandleLogOut = () => {
    if (typeof window !== undefined) {
      dispatch(setuser({ Name: "", Email: "" }));
      localStorage.setItem("token", "");
      router.push("/client/login")
    }
  }

  useEffect(()=>{
    GetAllTransactions(dispatch);
  },[])

  return (
    
      <div className='h-14 w-screen flex justify-between items-center px-4'>
        <div className="logo font-bold text-2xl">MinePay</div>
        <div className='flex items-center gap-5'>

          <DropdownMenu>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer' onClick={()=>router.push("/client/home")}>Home</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={()=>router.push("/client/makepayment")}>Make a Payment</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={()=>router.push("/client/yourprofile")}>Your Profile</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={HandleLogOut}>Log Out</DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>

      <Menubar  >
        
        <MenubarMenu>
            <MenubarTrigger className='cursor-pointer'>Theme</MenubarTrigger>
            <MenubarContent className='max-w-10'>
              <MenubarRadioGroup value={Mode} className=' flex flex-col items-center'>
              <MenubarRadioItem value="dark" className='pl-6 pr-4 cursor-pointer' onClick={()=>HandleChangeTheme("dark")}>Dark</MenubarRadioItem>
              <MenubarRadioItem value="light" className='pl-6 pr-4 cursor-pointer' onClick={()=>HandleChangeTheme("light")}>Light</MenubarRadioItem>
             </MenubarRadioGroup>
             </MenubarContent>
          </MenubarMenu>
           </Menubar>
        </div>
           </div>
  )
}

export default Navbar;