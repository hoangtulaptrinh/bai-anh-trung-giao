import React, { Component } from 'react';
import './App.css';
import Target from './components/Target'
import Item from './components/Item'
import { Container, Row, Col, Button } from 'reactstrap';
import * as actions from './actions/index';
import { connect } from 'react-redux';
import axios from 'axios'
import CreateNewItems from './components/createElements'
class App extends Component {

  ChangeItems = (idDrag) => {
    var idDrop = this.props.IdDrop;
    axios.get('/api/change',
      {
        params: {
          nameItemDrag: this.props.Arr.Items[idDrag].name,
          nameItemDrop: this.props.Arr.Target[idDrop].name,
          idDrop: idDrop,
          idDrag: idDrag
        }
      })
      .then(response => {
        this.props.FETCH_DATA(response.data)
      }
      )
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteItems = (idDrag, nameDrag) => {

    axios.delete('/api/change/delete',
      {
        params: {
          id: idDrag,
          name: nameDrag
        }
      })
      .then(response => {
        this.props.FETCH_DATA(response.data)
      }
      )
      .catch(function (error) {
        console.log(error);
      });

  }
  updateIdDrop = idDrop => {
    this.props.updateID(idDrop);
  }

  reset = () => {
    this.props.reset();
  }

  hardReset = () => {
    this.props.hardReset();
  }

  componentDidMount() {
    axios.get('/api/getdata').then(result => this.props.FETCH_DATA(result.data))
    console.log('componentDidMount App.js')
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
    reset: () => dispatch(actions.reset()),
    hardReset: () => dispatch(actions.hardReset()),
    updateID: (idDrop) => dispatch(actions.updateID({ idDrop: idDrop })),
    followRecipe: (name, url, idDrag, idDrop) => dispatch(actions.followRecipe({ name: name, url: url, idDrag: idDrag, idDrop: idDrop })),
    removeDuplicate: () => dispatch(actions.remove_duplicate()),
    FETCH_DATA: (data) => dispatch(actions.FETCH_DATA({ data: data }))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);