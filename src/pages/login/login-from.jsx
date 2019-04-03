import React, {Component} from 'react'
import {Form, Input, Button, Icon} from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item  // <FormItem>  <Form.Item>

/*
 1. 收集表单数据
 2. 表单检验
 */
class LoginForm extends Component {

  //声明接收属性的：属性名，属性类型，必要性
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  handleSubmit = (event) => {
    // 阻止跳转（浏览器默认行为）
    event.preventDefault()
    //取出输入的数据
    const {form} = this.props
    //进行表单验证validateFields（验证字段）
    form.validateFields((err, values) => {
      if(!err){
        //读取输入的数据，表单验证通过，把values作为对象传递给login
        const values = this.props.form.getFieldsValue()//在当前LoginForm的form表单得到价值字段 values是包含所有数入数据的对象
        this.props.login(values)
        console.log(values)
      }else{
        //表单验证不通过
      }
    })
    //声明式实时表单验证

    //重置字段
    this.props.form.resetFields()
  }

  validatePwd = (rule, value, callback) => {
    value = value.trim()
    if (value === '') {
      callback('用户密码不能为空或者空格')
    } else if (value.length < 4 || value.length > 8) {
      callback('密码长度必须为4到8位')
    } else {
      callback()
    }
  }

  render() {
    // getFieldDecorator(): 用来包装表单项组件标签生成新的组件标签
    //const {getFieldDecorator} = this.props.form
    const {getFieldDecorator} = this.props.form
    return (
      <Form className='login-form' onSubmit={this.handleSubmit}>
        <Form.Item>
          {
            getFieldDecorator('username', ({//配置对象：属性名是特定的名称
              initialValue: 'admin',
              rules: [
                {whitespace: true, required: true, message: '必须输入用户名!'},
                {min: 4, message: '用户名长度不能小于4位'}
              ]
            }))(
              <Input type='text' prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
            )
          }
        </Form.Item>
        <FormItem>
          {
            getFieldDecorator('password', {
              initialValue: '',
              rules: [{validator: this.validatePwd}]
            })(
              <Input type='password' prefix={<Icon type="lock"/>} placeholder="请输入密码"/>
            )
          }
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType="submit" className='login-form-button'>登陆2</Button>
        </FormItem>
      </Form>
    )
  }
}

// const WrapLoginForm = Form.create()(LoginForm)

export default Form.create()(LoginForm)
