import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../Component/Loader/main_loader'
function Loading() {
  return (<Loader message="Please Wait"/>);
}
const HOME = Loadable({
  loader: () => import('./Home.js'),
  loading: Loading,
});
const CREATEJOB = Loadable({
  loader: () => import('./create_job.js'),
  loading: Loading,
});
const JOBSTATUS = Loadable({
  loader: () => import('./check_application.js'),
  loading: Loading,
});
const NOT_FOUND = Loadable({
  loader: () => import('../../Component/not_found/not_found.js'),
  loading: Loading,
});
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [

    { path:'/recruiter',exact:true,component: HOME },
    { path:'/recruiter/createjob',exact:true,component: CREATEJOB },
    { path:'/recruiter/jobstatus/:id',exact:false,component: JOBSTATUS },
    { path:'*',exact:true,name: 'Not Found',  component: NOT_FOUND },
];

export default routes;
