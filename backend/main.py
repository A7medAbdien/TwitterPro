from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from analysis import fig
from twitterAPI import get_user_info, USERNAME
import mpld3 as mp

app = FastAPI()

origins = [
    "null",
    "http://localhost:63342"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

user_info = get_user_info(username=USERNAME)
test = fig


@app.get("/api")
def get_user_info():
    return {"massage": "hello"}
