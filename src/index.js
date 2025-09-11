import connectionDB from "./db/index.js";
import dotenv from 'dotenv'
import {app} from './app.js'





dotenv.config({
    path : './.env'
})


connectionDB()
.then( () => {
  app.listen(process.env.PORT || 8000 ,() =>{
    console.log(`server is runing on ${process.env.PORT}`)
  })
})
.catch( (error) =>{
   console.log('database connection failed ', error)
})