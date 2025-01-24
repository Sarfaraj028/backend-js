import 'dotenv/config'
import connectDB from './db/db.js';
import { app } from './app.js';

connectDB()
.then(() =>{
    app.on('error', (error)=>{
        console.error("error: ", error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () =>{
        console.log("App is running at port : ", process.env.PORT || 8000);
        
    })
})
.catch(err =>{
    console.error("Monog DB failed : ",err);
})


app.get('/', (req, res) =>{
    res.send("hellow bhai")
})


/*
;( async () => {
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on('error', (error)=>{
        console.error("error: ",error);
        throw error
       })
       app.listen(process.env.PORT, () =>{
        console.log(`App Listening on the port ${process.env.PORT}`);
       })
    }
    catch(err) {
        console.error("error : ", err);
        throw err
    }
})()

*/