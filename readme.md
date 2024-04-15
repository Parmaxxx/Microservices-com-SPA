Atividade de Desenvolvimento Web III

Primeira parte - Back-End
onde foi requerido utilizar um projeto que utilizava memoria cache para salvar as requisições e refatorar para utlizar via arquivo .TXT como banco de dados, e utlizando o mesmo para leitura.

Segunda parte - Front-End
criação de um front-end simples para utilizar o conceito de SPA, apenas utilizando Javacript puro sem nenhuma biblioteca ou Framework para ajudar.
front-end criado de maneira simples e sem estilizaçao apenas para praticar o conceito e para fins de aprendizado.






1º
python -m venv fastapi_env
2º
Windows: fastapi_env\Scripts\activate
macOS/Linux: source fastapi_env/bin/activate
3º
pip install fastapi uvicorn
pip install httpx

4º
pip freeze > requirements.txt
uvicorn login_service:app --reload --port 8001
uvicorn produtos_service:app --reload --port 8002
uvicorn pedido_service:app --reload --port 8003


5º (instalar em outro local) passo 1 e passo 2 
pip install -r requirements.txt



