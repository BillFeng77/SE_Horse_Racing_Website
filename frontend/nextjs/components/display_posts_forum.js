import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Comment, List, Tooltip } from 'antd';
import React, { Component, createElement, useState } from 'react';

var likes = 3;
var dislikes = 0;
var action = "";


// 尝试用this.state更新likes number 未成功
//////////////////////////////////////////////////////////
// class Like extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       clicks: 0
//     }
//   };
//   handleClike=() => {
//     this.setState({
//       clicks: this.state.clicks + 1
//     });
//   };

//   render(){
//     return (
//       <div>
//         whatwhatwhatwhat
//       <span onClick={this.handleClike}>
//        <LikeFilled/>
//         {/* {createElement(action === 'liked' ? LikeFilled : LikeOutlined)} */}
//         <span onClick={this.handleClike} className="comment-action">{this.state.clicks}</span>
//       </span>
//       </div>
//     )
//   }
// }



// hooks不能用 因为hooks不能被用在循环中，需放在最外层function中
// 以下方法未能更新页面上的likes number
const Actions = () =>{
  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  // const [action, setAction] = useState(null);

  const like = () => {
    likes += 1;
    action = "liked";
    console.log("clicked", likes)  // works
    // setLikes(1);
    // setDislikes(0);
    // setAction('liked');
  };
  const dislike = () => {
    dislikes += 1;
    action = "disliked";
    // setLikes(0);
    // setDislikes(1);
    // setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick= {like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span onClick = {like} className="comment-action">{likes}</span> 
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    // <span key="comment-basic-reply-to">Reply to</span>,
  ];
  return(actions)
};

const data = [
  {
    actions: [Actions()],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title="2016-11-22 11:22:33">
        <span>8 hours ago</span>
      </Tooltip>
    ),
  },
  {
    actions: [Actions()],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title="2016-11-22 10:22:33">
        <span>9 hours ago</span>
      </Tooltip>
    ),
  },
];


const Posts = () => (
  <List
    className="comment-list"
    header={`${data.length} replies`}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <li>
        <Comment
          actions={item.actions}
          author={item.author}
          avatar={item.avatar}
          content={item.content}
          datetime={item.datetime}
        />
      </li>
    )}
  />
);
export default Posts;