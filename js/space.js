document.addEventListener("DOMContentLoaded", () => {
    const btonBuscar = document.getElementById("btnBuscar");
    const inputBuscar = document.getElementById("inputBuscar");
    const contenedor = document.getElementById("contenedor");
  
    btonBuscar.addEventListener("click", () => {
      const query = inputBuscar.value.trim();
  
      if (!query) {
        alert("Por favor, ingrese un dato.");
        return;
      }
  
      // Limpia los resultados que habian
      contenedor.innerHTML = "<p>Cargando resultados...</p>";
  
      // Realizamos la solicitud a la API
      fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al realizar la solicitud a la API");
          }
          return response.json();
        })
        .then((data) => {
         contenedor.innerHTML = "";  // Con este limpiamos el contenedor
  
          
          const items = data.collection.items;// Accedo a los resultados de la API
  
          if (items.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron resultados para esta búsqueda.</p>" ;
            return;
          }
  
          // Recorre todos los resultados y despues muestra la info
          items.forEach((item) => {
            const title = item.data[0]?.title || "Sin título";
            const description = item.data[0]?.description || "Sin descripción";
            const date = item.data[0]?.date_created || "Fecha no disponible";
            const imageUrl = item.links?.[0]?.href || "";
  
            // Crea un elemento HTML para cada resultado
            const card = document.createElement("div");
            card.classList.add("card", "mb-3");
            card.innerHTML = `
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${imageUrl}" class="img-fluid rounded-start" alt="${title}">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text"><small class="text-muted">Fecha: ${new Date(date).toLocaleDateString()}</small></p>
                  </div>
                </div>
              </div>
            `;
  
            contenedor.appendChild(card);
          });
        })
        .catch((error) => {
          contenedor.innerHTML = `<p>Ocurrió un error al obtener los datos: ${error.message}</p>`;
        });
    });
  });
  