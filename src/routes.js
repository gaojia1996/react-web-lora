import React from 'react';

const Home = React.lazy(() => import('./views/Dashboard/Dashboard')); //首页展示
const Gateways = React.lazy(() => import('./views/Gateway/index')); //网关管理页面
const GatewayData = React.lazy(() => import('./views/Gateway/GatewayData'));
const Applications = React.lazy(() => import('./views/Application/index')); //应用管理页面
const Devices = React.lazy(() => import('./views/Device/index')); //设备管理页面
const DeviceData = React.lazy(() => import('./views/Device/DeviceData'));

const routesWithAuth = [
  { path: '/', exact: true, name: '' },
  { path: '/home', exact: true, name: '首页', component: Home }, //首页展示
  { path: '/gateway', exact: true, name: '网关管理', component: Gateways }, //网关管理页面
  { path: '/gateway/:gatewayId/:name/data', exact: true, name: '网关数据', component: GatewayData },
  { path: '/application', exact: true, name: '应用管理', component: Applications }, //应用管理页面
  { path: '/device', exact: true, name: '设备管理', component: Devices }, //设备管理页面
  { path: '/device/:DevEUI/:name/data', name: '设备数据', component: DeviceData },
];

const routesProtected = [
  { path: '/', exact: true, name: '' },
  { path: '/home', exact: true, name: '首页', component: Home }, //首页展示
]

const routes = { routesWithAuth, routesProtected }
export default routes;
