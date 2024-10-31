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
          <div class="row pt-5">
            <div class="col-lg-2">
              <div class="d-flex justify-content-center">
                <h1>Dashboard </h1>
              </div>
            </div>
            <div class="col-lg-10 d-flex justify-content-end">
              <my-collaborators class="divcolaborator-section"></my-collaborators> 
            </div>
          </div>
  
          <div>
            <div class="">
              <ul class="list-unstyled d-flex justify-content-end">
                <li class="py-1 ps-3">
                  <button type="button" class=" p-0 border-0">
                    <i class="bi bi-circle-fill pe-2" style="color: #4da167;"></i>
                    Testing
                  </button>
                </li>
  
                <li class="py-1 ps-3">
                  <button type="button" class=" p-0 border-0">
                    <i class="bi bi-circle-fill pe-2" style="color: #2589bd;"></i>
                    Back
                  </button>
                </li>
  
                <li class="py-1 ps-3">
                  <button type="button" class=" p-0 border-0">
                    <i class="bi bi-circle-fill pe-2" style="color: #f5bb00;"></i>
                    Server
                  </button>
                </li>
  
                <li class="py-1 ps-3">
                  <button type="button" class=" p-0 border-0">
                    <i class="bi bi-circle-fill pe-2" style="color: #ed98b4;"></i>
                    Front
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>`;
  }
}

// Define custom element
customElements.define("my-header", Header);
