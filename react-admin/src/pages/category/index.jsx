import React, { useEffect,useState } from 'react';
import { Space, Table,Popconfirm,Button } from 'antd';
import { useCategoryStore } from '../../stores';
import { createFromIconfontCN } from '@ant-design/icons';
import CategoryModal from './components/CategoryModal'
import moment from "moment"

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 替换为你的图标字体链接
});



const Category = () => {
  const {categoryData,fetch,updateCategory,addCategory,delCategory} = useCategoryStore()
  const [modelVisible, setModelVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [confirmLoading, setConfirmLoading] = useState(false)

    useEffect(()=>{
      if(!categoryData) fetch()
    },[])
    const editHandler = (record) => {
      setModelVisible(true)
      setRecord(record)
    }
    const confirm = (id) => {
      delCategory(id,fetch)
    }
    const closeHandler = () => {
      setModelVisible(false)
    }
    const onFinish = (values) => { 
      setConfirmLoading(true)
      const id = record?.id;
      if (JSON.stringify(record)!=="{}") {
        let formData ={...values}
        delete formData.create_Time
        updateCategory({id,...formData},fetch)
      } else {
        addCategory(values,fetch)
      }
      setConfirmLoading(false)
      setModelVisible(false)
    }
    const HandleAddCategory = () =>{
      setModelVisible(true)
      setRecord({})
    }
    const columns = [
      {
        title: '标签名',
        dataIndex: 'typeName',
        key: 'typeName',
        render: (text) => <a>{text}</a>,
      },
      {
        title: "标签说明",
        dataIndex: 'description',
        key: 'description',
        render: (text) => <span>{text}</span>,
      },
      {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
        render: (_, record) => <IconFont type={record.icon} width="20px" height="20px" />
      },
      {
        title: "创建时间",
        dataIndex: 'create_time',
        key: 'create_time',
        render: (text) => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
          <a onClick={() => { editHandler(record) }}>Edit</a>
          <Popconfirm
            title="是否确定删除"
            onConfirm={() => { confirm(record.id) }}
            okText="Yes"
            cancelText="No">
            <a>Delete</a>
          </Popconfirm>
        </Space>
        ),
      },
    ];
  
  return (
   <>
   <Button type="primary" onClick={HandleAddCategory}>添加分类</Button>
    <Table columns={columns} dataSource={categoryData.map(item => ({ ...item, key: item.Id }))} rowKey={record => record.id} />
    <CategoryModal
        visible={modelVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      ></CategoryModal>
   </>
  )
};
export default Category;