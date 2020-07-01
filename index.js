import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Spin, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LayoutWrap from '@/layout';
import { ErrorBoundary, ErrorPage, Welcome } from '@/components';
import './global.less';
import store from '@/store';

const App = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={zhCN}>
        <Router>
          <LayoutWrap>
            <React.Suspense fallback={<Spin />}>
              <Switch>
                <Route path='/' exact component={Welcome} />
                <Route path='/*' component={ErrorPage} />
              </Switch>
            </React.Suspense>
          </LayoutWrap>
        </Router>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
