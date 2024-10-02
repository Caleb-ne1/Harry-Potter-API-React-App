import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Spells from './components/Spells';
import Characters from './components/Characters';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Spells />}/>
                <Route path='/characters' element={<Characters />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
