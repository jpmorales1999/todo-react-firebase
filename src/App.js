import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { map, size } from 'lodash'

import './App.scss'

// Components
import AddTasks from './components/AddTasks';
import Task from './components/Task'

// Firebase

import firebase from './utils/firebase'
import 'firebase/compat/firestore'

const db = firebase.firestore(firebase)

function App() {

  const [ tasks, setTasks ] = useState(null)

  const [ reloadTask, setRealoadTask ] = useState(false) // Interruptor
  
  useEffect(() => {
    db.collection('tasks')
      .orderBy('completed') // Ordenar por campo completed de la colección NoSQL de Firebase
      .get()
      .then((response) => {
        const arrayTasks = []
        map(response.docs, (task) => {
          const data = task.data() // Obtiene los datos de la tarea (SIN EL ID)
          data.id = task.id // Agregar al data el ID de la tarea
          arrayTasks.push(data) // Agregar el data al arrayTasks (Agregará cada tarea al array)
        })
        setTasks(arrayTasks)
      })
      setRealoadTask(false)
  }, [reloadTask])
  

  return (
    <Container fluid className='app'>

      <div className='title'>
        <h1>Listado de Tareas</h1>
      </div>

      <Row className='todo'>

        <Col
          className='todo__title'
          xs={{span: 10, offset: 1}}
          md={{span: 6, offset: 3}}
        >
          <h2>Hoy</h2>
        </Col>

        <Col
          className='todo__list'
          xs={{span: 10, offset: 1}}
          md={{span: 6, offset: 3}}
        >
          { /* Si tasks no es True carga el Spinner*/
            !tasks ? (
              <div className="loading">
                <Spinner 
                  animation='border'
                />
                <span>Cargando...</span>
              </div>
              /* Si el tamaño del Array de Tasks es igual a 0 es porque no hay tareas*/
            ) : size(tasks) === 0 ? (
              <h3>No hay tareas</h3>
            ) : (
              /* Y en caso de que no ocurran las condiciones anteriores es porque hay tareas y se pueden mostrar */
              map(tasks, (task, index) => (
                <Task key={index} task={task} setRealoadTask={setRealoadTask} />
              ))
            )
          }
        </Col>

        <Col
          className='todo__input'
          xs={{span: 10, offset: 1}}
          md={{span: 6, offset: 3}}
        >
          <AddTasks setRealoadTask={setRealoadTask} />
        </Col>

      </Row>

      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='colored'
      />

    </Container>
  );
}

export default App;
