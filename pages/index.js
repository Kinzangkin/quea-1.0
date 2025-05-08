import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>QUEA</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="css/style.css"/>
      </Head>

      <main>
        <img className="background" src="/image/background.jpeg" alt="" />
        <nav>
          <label>Logo</label>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Download</a></li>
            {/* <li><a href="#">Shop</a></li> */}
            <li><a href="/layout/login.html">Login</a></li>
            {/* <li><a href="#">Partner</a></li> */}
            <li>
              <div className="search-container">
                <input type="text" className="search-input" id="search-input" placeholder="Search..." />
                <button className="search-button" id="search-button">
                  <img className="search-icon" src="/image/search.svg" />
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
          <div className="object-cont">
            <img src="/image/Screenshot (133).png" alt="Render 1" />
            <div>
              <h3>judul</h3>
              <p>Description</p>
            </div>
          </div>
        </section>
      </main>

      <script src="/js/scrip.js"></script>
    </>
  );
}
