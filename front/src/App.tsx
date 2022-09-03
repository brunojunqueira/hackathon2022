import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Header } from './components/commons/Header';
import { LandingSearch } from './pages/LandingSearch';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<LandingSearch />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
