import React, { Component } from 'react'
import ReactDOM from 'react-dom'

function Root () {
  return <h1>test42</h1>
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

if (module.hot) {  
  module.hot.accept();
 }