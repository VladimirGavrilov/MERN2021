 const express = require('express')
 const config = require('config')
 const mongoos = require('mongoose')
//  const routes
 const app = express()
 app.use('/api/auth', require('./routes/auth.routes'))

 const PORT = config.get('port') || 5000

 async function start(){
     try{
         mongoos.connect(config.get('mongoUri'),{
             useNewUrlParser: true,
             useUnifiedTopology: true,
             useCreateIndex: true
         })
     }catch(e){
         console.log('Server Error', e.message)
         process.exit(1)
     }
 
 }

 start()
 app.listen(PORT, () => console.log(`App has been started ${PORT}...`))