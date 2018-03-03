/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
/* eslint import/extensions: 0 */
/* eslint import/first: 0 */
/* eslint import/no-unresolved: 0 */
import React from 'react';
import ModLoader from './ModLoader';
// demo路由
import DemoRoutes from 'bundle-loader?lazy&name=[name]!./demo/DemoRoutes';
// test路由
import TestRoutes from 'bundle-loader?lazy&name=[name]!./test/TestRoutes';
// 首页路由
import HomeRoutes from 'bundle-loader?lazy&name=[name]!./home/HomeRoutes';
// 运营数据
import DataRoutes from 'bundle-loader?lazy&name=[name]!./data/DataRoutes';

export const DemoRoutesLoader = () => (
  <ModLoader mod={DemoRoutes} />
);
export const TestRoutesLoader = () => (
  <ModLoader mod={TestRoutes} />
);
export const HomeRoutesLoader = () => (
  <ModLoader mod={HomeRoutes} />
);

export const DataRoutesLoader = () => (
  <ModLoader mod={DataRoutes} />
);
