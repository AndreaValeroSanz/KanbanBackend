class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEventHandlers();
  }

  render() {
    const userEmail = localStorage.getItem("userEmail");

    this.innerHTML = `
      <nav class="navbar p-0 m-0">
        <div class="w-100 d-flex justify-content-between">
          <div class="container">
            <div class="bg-gray rounded-3 w-25 px-2">
              <i class="bi bi-search bg-transparent"></i>
              <input
                type="text"
                class="border-0 bg-transparent px-2"
                placeholder="Search for anything..."
              />
            </div>
          </div>

          ${
            userEmail 
              ? `<div class="d-flex align-items-center">
                  <span class="navbar-text me-2">${userEmail}</span>
                  <button id="logoutButton" class="btn btn-outline-secondary btn-sm" title="Logout">
                    <i class="bi bi-box-arrow-right"></i>
                  </button>
                 </div>`
              : `<button 
                  type="button" 
                  class="btn btn-primary" 
                  data-bs-toggle="modal" 
                  data-bs-target="#loginModal" 
                  data-bs-whatever="email">
                  Login
                 </button>`
          }
        </div>
      </nav>

      <!-- Modal Structure -->
      <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="loginModalLabel">Login</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="loginForm">
                <div class="mb-3">
                  <label for="email" class="col-form-label">Email Address:</label>
                  <input type="email" class="form-control" id="email" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="col-form-label">Password:</label>
                  <input type="password" class="form-control" id="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEventHandlers() {
    const loginForm = this.querySelector("#loginForm");
    if (loginForm) loginForm.addEventListener("submit", this.handleLogin.bind(this));

    const logoutButton = this.querySelector("#logoutButton");
    if (logoutButton) logoutButton.addEventListener("click", this.handleLogout.bind(this));
  }

  async handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const query = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            _id
            email
          }
        }
      }
    `;
    const variables = { email, password };

    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        alert("Error: " + result.errors[0].message);
        return;
      }

      const token = result.data.login.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email);

      alert("Login successful");

      const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
      modal.hide();

      this.render(); // Re-render to show the email and logout button

      // Refresh the page to reset the navbar and state
      window.location.reload();
    } catch (error) {
      console.error("Connection error:", error);
      alert("Connection or server error");
    }
  }

  handleLogout() {
    // Remove token and user email from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    // Refresh the page to reset the navbar and state
    window.location.reload();
  }
}

customElements.define("my-navbar", Navbar);
