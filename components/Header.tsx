import Link from 'next/link';

import ThemeSwitch from './theme-switch';
import { SITE_NAME } from '../utils/constants';

const Header: React.FC = () => {
  return (
    <header className="py-2">
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold text-green-500">{SITE_NAME}</a>
        </Link>

        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
