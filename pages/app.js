import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">App</Link>
          </li>
          <li>
            <Link href="/index">Index</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
