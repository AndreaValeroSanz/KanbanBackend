class Projects extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        
      <div class="d-flex justify-content-between align-items-around border-top mt-3 py-3">
  <h3>My Projects</h3>
  <button type="button" class="btn">
    <i class="bi bi-plus-square"></i>
  </button>
</div>

<ul class="list-unstyled">
  <li class="py-1">
    <button type="button" class="btn boton">
      <i class="bi bi-circle-fill pe-2" style="color: #4da167;"></i>
      MobileApp<pre>  </pre>
    </button>
  </li>

  <li class="py-1">
    <button type="button" class="btn boton">
      <i class="bi bi-circle-fill pe-2" style="color: #2589bd;"></i>
      MobileApp<pre>  </pre>
    </button>
  </li>

  <li class="py-1">
    <button type="button" class="btn boton">
      <i class="bi bi-circle-fill pe-2" style="color: #f5bb00;"></i>
      MobileApp<pre>  </pre>
    </button>
  </li>

  <li class="py-1">
    <button type="button" class="btn boton">
      <i class="bi bi-circle-fill pe-2" style="color: #ed98b4;"></i>
      MobileApp<pre>  </pre>
    </button>
  </li>
</ul>
`;
  }
}

// Define custom element
customElements.define("my-projects", Projects);
