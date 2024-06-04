import React from 'react'
import SideBar from './components/NavBar/SideBar'
import { Route, Routes } from 'react-router-dom'
import Main from './components/Main'
import Ingredient from './components/Ingredient'
import Categorie from './components/Categorie'
import Achat from './components/Achat'
import Stockage from './components/Stockage'

function App() {
  return (
    <div>
      <SideBar/>
      <div className="App">
  
      <Routes>
          <Route path='/' element = {<Main/>}/>
          <Route path='/ingredient' element = {<Ingredient/>}/>
          <Route path='/Categorie' element = {<Categorie/>}/>
          <Route path='/achat'element = {<Achat/>}/>
          <Route path='/stockage' element = {<Stockage/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default App
