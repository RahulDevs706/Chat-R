
import {BrowserRouter as Router, Route} from "react-router-dom";
import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';
import Private from './component/hocs/Private';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Join} />
        <Private path='/chat' component={Chat}  />
      </Router>
    </div>
  );
}

export default App;
