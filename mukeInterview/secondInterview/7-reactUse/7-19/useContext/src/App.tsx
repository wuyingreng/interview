import { useState } from 'react';
import { MyProviders } from './MyProviders';
import { WelcomePanel } from './WelcomePanel';


export default function MyApp() {
  const [theme, setTheme] = useState('light');
  console.log('theme==>', theme)
  return (
    <MyProviders theme={theme} setTheme={setTheme}>
      <WelcomePanel />
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </MyProviders>
  );
}

