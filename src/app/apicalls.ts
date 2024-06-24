import { addcard, setUsers, setalltransactions, setconversations, setmessage, setuser, setusercards, setuserloading, usererror } from "@/Redux/UserSlice";
import axios from "axios"
import bcrypt from "bcryptjs";

export const LoginUser = async (Email:string,Password:string ,dispatch:any) =>  {
    try {
        dispatch(setuserloading(true));
        const { data } = await axios.put("http://localhost:3000/api/login", {
            Email : Email,
            Password : Password,
        });
        if(data.Error) throw new Error(data.Error)
        dispatch(setuserloading(false));
        dispatch(setuser({
            _id:data.User._id,
            Name: data.User.Name,
            Email:data.User.Email,
        }))
        dispatch(setmessage({
            Title: "Login",
            Description:"Welcome to MinePay"
        }))
        localStorage.setItem("token", data.Token);
    } catch (error: any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }
}

export const RegisterUser = async (Name:string,Email:string,Password:string,dispatch:any)=>{
    try {
        dispatch(setuserloading(true));
        const { data } = await axios.post("http://localhost:3000/api/register", {
            Name:Name,
            Email : Email,
            Password : Password,
        });
        if(data.Error) throw new Error(data.Error)
        dispatch(setuserloading(false));
        dispatch(setuser({
            _id:data.User._id,
            Name: data.User.Name,
            Email:data.User.Email,
        }))
        dispatch(setmessage({
            Title: "Register Successfully",
            Description:"Welcome to MinePay"
        }))
        localStorage.setItem("token", data.Token);
    } catch (error: any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }
}

export const LoadUser = async (dispatch:any) => {
    try {

        dispatch(setuserloading(true));
        const { data } = await axios.get("http://localhost:3000/api/loaduser", {
            headers: { Token: localStorage.getItem("token") },
        });
        if(data.Error) throw new Error(data.Error)
        dispatch(setuserloading(false));
        dispatch(setuser({
            _id:data.User._id,
            Name: data.User.Name,
            Email:data.User.Email,
        }))
        dispatch(setmessage({
            Title: "Welcome",
            Description:"Welcome to MinePay"
        }))
        
    } catch (error:any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }
}

export const LoadUserCards = async (dispatch:any) => {
    try {
        dispatch(setuserloading(true));
        const { data } = await axios.get("http://localhost:3000/api/getallcard", {
            headers: { Token: localStorage.getItem("token") },
        });
        if(data.Error) throw new Error(data.Error)
        dispatch(setuserloading(false));
        dispatch(setusercards(data.Cards));
    } catch (error:any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }   
}

export const AddCard = async (CardNumber: string, ExpireDate: string, Pin: string, Amount: number, dispatch: any) => {
    try {
        dispatch(setuserloading(true));
        const { data } = await axios.post("http://localhost:3000/api/addcard", {
            CardNumber,
            ExpireDate,
            Amount,
            Pin
        },
            {
                headers: { Token: localStorage.getItem('token') },
            });
        if(data.Error) throw new Error(data.Error)
        dispatch(setuserloading(false));
        dispatch(addcard(data.Card));
        dispatch(setmessage({
            Title: "Card",
            Description:"Card Added Successfully"
        }))
    } catch (error:any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }
}

export const UpdateUserProfile = async (Email:string, Name:string, dispatch:any) => {
    try {
        dispatch(setuserloading(true));
        const { data } = await axios.put("http://localhost:3000/api/updateprofile", {
            Email: Email,
            Name : Name,
        },
        {
            headers: { Token: localStorage.getItem('token') },
            });
        if(data.Error) throw new Error(data.Error)
        dispatch(setuserloading(false));
        dispatch(setuser({
            Name: data.User.Name,
            Email: data.User.Email,
        }));
        dispatch(setmessage({
            Title: "Profile",
            Description:"Profile Updated Successfully"
        }))
    } catch (error:any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }
}

export const ChangePassword = async (OldPassword: string, NewPassword: string, dispatch: any) => {
    try {
        dispatch(setuserloading(true));
        const { data } = await axios.put("http://localhost:3000/api/updatepassword", {
            OldPassword,
            NewPassword,
        },
        {
        headers: { Token: localStorage.getItem('token') },
        });
        if(data.Error) throw new Error(data.Error)
        dispatch(setuserloading(false));
        dispatch(setmessage({
            Title: "Password",
            Description:"Password Updated    Successfully"
        }))
    } catch (error:any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }
}

export const GetAllTransactions = async (dispatch:any) => {
    try {
        dispatch(setuserloading(true));
        const {data} = await axios.get("http://localhost:3000/api/transaction",{headers : { Token: localStorage.getItem('token')} });
        if(data.Error) throw new Error(data.Error)
        dispatch(setuserloading(false));
        dispatch(setalltransactions(data.Transaction));
    } catch (error:any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }
    
}

export const MakeATransaction = async (SenderCardId:string, RecieverCardNumber:number, Amount:number,Pin:number, dispatch:any) => {
    try {
        dispatch(setuserloading(true));
        const {data} = await axios.put("http://localhost:3000/api/transaction",
            {
                SenderCardId,
                RecieverCardNumber,
                Money:Amount,
                Pin,
            },
            {
                headers : { Token: localStorage.getItem('token')} 
            });
            if(data.Error) throw new Error(data.Error)
            dispatch(setuserloading(false));
            dispatch(setmessage({
                Title: "Payment",
                Description:"Payment Successful"
            }))
    } catch (error:any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }
}

export const GetAllUsers = async (dispatch:any) => {
    try {
        dispatch(setuserloading(true));
        const { data } = await axios.get("http://localhost:3000/api/allusers",
        {
        headers: { Token: localStorage.getItem('token') },
        });
        if(data.Error) throw new Error(data.Error)
        dispatch(setuserloading(false));
        dispatch(setUsers(data.Conversations));

    } catch (error:any) {
        dispatch(setuserloading(false));
        dispatch(usererror(error.message));
    }
}
