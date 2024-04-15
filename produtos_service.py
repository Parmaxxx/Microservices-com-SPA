from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import uuid
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class Produto(BaseModel):
    nome: str
    preco: float


def ler_produtos():
    try:
        with open("produtos.txt", "r") as file:
            produtos = json.load(file)
    except FileNotFoundError:
        produtos = []
    return produtos


def escrever_produtos(produtos):
    with open("produtos.txt", "w") as file:
        json.dump(produtos, file, indent=4)


@app.get("/produtos")
async def listar_produtos():
    produtos = ler_produtos()
    return {"produtos": produtos}

@app.post("/produtos")
async def adicionar_produto(produto: Produto):
    produtos = ler_produtos()
    novo_uuid = str(uuid.uuid4())
    novo_produto = {
        "id": novo_uuid,
        "nome": produto.nome.upper(),
        "preco": produto.preco
    }
    produtos.append(novo_produto)
    escrever_produtos(produtos)
    return {"message": "Produto adicionado com sucesso", "produto": novo_produto}

@app.get("/produtospornome/{produto_nome}")
async def buscar_produto(produto_nome: str):
    produtos = ler_produtos()
    for produto in produtos:
        if produto["nome"] == produto_nome.upper():
            return produto
    raise HTTPException(status_code=404, detail="Produto não encontrado")

