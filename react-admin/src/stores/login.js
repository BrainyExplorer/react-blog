import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { message } from "antd";
import servicePath from "../config/apiUrl";
import axios from "axios";

const useLoginStore = create()(
  persist(
    (set) =>({
      userInfo: '',
      login: (dataProps,setIsLoading,navigate) =>{
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
            withCredentials:true
        }).then(
            res=>{
                setIsLoading(false)
                if(res.data.data==='登录成功'){
                  console.log(res.data)
                    set({userInfo:res.data.openId})
                    navigate('/article/addArticle')
                }else{
                    message.error('用户名密码错误')
                }
            }
        )
      }
    }),
    {
      name: "userInfo",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useLoginStore;