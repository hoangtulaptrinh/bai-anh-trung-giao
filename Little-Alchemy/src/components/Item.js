import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import './Item.css';

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
    const { isDragging, connectDragSource, name, url } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div className='Total' style={{ opacity }} >
        <img alt='Item-img' src={url} />
        <h3>{name}</h3>
      </div>
    );
  }
}

export default DragSource('item', itemSource, collect)(Item);
