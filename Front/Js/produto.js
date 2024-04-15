const produto = () => {
  const container = document.createElement("div");

  const template = `
    <section>
    <div class="container">
    <div class="row">
      <!-- Coluna do Formulário de Inserção -->
      <div class="col-md-4">
        <h2>Inserir Produto</h2>
        <form id="addProductForm">
          <div class="form-group">
            <label for="nomeProduto">Nome do Produto:</label>
            <input type="text" class="form-control" id="nomeProduto" placeholder="Nome">
          </div>
          <div class="form-group">
            <label for="precoProduto">Preço do Produto:</label>
            <input type="number" class="form-control" id="precoProduto" placeholder="Preço">
          </div>
          <button type="submit" class="btn btn-primary">Inserir</button>
          <button type="button" class="btn btn-secondary" id="listProductsBtn">Listar Produtos</button>
        </form>
      </div>

      <!-- Coluna da Pesquisa de Produtos -->
      <div class="col-md-4">
        <h2>Pesquisar Produto</h2>
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="searchInput" placeholder="Pesquisar por nome do produto">
          <div class="input-group-append">
            <button id="searchBtn" class="btn btn-outline-secondary" type="button">Pesquisar</button>
          </div>
        </div>
      </div>

      <!-- Coluna do Conteúdo do Produto -->
      <div class="col-md-12 conteudo-produto">
        <h2>Conteúdo do Produto</h2>
        <div class="card-deck" id="productContent">
          <!-- Aqui serão exibidos os produtos -->
        </div>
      </div>
    </div>
  </div>
  </section>`;

  container.innerHTML = template;

  const addProductForm = container.querySelector("#addProductForm");
  addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nomeProduto = document.getElementById("nomeProduto").value;
    const precoProduto = document.getElementById("precoProduto").value;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeProduto,
        preco: parseFloat(precoProduto),
      }),
    };

    fetch("http://127.0.0.1:8002/produtos", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert("Produto adicionado com sucesso!");
        addProductForm.reset(); // Limpa o formulário após a submissão
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao adicionar produto. Por favor, tente novamente.");
      });
  });

  const listProductsBtn = container.querySelector("#listProductsBtn");
  listProductsBtn.addEventListener("click", () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8002/produtos", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const productContent = container.querySelector("#productContent");
        if (result.produtos && result.produtos.length > 0) {
          const productList = result.produtos
            .map((produto) => {
              return `
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">${produto.nome}</h5>
                  <p class="card-text">Preço: R$ ${produto.preco.toFixed(2)}</p>
                </div>
              </div>
            `;
            })
            .join("");
          productContent.innerHTML = productList;
        } else {
          productContent.innerHTML = `
            <div class="alert alert-warning" role="alert">
              Nenhum produto encontrado.
            </div>
          `;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao listar produtos. Por favor, tente novamente.");
      });
  });

  const searchBtn = container.querySelector("#searchBtn");
  searchBtn.addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value;

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://127.0.0.1:8002/produtospornome/${searchInput}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const productContent = container.querySelector("#productContent");
        if (result.id) {
          const productName = result.nome;
          const productPrice = result.preco.toFixed(2); // Formatando o preço para duas casas decimais

          productContent.innerHTML = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${productName}</h5>
                <p class="card-text">Preço: R$ ${productPrice}</p>
              </div>
            </div>
          `;
        } else {
          productContent.innerHTML = `
            <div class="alert alert-warning" role="alert">
              Produto não encontrado.
            </div>
          `;
        }
      })

      .catch((error) => console.error("Error:", error));
  });

  return container;
};

export default produto;
