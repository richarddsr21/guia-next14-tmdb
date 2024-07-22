import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Popular</Link>
        </li>
        <li>
          <Link href="/top-rated">Top Rated</Link>
        </li>
        <li>
          <Link href="/upcoming">Upcoming</Link>
        </li>
        <li>
          <Link href="/now-playing">Now Playing</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
