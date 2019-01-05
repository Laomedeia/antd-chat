import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Button, Form, Input, Layout
} from 'antd'
import io from 'socket.io-client'
import moment from 'moment'
import { socketAddress } from '../config/api'
import '../App.css'

let socket = null
const { Content } = Layout

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      consoleArray: []
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.loginname)
    this.setState({
      userName: this.props.match.params.loginname
    })
    socket = io.connect(`${socketAddress}`)
    socket.on('connect', () => {
      this.output(`${this.state.userName} has connected to the server!`)
    })

    socket.on('chatevent', (data) => {
      this.output(`${data.userName}======> ${data.message}`)
    })

    socket.on('disconnect', () => {
      this.output(`${this.state.userName} has disconnected!`)
    })
  }

 sendDisconnect = () => {
   if (socket != null) {
     socket.disconnect()
   }
 }

 sendMessage = (e) => {
   e.preventDefault()
   this.props.form.validateFields((err, values) => {
     if (!err) {
       const { message } = values
       const { userName } = this.state
       socket.emit('chatevent', { userName, message })
     }
   })
   this.props.form.resetFields()
 }

  output = (message) => {
    const currentTime = `${moment().format('HH:mm:ss')}`
    const element = `${currentTime}: ${message}`
    // this.setState({
    //   consoleArray: [...this.state.consoleArray, element]
    // })
    this.setState(prevState => ({
      consoleArray: [...prevState.consoleArray, element]
    }))
  }

  render() {
    const { consoleArray } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <h1 style={{ marginLeft: 10 }}>Netty-socketio Demo Chat</h1>
        <Content style={{
          background: '#e7e7e7', padding: 24, margin: 10, minHeight: 280,
        }}
        >
          {
            consoleArray.map((el, index) => <div key={index}>{el}</div>)
          }
        </Content>
        <Form layout="inline" onSubmit={this.sendMessage}>
          <Form.Item>
            {getFieldDecorator('message')(
              <Input id="msg" placeholder="Type something..." style={{ marginLeft: 10, width: 400 }} />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ marginLeft: 5 }} htmlType="submit" id="send">Send</Button>
            <Button type="danger" style={{ marginLeft: 5 }} onClick={this.sendDisconnect}>Disconnect</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const chatForm = Form.create()(Chat)
export default withRouter(chatForm)
