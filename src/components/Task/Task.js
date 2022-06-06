import React from 'react'
import { toast } from 'react-toastify'

import './Task.scss'

// Import Logos
import { ReactComponent as Check } from '../../assets/check.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'

// Import Firebase
import firebase from '../../utils/firebase'
import 'firebase/compat/firestore'

// Initialize DB Firebase
const db = firebase.firestore(firebase)

export default function Task(props) {
  const { task, setRealoadTask } = props

  const completedTask = () => {
    db.collection('tasks')
      .doc(task.id) // Buscar la colección por ID
      .update({ // Propiedades a actualizar
        completed: !task.completed // Mandarle siempre el valor contrario que actualmente tiene la tarea
      })
      .then(() => { // Ejecutamos la promesa para que lleve a cabo la solicitud a Firebase
        toast.success('Tarea Actualizada')
        setRealoadTask(true)
      })
  }

  const deletedTask = () => {
    db.collection('tasks')
      .doc(task.id)
      .delete()
      .then(() => {
        toast.success('Tarea Eliminada')
        setRealoadTask(true)
      })
  }

  return (
    <div className='task'>
        <div>
            <Check 
                className={task.completed ? 'completed' : ''}
                onClick={completedTask} 
            />
        </div>
        <div style={task.completed === true ? {textDecorationLine: 'line-through'} : {}}>
            {task.name}
        </div>
        <div>
            <Delete 
                onClick={deletedTask}
            />
        </div>
    </div>
  )
}
