import React, {Component} from 'react'
import LoginForm from './login-from.jsx'
import logo from './images/favicon.ico'
import './index.less'


export default class Login extends Component {

  state = {
    //需要显示登陆失败的提示文本
    errorMsg: ''
  }

  //收到login-from发送的values对象，values对象有两个参数一个username一个password,可以在回调函数里添加方法
  login = ({username, password}) => {
    alert(`发送Ajax请求  username：${username}，password：${password}`)
  }


  render() {
    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo"/>
          React项目: 后台管理系统
        </div>
        <div className='login-content'>
          <div className='login-box'>
            <div className="error-msg-wrap"></div>
            <div className="title">用户登陆</div>
            <LoginForm login={this.login}/>
          </div>
        </div>
      </div>
    )
  }
}