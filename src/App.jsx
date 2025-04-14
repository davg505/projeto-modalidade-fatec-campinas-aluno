import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Router } from './Router';
import { AppContextProvider } from './contexts';

const App = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  return (
    <AppContextProvider>
      <BrowserRouter basename="/projeto-modalidade-fatec-campinas-aluno">
        <Router />
      </BrowserRouter>
    </AppContextProvider>
  );
};

export { App };
