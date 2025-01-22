import connectDB from './db/db.js';

connectDB()

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