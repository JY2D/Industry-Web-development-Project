import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from 'react';
import HealthRiskList from './HealthRiskList';

import '../Styling/Form.css'

const API_URL = "http://127.0.0.1:8000/"

export default function Form() {
  const [occupation, setOccupation] = useState("")
  const [occupations, setOccupations] = useState([])
  const [risks, setRisks] = useState([])
  const [text, setText] = useState("")

  const [taskText, setTaskText] = useState("")
  const [occupationsSuggestions, setOccupationSuggestions] = useState([])

  const [tasks, setTasks] = useState([])

  const [tasksSuggestions, setTasksSuggestions] = useState([])

  useEffect(() => {
    axios.get(API_URL + 'occupations').then(
      res => setOccupations(res.data)
    )
    axios.get(API_URL + 'alltasks').then(
      res => setTasks(res.data)
    )
  }, [])


  const handleChange = (e) => {
    if(e.target.id.startsWith("Occupation")) {
      let matches = []
      if(text.length > 0) {
        matches = occupations.filter(occ => {
          const regex = new RegExp(`${text}`, "gi");
          return occ.name.match(regex)
        })
      }
      setOccupationSuggestions(matches)
      setText(e.target.value)
      formik.handleChange(e)

    } else if (e.target.id.startsWith("dailyTask")) {
      let matches = []
      if(taskText.length > 0) {
        matches = tasks.filter(task => {
          const regex = new RegExp(`${taskText}`, "gi");
          return task.name.match(regex)
        })
      }
      setTasksSuggestions(matches)
      setTaskText(e.target.value)
      formik.handleChange(e)
    }
  }

  const formik = useFormik({
    initialValues: {
      occupation: "",
      age: "",
      dailyTasks1: "",
      dailyTasks2: "",
      dailyTasks3: ""
    },
    validationSchema: Yup.object({
      occupation: Yup.string().required("Occupation is required!"),
      age: Yup.number().required("Age is required!"),
      dailyTasks1: Yup.string().required("Daily Task is required!")
    }),
    onSubmit: (values) => {
      const newValues = {
        "occupationName": values.occupation,
        "age": values.age,
        "tasks": []
      }

      for (var key in values) {
        if (values.hasOwnProperty(key)) {
          if (key.startsWith("dailyTasks")) {
            newValues.tasks.push(values[key])
          }
        }
      }
      axios.post(API_URL + "occupationrisks", newValues).then(
        res => {
          setOccupation(res.data.occupation)
          setRisks(res.data.risks)
        }
      ).catch(
        (err) => console.log(err)
      )
    }
  });

  console.log(tasksSuggestions)

  if (risks.length > 0) {
    return <HealthRiskList occupation={occupation} risks={risks} />
  } else {

    return (
      <div className="App">
        <div className= "introduction">
          <h1> Faethm Aegle </h1>
          <h3>
            Welcome to Faethm Aegle, we're here to improve your physical and mental
            health with the power of data
          </h3>
        </div>
        <form className="formContainer"
          onSubmit={formik.handleSubmit}>
          <div>
            <label>Occupation</label>
            <input
              id="OccupationInput"
              list="occupationList"
              type="text"
              name="occupation"
              value={formik.values.occupation}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            <datalist id="occupationList">
              {
                occupationsSuggestions.map(occ => {
                  return <option key={occ.name} value={occ.name}/>
                })
              }
            </datalist>
            {formik.touched.occupation && formik.errors.occupation && (
              <p>{formik.errors.occupation}</p>
            )}
          </div>
          <div>
            <label>Age</label>
            <input
              id="ageInput"
              type="number"
              name="age"
              min="1"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age && (
              <p>{formik.errors.age}</p>
            )}
          </div>
          <div>
            <label>Daily Tasks</label>
            <input
              list="dailytasklist"
              id="dailyTaskInput1"
              className="dailytask"
              type="text"
              name="dailyTasks1"
              value={formik.values.dailyTasks1}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            <datalist id="dailytasklist">
            {
                tasksSuggestions.map(t => {
                  return <option key={t.name} value={t.name}/>
                })
              }
            </datalist>
            {formik.errors.dailyTasks1 && formik.touched.dailyTasks1 && (
              <p>{formik.errors.dailyTasks1}</p>
            )}
            <input
              id="dailyTaskInput2"
              className="dailytask"
              type="text"
              name="dailyTasks2"
              value={formik.values.dailyTasks2}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.dailyTasks2 && formik.touched.dailyTasks2 && (
              <p>{formik.errors.dailyTasks2}</p>
            )}
            <input
              id="dailyTaskInput3"
              type="text"
              name="dailyTasks3"
              value={formik.values.dailyTasks3}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
