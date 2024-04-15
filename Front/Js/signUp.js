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
                    <h2 class="fw-bold mb-2 text-uppercase">Create Account</h2>
                    <p class="text-white-50 mb-5">Please fill in the following details:</p>
                    <div class="form-outline form-white mb-4">
                      <input type="text" id="typeUsername" class="form-control form-control-lg" />
                      <label class="form-label" for="typeUsername">Username</label>
                    </div>
    
                    <div class="form-outline form-white mb-4">
                      <input type="password" id="typePassword" class="form-control form-control-lg" />
                      <label class="form-label" for="typePassword">Password</label>
                    </div>
    
                    <button id="registerBtn" class="btn btn-outline-light btn-lg px-5" type="button">Register</button>
                  </div>
    
                  <div>
                    <p class="mb-0">Already have an account? <a href="#!" class="text-white-50 fw-bold">Login</a></p>
                  </div>
    
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;

  container.innerHTML = template;

  const registerBtn = container.querySelector("#registerBtn");
  registerBtn.addEventListener("click", () => {
    const username = document.getElementById("typeUsername").value;
    const password = document.getElementById("typePassword").value;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch("http://127.0.0.1:8001/cadastro", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "sucesso") {
          alert("Account created successfully");
          console.log(result.message);
          window.location.href = "/#login";
        } else {
          alert("Account creation failed.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  return container;
};
