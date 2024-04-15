from fastapi import FastAPI, HTTPException
import json
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class User(BaseModel):
    username: str
    password: str

def ler_registros():
    try:
        with open("registros.txt", "r") as file:
            registros = json.load(file)
    except FileNotFoundError:
        registros = []
    return registros

def escrever_registros(registros):
    with open("registros.txt", "w") as file:
        json.dump(registros, file, indent=4)

@app.get("/registros")
async def listar_registros():
    registros = ler_registros()
    return {"registros": registros}

@app.post("/login")
async def login(user: User):
    registros = ler_registros()
    for registro in registros:
        if registro["username"] == user.username and registro["password"] == user.password:
            return {"status": "sucesso", "mensagem": "Usuário autenticado"}
    raise HTTPException(status_code=401, detail="Credenciais inválidas")

@app.post("/cadastro")
async def cadastrar_usuario(user: User):
    registros = ler_registros()
    for registro in registros:
        if registro["username"] == user.username:
            raise HTTPException(status_code=400, detail="Usuário já existe")
    novo_usuario = {"username": user.username, "password": user.password}
    registros.append(novo_usuario)
    escrever_registros(registros)
    return {"status": "sucesso", "mensagem": "Usuário cadastrado com sucesso"}
