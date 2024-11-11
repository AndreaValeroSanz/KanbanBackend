class Projects extends HTMLElement {
    constructor() {
        super();
      }
    connectedCallback() {  
        window.addEventListener('openTaskModalProject', () => {
            const modal = new bootstrap.Modal(this.querySelector('#exampleModal'), {});
            modal.show();
          });
    
  
          this.innerHTML = `
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            style="display: none"
            aria-hidden="true">
            
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
                            Midnight Coffee Warriors
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close">
                          </button>
                      </div>
      
                      <div class="modal-body">
                          <p>Project Title</p>
                          <input
                            type="text"
                            class="form-control"
                            id="message-text"
                            required>
                      </div>
                  </div>
              </div>
          </div>`;
      
    }
}
            
customElements.define('projects', Projects);