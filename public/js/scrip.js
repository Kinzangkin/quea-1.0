document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

// Fungsi untuk mengambil data dari server dan menampilkannya di index.html
function fetchData() {
  fetch("http://localhost:3000/media") // Mengarah ke server Express
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

// Fungsi untuk mencari data
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');

  searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query === '') return;

    try {
      const response = await fetch(`http://localhost:3000/search?q=${query}`); // Mengarah ke server Express
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
