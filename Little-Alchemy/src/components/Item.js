import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { Button } from 'reactstrap';
import './Item.css';
import ChangeItem from './changeElements'
const itemSource = {
  //trước khi kéo
  beginDrag(props) {
    return props.item;
  },
  //kết thúc kéo
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    return props.ChangeItems(props.item.id);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Item extends Component {
  render() {
    const { isDragging, connectDragSource, name, url, deleteItems } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div className='Total' style={{ opacity }} >
        <img alt='Item-img' src={url} />
        <h3>{name}</h3>
        <div>
          <Button className='btn-items' outline color="danger" onClick={deleteItems}>
            Delete
          </Button>{' '}
          <ChangeItem className='btn-items' idItem={this.props.item.id} />
        </div>
      </div>
    );
  }
}

export default DragSource('item', itemSource, collect)(Item);
