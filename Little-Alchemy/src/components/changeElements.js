import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, } from 'reactstrap';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import axios from 'axios'

const ChangeItem = (props) => {
    const {
        buttonLabel,
        className,
        FETCH_DATA,
        idItem
    } = props;

    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    const toggle = () => setModal(!modal);

    const changeThisItem = () => {
        axios.patch('/api/change/change', {
            id: idItem,
            name: name,
            url: url
        })
            .then(toggle())
            .then(response => {
                FETCH_DATA(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    return (
        <div>
            <Button outline color="success" onClick={toggle}>
                Change{buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>You Are The Lord, Please Prove Your Strength</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label >Name</Label>
                        <Input placeholder="Write the name of the element you want to change" onChange={e => setName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label >Url</Label>
                        <Input placeholder="Write the image path of the element you want to change" onChange={e => setUrl(e.target.value)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={changeThisItem}>Change</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

const mapStatetoProps = (state) => {
    return {
        IdDrop: state.IdDrop,
        Arr: state.Arr,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FETCH_DATA: (data) => dispatch(actions.FETCH_DATA({ data: data }))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ChangeItem);