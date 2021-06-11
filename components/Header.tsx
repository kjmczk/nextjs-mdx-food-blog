import LangMenu from './LangMenu';
import NextLink from './NextLink';
import ThemeSwitch from './ThemeSwitch';
import { SITE_NAME } from '../utils/constants';

const Header: React.FC = () => {
  return (
    <header className="py-2">
      <div className="flex justify-between items-center">
        <NextLink href="/" className="text-2xl font-bold text-green-500">
          {SITE_NAME}
        </NextLink>

        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <LangMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
