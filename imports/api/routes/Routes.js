export const Routes = {

    dashboard: {
        path: "/dashboard",
        label: "Central Dashboard",
        icon: "heartbeat",
        template:"dashboard",
    },

    login:{
        path:"/login",
        label:"Login",
        icon:"",
    },
    list:{
        path:"/list/:collection",
        label:"List View"
    },
    formInsert:{
        path:"/form/:collection",
        label:"Insert Form",
    },
    formUpdate:{
        path:"/form/:collection/:docId",
        label:"Update Form",
    },

    // WORKFLOW

    reposition:{
        path:"/reposition/:processInstanceId",
        label:"Reposition Patient",
        check(params, queryParams){
            import {ProcessEngine} from "../bpmn/ProcessEngine";
            ProcessEngine.actions.checkInstances(params.processInstanceId);
        }
    },

    repositionShedule:{
        path:"/reposition/shedule/:processInstanceId",
        label:"Repositioning: Shedule, Frequency and Method",
        check(params, queryParams){
            import {ProcessEngine} from "../bpmn/ProcessEngine";
            ProcessEngine.actions.checkInstances(params.processInstanceId);
        }
    },

    admission:{
        path:"/admission/:processInstanceId",
        label:"Patient Admission",
        check(params, queryParams){
            import {ProcessEngine} from "../bpmn/ProcessEngine";
            ProcessEngine.actions.checkInstances(params.processInstanceId);
        }
    },
    riskAssessment:{
        path:"/assessment/risk/:processInstanceId",
        label:"Risk Assessment",
        check(params, queryParams){
            import {ProcessEngine} from "../bpmn/ProcessEngine";
            ProcessEngine.actions.checkInstances(params.processInstanceId);
        }
    },
    injuryAssessment:{
        path: "/assessment/injury/:processInstanceId",
        label: "Injury Assessment",
        check(params, queryParams){
            import {ProcessEngine} from "../bpmn/ProcessEngine";
            ProcessEngine.actions.checkInstances(params.processInstanceId);
        }
    },
    workflowStatus:{
        path:"/workflow/:workflowId",
        label:"Workflow Status",
        toRoute(workflowId,patientId){
            const route = Routes.workflowStatus.path.replace(":workflowId", workflowId);
            if (patientId) return route + "?patientId="+patientId;
            return route;
        },
    },
}

export const SidebarRoutes = {
    central: {
        path: "/dashboard",
        label: "My Heartbeat",
        icon: "heartbeat",
        template:"dashboard",
    },
    emergencylist:{
        path: "/emergencylist",
        label: "Emergency List",
        icon: "plus-square",
        template:"emergencylist",
        data:{
            collection:"patients",
        }
    },
    chat:{
        path: "/chat",
        label: "chat",
        icon: "comments",
        template:"chat",
    }
    // calandar:{
    //     path: "/calendar",
    //     label: "Calendar",
    //     icon: "calendar",
    //     template:"calendar",
    // },
    // requests:{
    //     path: "/requests",
    //     label: "Requests",
    //     icon: "exchange",
    //     template:"requests",
    // },
    // charts:{
    //     path: "/charts",
    //     label: "Charts",
    //     icon: "bar-chart",
    //     template:"visualizations",
    // },
    // timeline:{
    //     path: "/timeline",
    //     label: "Timeline",
    //     icon: "clock-o",
    //     template:"timeline",
    // },
    // staff:{
    //     path: "/list/staff",
    //     label: "Staff",
    //     icon: "user-md",
    //     template:"list",
    //     data:{
    //         collection:"staff",
    //         icon:"user-md",
    //         title:"Staff",
    //         hideNewEntryButton:false,
    //         hideEdit:false,
    //     }
    // },
    // download:{
    //   path: "/download",
    //   label: "download",
    //   icon: "download",
    //   template:"download",
    // },
    // workflow:{
    //     path: "/list/workflow",
    //     label: "My Current Workflows",
    //     icon: "code-fork",
    //     template:"list",
    //     data:{
    //         collection: "processInstances",
    //         filter: function() {
    //             return {userId: Meteor.userId()}
    //         },
    //         icon:"code-fork",
    //         title:"My current Workflows",
    //         hideNewEntryButton:true,
    //         hideEdit:true,
    //     }
    // }
};





export const WorkflowRoutes = [

    {
        value:"/admission/:processInstanceId:?type=general",
        label:"Enter General Patient Data",
    },
    {
        value:"/admission/:processInstanceId:?type=history",
        label:"Enter Patient History Data",
    },
    {
        value:"/assessment/risk/:processInstanceId:",
        label:"Risk Assessment",
    },
    {
        value:"/assessment/injury/:processInstanceId:",
        label:"Injury Assessment Tool",
    },
    {
        value:"/assessment/injury/:processInstanceId:?type=record",
        label:"Injury Data Recording",
    },
    {
        value:"/reposition/:processInstanceId",
        label:"Reposition Patient",
    },
    {
        value:"/reposition/shedule/:processInstanceId",
        label:"Repositioning: Shedule, Frequency and Method",
    }
]
