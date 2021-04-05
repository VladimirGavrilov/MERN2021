 const express = require('express')
 const config = require('config')
 const mongoos = require('mongoose')
 const app = express()

 const PORT = config.get('port') || 5000

 async function start(){
     try{
         mongoos.connect(config.get('mongoUri'),)
     }catch(e){
         console.log('Server Error', e.message)
         process.exit(1)
     }
 
 }

 start()
 app.listen(PORT, () => console.log(`App has been started ${PORT}...`))