document.addEventListener("DOMContentLoaded", () => 
    {
    const productosContainer = document.querySelector("#card-container");
    //var productosContainer = document.getElementById('card-container');
   //estan variables se utilizan para ver la pagina actual, la cantidad de elementos a mostrar y el total de elementos.
    const limit = 10;
    let totalProductos = 0;

    function fetchProductos(){
      fetch(`https://dummyjson.com/products?limit=${limit}`)
        .then((response) => response.json())
        .then((data) => {
          totalProductos = data.total;
          const productos = data.products;
  
          // Limpia el contenedor de productos
          productosContainer.innerHTML = "";
  
          // Genera las cards de productos
          productos.forEach((product) => 
            {
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-md-4";
  
            cardDiv.innerHTML = `
              <div class="card mt-5">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text fw-bold">Precio: $${product.price}</p>
                  <button class="btn btn-success mt-auto">Agregar</button>
                </div>
              </div>
            `;
  
            // Agregar evento al botón "Agregar"
            const botonAgregar = cardDiv.querySelector("button");
            botonAgregar.addEventListener("click", () => 
              {
              agregarAlCartito(product);
            });
  
            // Añadir la card al contenedor
            productosContainer.appendChild(cardDiv);
          });
        })
        .catch((error) => console.error("Error fetching products:", error));
      }
  
    // Función para agregar al carrito usando localStorage
    function agregarAlCartito(product) 
    {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.title} ha sido agregado al carrito!`);
    } 
    fetchProductos();
  });
  