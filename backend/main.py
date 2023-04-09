from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from analysis import fig
from twitterAPI import get_user_info, USERNAME
import mpld3 as mp

app = FastAPI()

user_info = get_user_info(username=USERNAME)
test = fig


@app.get("/api")
def get_user_info():
    return HTMLResponse(mp.fig_to_html(test))
