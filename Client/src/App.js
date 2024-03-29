import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from './context/AuthContext';
import { hasAuth } from './services/AuthApi.js';
import SideBar from './components/SideBar';
import Connexion from './pages/Connexion';
import Home from './pages/Home';
import Inscription from './pages/Inscription';
import PageProfil from "./pages/PageProfil";
import Setting from './pages/Setting';
import Tweet from './pages/Tweet';
import Banniere from './components/Banniere';
import ListProfil from './pages/ListProfil';
import MessageID from './pages/MessageID';
import ResearchMessage from './pages/ResearchMessage';

const App = () => {
  const [isAuth, setIsAuth] = useState(hasAuth());
  useEffect(() => {
    setIsAuth(hasAuth)
  }, [])
  return (
    <Auth.Provider value={{ isAuth, setIsAuth }}>
      {isAuth && <aside className='vide' />}
      <Banniere />
      <SideBar />
      <Routes>
        <Route path='/' element={isAuth ? <Home /> : <Navigate replace to="/auth" />} />
        <Route path='/inscription' element={!isAuth ? <Inscription /> : <Navigate replace to="/" />} />
        <Route path='/auth' element={!isAuth ? <Connexion /> : <Navigate replace to="/" />} />
        <Route path='/tweet' element={isAuth ? <Tweet /> : <Navigate replace to="/auth" />} />
        <Route path='/reglage' element={isAuth ? <Setting /> : <Navigate replace to="/auth" />} />
        <Route path='/user/:id' element={isAuth ? <PageProfil /> : <Navigate replace to="/auth" />} />
        <Route path='/follower/:id' element={isAuth ? <ListProfil which={"follower"} /> : <Navigate replace to="/auth" />} />
        <Route path='/following/:id' element={isAuth ? <ListProfil which={"following"} /> : <Navigate replace to="/auth" />} />
        <Route path='/message/:msgid' element={isAuth ? <MessageID /> : <Navigate replace to="/auth" />} />
        <Route path='/search' element={isAuth ? <ResearchMessage /> : <Navigate replace to="/auth" />} />
        <Route path='/*' element={<Navigate replace to="/auth" />} />
      </Routes >
    </Auth.Provider>
  );
};

export default App;