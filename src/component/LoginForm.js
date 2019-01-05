import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Form,
  Icon,
  Input,
  Button,
  Row
} from 'antd'
import { login } from '../config/api'
import '../App.css'


class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const params = { headers: {}, method: 'POST', data: { userName: values.userName, password: values.password } }
        login(params).then(response => {
          console.log(response)
          if (response) {
            const { isSuccess } = response
            if (isSuccess) {
              this.props.history.push(`/chat/${values.userName}`)
            }
          }
        }).catch(ex => {
          console.log(ex)
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div id="chatLoginDiv">
        <Row>
          <h2>Simple SocketIO Chat</h2>
        </Row>
        <Row>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    )
  }
}

const LoginForm = Form.create()(NormalLoginForm)

export default withRouter(LoginForm)
