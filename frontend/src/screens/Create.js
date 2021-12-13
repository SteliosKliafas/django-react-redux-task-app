import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { createTask } from '../actions/taskActions';

const Create = ({ history }) => {

    const [name, setName] = useState('New Task')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createTask(name))
        setName('')
        history.push('/')
    }

    return (
        <>
            <header className="text-center py-5">
                <h1 className="pb-5">TODO LIST</h1>
                <Link className="btn createTodoBtn" to="/">
                    Home
                </Link>
            </header>
            <section className="container py-5 d-flex justify-content-center">
                <Form className="createForm" onSubmit={submitHandler}>
                    <Form.Group className="mb-4" controlId="exampleFrom.ControlInput1">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <div>
                        <button type="submit" className="btn submitBtn">Submit</button>
                    </div>
                </Form>
            </section>
        </>
    )
}

export default Create
