
import React, { Component } from 'react'

class Like extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clicks: 0
    }
  };

  handleClike = () => {
    this.setState({
      clicks: this.state.clicks + 1
    })
  }

  render () {
    return (
        <div>
          whatwhatwhatwhat
        <span onClick={this.handleClike}>
         <LikeFilled/>
          {/* {createElement(action === 'liked' ? LikeFilled : LikeOutlined)} */}
          <span onClick={this.handleClike} className="comment-action">{this.state.clicks}</span>
        </span>
        </div>
    )
  }
}
