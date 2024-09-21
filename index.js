
const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    
    //call back fns  To handle SMTP commands like HELO,MAIL FROM, etc
    //npm i @types/smtp-server

    // since we are not sending the email it requires us to set the ssl certificates 
    allowInsecureAuth: true,  
    authOptional: true,

    onConnect( session, cb ){  // here we can accept connection or reject it

        console.log(`onConnect`, session.id)
        //cb()  to  accept conncetion
        cb(new Error('Cannot accept connection'))  // throw error to reject it



    },

   onMailFrom(address, session, cb)  // decides to whether accept mail or not
   {
      console.log(`onMailFrom`, address.address, session.id) //showing addr who sent mail
      cb()  //accepting the mail from anyone
   },

   onRcptTo(address, session, cb)  
   {
    console.log(`onRcptTo`, address.address, session.id)
     cb()   // acceppt if valid mail addr
   },

   onData(stream, session, cb)
   {
      //whenever theres data on stream, console log the data

      stream.on('data', (data)=>{
        console.log(`onData ${data.toString()}`)
      })

      // when stream is finished, accept its data
      stream.on(`end`, cb )
   }


});

server.listen(25, ()=>{  //running on default 25 port for smtp server
    console.log(`SMTP server running on port 25`)
} )