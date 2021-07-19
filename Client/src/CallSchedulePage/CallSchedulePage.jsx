import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Modal, Container, Row, Col, Button, } from 'react-bootstrap'

import { scheduleActions } from '../_actions';
import { Header } from '../_components/Header';
// import "react-datepicker/dist/react-datepicker.css";

function CallSchedulePage() {
    // const users = useSelector(state => state.users);
    const schedule = useSelector(state=> state.schedule);
    const user = useSelector(state => state.authentication.user.user_info);
    const dispatch = useDispatch();
    
    // I get the partner info from parameter of URL
    let location = useLocation();
    let partner = location.user;

    useEffect(() => {
        // getting all schedules between myId and partnerId
        dispatch(scheduleActions.getSchedules(user.id, partner.id));
    }, []);

    const [modalShow, setModalShow] = useState(false);

    // function handleDisconnect(id) {
    //     //send message to server with parameter (myId, otherId)
    //     dispatch(scheduleActions.disconnect(user.id, id));
    // }

    // function handleConnect(id) {
    //     //send message to server with parameter (myId, otherId)
    //     dispatch(scheduleActions.connect(user.id, id));
    // }
    
    // function handleDeleteUser(id) {
    //     dispatch(scheduleActions.delete(id));
    // }

    return (
        <div className="col-lg-12 offset-lg-0">
            <Header/>
            <h1>With {partner.firstName + " " + partner.lastName}</h1>
            
            <button className="my-2 btn btn-outline-primary btn-block" onClick={() => setModalShow(true)} >New Schedule</button>
            
            {schedule.scheduleList &&
                <ul className="list-group">
                    {schedule.scheduleList.map((schedule, index) => 
                        <li key={schedule.id} className="list-group-item list-group-item-dark">
                            <div className="row">
                                <div className="col-lg-4 col-sm-4 col-md-4 align-self-center">{schedule.meetingTime}</div>
                                <div className="col-lg-4 col-sm-4 col-md-4 align-self-center">
                                    <p><b>{schedule.title}</b></p>
                                    <p>{schedule.description}</p>
                                </div>
                                <div className="col-lg-4 col-sm-4 col-md-4 align-self-center">
                                    <button className="btn btn-outline-primary btn-block" >Edit</button>
                                    <button className="btn btn-outline-primary btn-block">Cancel</button>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            }
            <MydModalWithGrid 
                show={modalShow} 
                onHide={() => setModalShow(false)} 
            />
        </div>
    );
}

function MydModalWithGrid(props) {
    // var DateTimeField = require('react-bootstrap-datetimepicker');

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
            {/* <Row>
                <DateTimeField
                    // dateTime={date}
                    // format={format}
                    // inputFormat={inputFormat}
                    // onChange={this.handleChange}
                    // viewMode={mode}
                />
            </Row> */}
  
            <Row>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
export { CallSchedulePage };