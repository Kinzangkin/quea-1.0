// pages/index.js
import Head from 'next/head';
import Link from 'next/link';       // ← Tambahkan ini
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems]   = useState([]);
  const [query, setQuery]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/media");
      if (!res.ok) {
        const errObj = await res.json().catch(() => ({}));
        throw new Error(errObj.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (query.trim() === "") return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        const errObj = await res.json().catch(() => ({}));
        throw new Error(errObj.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>QUEA</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>

      <main>
        <img className="background" src="/image/background.jpeg" alt="background" />

        <nav>
          <label>Logo</label>
          <ul>
            <li>
              <Link href="/" legacyBehavior>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/download" legacyBehavior>
                <a>Download</a>
              </Link>
            </li>
            <li>
              <Link href="/layout/login" legacyBehavior>
                <a>Login</a>
              </Link>
            </li>
            <li>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch} disabled={loading}>
                  <img className="search-icon" src="/image/search.svg" alt="search" />
                </button>
              </div>
            </li>
          </ul>
        </nav>

        <section className="welcome">
          <h1>WELCOME</h1>
          <p>Welcome to QUEA</p>
          <p>
            This website is where you can find everything about editing<br />
            such as overlay renders, anime, and more.
          </p>
        </section>

        {loading && <div className="loading-overlay">Loading...</div>}
        {error && <div className="error-message">{error}</div>}

        <section className="container">
          {items.length > 0 ? (
            items.map(item => (
              <div className="object-cont" key={item.id}>
                <a href={item.file_link}>
                  <img src={item.thumbnail} alt={item.title} loading="lazy" />
                </a>
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className="empty-state">No items found</p>
          )}
        </section>
      </main>
    </>
  );
}
