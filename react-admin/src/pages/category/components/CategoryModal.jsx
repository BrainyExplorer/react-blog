import React,{useEffect} from 'react'
import {Modal,Form,Input,DatePicker,Switch,} from "antd"
import moment from "moment"

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

function CategoryModal({visible,record,closeHandler,onFinish,confirmLoading}) {
  const [form] = Form.useForm()
  useEffect(() => {
    if(JSON.stringify(record)==="{}"){
      form.resetFields()
    }else{
      form.setFieldsValue(
        {
          ...record,
          create_time: record.create_time && moment(record.create_time),
        }
      )
    }     
  }, [record])

  const onOk = () => {
    form.submit()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  return (
    <>
      <Modal
        title={record ? 'Edit ID:' + record.id : 'Add'}
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            status: true
          }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="标签名"
            name="typeName"
            rules={[{ required: true, message: 'Please input your tagName!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="标签说明"
            name="description"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="图标"
            name="icon"
            rules={[{ required: true, message: 'Please input your icon!' }]}
          >
            <Input />
          </Form.Item>
          {JSON.stringify(record)!=="{}"&& <Form.Item
            label="创建时间"
            name="create_time"
          >
            <DatePicker showTime disabled></DatePicker>
          </Form.Item>}
          
        </Form>
      </Modal>
    </>
  )
}

export default CategoryModal