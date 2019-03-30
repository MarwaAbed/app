import {Meteor} from 'meteor/meteor'
import ReactDOM from 'react-dom';
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import {withRouter} from 'react-router'
import createHistory from 'history/createBrowserHistory'
import '../imports/api/client/push'

import NavTop from '../imports/ui/navTop/navTop.js'
import SideBar from '../imports/ui/sideBar/sideBar.js'
import DashboardComponent from '../imports/ui/dashboard/central/dashboardComponent.js'
import Register from '../imports/ui/register/register.js';
import LoginComponent from '../imports/ui/login/loginComponent.js'
import NotFound from '../imports/ui/notfound/notfound.js';
import Dashboard from '../imports/ui/dashboard/central/dashboard.js';
import EmergencyListComponent from '../imports/ui/dashboard/emergencylist/emergencylist.js'
import Chat from '../imports/ui/dashboard/chat/chat.js';
import AddStaff from '../imports/ui/register/addstaff.js';
import AddDoctor from '../imports/ui/register/adddoctor.js';
import AddContact from '../imports/ui/register/addcontact.js';
import AddPatient from '../imports/ui/register/addpatient.js';
import ManageSensors from '../imports/ui/dashboard/settings/manageSensors.js';
import Wait from '../imports/ui/wait/wait.js';
import './main.css'

window.notify = function(state, myMessage, target="body"){


    $.notify({
            icon: "notifications",
            message: myMessage

        }, {
            type: state,
            timer: 3000,
            placement: {
                from: 'bottom',
                align: 'right'
            }
        });
};

const history = createHistory();
const unauthenticatedPages = ['/login','/register','/wait'];
const authenticatedPages = ['/', '/patient-management','/reports','/dashboard','/calendar','/list/all-workflows'];
const isUnauthenticatedPage=false;
const isAuthenticatedPage=true;

const ChangeTracker = withRouter(({match, location, history}) => {
  const pathName = location.pathname;

    Session.set("sideBar",pathName);

  isUnauthenticatedPage = unauthenticatedPages.includes(pathName);

  isAuthenticatedPage = authenticatedPages.includes(pathName);

  isAuthenticated = !!Meteor.userId();

   if (isAuthenticated){
     if (isUnauthenticatedPage){
       history.push('/');
     }
   }else{
     if (!isUnauthenticatedPage) {
       history.push('/login');
     }
   }
  return false;
});

const BasicExample =(
  <Router history={history}>
    {Meteor.userId()?
      <div className="wrapper">
        <SideBar/>
          <div className="main-panel" >

              <NavTop />


              <div className="content">
                  <div className="container-fluid" id="app">
                    <Switch>
                      <Route exact path="/wait" component={Wait}/>
                      <Route exact path="/" component={DashboardComponent}/>
                      <Route path="/dashboard" component={DashboardComponent}/>
                      <Route path="/emergencylist" component={EmergencyListComponent}/>
                      <Route path="/chat" component={Chat}/>
                      <Route path="/addstaff" component={AddStaff}/>
                      <Route path="/adddoctor" component={AddDoctor}/>
                      <Route path="/addcontact" component={AddContact}/>
                      <Route path="/addpatient" component={AddPatient}/>
                      <Route path="/managesensors" component={ManageSensors}/>
                      <Route component={NotFound}/>
                    </Switch>

                </div>
            </div>
            <footer className="footer">
                <div className="container-fluid">
                    <p className="copyright pull-right">
                        &copy;

                        <a href="#">Smart Health Care</a> Copyright Marwa
                    </p>
                </div>
            </footer>
    </div>
    <ChangeTracker />
  </div>
  :<div className="wrapper wrapper-full-page">
      <div className="full-page login-page" >
        <div className="full-page-background" style={{backgroundImage: "url('/assets/img/login.jpg')"}}>
				</div>
          <div className="content">
              <div className="container" id="app">
                <Switch>
                  <Route path="/login" component={LoginComponent}/>
                  <Route path="/register" component={Register}/>
                  <Route exact path="/wait" component={Wait}/>
                </Switch>
            </div>
        </div>
        <footer className="footer">
            <div className="container-fluid">
                <p className="copyright pull-right">
                    &copy;

                    <a href="#">Smart Health Care</a> Copyright Marwa
                </p>
            </div>
        </footer>
</div>
<ChangeTracker />
</div>}

  </Router>
)


Meteor.startup(()=>{
  // Now we can attach the router to the 'root' element like this:
  ReactDOM.render(BasicExample, document.getElementById('app-container'));
});
