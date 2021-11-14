import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { serverURI } from "./config";
import { UserContext } from "./context";
import { Row, Col, Card, Button } from "react-bootstrap";
import Folder from "./Folder";

export default function Dashboard() {
  const status = useRef("");
  const [content, setContent] = useState([]);
  const [folderView, setFolderView] = useState(null);
  const [addFolder, setAddFolder] = useState(0);
  const { authorization, isLogged } = useContext(UserContext);
  useEffect(() => {
    if (!isLogged) {
      status.current.innerHTML = "<h1>Welcome! Sign in to view your data!</h1>";
      return;
    }
    if (folderView === null) {
      axios
        .get(serverURI + "/", { headers: { authorization } })
        .then((response) => {
          if (response.data.folders.length === 0) {
            status.current.textContent =
              "You have no folders in your drive. Create new folder.";
          } else {
            status.current.textContent = "";
          }
          setContent(response.data.folders);
        })
        .catch((err) => {
          status.current.textContent =
            "Unable to retrieve data from the server!";
          console.log(err);
        });
    }
  }, [authorization, isLogged, addFolder, folderView]);

  const createNewFolder = () => {
    let folderName = prompt("Enter new folder name: ", "");
    if (folderName) {
      axios
        .post(
          serverURI + "/createNewFolder",
          { folderName },
          { headers: { authorization } }
        )
        .then((resp) => {
          setAddFolder(addFolder + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {folderView ? (
        <Folder
          folderName={folderView.folderName}
          files={folderView.files}
          showFolders={() => setFolderView(null)}
        />
      ) : (
        <>
          <p ref={status}></p>
          {isLogged ? (
            <Button onClick={createNewFolder}>Create New Folder</Button>
          ) : (
            <></>
          )}

          <hr />
          <Row>
            {content.map((val, index) => {
              return (
                <Col xs={12} md={4} key={index}>
                  <Card>
                    <Card.Header>{val.folderName.toUpperCase()}</Card.Header>
                    <Card.Body>
                      <Button
                        onClick={() => {
                          setFolderView(val);
                        }}
                      >
                        View Folder
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </div>
  );
}
