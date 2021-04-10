const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendWelcomeMail =(email,name)=>{
    sgMail.send({
        to:email,
        from:'mannasuman41@gmail.com',
        subject:"Thank you for joining in !!",
        text:`Welcome to the appp ${name}. Let me know how you get along with the app.`
    })
}

const sendCancilationMail =(email,name)=>{
    sgMail.send({
        to:email,
        from:'mannasuman41@gmail.com',
        subject:"Thank you for using our services !!",
        text:`Goodby, ${name}. I hope to see you backsometime soon.`
    })
}

module.exports ={
    sendWelcomeMail,
    sendCancilationMail
}
