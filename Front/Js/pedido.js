export default () => {
  const container = document.createElement("div");

  const template = `
    <section>
      <div class="container">
        <div class="row">
          <!-- Coluna do Formulário de Pedido -->
          <div class="col-md-4">
            <h2>Fazer Pedido</h2>
            <form id="pedidoForm">
              <div class="form-group">
                <label for="nomeProduto">Nome do Produto:</label>
                <input type="text" class="form-control" id="nomeProduto" placeholder="Nome do Produto">
              </div>
              <div class="form-group">
                <label for="precoProduto">Preço do Produto:</label>
                <input type="text" class="form-control" id="precoProduto" placeholder="Preço">
              </div>
              <div class="form-group">
                <label for="quantidadeProduto">Quantidade:</label>
                <input type="number" class="form-control" id="quantidadeProduto" placeholder="Quantidade">
              </div>
              <button type="submit" class="btn btn-primary">Fazer Pedido</button>
            </form>
          </div>

          <!-- Coluna da Listagem de Pedidos -->
          <div class="col-md-4">
            <h2>Listar Pedidos</h2>
            <button class="btn btn-outline-secondary" id="listarPedidos" type="button">Listar Pedidos</button>
            <div id="pedidosCard" class="mt-3"></div>
          </div>
        </div>
      </div>
    </section>`;

  container.innerHTML = template;

  // Selecionar o formulário e adicionar evento de envio
  const pedidoForm = container.querySelector("#pedidoForm");
  pedidoForm.addEventListener("submit", fazerPedido);

  // Botão para listar pedidos
  const listarPedidosBtn = container.querySelector("#listarPedidos");
  listarPedidosBtn.addEventListener("click", buscarPedidos);

  return container;
};

function fazerPedido(event) {
  event.preventDefault();

  const nomeProduto = document.getElementById("nomeProduto").value;
  const precoProduto = parseFloat(
    document.getElementById("precoProduto").value
  );
  const quantidadeProduto = parseInt(
    document.getElementById("quantidadeProduto").value
  );

  const pedido = {
    produtos: [
      {
        nome: nomeProduto,
        preco: precoProduto,
      },
    ],
    quantidade: [quantidadeProduto],
    user_id: 1, // Você pode ajustar o user_id conforme necessário
  };

  fetch("http://127.0.0.1:8004/pedido/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "sucesso") {
        alert("Pedido criado com sucesso!");
      } else {
        alert("Falha ao criar pedido. Por favor, tente novamente.");
      }
      // Limpar o formulário após enviar
      document.getElementById("nomeProduto").value = "";
      document.getElementById("precoProduto").value = "";
      document.getElementById("quantidadeProduto").value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Ocorreu um erro ao processar seu pedido. Por favor, tente novamente."
      );
    });
}

function buscarPedidos() {
  fetch("http://127.0.0.1:8004/pedidos")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      exibirPedidos(data.pedidos);
    })
    .catch((error) => console.error("Error:", error));
}

function exibirPedidos(pedidos) {
  const pedidosCard = document.getElementById("pedidosCard");
  pedidosCard.innerHTML = ""; // Limpar conteúdo anterior

  if (pedidos.length === 0) {
    pedidosCard.innerHTML = "<p>Nenhum pedido encontrado.</p>";
    return;
  }

  pedidos.forEach((pedido) => {
    const pedidoHTML = `
      <div class="pedido-item">
        <p><strong>ID do Pedido:</strong> ${pedido.order_id}</p>
        <p><strong>Total:</strong> R$ ${pedido.preco_total_pedido.toFixed(
          2
        )}</p>
        <ul>
          ${pedido.itens
            .map(
              (item) => `
            <li>
              <strong>Produto:</strong> ${item.produto} -
              <strong>Quantidade:</strong> ${item.quantidade} -
              <strong>Preço Unitário:</strong> R$ ${item.preco_unitario.toFixed(
                2
              )} -
              <strong>Preço Total:</strong> R$ ${item.preco_total_item.toFixed(
                2
              )}
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `;
    pedidosCard.innerHTML += pedidoHTML;
  });
}
