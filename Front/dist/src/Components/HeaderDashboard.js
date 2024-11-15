class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
          .divcolaborator-section {
            width: 50vh;
          }
            
    </style>
<div>
  <div class="row pt-2 /row justify-content-between">
    <div class="col-4">   
              <h1>Dashboard</h1>
              </div>
              <div class="workareas-leyenda col-4">
                <ul class="list-unstyled d-flex justify-content-end">
                  <li class="py-1 ps-3">
                    <span class="p-0 border-0">
                      <i class="bi bi-circle-fill pe-2" style="color: #4da167;"></i>
                      Testing
                    </span>
                  </li>
                  <li class="py-1 ps-3">
                    <span class="p-0 border-0">
                      <i class="bi bi-circle-fill pe-2" style="color: #2589bd;"></i>
                      Back
                    </span>
                  </li>
                  <li class="py-1 ps-3">
                    <span class="p-0 border-0">
                      <i class="bi bi-circle-fill pe-2" style="color: #f5bb00;"></i>
                      Server
                    </span>
                  </li>
                  <li class="py-1 ps-3">
                    <span class="p-0 border-0">
                      <i class="bi bi-circle-fill pe-2" style="color: #ed98b4;"></i>
                      Front
                    </span>
                  </li>
              </ul>
         </div>          
      
    </div>
  </div>
</div>
`
  }
}

// Define custom element
customElements.define("my-header", Header);
