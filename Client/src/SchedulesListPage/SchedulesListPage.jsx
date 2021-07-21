import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Modal, Container, Row, Button, InputGroup, FormControl, Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";

import { scheduleActions, userActions } from '../_actions';
import { Header } from '../_components/Header';
import { history } from '../_helpers';

function SchedulesListPage() {
    const schedule = useSelector(state=> state.schedule);
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user.user_info);
    const dispatch = useDispatch();
    
    // if(partner === undefined || !partner.firstName) {
    //     history.push('/home');
    //     return;
    // }

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(userActions.getAll(user.id));
            dispatch(scheduleActions.getAllSchedules(user.id));
        }, 1000);
        return () => clearInterval(interval);
    }, [schedule]);

    const [createModalShow, setCreateModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [tempSchedule, setTempSchedule] = useState({});
    
    function handleCancelSchedule(id) {
        dispatch(scheduleActions.cancelSchedule(id));
    }

    function handleEditSchedule(schedule) {
        setTempSchedule(schedule);
        setUpdateModalShow(true);
    }

    return (
        <div className="col-lg-12 offset-lg-0">
            <Header/>
            
            <button className="my-2 btn btn-outline-primary btn-block" onClick={() => setCreateModalShow(true)} >New Schedule</button>
            
            {schedule.scheduleList &&
                <ul className="list-group">
                    {schedule.scheduleList.map((schedule, index) => 
                          <li key={schedule.id} className="list-group-item list-group-item-dark">
                            <div
                             className="row">
                                <div className="col-lg-3 col-sm-3 col-md-3 align-self-center">{schedule.firstName + ' ' + schedule.lastName}</div>
                                <div className="col-lg-3 col-sm-3 col-md-3 align-self-center">{new Date(schedule.meetTime).toLocaleString()}</div>
                                <div className="col-lg-3 col-sm-3 col-md-3 align-self-center">
                                    <p><b>{schedule.title}</b></p>
                                    <p>{schedule.description}</p>
                                </div>
                                <div className="col-lg-3 col-sm-3 col-md-3 align-self-center">
                                    <button className="btn btn-outline-primary btn-block" onClick={ () => handleEditSchedule(schedule) }>Edit</button>
                                    <button className="btn btn-outline-primary btn-block" onClick={ () => handleCancelSchedule(schedule.id) }>Cancel</button>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            }
            <CreateScheduleModal 
                show={createModalShow} 
                onHide={() => setCreateModalShow(false)}
                myid={user.id}
                users={users}
            />

            <UpdateScheduleModal 
                show={updateModalShow} 
                onHide={() => setUpdateModalShow(false)}
                schedule={tempSchedule}
            />
        </div>
    );
}

function CreateScheduleModal(props) {
    const dispatch = useDispatch();
    const [partnerId, setPartnerId] = useState();
    const [meetTime, setMeetTime] = useState(new Date());
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
    });
    const { title, description } = inputs;
    const { users } = props;
    
    const options = users && users.items && users.items.map((element, key) => (
        <option value={element.id} key={element.id}> {element.firstName + ' ' + element.lastName} </option>
    ))

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function changeParnerId(e) {
        setPartnerId(e.target.value);
    }

    function handleSave() {
        //send message to server with parameter (myId, otherId)
        dispatch(scheduleActions.saveSchedule( props.myid, partnerId, meetTime, title, description));
        props.onHide();
    }
    return (
      <Modal 
        {...props} 
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Schedule
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
            <Container>
                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Time</InputGroup.Text>
                        <div className="m-auto">
                        <DatePicker 
                            selected={meetTime} 
                            onChange={date => setMeetTime(date)}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                        </div>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-3">
                        <select className="browser-default custom-select" 
                            selected={partnerId}
                            onChange={changeParnerId}
                        >
                            <option>Choose partner</option>
                            { options }
                        </select>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                        <FormControl
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            value = {title}
                            name = 'title'
                            onChange = {handleChange}
                        />
                    </InputGroup>
                </Row>

                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Description</InputGroup.Text>
                        <FormControl 
                            as="textarea" 
                            aria-label="withDescription" 
                            value = {description}
                            name = 'description'
                            onChange = {handleChange}
                        />
                    </InputGroup>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>Save</Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

function UpdateScheduleModal(props) {
    const dispatch = useDispatch();
    const { schedule } = props;
    const [ elements, setElements ] = useState({});
    const [ meetTime, setMeetTime ] = useState(new Date());
    
    useEffect(() => {
        setElements(schedule)
        setMeetTime(schedule.meetTime)
    }, [schedule]);

    function handleChange(e) {
        const { name, value } = e.target;
        setElements(elements => ({ ...elements, [name]: value }));
    }

    function handleUpdate() {
        //send message to server with parameter (myId, otherId)
        dispatch(scheduleActions.updateSchedule( elements.id, meetTime, elements.title, elements.description));
        props.onHide();
    }

    return (
      <Modal 
        {...props} 
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Schedule
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
            <Container>
                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Time</InputGroup.Text>
                        <div className="m-auto">
                        <DatePicker 
                            selected={ meetTime ? new Date(meetTime) : new Date()}
                            onChange={date => setMeetTime(date)}
                            name = 'meetTime'
                            showTimeSelect
                            dateFormat="Pp"
                        />
                        </div>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">PartnerName</InputGroup.Text>
                        <FormControl
                            placeholder={schedule.firstName + ' ' + schedule.lastName}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled
                        />
                    </InputGroup>
                </Row>
                    
                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                        <FormControl
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            value = {elements ? elements.title : ''}
                            name = 'title'
                            onChange = {handleChange}
                        />
                    </InputGroup>
                </Row>

                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Description</InputGroup.Text>
                        <FormControl 
                            as="textarea" 
                            aria-label="withDescription" 
                            value = {elements ? elements.description : ''}
                            name = 'description'
                            onChange = {handleChange}
                        />
                    </InputGroup>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleUpdate}>Save</Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export { SchedulesListPage };