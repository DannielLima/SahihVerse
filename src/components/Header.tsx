import Link from 'next/link';

const Header = () => (
  <header className="bg-gray-800 py-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">SahihVerse</h1>
      <nav>
        <Link href="/" className="text-white mx-2">Home</Link>
      </nav>
    </div>
  </header>
);

export default Header;