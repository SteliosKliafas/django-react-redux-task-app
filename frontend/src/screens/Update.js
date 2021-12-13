import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {taskDetails as taskDetailsAction, updateTask } from '../actions/taskActions'
import { useDispatch, useSelector } from 'react-redux'
import { TASK_DETAILS_RESET } from '../constants/taskConstants'

const Update = ({ history, match }) => {

    const [name, setName] = useState('')
    const [status, setStatus] = useState(false)
    const [completed_at, setCompletedAt] = useState(null)
    const taskDetails = useSelector(state => state.taskDetails)

    const { error, loading, task } = taskDetails

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        console.log(completed_at)
        e.preventDefault()
        if (name === '') {
            alert('Task Name Required')
        } else {
            dispatch(updateTask(
                match.params.id,
                name,
                status,
                completed_at
            ))
            setName('')
            setStatus(false)
            history.push('/')
        }
    }

    useEffect(() => {
        if (!task || !task.name) {
            dispatch({type: TASK_DETAILS_RESET})
            dispatch(taskDetailsAction(match.params.id))
        } else {
            setName(task.name)
            setStatus(task.status)
            setCompletedAt(task.completed_at)
        }
    }, [dispatch, task, match.params.id, history])

    return (
        <>
            <header className="text-center py-5">
                <h1 className="pb-5">Task List</h1>
                <Link className="btn createTodoBtn" to="/">
                    Home
                </Link>
            </header>
            <section className="container py-5 d-flex justify-content-center">
                {
                    loading
                        ? <Loader />
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : (
                                <Form className="createForm" onSubmit={submitHandler}>
                                    <Form.Group className="mb-4" controlId="exampleFrom.ControlInput1">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-5" controlId="formBasicCheckbox" style={{textAlign: "left"}}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Completed"
                                            name="check_status"
                                            checked={status}
                                            onChange={(e) => {setStatus(!status); {
                                                if (status===false){setCompletedAt(new Date())}else{setCompletedAt(null)}
                                            }}}

                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <button type="submit" className="btn submitBtn">Submit</button>
                                    </div>
                                </Form>
                            )
                }
            </section>
        </>
    )
}

export default Update
