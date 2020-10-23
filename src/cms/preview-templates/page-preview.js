import React from 'react';
import '../style.css';

const PagePreview = ({ entry, widgetFor }) => {
  const body = widgetFor('body');
  const title = entry.getIn(['data', 'title']);

  return (
    <div className="page">
      <h1 className="page__title">{title}</h1>
      <div className="markdown-body">{ body }</div>
    </div>
  );
};

export default PagePreview;
