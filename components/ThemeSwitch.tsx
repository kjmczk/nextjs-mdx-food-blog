import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Switch from 'react-switch';
import { IconContext } from 'react-icons';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const dark = theme === 'dark' ? true : false;

  const [checked, setChecked] = useState(dark);
  const [mounted, setMounted] = useState(false);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setTheme(checked ? 'dark' : 'light');
  }, [checked, setTheme]);

  if (!mounted) return null;

  return (
    <Switch
      onChange={handleChange}
      checked={checked}
      aria-label="switch between day and night themes"
      offColor="#555"
      onHandleColor="#eee"
      handleDiameter={20}
      uncheckedIcon={
        <div className="flex justify-center items-center h-full">
          <IconContext.Provider
            value={{
              color: 'gold',
              size: '80%',
            }}
          >
            <FaSun />
          </IconContext.Provider>
        </div>
      }
      checkedIcon={
        <div className="flex justify-center items-center h-full">
          <IconContext.Provider
            value={{
              color: 'yellow',
              size: '80%',
            }}
          >
            <FaMoon />
          </IconContext.Provider>
        </div>
      }
      height={24}
      width={48}
    />
  );
};

export default ThemeSwitch;
