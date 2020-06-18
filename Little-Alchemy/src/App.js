import React, { Component } from "react";
import { MessageCircle, Send } from "react-feather";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Input,
} from "reactstrap";

import * as actions from "./actions/index";
import CreateNewItems from "./components/createElements";
import * as callApi from "./axios/axios";
import "./App.css";
import Target from "./components/Target";
import Item from "./components/Item";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      listMessenger: [],
      popoverOpen: false,
    };
  }
  ChangeItems = (idDrag) => {
    var idDrop = this.props.IdDrop;
    var objChange = {
      nameItemDrag: this.props.Arr.Items[idDrag].name,
      nameItemDrop: this.props.Arr.Target[idDrop].name,
      idDrop: idDrop,
      idDrag: idDrag,
    };
    callApi
      .Params("/api/get_new_item", "get", objChange)
      .then((response) => this.props.FETCH_DATA(response.data));
  };

  deleteItems = (idDrag, nameDrag) => {
    var objDelete = {
      id: idDrag,
      name: nameDrag,
    };

    callApi
      .Params("/api/change/delete", "delete", objDelete)
      .then((response) => this.props.FETCH_DATA(response.data));
  };
  updateIdDrop = (idDrop) => {
    this.props.updateID(idDrop);
  };

  reset = () => {
    callApi
      .Params("/api/change/reset", "get", null)
      .then((response) => this.props.FETCH_DATA(response.data));
  };

  hardReset = () => {
    callApi
      .Params("/api/change/hardreset", "get", null)
      .then((response) => this.props.FETCH_DATA(response.data));
  };

  socket = socketIOClient("http://localhost:5000/");

  componentDidMount() {
    this.socket.on("Sever-send-data", (data) => {
      this.setState({
        listMessenger: [...this.state.listMessenger, data],
      });
    });
    callApi
      .Params("/api/getdata", "get", null)
      .then((response) => this.props.FETCH_DATA(response.data));
  }

  render() {
    const { inputValue, listMessenger, popoverOpen } = this.state;
    const { Arr } = this.props;
    const toggle = () =>
      this.setState({
        popoverOpen: !popoverOpen,
      });
    const sendMessenger = () =>
      this.socket.emit("Client-send-data", inputValue);
    return (
      <div className="App">
        <div className="total-target">
          <div className="total-header">
            <MessageCircle
              className="icon-mess"
              id="Popover1"
              size="50"
              color="blue"
            />
            <h2>Drop Below Me</h2>
            <Popover
              placement="bottom"
              isOpen={popoverOpen}
              target="Popover1"
              toggle={toggle}
            >
              <PopoverHeader>Chat Box</PopoverHeader>
              <PopoverBody>
                <div className="content-chat">
                  {!!listMessenger.length &&
                    listMessenger.map((item, index) => (
                      <div
                        className={`messenger ${
                          item.target === "you"
                            ? "your-messenger"
                            : "some-body-messenger"
                        }`}
                        key={index}
                      >
                        <span className="title">
                          {item.target === "you" ? "You" : "Some Body"}
                        </span>
                        <span className="content">{item.messenger}</span>
                      </div>
                    ))}
                </div>
                <div className="input-chat">
                  <Input
                    value={inputValue}
                    onChange={(e) =>
                      this.setState({
                        inputValue: e.target.value,
                      })
                    }
                  />
                  <Send size="35" color="blue" onClick={sendMessenger} />
                </div>
              </PopoverBody>
            </Popover>
          </div>
          <div className="drop-Target">
            <Container id="Container">
              <Row id="row">
                {Arr.Target.map((item, index) => (
                  <Col sm="2" key={index}>
                    <Target
                      item={item}
                      key={index}
                      name={item.name}
                      url={item.url}
                      recipe={item.recipe}
                      updateIdDrop={(id) => this.updateIdDrop(id)}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
          <Button outline color="danger" onClick={() => this.reset()}>
            Clear Screen
          </Button>{" "}
          <Button outline color="danger" onClick={() => this.hardReset()}>
            Study again from the beginning
          </Button>{" "}
        </div>

        <div className="item-container">
          <CreateNewItems />
          {Arr.Items.map((item, index) => (
            <Item
              item={item}
              key={index}
              name={item.name}
              url={item.url}
              ChangeItems={(id) => this.ChangeItems(id)}
              deleteItems={() => this.deleteItems(item.id, item.name)}
            />
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateID: (idDrop) => dispatch(actions.updateID({ idDrop: idDrop })),
    followRecipe: (name, url, idDrag, idDrop) =>
      dispatch(
        actions.followRecipe({
          name: name,
          url: url,
          idDrag: idDrag,
          idDrop: idDrop,
        })
      ),
    FETCH_DATA: (data) => dispatch(actions.FETCH_DATA({ data: data })),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(App);
