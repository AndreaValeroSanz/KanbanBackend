class HeaderDashboard extends HTMLElement {
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
                <div class="btn-group dropend">
                   <div class="d-flex justify-content-between align-items-around ">
                        <button type="button" class="btn btn-transparent" data-bs-toggle="button">
                          <h1>Dashboard</h1>
                        </button>
                        <button type="button" class="btn btn-transparent dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="bi bi-chevron-down" style="color: black;"></i>
                        </button>
                    <ul class="dropdown-menu">
                   <ul class="list-unstyled">
                    <li class="py-1">
                      <button type="button" class="btn ">
                        
                      Proyecto 1
                      </button>
                    </li>

                    <li class="py-1">
                      <button type="button" class="btn ">

                        Proyecto 2
                      </button>
                    </li>

                    <li class="py-1">
                      <button type="button" class="btn ">
                    
                        Proyecto 3
                      </button>
                    </li>

                    <li class="py-1">
                      <button type="button" class="btn ">
                        
                        Proyecto 4
                      </button>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" id= "openTaskModalProject" href="#">Add n&#101;w Project</a></li>

                  </ul>
                    </ul>
                  </div>
              </div>
            </div>
            <div class="col-lg-10 d-flex justify-content-end">
              <!-- <my-collaborators class="divcolaborator-section"></my-collaborators>  --> 
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
        this.querySelector('#openTaskModalProject').addEventListener('click', () => {
          const event = new CustomEvent('openTaskModalProject');
          window.dispatchEvent(event);
       });
  }
}

// Define custom element
customElements.define("my-header", HeaderDashboard);
