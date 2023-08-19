import "./GameItem.css";
import * as React from "react";

class GameItem extends React.Component {
  render() {
    return (
      <div className="GameItem-div">
        <p>{this.props.value.content}</p>
      </div>
    );
  }
}

export default GameItem;
