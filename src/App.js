import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Coinpage from './Pages/Coinpage';
import Homepage from './Pages/Homepage';

function App() {
  return (
    <div className='app'>
<Router>

<Header/>

  <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route path='/coins/:id' element={<Coinpage/>} />
 
  </Routes>
      
      </Router>
    </div>
  );
}

export default App;
