import { useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../axios/index";
import { notificationActions } from "../store/notificationSlice";
import { userAuthActions } from "../store/userAuthSlice";
import { projAuthActions } from "../store/projAuthSlice";
import { worldBuildingActions } from "../store/worldBuildingSlice";
import { timelineActions } from "../store/timelineSlice";
import { arcActions } from "../store/arcSlice";
import { actActions } from "../store/actSlice";
import { actionActions } from "../store/actionSlice";
import { bookmarkActions } from "../store/bookmarkSlice";
const EIImport = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  //Phase 0 - Import Files
  const importFiles = () => inputRef.current?.click();
  const processFiles = () => {
    if (!inputRef.current?.files) return;
    const importedFiles = inputRef.current.files;
    //Phase 1 - Order the files
    let importedFilesOrder = [];
    let WBsToImport = [];
    let TimelinesToImport = [];
    let ArcsToImport = [];
    let ActsToImport = [];
    let BookmarksToImport = [];
    let ActionsToImport = [];
    for (let i = 0; i < importedFiles.length; i++) {
      let currentFile = importedFiles[i];
      const fileReader = new FileReader();
      fileReader.readAsText(currentFile, "UTF-8");
      fileReader.onload = (e) => {
        const jsonData = JSON.parse(e.target.result);
        const Structure = jsonData.Structure;
        //Phase 1 - Stack the files into separate piles, each one to be sorted individually alphabetically
        if (
          Structure === "Character" ||
          Structure === "Location" ||
          Structure === "Object" ||
          Structure === "Metaphysic"
        )
          WBsToImport.push({ id: i, title: jsonData.Title });
        else if (Structure === "Timeline")
          TimelinesToImport.push({ id: i, title: jsonData.Title });
        else if (Structure === "Arc")
          ArcsToImport.push({ id: i, title: jsonData.Title });
        else if (Structure === "Act")
          ActsToImport.push({ id: i, title: jsonData.Title });
        else if (Structure === "Bookmark")
          BookmarksToImport.push({ id: i, title: jsonData.Title });
        else if (Structure === "Action")
          ActionsToImport.push({ id: i, title: jsonData.Title });
        //Phase 2
        if (i === importedFiles.length - 1) {
          //Phase 2 -> Sort files alphabetically
          WBsToImport.sort((a, b) => a.title > b.title);
          TimelinesToImport.sort((a, b) => a.title > b.title);
          ArcsToImport.sort((a, b) => a.title > b.title);
          ActsToImport.sort((a, b) => a.title > b.title);
          BookmarksToImport.sort((a, b) => a.title > b.title);
          ActionsToImport.sort((a, b) => a.title > b.title);
          //Phase 2 -> Concat file data
          importedFilesOrder = importedFilesOrder.concat(
            WBsToImport,
            TimelinesToImport,
            ArcsToImport,
            ActsToImport,
            BookmarksToImport,
            ActionsToImport
          );
          WBsToImport = [];
          TimelinesToImport = [];
          ArcsToImport = [];
          ActsToImport = [];
          BookmarksToImport = [];
          ActionsToImport = [];
          //Phase 3 -> Process the files
          let i = -1;
          const processFiles = async () => {
            i++;
            if (i === importedFiles.length) {
              dispatch(
                notificationActions.add({
                  Title: "Import",
                  Message: "Import has successfully finished.",
                  closeButton: "Close",
                })
              );
              return;
            }
            const fileReader2 = new FileReader();
            fileReader2.readAsText(
              importedFiles[importedFilesOrder[i].id],
              "UTF-8"
            );
            fileReader2.onload = async (e) => {
              const jsonData = JSON.parse(e.target.result);
              switch (jsonData.Structure) {
                case "Character":
                case "Location":
                case "Object":
                case "Metaphysic":
                  createWB(jsonData.Structure, jsonData).then(() => {
                    processFiles();
                  });
                  break;
                case "Timeline":
                case "Arc":
                case "Act":
                case "Action":
                  createTime(jsonData.Structure, jsonData).then(() => {
                    processFiles();
                  });
                  break;
                case "Bookmark":
                  createBookmark(jsonData.Structure, jsonData).then(() => {
                    processFiles();
                  });
                default:
                  break;
              }
            };
          };
          processFiles();
        }
      };
    }
  };
  //Create WB
  const createWB = (Type, jsonData) => {
    return new Promise((resolve) => {
      let formData = new FormData();
      //General
      formData.append("access_token", accessToken);
      formData.append("concept", jsonData.Concept);
      formData.append("reasonofconcept", jsonData.reasonOfConcept);
      formData.append("wbname", jsonData.Title);
      formData.append("summary", jsonData.Summary);
      formData.append("description", jsonData.Description);
      formData.append("cause", jsonData.Cause);
      formData.append("purpose", jsonData.Purpose);
      formData.append("myth", jsonData.Myth);
      //Character
      if (Type === "Character") {
        formData.append("action", "createcharacter");
        formData.append("oceanmodel", jsonData.oceanModel);
        formData.append("jungmodel", jsonData.jungModel);
        formData.append("ego", jsonData.Ego);
        formData.append("complexes", jsonData.Complexes);
        formData.append("persona", jsonData.Persona);
        formData.append("anima", jsonData.Anima);
        formData.append("shadow", jsonData.Shadow);
        formData.append("self", jsonData.Self);
        formData.append("psychicquirks", jsonData.psychicQuirks);
        formData.append("physicquirks", jsonData.physicQuirks);
      }
      //Location
      else if (Type === "Location") formData.append("action", "createlocation");
      //Object
      else if (Type === "Object") formData.append("action", "createobject");
      //Metaphysic
      else if (Type === "Metaphysic")
        formData.append("action", "createmetaphysic");
      //Axios
      Axios.post("/", formData)
        .then((response) => {
          if (response.status === 201) {
            console.log(
              `${jsonData.Structure} ${jsonData.Title} was successfully imported.`
            );
            resolve(true);
          }
        })
        .catch((error) => {
          switch (error.response.data.messageTitle) {
            case "Project Token Check Failure.":
              dispatch(bookmarkActions.close({}));
              dispatch(actionActions.close({}));
              dispatch(actActions.close({}));
              dispatch(arcActions.close({}));
              dispatch(timelineActions.close({}));
              dispatch(worldBuildingActions.close({}));
              dispatch(projAuthActions.close());
              navigate("/projects/list");
              break;
            case "User Token Check Failure.":
              dispatch(bookmarkActions.close({}));
              dispatch(actionActions.close({}));
              dispatch(actActions.close({}));
              dispatch(arcActions.close({}));
              dispatch(timelineActions.close({}));
              dispatch(worldBuildingActions.close({}));
              dispatch(projAuthActions.close());
              dispatch(userAuthActions.logout());
              navigate("/users/login");
              break;
            default:
              dispatch(
                notificationActions.add({
                  Title: error.response.data.messageTitle,
                  Message: error.response.data.message,
                  closeButton: "Close",
                })
              );
              break;
          }
          console.log(error);
          resolve(false);
        });
    });
  };
  //Create Time
  const createTime = (Type, jsonData) => {
    return new Promise((resolve) => {
      let formData = new FormData();
      //General
      formData.append("access_token", accessToken);
      formData.append("summary", jsonData.Summary);
      formData.append("description", jsonData.Description);
      //Timeline
      if (Type === "Timeline") {
        formData.append("action", "createtimeline");
        formData.append("timename", jsonData.Title);
        //Axios
        Axios.post("/", formData)
          .then((response) => {
            if (response.status === 201) {
              console.log(
                `${jsonData.Structure} ${jsonData.Title} was successfully imported.`
              );
              resolve(true);
            }
          })
          .catch((error) => {
            switch (error.response.data.messageTitle) {
              case "Project Token Check Failure.":
                dispatch(bookmarkActions.close({}));
                dispatch(actionActions.close({}));
                dispatch(actActions.close({}));
                dispatch(arcActions.close({}));
                dispatch(timelineActions.close({}));
                dispatch(worldBuildingActions.close({}));
                dispatch(projAuthActions.close());
                navigate("/projects/list");
                break;
              case "User Token Check Failure.":
                dispatch(bookmarkActions.close({}));
                dispatch(actionActions.close({}));
                dispatch(actActions.close({}));
                dispatch(arcActions.close({}));
                dispatch(timelineActions.close({}));
                dispatch(worldBuildingActions.close({}));
                dispatch(projAuthActions.close());
                dispatch(userAuthActions.logout());
                navigate("/users/login");
                break;
              default:
                dispatch(
                  notificationActions.add({
                    Title: error.response.data.messageTitle,
                    Message: error.response.data.message,
                    closeButton: "Close",
                  })
                );
                break;
            }
            console.log(error);
            resolve(false);
          });
        //Arc
      } else if (Type === "Arc") {
        formData.append("action", "createarc");
        formData.append("arcname", jsonData.Title);
        formData.append("realtime", jsonData.arcTime);
        formData.append("screentime", jsonData.arcTime);
        getStructuresIdByName("Timeline", jsonData.Timeline).then(
          (timelineId) => {
            formData.append("timeline_id", timelineId);
            //Axios
            Axios.post("/", formData)
              .then((response) => {
                if (response.status === 201) {
                  console.log(
                    `${jsonData.Structure} ${jsonData.Title} was successfully imported.`
                  );
                  resolve(true);
                }
              })
              .catch((error) => {
                switch (error.response.data.messageTitle) {
                  case "Project Token Check Failure.":
                    dispatch(bookmarkActions.close({}));
                    dispatch(actionActions.close({}));
                    dispatch(actActions.close({}));
                    dispatch(arcActions.close({}));
                    dispatch(timelineActions.close({}));
                    dispatch(worldBuildingActions.close({}));
                    dispatch(projAuthActions.close());
                    navigate("/projects/list");
                    break;
                  case "User Token Check Failure.":
                    dispatch(bookmarkActions.close({}));
                    dispatch(actionActions.close({}));
                    dispatch(actActions.close({}));
                    dispatch(arcActions.close({}));
                    dispatch(timelineActions.close({}));
                    dispatch(worldBuildingActions.close({}));
                    dispatch(projAuthActions.close());
                    dispatch(userAuthActions.logout());
                    navigate("/users/login");
                    break;
                  default:
                    dispatch(
                      notificationActions.add({
                        Title: error.response.data.messageTitle,
                        Message: error.response.data.message,
                        closeButton: "Close",
                      })
                    );
                    break;
                }
                console.log(error);
                resolve(false);
              });
          }
        );
        //Act
      } else if (Type === "Act") {
        formData.append("action", "createact");
        formData.append("actname", jsonData.Title);
        formData.append("realtime", jsonData.actTime);
        formData.append("screentime", jsonData.actTime);
        getStructuresIdByName("Arc", jsonData.Arc).then((arcId) => {
          formData.append("arc_id", arcId);
          //Axios
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 201) {
                console.log(
                  `${jsonData.Structure} ${jsonData.Title} was successfully imported.`
                );
                resolve(true);
              }
            })
            .catch((error) => {
              switch (error.response.data.messageTitle) {
                case "Project Token Check Failure.":
                  dispatch(bookmarkActions.close({}));
                  dispatch(actionActions.close({}));
                  dispatch(actActions.close({}));
                  dispatch(arcActions.close({}));
                  dispatch(timelineActions.close({}));
                  dispatch(worldBuildingActions.close({}));
                  dispatch(projAuthActions.close());
                  navigate("/projects/list");
                  break;
                case "User Token Check Failure.":
                  dispatch(bookmarkActions.close({}));
                  dispatch(actionActions.close({}));
                  dispatch(actActions.close({}));
                  dispatch(arcActions.close({}));
                  dispatch(timelineActions.close({}));
                  dispatch(worldBuildingActions.close({}));
                  dispatch(projAuthActions.close());
                  dispatch(userAuthActions.logout());
                  navigate("/users/login");
                  break;
                default:
                  dispatch(
                    notificationActions.add({
                      Title: error.response.data.messageTitle,
                      Message: error.response.data.message,
                      closeButton: "Close",
                    })
                  );
                  break;
              }
              console.log(error);
              resolve(false);
            });
        });
        //Action
      } else if (Type === "Action") {
        formData.append("action", "createaction");
        formData.append("actionname", jsonData.Title);
        formData.append("realtime", jsonData.actionTime);
        formData.append("screentime", jsonData.actionTime);
        //Act Id
        getStructuresIdByName("Act", jsonData.Act).then((actId) => {
          formData.append("act_id", actId);
          //WBs Ids
          getStructuresIdByName("WB", jsonData.WBs).then((wbsIds) => {
            formData.append("wbs_ids", wbsIds);
            //Arguments Ids
            getStructuresIdByName("Argument", jsonData.Arguments).then(
              (argumentsIds) => {
                formData.append("arguments_ids", argumentsIds);
                //Bookmarks Ids
                getStructuresIdByName("Bookmark", jsonData.Bookmarks).then(
                  (bookmarksIds) => {
                    formData.append("bookmarks_ids", bookmarksIds);
                    //Axios
                    Axios.post("/", formData)
                      .then((response) => {
                        if (response.status === 201) {
                          console.log(
                            `${jsonData.Structure} ${jsonData.Title} was successfully imported.`
                          );
                          resolve(true);
                        }
                      })
                      .catch((error) => {
                        switch (error.response.data.messageTitle) {
                          case "Project Token Check Failure.":
                            dispatch(bookmarkActions.close({}));
                            dispatch(actionActions.close({}));
                            dispatch(actActions.close({}));
                            dispatch(arcActions.close({}));
                            dispatch(timelineActions.close({}));
                            dispatch(worldBuildingActions.close({}));
                            dispatch(projAuthActions.close());
                            navigate("/projects/list");
                            break;
                          case "User Token Check Failure.":
                            dispatch(bookmarkActions.close({}));
                            dispatch(actionActions.close({}));
                            dispatch(actActions.close({}));
                            dispatch(arcActions.close({}));
                            dispatch(timelineActions.close({}));
                            dispatch(worldBuildingActions.close({}));
                            dispatch(projAuthActions.close());
                            dispatch(userAuthActions.logout());
                            navigate("/users/login");
                            break;
                          default:
                            dispatch(
                              notificationActions.add({
                                Title: error.response.data.messageTitle,
                                Message: error.response.data.message,
                                closeButton: "Close",
                              })
                            );
                            break;
                        }
                        console.log(error);
                        resolve(false);
                      });
                  }
                );
              }
            );
          });
        });
      }
    });
  };
  //Create Bookmark
  const createBookmark = (Type, jsonData) => {
    return new Promise((resolve) => {
      let formData = new FormData();
      formData.append("action", "createbookmark");
      formData.append("access_token", accessToken);
      formData.append("bookmarkname", jsonData.Title);
      formData.append("summary", jsonData.Summary);
      formData.append("description", jsonData.Description);
      //Axios
      Axios.post("/", formData)
        .then((response) => {
          if (response.status === 201) {
            console.log(
              `${jsonData.Structure} ${jsonData.Title} was successfully imported.`
            );
            resolve(true);
          }
        })
        .catch((error) => {
          switch (error.response.data.messageTitle) {
            case "Project Token Check Failure.":
              dispatch(bookmarkActions.close({}));
              dispatch(actionActions.close({}));
              dispatch(actActions.close({}));
              dispatch(arcActions.close({}));
              dispatch(timelineActions.close({}));
              dispatch(worldBuildingActions.close({}));
              dispatch(projAuthActions.close());
              navigate("/projects/list");
              break;
            case "User Token Check Failure.":
              dispatch(bookmarkActions.close({}));
              dispatch(actionActions.close({}));
              dispatch(actActions.close({}));
              dispatch(arcActions.close({}));
              dispatch(timelineActions.close({}));
              dispatch(worldBuildingActions.close({}));
              dispatch(projAuthActions.close());
              dispatch(userAuthActions.logout());
              navigate("/users/login");
              break;
            default:
              dispatch(
                notificationActions.add({
                  Title: error.response.data.messageTitle,
                  Message: error.response.data.message,
                  closeButton: "Close",
                })
              );
              break;
          }
          console.log(error);
          resolve(false);
        });
    });
  };
  //Get Structure's Id by Name
  const getStructuresIdByName = async (Structure, Name) => {
    let formData = new FormData();
    //General
    formData.append("access_token", accessToken);
    //Timeline
    if (Structure === "Timeline") {
      formData.append("action", "gettimelineidbyname");
      formData.append("timename", Name);
      //Arc
    } else if (Structure === "Arc") {
      formData.append("action", "getarcidbyname");
      formData.append("arcname", Name);
      //Act
    } else if (Structure === "Act") {
      formData.append("action", "getactidbyname");
      formData.append("actname", Name);
      //Action
    } else if (Structure === "Action") {
      formData.append("action", "getactionidbyname");
      formData.append("actionname", Name);
      //WB
    } else if (Structure === "WB") {
      formData.append("action", "getwbidbyname");
      formData.append("wbname", Name);
    } //Bookmark
    else if (Structure === "Bookmark") {
      formData.append("action", "getbookmarkidbyname");
      formData.append("bookmarkname", Name);
    }
    //Argument
    else if (Structure === "Argument") {
      formData.append("action", "getargumentidbyname");
      formData.append("argumentname", Name);
    }
    return await Axios.post("/", formData)
      .then((response) => {
        if (response.status === 200) {
          //Timeline
          if (Structure === "Timeline") return response.data.content.timelineId;
          //Arc
          else if (Structure === "Arc") return response.data.content.arcId;
          //Act
          else if (Structure === "Act") return response.data.content.actId;
          //Action
          else if (Structure === "Action")
            return response.data.content.actionId;
          //WB
          else if (Structure === "WB") return response.data.content;
          //Bookmark
          else if (Structure === "Bookmark") return response.data.content;
          //Argument
        }
      })
      .catch((error) => {
        switch (error.response.data.messageTitle) {
          case "Project Token Check Failure.":
            dispatch(bookmarkActions.close({}));
            dispatch(actionActions.close({}));
            dispatch(actActions.close({}));
            dispatch(arcActions.close({}));
            dispatch(timelineActions.close({}));
            dispatch(worldBuildingActions.close({}));
            dispatch(projAuthActions.close());
            navigate("/projects/list");
            break;
          case "User Token Check Failure.":
            dispatch(bookmarkActions.close({}));
            dispatch(actionActions.close({}));
            dispatch(actActions.close({}));
            dispatch(arcActions.close({}));
            dispatch(timelineActions.close({}));
            dispatch(worldBuildingActions.close({}));
            dispatch(projAuthActions.close());
            dispatch(userAuthActions.logout());
            navigate("/users/login");
            break;
          default:
            dispatch(
              notificationActions.add({
                Title: error.response.data.messageTitle,
                Message: error.response.data.message,
                closeButton: "Close",
              })
            );
            break;
        }
        console.log(error);
      });
  };
  return (
    <Row className="ei-import">
      <Col md="12" className="ei-import-all">
        {/*Import Info*/}
        <div>
          <h2>Quick Guide</h2>
          <h6>Exportation</h6>
          <p>
            <b>
              You can export a data structure in its respective sub-module,
              below the insertion and update tools there is also an exportation
              tool!
            </b>
          </p>
          <h6>Naming Rules</h6>
          <p>
            <b>
              Make sure objects of the same structure have different names to
              avoid relational collisions when importing.
            </b>
          </p>
          <p>
            Per example while you shouldn't worry about having an action and an
            act named the same, avoid having two actions with the exact same
            name, or two arcs with the exact same name.
          </p>
          <p>
            <small>
              Relational collisions are when an action is linked to the wrong
              bookmark, or an act to the wrong arc (it happens because the JSON
              file doesn't store ids, the closer it stores is the object's
              title. It was intentionally made so to make JSON files easier to
              edit by hand [no need to catalogue ids were you in need of editing
              relations!]).
            </small>
          </p>
          <h6>Importation Order</h6>
          <p>
            Make sure to import your story files in the following order to avoid
            loss of relational information:
          </p>
          <ul>
            <li>1. World-Building Ideas</li>
            <li>2. Timelines</li>
            <li>3. Arcs</li>
            <li>4. Acts</li>
            <li>5. Bookmarks</li>
            <li>6. Actions</li>
          </ul>
          <h6>Have Fun!</h6>
          <p>
            If you have any questions regarding the importation process please
            contact us at OhrosTeam@gmail.com!
          </p>
        </div>
        {/*Import Form*/}
        <Form>
          <h2>Import from File(s)</h2>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Multiple files input example</Form.Label>
            <Form.Control type="file" multiple ref={inputRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="light" onClick={() => importFiles()}>
              Import Files
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="light" onClick={() => processFiles()}>
              Proccess Imported Files
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
export default EIImport;
