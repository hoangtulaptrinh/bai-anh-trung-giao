import React, { Component } from 'react';
import './App.css';
import Target from './components/Target'
import Item from './components/Item'
import { Container, Row, Col, Button } from 'reactstrap';
import * as actions from './actions/index';
import { connect } from 'react-redux';
import CreateNewItems from './components/createElements'

import * as callApi from './axios/axios'

class App extends Component {

  ChangeItems = (idDrag) => {
    var idDrop = this.props.IdDrop;
    var objChange = {
      nameItemDrag: this.props.Arr.Items[idDrag].name,
      nameItemDrop: this.props.Arr.Target[idDrop].name,
      idDrop: idDrop,
      idDrag: idDrag
    };
    callApi.Params('/api/get_new_item', 'get', objChange).then(response => this.props.FETCH_DATA(response.data))
  }

  deleteItems = (idDrag, nameDrag) => {
    var objDelete = {
      id: idDrag,
      name: nameDrag
    }

    callApi.Params('/api/change/delete', 'delete', objDelete).then(response => this.props.FETCH_DATA(response.data))
  }
  updateIdDrop = idDrop => {
    this.props.updateID(idDrop);
  }

  reset = () => {
    callApi.Params('/api/change/reset', 'get', null).then(response => this.props.FETCH_DATA(response.data))
  }

  hardReset = () => {
    callApi.Params('/api/change/hardreset', 'get', null).then(response => this.props.FETCH_DATA(response.data))
  }

  componentDidMount() {
    callApi.Params('/api/getdata', 'get', null).then(response => this.props.FETCH_DATA(response.data))
  }

  render() {
    const { Arr } = this.props
    return (
      <div className="App">

        <div className='total-target'>
          <h2>Drop Below Me</h2>

          <div className='drop-Target'>
            <Container id='Container'>
              <Row id='row'>

                {
                  Arr.Target.map((item, index) => (
                    <Col sm="2" key={index}>
                      <Target item={item} key={index} name={item.name} url={item.url} recipe={item.recipe} updateIdDrop={(id) => this.updateIdDrop(id)} />
                    </Col>
                  ))
                }

              </Row>
            </Container>

          </div>
          <Button outline color="danger" onClick={() => this.reset()}>
            Clear Screen
          </Button>{' '}
          <Button outline color="danger" onClick={() => this.hardReset()}>
            Study again from the beginning
          </Button>{' '}
        </div>

        <div className="item-container">
          <CreateNewItems />
          {Arr.Items.map((item, index) => (
            <Item item={item} key={index} name={item.name} url={item.url} ChangeItems={(id) => this.ChangeItems(id)} deleteItems={() => this.deleteItems(item.id, item.name)} />
          ))}
        </div>

      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    IdDrop: state.IdDrop,
    Arr: state.Arr,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateID: (idDrop) => dispatch(actions.updateID({ idDrop: idDrop })),
    followRecipe: (name, url, idDrag, idDrop) => dispatch(actions.followRecipe({ name: name, url: url, idDrag: idDrag, idDrop: idDrop })),
    FETCH_DATA: (data) => dispatch(actions.FETCH_DATA({ data: data }))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);