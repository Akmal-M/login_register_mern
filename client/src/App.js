import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PageRender from "./pageRender";




function App() {
  return (
   <Router>
     <div className="App">
         <Routes>
             <Route path='/' element={<LoginPage/>}/>
             <Route path='/register' element={<RegisterPage/>}/>
             <Route path="/:page" element={<PageRender/>}/>
             <Route path="/:page/:id" element={<PageRender/>}/>
         </Routes>
     </div>
   </Router>
  );
}

export default App;
