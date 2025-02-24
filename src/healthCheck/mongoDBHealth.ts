import mongoose from "mongoose"

export async function checkMongodbHealth(MONGO_URL:any){
    try {
        if(mongoose.connection.readyState !== 1)
        {
            await mongoose.connect(MONGO_URL);
        }
        if(mongoose.connection.readyState==1){
            return{
                status:"SUCCESS",
                message:"MongoDB is connected and healthy....",
            }
        }else{
            return{
                status:"FAILURE",
                env: `URL: ${MONGO_URL}`,
                message:"MongoDB is not connected",
            }
        }
    }catch(error){
        console.log(error);
    }
}