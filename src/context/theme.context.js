import { createContext } from 'react';
 
const ThemeContext = createContext();

function ThemeProviderWrapper(props) {
 
    return (
      <ThemeContext.Provider value={"girl"}>
          {props.children}
      </ThemeContext.Provider>
    )
  }
   
  export { ThemeContext, ThemeProviderWrapper };
 
