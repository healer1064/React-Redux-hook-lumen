import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Modal, Container, Row, Button, InputGroup, FormControl } from 'react-bootstrap'
import DatePicker from "react-datepicker";

import { scheduleActions } from '../_actions';
import { Header } from '../_components/Header';
import { history } from '../_helpers';

/*----------------------------------------------------------------------------
|   Author : Zilya
|   CallSchedulePage component
|   It shows all schedules between logined user and one partner
------------------------------------------------------------------------------*/

function CallSchedulePage() {
    // schedule list between logined user and partner.
    const schedule = useSelector(state=> state.schedule);
    // logined user's information
    const user = useSelector(state => state.authentication.user.user_info);
    const dispatch = useDispatch();
    
    // I get the partner info from parameter of URL
    let location = useLocation();
    let partner = location.user;
    
    // If irregular access, return to login page.
    if(partner === undefined || !partner.firstName) {
        history.push('/login');
        return;
    }

    //Getting schedules between logined user and every 1 second for show updated data.
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(scheduleActions.getSchedules(user.id, partner.id));
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [schedule]);

    // createModalShow and updateModalShow are the flag(true or false).
    // if createModalShow is true, New modal is opened.
    // tempSchedule is used to send schedule to update Modal
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
            <h1>With {partner.firstName + " " + partner.lastName}</h1>
            
            <button className="my-2 btn btn-outline-primary btn-block" onClick={() => setCreateModalShow(true)} >New Schedule</button>
            
            { schedule.scheduleList &&
                <ul className="list-group">
                    {schedule.scheduleList.map((element, index) => 
                          <li key={element.id} className="list-group-item list-group-item-dark">
                            <div className="row">
                                <div className="col-lg-4 col-sm-4 col-md-4 align-self-center">{new Date(element.meetTime).toLocaleString()}</div>
                                <div className="col-lg-4 col-sm-4 col-md-4 align-self-center">
                                    <p><b>{element.title}</b></p>
                                    <p>{element.description}</p>
                                </div>
                                <div className="col-lg-4 col-sm-4 col-md-4 align-self-center">
                                    <button className="btn btn-outline-primary btn-block" onClick={ () => handleEditSchedule(element) }>Edit</button>
                                    <button className="btn btn-outline-primary btn-block" onClick={ () => handleCancelSchedule(element.id) }>Cancel</button>
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
                partnerid={partner.id}
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
    const [meetTime, setMeetTime] = useState(new Date());
    const [inputs, setInputs] = useState({
        title: '',
        description: ''
    });
    const { title, description } = inputs;

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSave() {
        //send message to server with parameter (myId, otherId)
        dispatch(scheduleActions.saveSchedule( props.myid, props.partnerid, meetTime, title, description));
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
        console.log(elements);

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

export { CallSchedulePage };