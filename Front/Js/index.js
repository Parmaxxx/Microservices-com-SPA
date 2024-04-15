import login from "../Js/login.js";
import produto from "../Js/produto.js";
import pedido from "../Js/pedido.js";
import signUp from "../Js/signUp.js";

const main = document.querySelector("#root");

const init = () => {
  window.addEventListener("hashchange", () => {
    main.innerHTML = " ";
    switch (window.location.hash) {
      case " ":
        main.appendChild(login());
        break;
      case "#produtos":
        main.appendChild(produto());
        break;
      case "#pedido":
        main.appendChild(pedido());
        break;
      case "#signUp":
        main.appendChild(signUp());
        break;
      default:
        main.appendChild(login());
    }
  });
};

window.addEventListener("load", () => {
  main.appendChild(login());
  init();
});
