import { notification } from 'antd';
import cookie from '@/utils/cookie';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// eslint-disable-next-line valid-jsdoc
/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status && response.status !== 200 && response.status !== 401) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
    console.error(errorText);
  } else if (response && response.status && response.status === 401) {
    // 无权限操作
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

// options中timeout控制请求超时时间
export default async function request(url, options = {}) {
  let controller = new AbortController();
  let signal = controller.signal;

  // 超时函数
  const timeoutAction = timer => {
    return new Promise(reslove => {
      setTimeout(() => {
        // 实例化超时响应json数据
        const response = new Response(
          JSON.stringify({
            code: 'timeout',
            errmsg: `请求超时: ${timer}s`,
          }),
        );
        reslove(response);
        return controller.abort(); // 发送终止信号
      }, timer ? timer * 1000 : 5000);
    });
  };

  // fetch请求
  const fetchRequest = async () => {
    const base_headers = {
      'Content-Type': 'application/json',
      // 'Authorization': cookie.getCookie('sso_token'),
    };
    if (options.headers && options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      if (options.body) {
        const arr = [];
        for (const i in options.body) {
          if (typeof options.body[i] === 'object') {
            arr.push(`${i}=${JSON.stringify(options.body[i])}`);
          } else {
            arr.push(`${i}=${options.body[i]}`);
          };
        }
        const str = arr.join('&');
        options.body = str;
      };
    }
    // eslint-disable-next-line no-undef
    const response = await fetch(SERVICE_PROFIX + url, {
      ...options,
      signal: signal, //设置信号
      headers: options.headers ?
        { ...base_headers, ...options.headers } : base_headers,
      mode: 'cors',
      credentials: 'include',
    });
    errorHandler({ response });
    return response;
  };
  if (!options.hasOwnProperty('timeout')) {
    return fetchRequest().then(res => res.json());
  } else {
    // 执行，超时控制在n秒
    return Promise.race([
      timeoutAction(options.timeout),
      fetchRequest(),
    ]).then(res => {
      return res.json();
    });
  }
};
