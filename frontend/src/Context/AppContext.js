import {createContext, useState} from 'react'
import axios from '../Utils/axios'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const AppContext = createContext()

export default AppContext;

export const AppProvider = ({children})=>{
    let navigate = useNavigate()

    let [user,setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    

    let [loginRes,setLoginRes] = useState('')
    let [signupRes,setSignupRes] = useState('')
    
    // login user
    let LoginUser = (email,password)=>{
        axios.post('login/',{
         email:email,
         password:password,
        }).then((response)=>{
        console.log(response.data);
        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))
        if (user.is_super_admin){
            navigate('admin_panel/')
        }else{
            navigate('/')
        }
        

        localStorage.setItem('authTokens',JSON.stringify(response.data))
        }).catch((error)=>{
            console.log(error.response.data,'eror');
            setLoginRes(error.response.data)
            console.log('llll',loginRes,'login res');
        })
     }
     // Signup user
     let SignupUser = (firstName,lastName,email,password,confirmPassword)=>{ 
        console.log('signup context');
        axios.post('signup/',{
          first_name:firstName,
          last_name:lastName,
          email:email,
          password:password,
          confirm_password:confirmPassword,
        }).then((response)=>{
            if (response.status===200){
            setSignupRes(response.data)
            console.log(response.data);
            navigate('login/')
        }
        }).catch((error)=>{
            setSignupRes(error.data)        
            console.log(error);
        })
      }
      let logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        setUser(null)
        navigate('login/')
        
    }
    let contextData = {
        LoginUser:LoginUser,
        loginRes:loginRes,
        user:user,
        authTokens:authTokens,
        SignupUser:SignupUser,
        logoutUser:logoutUser,




    }
    return (
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
        
    )
}