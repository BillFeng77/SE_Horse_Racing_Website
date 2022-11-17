//要import registerUsingPost From server.py
import { Button, Form, Input, message, Popover, Progress, Tabs } from 'antd';
import { Store } from 'antd/es/form/interface';
import sha256 from 'crypto-js/sha256';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, history, Link, SelectLang, useIntl, useModel, useRequest } from 'next';
import  { StateType } from './service';
import styles from '../styles/userRegister.css';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage  defaultMessage="强度" />:{' '}
      <FormattedMessage  defaultMessage="强" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage  defaultMessage="强度" />:{' '}
      <FormattedMessage  defaultMessage="中" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage  defaultMessage="强度" />:{' '}
      <FormattedMessage  defaultMessage="太短" />
    </div>
  ),
};

const passwordProgressMap= {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register =()=> {
  const [visible, setVisible]= React.useState(false);
  const [popover, setPopover]= React.useState(false);
  const confirmDirty = false;
  const interval=5;
  const [form] = Form.useForm();
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { createUser } = useModel('user', (model) => ({
    createUser: model.createUser,
  }));

  const rudderanalytics = initialState?.rudderanalytics;

  // Redirect already logged in users
  if (initialState?.currentUser?.name) {
    history.push('/');
  }

  useEffect=()=>{{
      clearInterval(interval);
    }
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.currentUser;
    if (userInfo && !userInfo.name) {
      await setInitialState((s) => ({
        ...s,
        currentUser: { name: values.username },
      }));
    }
  };
//Junyan 麻烦帮我看一下这里要call Register去Post user应该怎么写？谢谢！
  /*const { loading: submitting, run: register } = useRequest<{ data: StateType }>(
    registerUsingPOST,
    {
      manual: true,
      onSuccess: async () => {
        if (data.success) {
          // console.log(data);
          message.success(intl.formatMessage({ id: 'pages.register.success' }));
          await fetchUserInfo(params[0]);
          localStorage.setItem('name', params[0].username);
          localStorage.setItem('password', params[0].password);
          // console.log(params);
          createUser(params[0].username);
          // identify user to rudderstack
          rudderanalytics?.identify(params[0].username);
          rudderanalytics?.track('User Registered', { username: params[0].username });
          history.push({
            pathname: '/user/register-result',
          });
        } else {
          message.error(data.message);
        }
      },
      onError: (err) => {
        // console.log(err);
        // console.log(registerData);
        // console.log(registerError);
        // message.error("Test");
        message.error(err.message);
      },
    },
  );*/

  const onFinish = () => {
    // encrypt password before sending
    const hashedPassword = sha256(values.password).toString();
    values.password = hashedPassword;
    values.confirm = hashedPassword;
    register(values);
  };

  const checkConfirm = () => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(intl.formatMessage({ id: 'pages.register.confirmPassword.validator' }));
    }
    return promise.resolve();
  };

  const checkPassword = () => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject(intl.formatMessage({ id: 'pages.register.password.required' }));
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.png" />
              <span className={styles.title}>Ask Angie</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({  })}
          </div>
        </div>

        <div className={styles.main}>
          <Tabs>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                defaultMessage: 'Register',
              })}
            />
          </Tabs>
          <Form form={form} name="UserRegister" onFinish={onFinish}>
            <FormItem
              name="username"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Enter the username',
                  }),
                },
                {
                  type: 'string',
                },
              ]}
            >
              <Input
                size="large"
                placeholder={intl.formatMessage({ id: 'pages.register.username.placeholder' })}
              />
            </FormItem>
            <Popover
              getPopupContainer={(node) => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }
                return node;
              }}
              content={
                visible && (
                  <div style={{ padding: '4px 0' }}>
                    {passwordStatusMap[getPasswordStatus()]}
                    {renderPasswordProgress()}
                    <div style={{ marginTop: 10 }}>
                      <span>{intl.formatMessage({ id: 'pages.register.password.validator' })}</span>
                    </div>
                  </div>
                )
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              <FormItem
                name="password"
                className={
                  form.getFieldValue('password') &&
                  form.getFieldValue('password').length > 0 &&
                  styles.password
                }
                rules={[
                  {
                    validator: checkPassword,
                  },
                ]}
              >
                <Input
                  size="large"
                  type="password"
                  placeholder={intl.formatMessage({ id: 'pages.register.password.placeholder' })}
                />
              </FormItem>
            </Popover>
            <FormItem
              name="confirm"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'pages.register.confirmPassword.required' }),
                },
                {
                  validator: checkConfirm,
                },
              ]}
            >
              <Input
                size="large"
                type="password"
                placeholder={intl.formatMessage({
                  id: 'pages.register.confirmPassword.placeholder',
                })}
              />
            </FormItem>

            <FormItem>
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                <span>{intl.formatMessage({ id: 'pages.register.register' })}</span>
              </Button>
              <Link className={styles.login} to="/user/login">
                <span>{intl.formatMessage({ id: 'pages.register.login' })}</span>
              </Link>
            </FormItem>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );};
  export default Register;