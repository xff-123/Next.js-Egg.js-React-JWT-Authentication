import React from 'react'
import { Form, Input, Button } from 'antd'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
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

const Register: NextPage = () => {
  const onFinish = async (values: any) => {
    const { email, password, nickname } = values
    const res = await fetch(`${baseUrl}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        username: email,
        password,
        nickname
      })
    })
    const data = await res.json()
    if (!data.success) {
      alert("该用户已注册，可前去登录")
    } else {
      window.alert("注册成功, 可前去登录")
    }
    Router.push('/login')
  }
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h2>邮箱注册</h2>
        <Form
          {...formItemLayout}
          name="register"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              {
                type: 'email',
                message: '邮箱格式错误！'
              },
              {
                required: true,
                message: '请输入你的邮箱！'
              }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入你的密码'
              }
            ]}
            hasFeedback
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认你的密码'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                }
              })
            ]}
          >
            <Input.Password placeholder="请确认密码" />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="昵称"
            tooltip="你想要别人怎末称呼你"
            rules={[{ required: true, message: '请输入你的昵称', whitespace: true }]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              注册
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.bottom}>
          <span>
            已有账号？
          </span>
          <Button type="link" onClick={() => { Router.push('/login') }}>立即登录</Button>
        </div>
      </div>
    </div>
  )
}

export default Register
