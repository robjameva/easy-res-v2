import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


class Upload extends React.Component {
  processFile = async e => {
    var file = e.target.files[0];
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", "easy-res-v2");
    // formdata.append("upload_preset", "my-preset");

    let res = await fetch(
      "https://api.cloudinary.com/v1_1/shirly/auto/upload",
      {
        method: "post",
        mode: "cors",
        body: formdata
      }
    );

    let json = await res.json();
    console.log(JSON.stringify(json.secure_url));
  };

  render() {
    return (
    
      <div>
        <h3 className='upload-btn'>Upload a Picture for Your Restaurant Here!</h3>
        <input type="file" onChange={this.processFile} />
      </div>

    );
  }
}

export default Upload;