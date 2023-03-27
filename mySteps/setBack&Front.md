# set backend and frontend services

# Backend

```bash
pip install fastapi
```

in the backend dir run

```bash
pip install "uvicorn[standard]"
```
did not work with me, since I downloaded python form MS store

but [this](https://stackoverflow.com/questions/64936440/python-uvicorn-the-term-uvicorn-is-not-recognized-as-the-name-of-a-cmdlet-f) worked

```bash
python -m uvicorn main:app --reload
```

# Frontend

```bash
npx create-react-app frontend
npm i axios
```

# Containerize

in backend dir
```bash
docker build . -t backend
docker run --name backend --rm -p 8000:8000 backend
```

in frontend dir
```bash
docker build . -t frontend
docker run --name frontend --rm -p 3000:3000 frontend
```

anywhere
```bash
docker network create foobar
```

in backend dir
```bash
docker run --rm --name backend --network foobar -p 8000:8000 backend
```
in frontend dir
```bash
docker run --rm --name frontend --network foobar -p 3000:3000 frontend
```