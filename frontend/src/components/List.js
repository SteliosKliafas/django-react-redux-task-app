import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listTasks } from '../actions/taskActions'
import Loader from './Loader'
import Message from './Message'
import CardComponent from './CardComponent'
import {Col, Row} from "react-bootstrap";

const List = ({ history }) => {

    const dispatch = useDispatch()

    const taskList = useSelector(state => state.taskList)
    const { error, loading, tasks } = taskList

    const taskCreate = useSelector(state => state.taskCreate)
    const { success: successCreate } = taskCreate

    const taskUpdate = useSelector(state => state.taskUpdate)
    const { success: successUpdate } = taskUpdate

    const taskDelete = useSelector(state => state.taskDelete)
    const { success: successDelete } = taskDelete


    useEffect(() => {
        dispatch(listTasks())
    }, [dispatch, history, successCreate, successUpdate, successDelete])

    return (
        <>
            <header className="text-center py-5">
                <h1 className="fa-font-awesome pb-5" id={'bootstrap-overrides'}>Task List</h1>
                <Link className="btn btn-outline-primary " to='/create'>
                    New Task
                </Link>
            </header>
            <section className="container py-5">
                {
                    loading
                        ? <Loader />
                        : error
                            ? <Message variant="danger">{error}</Message>
                            : (
                                <>
                                    {tasks.length === 0 && <Message variant="danger">No Results Found!</Message>}
                                    <div>
                                        <Row>
                                        {tasks.map((task) => (
                                            <Col>
                                                <CardComponent
                                                    key={task.id}
                                                    myId={task.id}
                                                    myName={task.name}
                                                    status={task.status}
                                                    created_at={task.created_at}
                                                    completed_at={task.completed_at}
                                                />
                                            </Col>
                                        ))}
                                        </Row>
                                    </div>
                                </>
                            )
                }
            </section>
        </>
    )
}

export default List
