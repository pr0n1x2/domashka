import React, { Component } from 'react';
import MainPage from "containers/MainPage";
import NetInformer from 'NetInformer';
import socketIOClient from 'socket.io-client'
import store from 'store';
import { Provider } from 'react-redux';
import { connectToWss, serverDisconnect } from "../actions";

class App extends Component {

    componentDidMount() {
        const socket = socketIOClient('localhost:8000');

        socket.on('connect', () => {
            console.log('connect');
            store.dispatch(connectToWss());
        });

        socket.on('disconnect', () => {
            console.log('disconnect');
            store.dispatch(serverDisconnect());
        });
    }

    render() {
        return (
            <Provider store={store}>
                <NetInformer/>
                <MainPage/>
            </Provider>
        );
    }
}

export default App;
