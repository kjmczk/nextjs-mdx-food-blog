import Header from '../components/Header';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="max-w-prose mx-auto px-4">
      <Header />
      <main className="mt-4">{children}</main>
    </div>
  );
};

export default Layout;
