import { createContext, useState } from 'react';
export const ThemeContext = createContext(null);
export const CurrentUserContext = createContext(null);
console.log('ThemeContext==>', ThemeContext)
export const MyProviders = ({ children, theme, setTheme }: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
}