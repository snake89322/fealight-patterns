import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { AppContainer, hot } from 'react-hot-loader'

function Root () {
  return <h1>2123122</h1>
}

var App = hot(module)(Root)

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>
  ,
  document.getElementById('root')
)

// if (module.hot) {  
//   module.hot.accept();
// }