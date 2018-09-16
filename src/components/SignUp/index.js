import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Icon, Button, message } from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SignUp extends Component {
  state = {
    confirmDirty: false
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${values.userName}, вы успешно зарегистрированы!`, 2.5)
        .then(() => this.props.history.push('/'));
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароль не совпадает');
    } else {
      callback();
    }
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form container">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'E-mail некорректный',
            }, {
              required: true, message: 'Введите E-mail',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Введите имя' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Имя" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Введите пароль' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Пароль" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Повторите пароль',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="copy" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Повторить пароль" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} className="login-form__button" block>
            Зарегистрироваться
          </Button>
          <Link to="/signin">Войти</Link>
        </FormItem>
      </Form>
    );
  }
}

SignUp = Form.create()(SignUp);

export default SignUp;
