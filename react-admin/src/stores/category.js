import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { message } from 'antd';
// import { useNavigate } from "react-router-dom"
import axios from "axios";
import servicePath from "../config/apiUrl";



const useCategoryStore = create()(
  persist(
    (set) => ({
      categoryData: [],
      fetch: (pond) => {
        // var navigate = useNavigate()
        axios({
          method: 'get',
          url: servicePath.getTypeInfo,
          headers: { 'Access-Control-Allow-Origin': '*' },
          withCredentials: true
      }).then(
          res => {
              if (res.data.data === '没有登录') {
                  localStorage.removeItem('userInfo')
                  // navigate('/login')
              } else {
                set({categoryData:res.data.data})
              }
          }
      )
      },
      addCategory:(data,callback)=>{
        axios({
          method: 'post',
          url: servicePath.addType,
          headers: { 'Access-Control-Allow-Origin': '*' },
          data:data,
          withCredentials: true
      }).then(
          res => {
              if (res.data.data === '没有登录') {
                localStorage.removeItem('userInfo')
                  // navigate('/login')
              } else {
                message.success('添加成功')
                callback()
              }
          }
      )
      },
      updateCategory:(data,callback)=>{
        axios({
          method: 'post',
          url: servicePath.updateTypeById,
          headers: { 'Access-Control-Allow-Origin': '*' },
          data:data,
          withCredentials: true
      }).then(
          res => {
              if (res.data.data === '没有登录') {
                  localStorage.removeItem('userInfo')
                  // navigate('/login')
              } else {
                callback()
                fetch()
              }
          }
      )
      },
      delCategory:(id,callback)=>{
        axios(servicePath.delTypeById + id, { withCredentials: true }).then(
          res => {
              // message.success('文章删除成功')
              callback()
          }
      )
      }
    }),
    {
      name: "categoryData",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            ["categoryData"].includes(key)
          )
        ),
    }
  )
);

export default useCategoryStore;