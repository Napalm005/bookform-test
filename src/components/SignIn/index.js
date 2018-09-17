import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SignIn extends Component {
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

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched  } = this.props.form;

    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <Form onSubmit={this.handleSubmit} className="login-form container">
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Введите имя' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Имя" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Введите пароль' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Пароль" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox>Запомнить меня</Checkbox>
          )}
          <a className="login-form__forgot" href="">Восстановить пароль</a>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} className="login-form__button" block>
            Войти
          </Button>
          Или <Link to="/signup">Зарегистрироваться</Link>
        </FormItem>
      </Form>
    );
  }
}

SignIn = Form.create()(SignIn);

export default SignIn;
