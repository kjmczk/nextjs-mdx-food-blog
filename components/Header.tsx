import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link href="/">
          <a className="text-2xl font-bold text-green-500">My Food Blog</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
