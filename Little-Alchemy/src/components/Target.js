import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import './Target.css'

import { CardImg, Card } from 'reactstrap';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}

const canDropTheTarget = {

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }
    // khi thả vào component nào thì sẽ lấy đc id của component đó
    return props.updateIdDrop(props.item.id);
  },
}

class Target extends Component {
  render() {
    const { connectDropTarget, hovered, name, url, recipe } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : '';
    return connectDropTarget(
      <div className="Target" >
        <Card className='item' style={{ background: backgroundColor }}>
          <h6>{name}</h6>
          <CardImg src={url} alt="Card image cap" />
          <div className='div-recipe'>
            <h6>{recipe}</h6>
          </div>
        </Card>
        <div className='make-beautiful' />
      </div>
    );
  }
}

export default DropTarget('item', canDropTheTarget, collect)(Target);