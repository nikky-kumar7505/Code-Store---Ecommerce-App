import axios from "axios";
import { toast } from 'sonner'
import {useNavigate} from "react-router-dom"

const useRazorpay = () =>{
    const navigate = useNavigate()

    const generatePayment = async (amount) =>{
        try {
            const res = await axios.post(
                import.meta.env.VITE_API_URL + "/generate-payment",
                {amount},
                { 
                    headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`,
                    } 
                }
              );
            const data = await  res.data;
            return data.data;
        } catch (error) {
            return toast(error.response.data.message)
        }
    };

    const loadScript = (src) =>{
        return new Promise( (resolve)=>{
            const script = document.createElement("script");
            script.src = src;
            script.onload = () =>{
                resolve(true);
            };
            script.onerror =()=>{
                resolve(false)
            }
            document.body.appendChild(script);
        }); 
    }

    const verifyPayment = async(options, productArray, address) =>{
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )
        if(!res){
            return toast("Failed to load razorpay")
        }
        const paymentObject = new window.Razorpay({
            key : import.meta.env.VITE_RAZORPAY_KEY_ID ,
            ...options,
            image : "https://www.pexels.com/photo/brass-ornate-vintage-key-on-black-computer-keyboard-39389/",
            handler : async (response) =>{  
                try {
                    const res = await axios.post(
                        import.meta.env.RAZORPAY_KEY_ID + "/verify-payment",
                        {
                            razorpay_order_id : options.id,
                            razorpay_payment_id : response.razorpay_payment_id,
                            amount : options.amount,
                            address,
                            productArray
                        },
                        {
                            headers : {
                                Authorization : `Bearer ${localStorage.getItem("token")}`,
                            }, 
                        }
                    );
                    const {data} = await res.data;
                    toast(data.message);
                    navigate("/success")

                } catch (error) {
                    return toast(error.response.message)
                }
            },
            notes : {
                address : "Razorpay Corporate office"
            },
            theme : {
                color : "#3399cc"
            },
        });

        paymentObject.open();
    }


    return {generatePayment, verifyPayment};
}

export default useRazorpay;