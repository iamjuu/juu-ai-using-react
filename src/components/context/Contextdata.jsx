// ResponseContext.js  
import React, { createContext, useState } from 'react';  

// Create a context  
export const ResponseContext = createContext();  

// Create a provider component  
export const ResponseProvider = ({ children }) => {  
  const [contextMessages, setContextMessages] = useState([]);  

  const addMessage = (role, content) => {  
    setContextMessages((prevMessages) => [  
      ...prevMessages,  
      { role, content },  
    ]);  
  };  

  return (  
    <div className='bg-black h-screen'>

    <ResponseContext.Provider value={{ contextMessages, setContextMessages }}>  
      {children}  
    </ResponseContext.Provider>  
    </div>
  );  
};