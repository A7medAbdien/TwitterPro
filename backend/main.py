from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

import numpy as np

from analysis import data
from twitterAPI import get_user_info, USERNAME
import mpld3 as mp

app = FastAPI()

origins = [
    "null",
    "http://localhost:63342",
    "http://localhost:3000",
    "http://localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class RandomNumbers:
    def __init__(self, n):
        self.n = n
        self.data = np.random.randint(0, 100, n)

    def get_data(self):
        return self.data.tolist()

    def add(self, n):
        self.data = np.append(self.data, np.random.randint(0, 100, n))


# user_info = get_user_info(username=USERNAME)
# test = fig


@app.get("/random/{n}")
async def random_number(n: int):
    r = RandomNumbers(n)
    return r.get_data()


@app.get("/tf")
async def tf():
    return data


@app.get("/api")
def get_user_info():
    return {"massage": "hello"}
