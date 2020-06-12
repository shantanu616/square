import React from 'react';
import Loadable from 'react-loadable';
import Loader from './Component/Loader/main_loader'
function Loading() {
  return (<Loader message="Please Wait"/>);
}
const HOME = Loadable({
  loader: () => import('./Container/Home.js'),
  loading: Loading,
});
const NOT_FOUND = Loadable({
  loader: () => import('./Component/not_found/not_found.js'),
  loading: Loading,
});
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [

    { path:'/',exact:true,component: HOME },
    { path:'*',exact:true,name: 'Not Found',  component: NOT_FOUND },
];

export default routes;