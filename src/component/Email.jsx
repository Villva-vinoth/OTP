import React, { useEffect, useRef, useState } from 'react'
import { useSendMailMutation } from '../redux/slice/emailSlice'

const Email = () => {
    const OTP_DURATION = 1 * 60 * 1000;
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [otpError, setOtpError] = useState('')

    const [sendEmail, { isLoading, isError, isSuccess: emailSuccess }] = useSendMailMutation()
    const [isclose, setIsClose] = useState(false)

    const [generateOtp, setGeneratoOtp] = useState('')
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const inputRefs = useRef([]);

    const [time,setTime] = useState(null)
    const [showResend, setShowResend] = useState(true);
    // console.log(showResend)
    const [leftTime,setLeftTime] = useState(0)



    const [isSubmit,setIsSubmit]=useState(false)



    const generate = (input = 4) => {

        let po = ''

        for (let i = 0; i < input; i++) {
            po += Math.floor(Math.random() * 10)
        }

        return Number(po)
    }



    const handleSubmit = async (e) => {
        const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{3,}$/
        if (emailRegex.test(email) == false) {
            setError('Please enter the valid email !')
            setTimeout(() => {
                setError('')
            }, 2000)
            return false;
        }
        // console.log("enable", isLoading, isError, emailSuccess)
        setIsClose(true)
        e.preventDefault();
        const ot = generate()
        setGeneratoOtp(ot)
        // console.log("otp", ot)
        try {
            await sendEmail({ email, ot })
            // console.log("succes", isLoading, isError, emailSuccess)
            setTime(Date.now())
            setLeftTime(OTP_DURATION)
            setShowResend(true)
            setIsSubmit(true)

        } catch (error) {
            console.log("error", error)
        }
        finally {
            // console.log("finally", isLoading, isError, emailSuccess)
            // if (emailSuccess == false) {
                setTimeout(() => {
                    setIsClose(false)
                    // setEmail("")
                }, 2000)
            // }
            // setIsClose(false)

        }
    }


    const handleValidate = () => {
        if (generateOtp == otp.join('')) {
            alert("OTP successfully verified !")
            setIsSubmit(false)
            setEmail('')
            setOtp(new Array(4).fill(""))
        }
        else {
            setOtpError("Please enter the valid otp");
            setTimeout(() => {
                setOtpError("");
            }, 2000)
            
        }
    }

    const handleChange = (e, i) => {
        if (isNaN(e.value)) return false;
        setOtp([...otp.map((d, dx) => dx === i ? e.value : d)])
        if (e.nextSibling) {
            e.nextSibling.focus()
        }

    }

    const formatTime = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };


    useEffect(() => {

        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
        else {
            // console.log('inputRefs.current[0] is undefined', inputRefs.current);
        }
    }, [])

   useEffect(()=>{
        const timer  = setInterval(()=>{
            const currentTime = Date.now()
            const elapsedTime = currentTime - time;
            const remainTime = OTP_DURATION - elapsedTime;
            if(remainTime <=0 ){
                setShowResend(false);
                setLeftTime(0);
                clearInterval(timer);
                setGeneratoOtp("");
            }
            else {
                setLeftTime(remainTime)
            }
        },1000)

        return ()=> clearInterval(timer)
   },[time])



    return (

        <div>

          { !isSubmit && <div className='flex  flex-col gap-3 border-2 p-5'>
                <p className='capitalize'>Enter your Email Id </p>
                <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' required className='px-2' />
                {error && <p className='text-[red]'>{error}</p>}
                <button className='text-white w-100 h-6 bg-[red]' onClick={handleSubmit} disabled={isclose}>
                    {isLoading ? <div className='motion-safe:animate-bounce'>Sending...</div> : 'Send Email'}
                </button>
                {emailSuccess && isclose && <p>Email sent successfully!</p>}
                {isError && isclose && <p className='text-[red]'>Failed to send email.</p>}
            </div>}

            {isSubmit && <div className='flex flex-col gap-3 border-2 p-5 items-center justify-center'>
                <p>{`hello user ${email.split('@')[0]} Enter your OTP `}</p>
                <div className='flex gap-5 justify-center'>
                    {
                        otp.map((input, index) => {
                            return (
                                <input
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    className='w-5 h-5 text-center border border-gray-300 focus:border-blue-500 focus:outline-none'
                                    key={index}
                                    value={input}
                                    onChange={(e) => handleChange(e.target, index)}
                                    // autoFocus 
                                    onFocus={(e) => e.target.select()}
                                />
                            )
                        })
                    }

                </div>
                {
                    showResend ? <p className='text-[yellow]'>
                    {formatTime(leftTime)}
                </p> : <div className='text-[yellow]'>
                        <button onClick={handleSubmit}>
                            {isLoading ? 'send...':'Resend'}
                        </button>
                        {emailSuccess && isclose && <p>Email sent successfully!</p>}

                    </div>
                }
                {
                    otpError && <p className='text-[red]'>{otpError}</p>
                }
                <button className='bg-[red] w-[80%]' onClick={handleValidate}>
                    verify OTP
                </button>
            </div>}
        </div>

    )
}

export default Email