import React from 'react';
import './App.css';

//components
import BasicTable from './components/BasicTable';
import Header from './components/Header/header';
import Card from './components/Card/Card';
// import WordList from './components/WordList/wordList';
import Footer from './components/Footer/footer';
import data from './data/data.json'

function App() {
  
console.log(data);
  return (
    <div className="app">
      <Header />
      <BasicTable/>
      <Card/>

      {/* <WordList/> */}
      <Footer />
    </div>
  )
}

export default App
