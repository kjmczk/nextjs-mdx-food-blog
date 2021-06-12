import NextLink from './NextLink';
import Search from './Search';
import { SITE_NAME } from '../utils/constants';

const Header: React.FC = () => {
  return (
    <header className="py-2">
      <div className="flex justify-between items-center">
        <NextLink href="/" className="text-2xl font-bold text-green-500">
          {SITE_NAME}
        </NextLink>

        <Search />
      </div>
    </header>
  );
};

export default Header;
