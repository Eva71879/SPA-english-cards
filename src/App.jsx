import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


//components
import Header from './components/Header/header';
import Content from './components/Content/Content';
import Footer from './components/Footer/footer';

function App() {

  return (
    <div className="app">

      <Header />
      <Content/>
      <Footer/>
    </div>
  )
}

export default App
