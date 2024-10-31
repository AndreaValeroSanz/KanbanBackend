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
    };
  }

  setUniqueIdentifiers(attributes) {
    this.setAttribute('data-key', attributes.dataKey);
    this.setAttribute('data-modal-id', attributes.modalId);
    console.log("Initializing TaskSticker with dataKey:", attributes.dataKey);
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
    `;
  }

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
            width: 18vh;
            height: 18vh;
        }
    
        .card .card-header.no-border {
            border: 0;
        }
    
        .card .card-header {
            background: none;
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
                    <div class="card-header no-border d-flex justify-content-end mt-2  ">
                      <div >
                      <svg class="background-${postItColour}" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path transform ="rotate(12,12,12)" d="M12 1.75C9.97274 1.75 7.99103 2.35115 6.30542 3.47743C4.61982 4.60372 3.30601 6.20454 2.53022 8.07748C1.75442 9.95043 1.55147 12.0114 1.94696 13.9997C2.34246 15.988 3.31865 17.8143 4.75214 19.2478C6.18563 20.6813 8.012 21.6575 10.0003 22.053C11.9886 22.4485 14.0495 22.2456 15.9225 21.4698C17.7954 20.694 19.3963 19.3802 20.5226 17.6946C21.6489 16.009 22.25 14.0273 22.25 12C22.2474 9.28234 21.1666 6.67674 19.2449 4.75507C17.3233 2.83339 14.7177 1.75265 12 1.75ZM11 6.75C11 6.48478 11.1054 6.23043 11.2929 6.04289C11.4804 5.85536 11.7348 5.75 12 5.75C12.2652 5.75 12.5196 5.85536 12.7071 6.04289C12.8946 6.23043 13 6.48478 13 6.75V13.08C13 13.3452 12.8946 13.5996 12.7071 13.7871C12.5196 13.9746 12.2652 14.08 12 14.08C11.7348 14.08 11.4804 13.9746 11.2929 13.7871C11.1054 13.5996 11 13.3452 11 13.08V6.75ZM12 17.83C11.7528 17.83 11.5111 17.7567 11.3055 17.6193C11.1 17.482 10.9398 17.2868 10.8452 17.0583C10.7505 16.8299 10.7258 16.5786 10.7741 16.3361C10.8223 16.0937 10.9413 15.8709 11.1162 15.6961C11.291 15.5213 11.5137 15.4022 11.7562 15.354C11.9986 15.3058 12.2499 15.3305 12.4783 15.4251C12.7067 15.5197 12.902 15.68 13.0394 15.8855C13.1767 16.0911 13.25 16.3328 13.25 16.58C13.2475 16.902 13.1198 17.2104 12.894 17.44C12.6682 17.6695 12.3619 17.8022 12.04 17.81L12 17.83Z" fill="red" />
                      </svg>
    
                      </div>
                    </div>
                    <div class="card-body d-flex pt-0 g-0 p-0 mx-2 row background-${postItColour}">
                      <h5 class="card-title background-${postItColour} text-center" id="card-title">${title}</h5>
                                   
                                <div class="background-${postItColour} d-flex  align-self-center ">
                                    <span class=" d-flex align-self-end background-${postItColour}">${dueDate}</span>
                              
    
                                   
                                <div class="btn-task background-${postItColour} d-flex justify-content-end pe-1 pb-1" role="group" aria-label="Collaborators icons">
                                            <button type="button" class="btn background-${postItColour}">
                                                <img src="https://placehold.co/40x40"></img>
                                        </button>
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
                <input type="text" class="form-control" id="editDueDate-${modalId}" placeholder="Due Date" value="${dueDate}">
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
      card.addEventListener('click', () => this.showModal(modal));
      modal.querySelector('.save-task').addEventListener('click', () => this.saveTask(dataKey, modalId));
      modal.querySelector('.delete-task').addEventListener('click', () => this.deleteTask(dataKey));
    } else {
      console.error(`Modal or card element not found. Modal ID: ${modalId}`);
    }
  }

  showModal(modal) {
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modal, { backdrop: 'static', keyboard: false });
    modalInstance.show();
  }

  saveTask(dataKey, modalId) {
    const title = this.getValue(`#editTitle-${modalId}`);
    const dueDate = this.getValue(`#editDueDate-${modalId}`);
    const description = this.getValue(`#editDescription-${modalId}`);
    const workarea = Array.from(this.querySelectorAll('.workarea-option'))
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value)
      .join(',');

    const taskData = `${title};${description};${dueDate};${workarea}`;
    localStorage.setItem(dataKey, taskData);
    console.log("Task updated:", taskData);

    alert('Task updated successfully!');
    window.location.reload();
  }

  deleteTask(dataKey) {
    localStorage.removeItem(dataKey);
    this.remove();
    window.location.reload();
  }

  getValue(selector) {
    const element = this.querySelector(selector);
    return element ? element.value : '';
  }
}

customElements.define('task-sticker', TaskSticker);
