from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
import json
import uuid
from produtos_service import Produto
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


def ler_pedidos():
    try:
        with open("pedidos.txt", "r") as file:
            pedidos = json.load(file)
    except FileNotFoundError:
        pedidos = []
    return pedidos


def escrever_pedidos(pedidos):
    with open("pedidos.txt", "w") as file:
        json.dump(pedidos, file, indent=4)


def criar_pedido(produtos: List[Produto], quantidade: List[int]):
    if len(produtos) != len(quantidade):
        raise HTTPException(status_code=400, detail="A quantidade de produtos e quantidades não é a mesma.")

    novo_pedido = {
        "order_id": str(uuid.uuid4()),
        "itens": []
    }

    total_pedido = 0
    for produto, qtd in zip(produtos, quantidade):
        item = {
            "produto": produto.nome,
            "quantidade": qtd,
            "preco_unitario": produto.preco,
            "preco_total_item": produto.preco * qtd
        }
        total_pedido += item["preco_total_item"]
        novo_pedido["itens"].append(item)

    novo_pedido["preco_total_pedido"] = total_pedido
    pedidos = ler_pedidos()
    pedidos.append(novo_pedido)
    escrever_pedidos(pedidos)
    return novo_pedido


def listar_pedidos():
    pedidos = ler_pedidos()
    return pedidos


@app.get("/pedidos")
async def listar_pedidos_endpoint():
    return {"pedidos": listar_pedidos()}


@app.post("/pedido/add")
async def criar_novo_pedido_endpoint(produtos: List[Produto], quantidade: List[int]):
    novo_pedido = criar_pedido(produtos, quantidade)
    return {"status": "sucesso", "mensagem": "Pedido criado", "pedido": novo_pedido}
