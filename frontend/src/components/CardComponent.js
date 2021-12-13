import React from 'react'
import * as moment from 'moment/moment';
import {Card, Col, Container, Row} from 'react-bootstrap'
import { TASK_DETAILS_RESET } from '../constants/taskConstants';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { taskDetails, updateTask, deleteTask } from '../actions/taskActions';

const CardComponent = ({ myId, myName, status, created_at, completed_at }) => {

    const dispatch = useDispatch()
    let history = useHistory()

    const updateHandler = () => {
        dispatch({type: TASK_DETAILS_RESET})
        dispatch(taskDetails(myId))
        history.push(`/update/${myId}/`)
    }

    const deleteHandler = () => {
        dispatch(deleteTask(myId))
    }


    return (
        <Container fluid={"md"}>
            <Row className="py-3" sm={20}>
        <Col>
            <Card className="card" style={{width: 230}}>
                <Card.Body>
                    <div>
                        <Card.Title id={"bootstrap-overrides"}>
                            {myName}
                        </Card.Title>
                    </div>
                    <div>
                        <label style={{fontSize: 11.5}}><strong>Completed: </strong></label>
                    <input
                        style={{marginLeft: 10}}
                        type="checkbox"
                        checked={status}
                        disabled={true}
                    />
                    </div>
                    <div style={{marginTop: 10}}>
                        <p style={{fontSize: 11.5}}>
                            <strong style={{marginRight: 10}}>Created At:</strong>
                            {moment(created_at).format('DD.MM.YY H:mm')}
                        </p>
                    </div>
                    <div style={{marginTop: 5}}>
                        <p style={{fontSize: 11.5}}>
                            <strong style={{marginRight: 10}}>Completed At: </strong>{completed_at===null
                            ? "not completed yet"
                            : moment(completed_at).format('DD.MM.YY H:mm')}
                        </p>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Row sm={2} lg={2} md={2}>
                        <Col>
                    <button className="btn" style={{marginLeft:0}} onClick={() => updateHandler()}>
                        <i style={{fontSize: 11.5}}>update</i>
                    </button>
                        </Col>
                        <Col>
                    <button className="btn" onClick={() => deleteHandler()}>
                        <i style={{fontSize: 11.5}}>delete</i>
                    </button>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Col >
            </Row>

        </Container>
    )
}

export default CardComponent
