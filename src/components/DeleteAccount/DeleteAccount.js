import React, { Component } from "react";
import firebase from "../../firebase";
import classes from "./DeleteAccount.module.sass";

class DeleteAccount extends Component {
  state = {
    modalClass: " "
  };

  removeFirestoreData = () => {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .delete()
      .then(() => {
        firebase
          .firestore()
          .collection("workouts")
          .where("uid", "==", user.uid)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              firebase
                .firestore()
                .collection("workouts")
                .doc(doc.id)
                .delete()
                .then(() => {
                  console.log(
                    "successfuly removed workout number: ",
                    doc.data().workoutNumber
                  );
                })
                .catch(error => {
                  console.log("error removing workout: ", error);
                });
            });
            this.deleteUser();
          })
          .catch(error => {
            console.log("error getting documents: ", error);
          });
      })
      .catch(error => {
        console.log("error removing the user document ", error);
      });
  };

  deleteUser = () => {
    const user = firebase.auth().currentUser;
    user
      .delete()
      .then(() => {
        console.log("succeessfuly removed the user from auth");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  closeModal = () => {
    this.setState({
      modalClass: "animated fadeOutUp fast "
    });
    setTimeout(() => {
      this.props.closeModal();
    }, 700);
  };

  render() {
    return (
      <div className={this.state.modalClass + classes.opacityLayerDiv}>
        <div className={"animated zoomIn faster " + classes.mainModalDiv}>
          <div className={classes.closeIconDiv}>
            <i
              onClick={this.closeModal}
              className={"material-icons " + classes.closeIcon}
            >
              close
            </i>
          </div>
          <div className={classes.bigIconDiv}>
            <i className={"material-icons " + classes.bigIcon}>error_outline</i>
          </div>
          <div className={classes.mainHeaderDiv}>
            <h1 className={classes.mainHeader}>Are you sure?</h1>
          </div>
          <div className={classes.bottomTextDiv}>
            <h5 className={classes.bottomText}>
              Do you really want to delete this account? This process can not be
              undone.
            </h5>
          </div>
          <div className={classes.bottomModalDiv}>
            <div className={classes.cancelButtonDiv}>
              <button
                onClick={this.closeModal}
                className={
                  classes.submitButton +
                  " " +
                  classes.buttonAnimation +
                  " " +
                  classes.cancelButton
                }
              >
                <span className={classes.submitSpan}>Cancel</span>
              </button>
            </div>
            <div className={classes.deleteButtonDiv}>
              <button
                className={
                  classes.submitButton +
                  " " +
                  classes.deleteButton +
                  " " +
                  classes.buttonAnimation
                }
              >
                <span
                  onClick={this.removeFirestoreData}
                  className={classes.submitSpan + " " + classes.deleteSpan}
                >
                  Delete
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteAccount;
