import React from 'react';
import { Result } from 'antd';

const Welcome = () => {
  return (
    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Result
        status="success"
        title="欢迎登陆"
        subTitle='xxxxxx'
      />
    </div>
  );
};

export default Welcome;