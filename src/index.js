import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './components/Upload';
import Display from './components/Display';
import DisplayByName from './components/DisplayByName';
import SelectChild from './components/SelectChild';
import Callback from './components/Callback';
import registerServiceWorker from './registerServiceWorker';
import { Switch,Router, Route , BrowserRouter} from 'react-router-dom'
import { requireAuth } from './utils/AuthService';
import history from './components/history';

const Root = () => {
  return (
    <div className="container">
        <Router history={history}>
        <div>
          <Route exact path="/" component={Display}/>
          <Route path="/name/:username" component={DisplayByName}/>
          <Route path="/select" component={SelectChild}/>                                                        
          <Route path="/upload" component={Upload} onEnter={requireAuth} />
          <Route path="/callback" component={Callback} />
        </div>
        </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();