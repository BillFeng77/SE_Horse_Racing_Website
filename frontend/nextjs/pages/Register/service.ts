import request  from 'next';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface UserRegisterParams {
  username: string;
  password: string;
  confirm: string;
}

export async function fakeRegister(body: UserRegisterParams, options?: Record<string, any>) {
  return request<StateType>('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function userRegister(body: UserRegisterParams, options?: Record<string, any>) {
  return request<StateType>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: body,
    ...(options || {}),
  });
}