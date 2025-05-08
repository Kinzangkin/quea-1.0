import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/media"); // Mengarah ke server Express
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  const handleSearch = async () => {
    if (query.trim() === "") return;
    try {
      const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.length === 0) {
        alert("No results found");
        return;
      }
      setItems(data);
    } catch (err) {
      console.error("Failed to search:", err);
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
            <li><a href="#">Home</a></li>
            <li><a href="#">Download</a></li>
            <li><a href="/layout/login.html">Login</a></li>
            <li>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch}>
                  <img className="search-icon" src="/image/search.svg" alt="search" />
                </button>
              </div>
            </li>
          </ul>
        </nav>

        <section>
          <div className="welcome">
            <h1>WELCOME</h1>
            <p>Welcome to QUEA</p><br />
            <p>
              This website is where you can find everything about editing<br />
              such as overlay renders, anime, and more.
            </p>
          </div>
        </section>

        <section className="container">
          {items.map((item) => (
            <div className="object-cont" key={item.id}>
              <a href={item.file_link}>
                <img src={item.thumbnail} alt={item.title} />
              </a>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
