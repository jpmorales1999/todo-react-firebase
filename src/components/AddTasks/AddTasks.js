import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'

import './AddTasks.scss'

// Import Logos
import { ReactComponent as Send } from '../../assets/send.svg'

// Import Firebase
import firebase from '../../utils/firebase'
import 'firebase/compat/firestore'

// Initialize DB Firebase
const db = firebase.firestore(firebase)

export default function AddTasks(props) {

  const { setRealoadTask } = props

  const [ task, setTask ] = useState("")

  const onSubmit = (e) => {
      e.preventDefault()
      
      if (!isEmpty(task)) {
        db.collection('tasks').add({
            name: task,
            completed: false
        }).then(() => {
            setTask('')
            toast.success('Tarea Creada')
            setRealoadTask(true)
        })
      }
  } 

  return (
    <Form
        className='add-tasks'
        onSubmit={onSubmit}
    >
        <input 
            type="text" 
            placeholder='Nueva Tarea...'
            onChange={e => setTask(e.target.value)} 
            value={task}
        />
        <Button
            type='submit'
        >
            <Send />
        </Button>
    </Form>
  )
}
