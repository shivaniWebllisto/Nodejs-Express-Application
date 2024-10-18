import logo from './logo.svg';
import './App.css';
import TaskManager from './components/TaskManager';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TaskManagerSingle from './components/TaskManagerSingle';

function App() {
  return (
    <div className="App">
     <Router>
     <Routes>
          <Route path="/" element={ <TaskManager/>} />
          <Route path="/tasks/:id" element={<TaskManagerSingle/>} />
        </Routes>
     </Router>

    </div>
  );
}

export default App;
