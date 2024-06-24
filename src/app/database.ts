import mongoose from "mongoose";

export const connectdatabse = async () => {
    try {
        let URL : string = process.env.MONGO_URI || "";
        const connection = await mongoose.connect(URL);
        if (connection) {
            console.log('DataBase Connected');
        }
    } catch (error) {
        console.log(error);
    }
};