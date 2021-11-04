from typing import Optional
from fastapi import FastAPI
import csv
from pydantic import BaseModel
from starlette.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

import psycopg2

DB_NAME = 'sample_db'
DB_URL = 'jdbc:postgresql://localhost:5432/sample_db'

conn = psycopg2.connect(
    host="localhost",
    database="sample_db",
    user="postgres",
    password="Abcd1234")

origins = [
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class requestOccupation(BaseModel):
    occupationName: str
    age: int
    tasks: Optional[list]

class onlyOccupation(BaseModel):
    occupationName: str

@app.get("/")
async def root():
    response = RedirectResponse(url='/docs') #redirects to docs when opening api at '/'
    return response

@app.get("/occupation/{occupation_id}") #returns all rows with the fiven occupation_id
async def pathtest(occupation_id):
    with open("./server/data/pace_data.csv") as occupationFile:
        res = []
        for row in occupationFile:
            row = row.split(',')
            if(row[1] == occupation_id):
                res.append(row)
        return {"data":res}

@app.post("/occupationrisks/") #get health risks given an occupation and a list of tasks, only works for exact names
async def get_risks(request: requestOccupation):
    res=[]
    name = request.occupationName
    tasks = request.tasks
    with open("./server/data/pace_data.csv") as occupationFile:
        for row in occupationFile:
            row = row.split(",")
            if(row[2] == name):
                if(len(tasks) > 0):
                    if(row[5] in tasks):
                        res.append(row[7])
    return {"occupation": name,
    "risks": res}

@app.get("/occupations")
async def get_occupations():
    res = []
    curr = conn.cursor()
    curr.execute("SELECT distinct(occupation) FROM occupation_tasks;")
    raw = curr.fetchall()
    for i in raw:
        res.append({"name": i[0]})
    curr.close()
    return res

# @app.get("/occupations")
# async def get_occupations():
#     res = []
#     with open("./server/data/pace_data.csv") as occupationFile:
#         for row in occupationFile:
#             row = row.split(",")
#             if(row[2] != ""):
#                 value = {"name": row[2]}
#                 if(value not in res):
#                     res.append(value)
#     return res

@app.post("/tasks")
async def get_tasks_by_occupation(request: onlyOccupation):
    res = []
    with open("./server/data/pace_data.csv") as occupationFile:
        for row in occupationFile:
            row = row.split(",")
            if(row[2] == request.occupationName):
                value = {"name": row[5]}
                if(value not in res):
                    res.append(value)
    return res

@app.get("/alltasks")
async def get_all_tasks():
    res = []
    curr = conn.cursor()
    curr.execute("SELECT distinct(task_name) FROM task_risk")
    raw = curr.fetchall()
    for i in raw:
        res.append({"name": i[0]})
    curr.close()
    return res

    # res = []
    # with open("./server/data/pace_data.csv") as occupationFile:
    #     for row, object in enumerate(occupationFile):
    #         if(row == 0 or object[5] == ''):
    #             continue
    #         object = object.split(",")
    #         value = {"name": object[5]}
    #         if(value not in res):
    #             res.append(value)
    # return res

@app.get('/postgrestest')
async def testing_postgres():
    res = []
    curr = conn.cursor()
    curr.execute("SELECT * FROM risk")
    res = curr.fetchall()
    curr.close()
    return res