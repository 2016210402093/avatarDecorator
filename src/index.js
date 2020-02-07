import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import store from './store'


localStorage.clear()

//浏览器刷新、关闭、前进、后退时清除localstorage
window.onbeforeunload = ()=>{
    localStorage.clear();
}; 


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
 document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
