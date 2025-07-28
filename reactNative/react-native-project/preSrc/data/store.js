import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {newsList} from './index';
const defaultState = {
  list: [
    {
      author: '滑头鬼大人',
      title: 'nage客户端开发做得好好的为什么离职了',
      desc: '拿到这份offer的时候，我就想，如果不是领导非要赶我走，我是无论如何都不会挪窝的，但没想到自己会先投降，做一个逃兵，毕竟自己从校招进来也不容易',
      uri: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86da66548d1d45608dde745415e7ff98~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?',
    },
  ],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOADED': {
      return {list: action.payload};
    }
    case 'LOADING': {
      return defaultState;
    }
    default:
      return state;
  }
};

export const fetchList = () => (dispatch, getState) => {
  dispatch({type: 'LOADING'});
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newsList);
    }, 1000);
  }).then(payload => dispatch({type: 'LOADED', payload}));
};

export const store = createStore(reducer, applyMiddleware(thunk));
