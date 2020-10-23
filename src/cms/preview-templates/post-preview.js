import React from 'react';
import '../style.css';

const PostPreview = ({ entry, widgetFor }) => {
  const body = widgetFor('body');
  const title = entry.getIn(['data', 'title']);

  return (
    <div className="post">
      <h1 className="post__title">{title}</h1>
      <div className="markdown-body">{body}</div>
    </div>
  );
};

export default PostPreview;
