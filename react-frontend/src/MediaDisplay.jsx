import React from 'react'

function MediaDisplay(props) {

  function destructure(){
    const { name } = props.name;
    const { contentType } = props.content_type;
    return (
      <div>
        {name}
        {contentType}
      </div>
    )
  }

  return (
    <div>
      {destructure}
    </div>
  );
}

export default MediaDisplay
