from typing import List

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Person(BaseModel):
    id: int
    name: str
    age: int
    
DB: List[Person] = [
    Person(id=1,name="Ahmed", age=22),
    Person(id=2,name="Hazim", age=23),
]

@app.get("/api")
def read_root():
    return DB
