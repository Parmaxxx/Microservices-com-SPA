export default () => {
  const container = document.createElement("div");

  const template = `
    <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
             <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-5 text-center"> 
                    <div class="mb-md-5 mt-md-4 pb-5">
                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                         <p class="text-white-50 mb-5">Please enter your login and password!</p>
 <div class="form-outline form-white mb-4">
                  <input type="email" id="typeEmailX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>
  
                <div class="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>

  
                <button id="loginBtn" class="btn btn-outline-light btn-lg px-5" type="button">Login</button>
  
  
              </div>
  
              <div>
                <p class="mb-0">Don't have an account? <a href="#signUp" class="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  container.innerHTML = template;

  const loginBtn = container.querySelector("#loginBtn");
  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("typeEmailX").value;
    const password = document.getElementById("typePasswordX").value;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }), // Altere para os dados corretos
    };

    fetch("http://localhost:8001/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "sucesso") {
          alert("Login successful");
          console.log(result.mensagem);
          window.location.href = "/#pedido";
        } else {
          alert("Login failed. Invalid credentials.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
  return container;
};
