class TaskSticker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const attributes = this.getAttributes();
    this.setUniqueIdentifiers(attributes);
    this.render(attributes);
    this.addEventListeners(attributes.modalId, attributes.dataKey);
  }

  getAttributes() {
    return {
      title: this.getAttribute('title') || 'Untitled Task',
      description: this.getAttribute('description') || 'Please, remember to write a task description.',
      postItColour: this.getAttribute('postItColour'),
      dueDate: this.getAttribute('dueDate') || 'No date assigned.',
      workarea: this.getAttribute('workarea') || '',
      dataKey: this.getAttribute('data-key') || `task-${Math.floor(Math.random() * 10000)}`,
      modalId: `taskModal-${Math.floor(Math.random() * 10000)}`,
      cardId: this.getAttribute('card-id') // Asegúrate de obtener correctamente el atributo 'card-id'
    };
  }

  setUniqueIdentifiers(attributes) {
    this.setAttribute('data-key', attributes.dataKey);
    this.setAttribute('data-modal-id', attributes.modalId);
    console.log("Initializing TaskSticker with dataKey:", attributes.dataKey);
    console.log("Card ID:", attributes.cardId); // Verifica que el Card ID sea válido
  }

  render(attributes) {
    const selectedWorkareas = attributes.workarea.split(',');
    this.innerHTML = `
      <style>${this.getStyles()}</style>
      ${this.getCardHTML(attributes)}
      ${this.getModalHTML(attributes, selectedWorkareas)}
    `;
  }

  getStyles() {
    return `
      .background-yellow { background-color: #fadd80; }
      .background-blue { background-color: #92c4de; }
      .background-pink { background-color: #ed98b4; }
      .background-green { background-color: #a6d0b3; }
      .background-grey { background-color: #7c8491; }
    `;
  }

  // Aquí se crea el HTML de la tarjeta
  getCardHTML({ title, dueDate, postItColour, modalId }) {
    return  `
    <style>
        .card-margin {
            margin-bottom: 1.875rem;
        }
    
        .card {
            border: 0;
            box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
            -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
            -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
            -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
        }
    
        .card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-clip: border-box;
            border: 1px solid #e6e4e9;
            border-radius: 8px;
            width: 20vh;
            height: 20vh;
        }
    
        .card .card-header.no-border {
            border: 0;
        }
    
        .card .card-header {
            background: red;
            padding: 0 0.9375rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            min-height: 50px;
        }
    
        .card-header:first-child {
            border-radius: calc(8px - 1px) calc(8px - 1px) 0 0;
        }
          
        .background-yellow {
          background-color: #fadd80;
        }
    
        .background-blue {
          background-color: #92c4de;
        }
    
        .background-pink {
          background-color: #ed98b4;
        }
    
        .background-green {
          background-color: #a6d0b3;
        }
          
           .btn-task btn{
                border-radius: 50%;
                border: 2px solid #fafafa;
               
                background-color: transparent;
              }
    
        .btn-task .btn img {
                border-radius: 50%;
                border: 2px solid #fafafa;
            
                background-color: transparent;
              }
                
    
    </style>
    
    <div class="container ">
        <div class="row  ">
            <div class="g-0 ">
                <div class="card card-margin  background-${postItColour}">
                   
                    <div class="card-body d-flex pt-0 g-0 p-0 mx-2 row background-${postItColour}">
                      <h5 class="card-title background-${postItColour} text-center p-2" id="card-title">${title}</h5>
                                   
                                <div class="background-${postItColour} d-flex py-2 ">
                                    <span class=" d-flex align-self-end background-${postItColour}">${dueDate}</span>
                              
    
                                   
                               
                                            ${'' /* < <div class="btn-task background-${postItColour} d-flex justify-content-end pe-1 pb-1" role="group" aria-label="Collaborators icons">
                                            <button type="button" class="btn background-${postItColour}">img src="https://placehold.co/40x40"></img></button> */}
                                                
                                        
                            </div>
                    
                        
                          
                  
                        </div>
                             
                </div>
            </div>
        </div>
    </div>
    
        `;
  }

  getModalHTML({ title, description, dueDate, modalId, postItColour }, selectedWorkareas) {
    return `
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content background-${postItColour}">
            <div class="modal-header">
              <input type="text" class="form-control" id="editTitle-${modalId}" placeholder="Task Title" value="${title}">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <input type="date" class="form-control" id="editDueDate-${modalId}" placeholder="Due Date" value="${dueDate}">
              </div>
              <div class="mb-3">
                <textarea class="form-control" id="editDescription-${modalId}" rows="3" placeholder="Task Description">${description}</textarea>
              </div>
              <div class="mb-3">
                <label>Workarea</label>
                <div>
                  ${this.getWorkareaOptions(selectedWorkareas)}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-danger delete-task">Delete</button>
              <button type="button" class="btn btn-outline-secondary share-task">Share</button>
              <button type="button" class="btn btn-primary save-task">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getWorkareaOptions(selectedWorkareas) {
    const workareas = ['Front', 'Back', 'Server', 'Testing'];
    return workareas.map(area => `
      <label><input type="checkbox" class="workarea-option" value="${area}" ${selectedWorkareas.includes(area) ? 'checked' : ''}> ${area}</label><br>
    `).join('');
  }

  addEventListeners(modalId, dataKey) {
    const card = this.querySelector('.card');
    const modal = this.querySelector(`#${modalId}`);

    if (card && modal) {
      // Usa `bind(this)` para asegurarte de que `this` se refiera a la instancia de `TaskSticker`
      card.addEventListener('click', this.showModal.bind(this, modal));
      modal.querySelector('.delete-task').addEventListener('click', () => {
        const cardId = this.getAttribute('card-id'); // Obtener 'card-id' directamente aquí
        if (!cardId || cardId === "null" || cardId === "undefined") {
          console.error("Invalid cardId:", cardId);
          alert("No se puede eliminar la tarea: ID de la tarjeta no válido.");
          return;
        }
        this.deleteTask(dataKey, cardId);
      });
    } else {
      console.error(`Modal or card element not found. Modal ID: ${modalId}`);
    }
  }

  showModal(modal) {
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modal, { backdrop: 'static', keyboard: false });
    modalInstance.show();
  }


  async deleteTask(dataKey, cardId) {
    const token = localStorage.getItem('token');

    // Confirmar antes de eliminar
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      // Realizar la solicitud para eliminar la tarea de la base de datos
      const query = `
        mutation {
          deleteCard(id: "${cardId}") {
            _id
            title
          }
        }
      `;

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

      // Eliminar la tarjeta del DOM y del localStorage
      localStorage.removeItem(dataKey);
      this.remove();
      alert('Task deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert(`Error: ${error.message}`);
    }
  }

}

customElements.define('task-sticker', TaskSticker);