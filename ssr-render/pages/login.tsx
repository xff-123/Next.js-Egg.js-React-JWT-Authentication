import { Form, Input, Button } from 'antd'
import type { NextPage } from 'next'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { setCookie } from '../utils/setCookie'

const Login: NextPage = () => {
  const router = useRouter()
  const onFinish = async (values: any) => {
    const { username, password } = values
    const res = await fetch('http://localhost:7001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const data = await res.json()
    if (!data.success) {
      window.alert('账号密码错误')
    } else {
      setCookie('jwt',data.data.token )
      // localStorage.setItem('username', data.data.username)
      // localStorage['token'] = data.data.token
      router.push('/detail')
    }
  }

  return (
      <div className={styles.app}>
        <div className={styles.container}>
          <h2>账号登陆</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{
                type: 'email',
                message: '邮箱格式错误！'
              },
              {
                required: true,
                message: '请输入邮箱账号'
              }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="输入邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <Link href='/change'><a className="login-form-forgot" href="">
                修改密码
              </a></Link>
            </Form.Item>
          </Form>

          <div className={styles.bottom}>
            <span>
              没有账号？
            </span>
            <Button type="link" onClick={() => { router.push('/register') }}>免费注册</Button>
          </div>
        </div>
      </div>
  )
}

export default Login
