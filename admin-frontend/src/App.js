import { Box } from "@mui/system";
import './App.css';
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './Components/Landing';
import Users from './Components/Users';
import Hints from './Components/Hints';
import Levels from './Components/Levels';


function App() {
  return (
    <Box
    minHeight = '100%'
    bgcolor='black'
    color='white'
    >
    <Router>
      <Routes>
        <Route path = "/users" element = {<Users />}/>
        <Route path = "/hints" element = {<Hints />}/>
        <Route path = "/levels" element = {<Levels />}/>
        <Route path = "/*" element = {<Landing />}/>
      </Routes>
    </Router>
    </Box>
  );
}

export default App;
