import type { AppProps } from 'next/app';

import { MdxComponentsProvider } from '../context/MdxComponents';

import 'tailwindcss/tailwind.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <MdxComponentsProvider>
      <Component {...pageProps} />;
    </MdxComponentsProvider>
  );
};

export default MyApp;
