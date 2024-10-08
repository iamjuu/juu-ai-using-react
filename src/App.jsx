import React from 'react';
import Home from './pages/Home/Home';
import {ResponseProvider} from './components/context/Contextdata'
const App = () => {
  return (
    <ResponseProvider>
      <Home/>

    </ResponseProvider>
  );
}

export default App;
