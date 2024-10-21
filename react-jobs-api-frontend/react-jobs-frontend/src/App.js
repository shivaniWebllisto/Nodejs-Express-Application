import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Edit, Error, PrivateRoute } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id"element={<Edit />}>
          
          </Route>
          <Route path="*" element={<Error />}>
          </Route>
          {/* <PrivateRoute path="/dashboard" exact element={<Dashboard />}>
          </PrivateRoute> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

