import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { Modal, Button, Form, Input } from 'antd';
import { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next'
import {getCookie} from '../utils/getCookie'
import { delCookie } from '../utils/delCookie';
import baseUrl from '../constant/url'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


const Detail = ({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { nickname, username } = posts.data
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);

  }

  useEffect(() => {
    if(!username){
      router.push('/login')
    }
  }, [])

  const onFinish = async (values: any) => {
    // console.log('Received values of form: ', values)
    const { old_password, new_password } = values
    const res = await fetch(`${baseUrl}/api/change`, {
      method: 'POST',
      headers: {
        'Authorization': getCookie(document.cookie).jwt,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        old_password,
        new_password
      })
    })
    const data = await res.json()
    if (data.success) {
      delCookie('jwt')
      window.alert(`${data.data.message}, 前去登录`)
      router.push('/login')
    } else {
      window.alert(`${data.data.message}, 请重新输入`)
    }
  }
  return (
    <>
    {
      username && (<div className={styles.app}>
        <h1>hello! {nickname}+{username}</h1>
        <h2>欢迎来到我的ssr网站</h2>
        <Button type="primary" onClick={showModal}>
          修改密码
        </Button>
        <Modal title="修改密码" visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <Form
            {...formItemLayout}
            name="changePassword"
            onFinish={onFinish}
          >
            <Form.Item
              label="当前密码"
              name="old_password"
              rules={[
                {
                  required: true,
                  message: '请输入你的当前密码'
                }
              ]}
              hasFeedback
            >
              <Input.Password placeholder="请输入当前密码密码" />
            </Form.Item>
  
            <Form.Item
              label="新密码"
              name="new_password"
              rules={[
                {
                  required: true,
                  message: '请输入你的新密码'
                }
              ]}
              hasFeedback
            >
              <Input.Password placeholder="请输入新密码" />
            </Form.Item>
  
            <Form.Item
              label="确认密码"
              name="confirm"
              dependencies={['new_password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认你的新密码'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入的新密码不一致'))
                  }
                })
              ]}
            >
              <Input.Password placeholder="请确认新密码" />
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                确定
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>)
    }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = getCookie(req.headers?.cookie).jwt || null
  const res = await fetch(`${baseUrl}/api/detail`, {
    method: 'GET',
    headers : {
      'Authorization': token
    } as any
  })
  const posts = await res.json()
  return {
    props: {
      posts,
    },
  }
}

export default Detail
