import React from "react";
import "./index.css";

// self-note: react can be made easier by working backwards
// do what the CRUD function should do, then settle how to target the necessary
// then the render

export default class App extends React.Component {
  state = {
    users: [
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Jon Snow",
        email: "jonsnow@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Ned Stark",
        email: "nedstark@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Frodo Baggins",
        email: "frodo@bagend.com"
      }
    ],
    newUserName:"",
    newUserEmail:"",
    userBeingModified:'',
    userNameBeingModified:'',
    userEmailBeingModified:''
  };

  render() {
    const {userBeingModified, userNameBeingModified, userEmailBeingModified}=this.state

    return (
      <div className="App">
        {this.state.users.map((user) => 
            userBeingModified !== user.name? this.displayNormal(user) : this.displayUpdateModule(user)
        )}
        <br/>
        {this.renderAddUser()}
      </div>
    );
  }

  renderAddUser() {
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="User name"
          value={this.state.newUserName}
          onChange={this.updateFormField}
          name="newUserName"/>
        <input
          type="text"
          placeholder="User email"
          value={this.state.newUserEmail}
          onChange={this.updateFormField}
          name="newUserEmail"/>
        <button onClick={this.addUser}>Add</button>
      </React.Fragment>
    );
  }

  updateFormField = (event) => {
      this.setState({
        [event.target.name]:event.target.value
      })
  }

  addUser = () => {
    const newUser = 
      { _id: Math.floor(Math.random() * 10000),
        name: this.state.newUserName,
        email: this.state.newUserEmail
      }
    let clone = this.state.users.slice();

    clone.push(newUser);   

    this.setState({
       users:clone,
       newUserName:'',
       newUserEmail:'',
    })
  };

  deleteUser = (userId) => {
    const indexToDelete=this.state.users.findIndex(user => user._id === userId);
    const left=this.state.users.slice(0,indexToDelete);
    const right=this.state.users.slice(indexToDelete+1);
    const modifiedData= [...left,...right]
    this.setState({
      users:modifiedData
    })
  };
  
  displayNormal = (user) => {
      return(
          <React.Fragment key={user._id}>
          <div class="box">
            <h3>{user.name}</h3>
            <h4>{user.email}</h4>
            <button
              onClick={async() => {
                this.setState({
                  userBeingModified:user.name,
                  userNameBeingModified:user.name,
                  userEmailBeingModified:user.email
                });
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                this.deleteUser(user._id);
              }}
            >
              Delete
            </button>
          </div>
        </React.Fragment>
      )
  }

  displayUpdateModule = (user) => {
    return(
      <React.Fragment key={user._id}>
      <div class="box">
        <input  type="text"
                name="userNameBeingModified"
                value={this.state.userNameBeingModified}
                placeholder="Update Name"
                onChange={this.updateFormField}
        />
        <br/>
        <input  type="text"
                name="userEmailBeingModified"
                value={this.state.userEmailBeingModified}
                placeholder="Update email"
                onChange={this.updateFormField}
        />
        <button onClick={() => {
            this.beginEdit(user._id);
          }}
        >
          Update
        </button>
      </div>
    </React.Fragment>
  )
  }

  beginEdit = (userId) => {
    
    const indexToChange=this.state.users.findIndex(user => user._id === userId);
    const userToChange=this.state.users[indexToChange];
    const left=this.state.users.slice(0,indexToChange);
    const right=this.state.users.slice(indexToChange+1);
    userToChange.name=this.state.userNameBeingModified;
    userToChange.email=this.state.userEmailBeingModified;
    const modifiedUsers = [...left,userToChange,...right];
    
    this.setState({
      users: modifiedUsers,
      userBeingModified:'',
      userNameBeingModified:'',
      userEmailBeingModified:''
    })  
  };
}


// Important learning: userNameBeingModified and userEmailBeingModified was previously used in the normal display trigger instead of userBeingModified, this is shared with the updating functions - The thing is when state change with the onChange updateFormField, this will lead to a re-render everytime state changes, so it will render the normal display again without allowing the changes to update for the userName and userEmail.

