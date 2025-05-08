document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

// Fungsi untuk mengambil data dari server dan menampilkannya di index.html
function fetchData() {
  fetch("https://quea-project.vercel.app/media") // Update dengan URL Vercel
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector(".container");
      container.innerHTML = ""; 
      data.forEach(item => {
        const objectDiv = document.createElement("div");
        objectDiv.classList.add("object-cont");

        objectDiv.innerHTML = `
          <a href="${item.file_link}"><img src="${item.thumbnail}" alt="${item.title}"></a>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        `;
        container.appendChild(objectDiv);
      });
    })
    .catch(error => console.error("Error fetching data:", error));
}

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "username") {
      window.location.href = "admin.html";
  } else {
      alert("Username atau password salah!");
  }
});

function loadComponent(id, file) {
  fetch(file)
      .then(response => response.text())
      .then(data => {
          document.getElementById(id).innerHTML = data;
      })
      .catch(error => console.error(`Error loading ${file}:`, error));
}

// Panggil fungsi untuk memuat navbar dan footer
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("navbar", "navbar.html");
  loadComponent("footer", "footer.html");
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');

  searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query === '') return;

    try {
      const response = await fetch(`https://quea-project.vercel.app/search?q=${query}`); // Update dengan URL Vercel
      const results = await response.json();

      if (results.length === 0) {
        alert('No results found');
        return;
      }

      displaySearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  if (!searchInput || !searchButton) {
    console.error("Error: Search input atau button tidak ditemukan. Periksa HTML!");
    return;
  }

  function handleSearch() {
    const query = searchInput.value.trim();
    if (query === "") return;

    fetch(`https://quea-project.vercel.app/search?q=${query}`) // Update dengan URL Vercel
      .then((response) => response.json())
      .then((results) => {
        if (results.length === 0) {
          alert("No results found");
          return;
        }
        displaySearchResults(results);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  }

  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  });
});

function displaySearchResults(results) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  results.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("object-cont");
    element.innerHTML = `
      <a href="${item.file_link}"><img src="${item.thumbnail}" alt="${item.title}"></a>
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
    container.appendChild(element);
  });
}
