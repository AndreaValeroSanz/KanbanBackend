class navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <nav class="navbar p-0 m-0">
        <div class=" w-100 d-flex justify-content-between">
          
        <div class="container ">

            <div class="bg-gray rounded-3 w-25 px-2">
              <i class="bi bi-search bg-transparent"></i>
              <input
                type="text"
                class="border-0 bg-transparent px-2"
                placeholder="Search for anything..."
              />
            </div>
      </div>

          <div>
            <button type="button" class="btn d-flex align-items-center p-0" id="fetchUserButton">
            <span>User</span>
            <span class="px-3">
                <i class="bi bi-person"></i>
             </span>
            </button>
         </div>


        </div>
      </nav>
        
        `;


        fetchUserButton.addEventListener("click", async () => {
          try {
            // Definimos la consulta GraphQL
            const query = `
              query {
                users {
                  id
                  name
                  surname1
                  surname2
                  email
                }
              }
            `;
        
            // Hacemos la solicitud fetch a la ruta GraphQL en el puerto 3000
            const response = await fetch("http://localhost:3000/graphql", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query })
            });
        
            // Comprobar si la respuesta es exitosa
            if (!response.ok) {
              throw new Error("Error en la solicitud");
            }
        
            // Convertir la respuesta a JSON
            const data = await response.json();
        
            // Mostrar los datos en la consola o procesarlos como necesites
            console.log("respuesta router", data.data.users);
        
            // Puedes insertar los datos en el DOM aquí si lo deseas
        
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        });
        
        
  }
}



// Define custom element
customElements.define("my-navbar", navbar);
