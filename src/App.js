import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './component/Header';
import Home from './component/Home';
import Coins from './component/Coins';
import Exchanges from './component/Exchanges';
import CoinDetails from './component/CoinDetails';
import Footer from './component/Footer';



function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/coins' element={<Coins></Coins>}></Route>
        <Route path='/Exchanges' element={<Exchanges></Exchanges>}></Route>
        <Route path='/coin/:id' element={<CoinDetails></CoinDetails>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
