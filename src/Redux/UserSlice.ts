import { Conversation } from '@/app/models/Conversation'
import { Description, Title } from '@radix-ui/react-toast'
import { createSlice } from '@reduxjs/toolkit'

type Card = {
    _id: string,
    CardNumber: string,
    Owner: string,
    ExpireDate: string,
    Amount: number,
    Pin: string,
    __v:number,
}
type Transaction = {
    _id:string,
    SenderId:string,
    RecieverId:string,
    Amount:number,
    __v:number,
}

type ChatMessage = {
    _id:string,
    SenderId:string,
    RecieverId:string,
    Message:string,
    Transaction:Transaction,
}

type SingleConversation = [ChatMessage]


type Users = [{
    _id:string,
    Name:string,
}];

type User = {
    Loading:boolean,
    Name: string,
    Email: string,
    _id:string,
    Cards: [Card],
    Error: any,
    Message: {
        Title: string,
        Description: string,
    },
    Transactions:[Transaction],
    SingleConversation:SingleConversation,
    Users:Users,

}



const initialState: User = {
    Loading:false,
    Name: "",
    Email: "",
    _id:"",
    Error: "",
    Cards: [{
         _id: "",
        CardNumber: "",
        Owner: "",
        ExpireDate: "",
        Amount: 0,
        Pin: "",
        __v:0,
    }],
    Message: {
        Title: "",
        Description:"",
    },
    Transactions:[{
        _id: "",
        SenderId: "",
        RecieverId: "",
        Amount: 0,
        __v:0,
    }],
    SingleConversation:[
    {
        _id:"",
        SenderId:"",
        RecieverId:"",
        Message:"",
        Transaction:{
            _id: "",
            SenderId: "",
            RecieverId: "",
            Amount: 0,
            __v:0,
            },
        }
    ],
    Users:[{
        _id:"",
        Name:"",
    }],
    
}

export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setuserloading: (state, action) => {
            state.Loading = action.payload;
        },
        setuser: (state, action) => {
            state._id = action.payload._id
            state.Name = action.payload.Name;
            state.Email = action.payload.Email;
        },
        usererror: (state, action) => {
            state.Error = action.payload;
        },
        setusercards: (state, action: { payload:[Card]}) => {
            state.Cards = action.payload;
        },
        addcard: (state, action: { payload: Card }) => {
            let cards = state.Cards;
            cards.push(action.payload);
            state.Cards = cards;
        },
        setmessage: (state, action:{payload:{Title:string,Description:string}}) => {
            state.Message =  action.payload;
        },
        setalltransactions:(state,action:{payload:[Transaction]})=>{
            state.Transactions = action.payload;
        },
        setconversations:(state,action:{payload:SingleConversation})=>{
            state.SingleConversation = action.payload;
        },
        addMessageToConversation:(state,action:{payload:ChatMessage})=>{
            state.SingleConversation.push(action.payload);
        },
        setUsers:(state,action:{payload:Users})=>{
           state.Users = action.payload;
        }
    }
});

export const { setuser, usererror,setuserloading,setusercards,addcard,setmessage,setalltransactions,setconversations,setUsers,addMessageToConversation} = UserSlice.actions;
export default UserSlice.reducer;