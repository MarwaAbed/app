import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';

import '../../ui/index/index.js';




FlowRouter.route("/", {
    action: function (params, queryParams) {
        BlazeLayout.render("container", {
            content: 'index',
        })
    }
});
