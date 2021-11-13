import { serverURI } from "./config";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./context";
import { useDropzone } from "react-dropzone";

export default function Folder(props) {
  const { authorization } = useContext(UserContext);
  const [files, setFiles] = useState(props.files);

  const downloadFile = (folderName, fileName, uid) => {
    axios
      .get(serverURI + "/download", {
        params: { folderName, fileName, uid },
        headers: { authorization },
      })
      .then((response) => {
        const a = document.createElement("a");
        const file = new Blob([response.data], {
          type: "application/octet-stream",
        });

        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();

        URL.revokeObjectURL(a.href);
        // const blob = new Blob([response.data], {
        //   type: "application/octet-stream",
        // });

        // saveAs(blob, fileName);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const uploadFile = (newfiles) => {
    const headers = { authorization };
    const selectedFile = newfiles[0];
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("fileName", selectedFile.name);
    data.append("folderName", props.folderName);
    axios
      .post(serverURI + "/upload", data, { headers })
      .then((response) => {
        const index = response.data.updatedUser.folders.findIndex((elem) => {
          return elem.folderName === props.folderName;
        });
        setFiles(response.data.updatedUser.folders[index].files);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDrop = (newfiles) => {
    uploadFile(newfiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  const deleteFile = (folderName, uid) => {
    const data = { folderName, uid };
    axios
      .post(serverURI + "/deleteFile", data, { headers: { authorization } })
      .then((response) => {
        const index = response.data.updatedUser.folders.findIndex((elem) => {
          return elem.folderName === props.folderName;
        });
        setFiles(response.data.updatedUser.folders[index].files);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Row>
        <Col xs={12} lg={4}>
          <h1>Folder: {props.folderName}</h1>
        </Col>
        <Col xs={12} lg={4}>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          {/* <Form.Group controlId="formFile" className="mb-3">
            <Form.Label htmlFor="">
              <b>Upload new file</b>
            </Form.Label>
            <Form.Control type="file" onChange={uploadFile} />
          </Form.Group> */}
        </Col>
        <Col xs={12} lg={4}>
          <Button onClick={props.showFolders}>Show All Folders</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <hr />
        </Col>
        {files.map((file, key) => {
          return (
            <Col xs={4} key={key}>
              <Card>
                <Card.Header>{file.fileName.toUpperCase()}</Card.Header>
                <Card.Body>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      downloadFile(props.folderName, file.fileName, file.uid);
                    }}
                  >
                    Download File
                  </Button>

                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      deleteFile(props.folderName, file.uid);
                    }}
                  >
                    Delete File
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row></Row>
    </>
  );
}
