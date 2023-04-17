from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

import numpy as np
import sys
from analysis import *
from strings import *
from matplotlib.ticker import MaxNLocator
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

import matplotlib
import seaborn as sns
import matplotlib.pyplot as plt
import io

"""
Test
"""


class RandomNumbers:
    def __init__(self, n):
        self.n = n
        self.data = np.random.randint(0, 100, n)

    def get_data(self):
        return self.data.tolist()

    def add(self, n):
        self.data = np.append(self.data, np.random.randint(0, 100, n))


@app.get("/hist/{n}",
         responses={
             404: {"description": "Not Found"},
             200: {"content": {"image/png": {}}}
         })
async def hist(n: int):
    r = RandomNumbers(n)
    fig = sns.histplot(r.get_data(), bins=10).get_figure()
    with io.BytesIO() as fig_bytes:
        sys.stdout.flush()
        fig.savefig(fig_bytes, format="png")
        fig_bytes.seek(0)
        response = Response(fig_bytes.getvalue(), media_type='image/png')
        plt.close()
    return response


term_freq_uni_data = {
    key: {
        "data": data,
        "title": tf_uni_titles[key],
        "xLabel": "Uni-Term",
        "yLabel": "Frequency"
    } for key, data in term_freq_uni_data.items()
}


# for key, data in term_freq_uni_data.items():
def plot_term_freq_uni(data, title, x_label, y_label):
    ax = plt.figure(figsize=(15, 5)).gca()
    ax.yaxis.set_major_locator(MaxNLocator(integer=True))

    # creating the bar plot
    plt.bar(data[0], data[1], color='b', width=0.4)

    plt.xlabel("Terms")
    plt.ylabel("Frequency")
    plt.title(f'Terms Frequencies')
    plt.xticks(rotation=60)
    with io.BytesIO() as fig_bytes:
        sys.stdout.flush()
        plt.savefig(fig_bytes, format="png")
        fig_bytes.seek(0)
        response = Response(fig_bytes.getvalue(), media_type='image/png')
        plt.close()
        return response


df = term_freq_uni_data['tweets']

@app.get("/ch/tf/uni/1")
async def tf_uni():
    return plot_term_freq_uni(df['data'], df['title'], df['xLabel'], df['yLabel'])


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
        "title": topic_titles[key],
        "xLabel": "Topics",
        "yLabel": "Frequency"
    } for key, data in topic_freq_data.items()
}


@app.get("/ch/topic")
async def topic():
    return topic_freq_data


time_freq_data = {
    key: {
        "data": data,
        "title": time_titles[key],
        "xLabel": "Day",
        "yLabel": "Hour"
    } for key, data in time_freq_data.items()
}


@app.get("/ch/time")
async def time():
    return time_freq_data


comm_data = {
    key: {
        "bar": comm_data[key][0],
        "venn": comm_data[key][1],
        **{meta_key: meta for meta_key, meta in comm_meta[key].items()}
    } for key, data in comm_data.items()
}


@app.get("/ch/comm")
async def comm():
    return comm_data


@app.get("/api")
def get_user_info():
    return {"massage": "hello"}
