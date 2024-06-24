"use client"
import { Provider } from 'react-redux'
import { store } from './store'
import React from 'react'
const  ReactProvider = ({children,}: Readonly<{children: React.ReactNode}>) => {
    return (
        <Provider store  = {store}>
            {children}
        </Provider>
    )
}

export default ReactProvider;