import React from 'react';
import { Button, Result } from 'antd';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    // console.log(errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <>
          <Result
            status="404"
            title="页面出错了"
            subTitle={
              <details style={{ whiteSpace: 'pre-wrap', color: 'red' }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </details>}
            extra={
              <Button type="primary" onClick={() => location.href = '/'}>返回</Button>
            }
          />
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;