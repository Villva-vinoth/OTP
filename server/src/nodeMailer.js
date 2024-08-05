const node_mail = require('nodemailer')
const router = require('express').Router()


const transport = node_mail.createTransport(
   {
    host:"smtp.ethereal.email",
    port:587,
    auth:{
        user:"letitia.hackett8@ethereal.email",
        pass:"hUq8E3kmwcevwfMrtd"
    }
   }
)



router.post('/sendmail',
    async (req,res)=>{
        try {

            console.log(req.body)
            const user_email = req.body.email;
            const otp = req.body.ot
            const html = `
            <h1>hello this is Your OTP ${otp} </h1>
            `
            const mail_option = {
                from :"letitia.hackett8@ethereal.email",
                to:user_email,
                subject:"OTP verification",
                html:html

            }

            transport.sendMail(mail_option,(err,info)=>{
                if(err){
                    console.log(err)
                    return res.status(400).json({
                        message:"mail send failed !"
                    });
                }
                else{
                    console.log("process")
                    return res.status(200).json({
                        message:"Mail send Successful !",
                        data:info.response
                    });
                }
            }
        )
        } catch (error) {
            console.log("error",error)
            res.status(500).json({
                message:"email failed !"
            })
        }
    }
)

module.exports = router