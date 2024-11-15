class AddTask extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    window.addEventListener('openTaskModal', () => {
      const modal = new bootstrap.Modal(this.querySelector('#exampleModal'), {});
      modal.show();
    });

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
                      value="pink"
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
                      value="blue"
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
                      value="yellow"
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
                      value="green"
                    />
                    <label class="form-check-label" for="workTesting">
                      Testing
                    </label>
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

    // Add event listener to the "Create Task" button
    this.querySelector('#save-task').addEventListener('click', this.createTask.bind(this));
  }

  async createTask() {
    const title = this.querySelector('#task-title').value;
    const description = this.querySelector('#task-desc').value;
    const duedate = this.querySelector('#task-deadline').value;
    const workarea = this.querySelector('input[name="workarea"]:checked')?.value;
  
    console.log(title, description, duedate, workarea);
    
    // Valor por defecto para `type`
    const type = "on-hold";
  
    const token = localStorage.getItem('token');
  
    // Asegúrate de que todos los campos obligatorios estén llenos
    if (!title || !duedate || !workarea) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Define la ID del proyecto por defecto
    const defaultProjectId = "67224b9d9040a876aa6e7013";
  
    //conversor duadte a foramto dd/mm/aaaa
    const dateObj = new Date(duedate);
    const day = String(dateObj.getDate()).padStart(2,"0");
    const month = String(dateObj.getMonth()+1).padStart(2,"0");
    const year = dateObj.getFullYear();
    const formattedDueDate = `${day}/${month}/${year}`;

    // Construye la consulta GraphQL
    const query = `
      mutation {
        createCard(
          title: "${title}",
          description: "${description}",
          duedate: "${formattedDueDate}",
          type: "${type}",
          color: "${workarea}", 
          projects_id: "${defaultProjectId}"
        ) {
          _id
          title
          description
          duedate
          type
          color
          user_id
          projects_id
        }
      }
    `;
  
    try {
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      });
  
      const result = await response.json();
  
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
  
      alert('Task created successfully!');
      window.location.reload(); // Reload the page or update the UI as needed
    } catch (error) {
      console.error('Error creating task:', error);
      alert(`Error: ${error.message}`);
    }
  }

}

// Define custom element
customElements.define('add-task', AddTask);
