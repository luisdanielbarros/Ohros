import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Droppable from "./Droppable";
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
import { Truncate } from "../general/Util";
const DragNDrop = ({ Type, contentList }) => {
  //Ordered List
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderedContentList, setOrderedContentList] = useState();
  if (
    contentList !== undefined &&
    contentList.length &&
    orderedContentList === undefined
  ) {
    let tempList = [98];
    for (let i = 0; i < 99; i++) tempList[i] = { contentList: [], Time: i };
    for (let i = 0; i < contentList.length; i++) {
      let Content = contentList[i];
      switch (Type) {
        case "Arc":
          tempList[Content.Realtime].contentList.push({
            Id: Content.arcId,
            Time: Content.Realtime,
            Title: Content.Arcname,
            Summary: Truncate(Content.Summary, 128),
          });
          break;
        case "Act":
          tempList[Content.Realtime].contentList.push({
            Id: Content.actId,
            Time: Content.Realtime,
            Title: Content.Actname,
            Summary: Truncate(Content.Summary, 256),
          });
          break;
        case "Action":
          tempList[Content.Realtime].contentList.push({
            Id: Content.actionId,
            Time: Content.Realtime,
            Title: Content.Actionname,
            Summary: Truncate(Content.Summary, 128),
          });
          break;
        case "Analysis":
          tempList[i].contentList.push({
            Id: Content.actionId,
            Time:
              Content.ArcRealtime +
              " / " +
              Content.ActRealtime +
              " / " +
              Content.ActionRealtime,
            Title: Content.Actionname,
            Summary: Truncate(Content.Summary, 128),
          });
          break;
        default:
          break;
      }
    }
    setOrderedContentList(tempList);
  }
  //Switch Ordered Item
  const switchOrderedItem = (Item, oldTime, newTime) => {
    const formData = new FormData();
    formData.append("access_token", accessToken);
    formData.append("realtime", newTime);
    formData.append("screentime", newTime);
    switch (Type) {
      case "Arc":
        formData.append("action", "updatearctime");
        formData.append("arc_id", Item.Id);
        break;
      case "Act":
        formData.append("action", "updateacttime");
        formData.append("act_id", Item.Id);
        break;
      case "Action":
        formData.append("action", "updateactiontime");
        formData.append("action_id", Item.Id);
        break;
      default:
        break;
    }
    Axios.post("/", formData)
      .then((response) => {
        if (response.status === 200) {
          orderedContentList[oldTime].contentList = orderedContentList[
            oldTime
          ].contentList.filter((Content) => Content.Id !== Item.Id);
          orderedContentList[newTime].contentList.push({
            Id: Item.Id,
            Time: newTime,
            Title: Item.Title,
            Summary: Item.Summary,
          });
          setOrderedContentList(structuredClone(orderedContentList));
        }
      })
      .catch((error) => {
        dispatch(
          notificationActions.add({
            Title: error.response.data.messageTitle,
            Message: error.response.data.message,
            closeButton: "Close",
          })
        );
        switch (error.response.data.messageTitle) {
          case "Project Token Check Failure.":
            dispatch(projAuthActions.close());
            navigate("/projects/list");
            break;
          case "User Token Check Failure.":
            dispatch(projAuthActions.close());
            dispatch(userAuthActions.logout());
            navigate("/users/login");
            break;
          default:
            break;
        }
        console.log(error);
      });
  };
  //Open Ordered Item
  const openOrderedItem = (Item) => {
    switch (Type) {
      case "Arc":
        {
          let formData = new FormData();
          formData.append("action", "viewarc");
          formData.append("access_token", accessToken);
          formData.append("arc_id", Item.Id);
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 200) {
                let responseData = response.data.content;
                dispatch(bookmarkActions.close({}));
                dispatch(actionActions.close({}));
                dispatch(actActions.close({}));
                dispatch(
                  arcActions.open({
                    arcId: responseData.arcId,
                    Arcname: responseData.Arcname,
                    Summary: responseData.Summary,
                    Description: responseData.Description,
                    Time: responseData.Realtime,
                  })
                );
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
        }
        break;
      case "Act":
        {
          let formData = new FormData();
          formData.append("action", "viewact");
          formData.append("access_token", accessToken);
          formData.append("act_id", Item.Id);
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 200) {
                let responseData = response.data.content;
                dispatch(bookmarkActions.close({}));
                dispatch(actionActions.close({}));
                dispatch(
                  actActions.open({
                    actId: responseData.actId,
                    Actname: responseData.Actname,
                    Summary: responseData.Summary,
                    Description: responseData.Description,
                    Time: responseData.Realtime,
                  })
                );
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
        }
        break;
      case "Action":
        {
          let formData = new FormData();
          formData.append("action", "viewaction");
          formData.append("access_token", accessToken);
          formData.append("action_id", Item.Id);
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 200) {
                let responseData = response.data.content;
                dispatch(bookmarkActions.close({}));
                dispatch(
                  actionActions.open({
                    actionId: responseData.actionId,
                    Actionname: responseData.Actionname,
                    Summary: responseData.Summary,
                    Description: responseData.Description,
                    Time: responseData.Realtime,
                    Bookmarks: responseData.Bookmarks,
                    WBs: responseData.WBs,
                    Arguments: responseData.Arguments,
                  })
                );
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
        }
        break;
      default:
        break;
    }
  };
  const JSXOrderedContentList = () => {
    let i = 0;
    if (orderedContentList === undefined) return <></>;
    return orderedContentList.map((orderedContent) => (
      <Droppable
        key={i++}
        Type={Type}
        contentList={orderedContent}
        onDrop={switchOrderedItem}
        onOpen={openOrderedItem}
      />
    ));
  };
  return (
    <>
      <div className="dnd-container">{JSXOrderedContentList()}</div>
    </>
  );
};
export default DragNDrop;
