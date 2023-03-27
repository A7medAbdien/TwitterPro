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