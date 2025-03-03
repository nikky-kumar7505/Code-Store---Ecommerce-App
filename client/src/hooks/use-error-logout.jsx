import { setUserLogout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from 'sonner';

const useErrorLogout =()=>{
    const dispatch = useDispatch();

    const handleErrorLogout  =(error, otherTitle = "Error occured")=>{
        if(error.response && error.response.status === 401){
             dispatch(setUserLogout())
            toast("Session expired. Please login again to continue"); 
        } else{
            toast(`${otherTitle}: ${error?.response?.data?.message}`);
        }

    }

    return {handleErrorLogout};

};

export default useErrorLogout;