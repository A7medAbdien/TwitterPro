from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

import numpy as np

from analysis import *
from strings import *
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

term_freq_uni_data = {
    key: {
        "data": data,
        "title": tf_uni_titles[key],
        "xLabel": "Uni-Term",
        "yLabel": "Frequency"
    } for key, data in term_freq_uni_data.items()
}


@app.get("/ch/tf/uni")
async def tf_uni():
    return term_freq_uni_data


term_freq_bi_data = {
    key: {
        "data": data,
        "title": tf_bi_titles[key],
        "xLabel": "Bi-Term",
        "yLabel": "Frequency"
    } for key, data in term_freq_bi_data.items()
}


@app.get("/ch/tf/bi")
async def tf_bi():
    return term_freq_bi_data


user_freq_data = {
    key: {
        "data": data,
        "title": user_titles[key],
        "xLabel": "Account username",
        "yLabel": "Frequency"
    } for key, data in user_freq_data.items()
}


@app.get("/ch/user")
async def users():
    return user_freq_data


topic_freq_data = {
    key: {
        "data": data,
        "title": user_titles[key],
        "xLabel": "Account username",
        "yLabel": "Frequency"
    } for key, data in user_freq_data.items()
}


@app.get("/ch/topic")
async def users():
    return topic_freq_data


@app.get("/api")
def get_user_info():
    return {"massage": "hello"}
