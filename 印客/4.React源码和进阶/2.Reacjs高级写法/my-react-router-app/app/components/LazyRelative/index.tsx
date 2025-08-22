import React from 'react';

const { lazy } = React;

export const About = lazy(() => import(/* webpackChunkName:about */'./AboutCom'))
// export const About = lazy(() => import(/* webpackChunkName:about */'./About'))


// export const Some = lazy(() => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve({ default: <div>component content</div> })
//   }, 100)
// }))