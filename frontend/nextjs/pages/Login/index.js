//import Footer from '@/components/Footer';
//need Import LoginPost from controller
//Need import administratorPost userPost from controller
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, message, Tabs } from 'antd';
//need import sha256 to encrypt the password
import React, { useState } from 'react';
import { FormattedMessage, history, Link, SelectLang, useIntl, useModel } from 'next';
//import styles from 'pages/Login/userlogin.less';
//import  { LoginParams, LoginResult } from './service';

const LoginMessage= ({ content }) => (
  <Alert
    style={{ 
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login= () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const rudderanalytics = initialState?.rudderanalytics;

  const intl = useIntl();

  const fetchUserInfo = async (/*values: LoginParams*/) => {
    const userInfo = await initialState?.currentUser;
    if (userInfo && !userInfo.name) {
      const { data: isAdminRequest } = (await isAdminUsingPOST({ username: values.username })) /*as {
        data: API.ResponseBoolean_;
      }*/;
      const newUser = { name: values.username, isAdmin: false };
      if (isAdminRequest.success === true) {
        newUser.isAdmin = isAdminRequest.result || false;
      }
      // Identify user to rudderstack
      rudderanalytics?.identify(values.username, newUser);
      rudderanalytics?.track('User Logged In', newUser);

      await setInitialState((s) => ({
        ...s,
        currentUser: newUser,
      }));
    }
  };

  const handleSubmit = async (/*values: LoginParams*/) => {
    setSubmitting(true);
    try {
      // 登录
      // encrypt password
      const hashedPassword = sha256(values.password).toString();
      values.password = hashedPassword;

      const { data: msg } = (await loginUsingPOST({ ...values })) /*as { data: API.ResponseBoolean_ }*/;
      // console.log(msg);
      // console.log(msg);
      // console.log(values);
      if (msg.success === true) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          defaultMessage: 'Login success',
        });
        message.success(defaultLoginSuccessMessage);
        // use localstorage here
        // persist username
        if (values.autoLogin && values.username)
          localStorage.setItem('name', values.autoLogin ? values.username : '');
        if (values.autoLogin && values.password)
          localStorage.setItem('password', values.autoLogin ? values.password : '');
        await fetchUserInfo(values);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query /*as { redirect: string }*/;
        history.push(redirect || '/');
        return;
      } else {
        message.error(msg.message);
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
      setSubmitting(false);
      return;
    } catch (error) {
      // console.log(error);
      const defaultLoginFailureMessage = intl.formatMessage({
        defaultMessage: 'Login failed Please Try again',
      });

      message.error(defaultLoginFailureMessage);
    }
    // setSubmitting(false);
  };
  const { status, type: loginType } = userLoginState;

  // // Redirect already logged in users
  // if (initialState?.currentUser?.name) {
  //   history.push('/');
  // }

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            isKeyPressSubmit={true}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  defaultMessage: 'Login',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(/*values as LoginParams*/);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  defaultMessage: 'Account Login',
                })}
              />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  defaultMessage: 'Account or password failed',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Account: admin or user',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          defaultMessage="Please enter the username"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Password:',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          defaultMessage="Please enter your password"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage  defaultMessage="Auto login" />
              </ProFormCheckbox>
              {/* <a
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a> */}
            </div>
          </ProForm>
          <Button type="default" block size="large">
            <Link to="register">
              <FormattedMessage defaultMessage="注册账户" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Login;