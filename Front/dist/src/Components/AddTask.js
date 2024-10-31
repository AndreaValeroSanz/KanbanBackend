class AddTask extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Ensure AddTask listens for the custom event
    window.addEventListener('openTaskModal', () => {
      const modal = new bootstrap.Modal(this.querySelector('#exampleModal'), {});
      modal.show();
    });

    // Modal HTML structure
    this.innerHTML = `
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Task Title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="task-title" class="form-label">Task Title*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="task-title"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="task-desc" class="form-label">Task Description</label>
                  <textarea
                    class="form-control"
                    id="task-desc"
                    rows="3"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="task-deadline" class="form-label">Deadline</label>
                  <input type="date" class="form-control" id="task-deadline" />
                </div>

                <div class="mb-3">
                  <p>Select WorkArea</p>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="workarea"
                      id="workFront"
                      value="Front"
                    />
                    <label class="form-check-label" for="workFront">
                      Frontend
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="workarea"
                      id="workBack"
                      value="Back"
                    />
                    <label class="form-check-label" for="workBack">
                      Backend
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="workarea"
                      id="workServer"
                      value="Server"
                    />
                    <label class="form-check-label" for="workServer">
                      Server
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="workarea"
                      id="workTesting"
                      value="Testing"
                    />
                    <label class="form-check-label" for="workTesting">
                      Testing
                    </label>
                  </div>
                </div>

                <div class="mb-3">
                  <p>Assign Collaborators</p>
                  <div class="d-flex justify-content-around align-items-center mb-2">
                    <i class="bi bi-person-circle"></i>
                    <p>User1</p>
                    <button type="button" class="btn btn-primary btn-sm">Add</button>
                  </div>
                  <div class="d-flex justify-content-around align-items-center mb-2">
                    <i class="bi bi-person-circle"></i>
                    <p>User2</p>
                    <button type="button" class="btn btn-primary btn-sm">Add</button>
                  </div>
                  <div class="d-flex justify-content-around align-items-center mb-2">
                    <i class="bi bi-person-circle"></i>
                    <p>User3</p>
                    <button type="button" class="btn btn-primary btn-sm">Add</button>
                  </div>
                  <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-link">Add more...</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="save-task">Create Task</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Define custom element
customElements.define('add-task', AddTask);
