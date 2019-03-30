import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import {SidebarRoutes} from "../../api/routes/Routes";
import {UserRoles} from '../../api/collections/Constants';]
import {Session} from 'meteor/session';
import {
  Link
} from 'react-router-dom'

export default class SideBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      path: "/login",
      currentUser:(!!Meteor.user())?Meteor.user():{}
    }
  }
  componentDidMount(){
    this.SideBarTracker = Tracker.autorun(()=> {
      const currentUser=(!!Meteor.user())?Meteor.user():{}
      //console.log('current user :',currentUser);
      this.setState({currentUser:currentUser});
    });
  }
	componentWillUnmount() {
		//this.state.subscription.tasks.stop();
		this.SideBarTracker.stop();
	}
  linkIsActive(path){
    const current = Session.get("sideBar");
    const val =  current && current.indexOf(path)>-1 ? "active" : "inactive";
    //console.log("CURRENT", current, path, val);
    return val;
  }


  renderIfLogin(){
 
    let AddUser=<span></span>;
    let userCanModelAddUser=false;
    const currentUser = this.state.currentUser;
    if (!currentUser || ! currentUser.profile) return false;
    userCanModelAddUser=(currentUser.profile.role === UserRoles.admin.value)
	staffCanAddUser=(currentUser.profile.role === UserRoles.staff.value)
     // ||
     //    currentUser.profile.role === UserRoles.manager.value);
    if (userCanModelAddUser){
      AddUser=(
        [
        <li key="key1" className="dropdown">
          <a data-toggle="collapse" href="#settings">
            <i className="fa fa-cog "></i>
            <p>Settings <span className="caret"></span></p>
          </a>
          <div className="collapse" id="settings">
            <ul className="nav">
              <li key="key2" className={this.linkIsActive("/managesensors")}>
                <Link to="/managesensors">
                  <i className="fa fa-plus fa-fw"></i> Manage Heartbeat Sensors
                </Link>
              </li>

            </ul>
          </div>
        </li>,
      <li key="key3" className="dropdown">
        <a data-toggle="collapse" href="#addUser">
          <i className="fa fa-list fa-users "></i>
          <p>Add Users <span className="caret"></span></p>
        </a>
        <div className="collapse" id="addUser">
          <ul className="nav">
            <li key="key4" className={this.linkIsActive("/addpatient")}>
              <Link to="/addpatient">
                <i className="fa fa-plus fa-fw"></i> Add patient
              </Link>
            </li>
            <li key="key5" className={this.linkIsActive("/addcontact")}>
              <Link to="/addcontact">
                <i className="fa fa-plus fa-fw"></i> Add Patient Contact
              </Link>
            </li>
            <li key="key6" className={this.linkIsActive("/adddoctor")}>
              <Link to="/adddoctor">
                <i className="fa fa-plus fa-fw"></i> Add doctor
              </Link>
            </li>
            <li key="key7" className={this.linkIsActive("/addstaff")}>
              <Link to="/addstaff">
                <i className="fa fa-plus fa-fw"></i> Add staff
              </Link>
            </li>
          </ul>
        </div>
      </li>
    ]
    );
    }
	else if(staffCanAddUser){
		 AddUser=(
        [
        <li key="key1" className="dropdown">
          <a data-toggle="collapse" href="#settings">
            <i className="fa fa-cog "></i>
            <p>Settings <span className="caret"></span></p>
          </a>
          <div className="collapse" id="settings">
            <ul className="nav">
              <li key="key2" className={this.linkIsActive("/managesensors")}>
                <Link to="/managesensors">
                  <i className="fa fa-plus fa-fw"></i> Manage Heartbeat Sensors
                </Link>
              </li>

            </ul>
          </div>
        </li>,
      <li key="key3" className="dropdown">
        <a data-toggle="collapse" href="#addUser">
          <i className="fa fa-list fa-users "></i>
          <p>Add Users <span className="caret"></span></p>
        </a>
        <div className="collapse" id="addUser">
          <ul className="nav">
            <li key="key4" className={this.linkIsActive("/addpatient")}>
              <Link to="/addpatient">
                <i className="fa fa-plus fa-fw"></i> Add patient
              </Link>
            </li>
            <li key="key5" className={this.linkIsActive("/addcontact")}>
              <Link to="/addcontact">
                <i className="fa fa-plus fa-fw"></i> Add Patient Contact
              </Link>
            </li>
          </ul>
        </div>
      </li>
    ]
    );
	}
    if (this.state.currentUser){
      return (
      <ul className="nav">

        {Object.values(SidebarRoutes).map((sideBarRoute) =>
          <li  className={this.linkIsActive(sideBarRoute.path)} key={sideBarRoute.path}  data-active-color="purple">
            <Link to={sideBarRoute.path}>
              <i className={"fa fa-"+sideBarRoute.icon}></i>
              <p>{sideBarRoute.label}</p>
            </Link>
          </li>

        )}
        {AddUser}
      </ul>
    )
    }
    else {
      return;
    }
  }
  render(){
    return (
      <div className="sidebar" data-active-color="green" data-background-color="white" >

		<div className="logo">

      <a href="#" className="simple-text logo-mini">
                          <img alt="Brand" src="/favicon_300.png" height="30"/>
                      </a>
    <a href="" className="simple-text logo-normal">

				Smart Health Care
			</a>
		</div>
		<div className="sidebar-wrapper">
      <div className="user">
                    <div className="photo">
                        <i className="material-icons">person</i>
                    </div>
                    <div className="info">
                        <a data-toggle="collapse" href="#collapseExample" className="collapsed" aria-expanded="false">
                            <span>
                                {this.state.currentUser.username}
                                <b className="caret"></b>
                            </span>
                        </a>
                        <div className="clearfix"></div>
                        <div className="collapse" id="collapseExample" aria-expanded="false" style={{height: 0}}>
                            <ul className="nav">
                                <li>
                                    <a href="#" onClick={this.logoutClicked.bind(this)}>
                                        <span className="sidebar-mini">LO</span>
                                        <span className="sidebar-normal">Logout</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
	     {this.renderIfLogin()}
		</div>
	</div>
    );
  }
  routerlink(){
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
    )
  }
  /////////////////////////// events
  logoutClicked(event){
    event.preventDefault();
        Meteor.logout((err)=> {
            if (err) alert(err.message)
            //this.props.history.push("/login");
            this.setState({login:false})
            window.location.href="/login"
        });
  }
}
