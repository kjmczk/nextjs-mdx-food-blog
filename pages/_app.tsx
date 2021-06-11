import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import { MdxComponentsProvider } from '../context/MdxComponents';

import 'tailwindcss/tailwind.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <MdxComponentsProvider>
        <Component {...pageProps} />
      </MdxComponentsProvider>
    </ThemeProvider>
  );
};

export default MyApp;
