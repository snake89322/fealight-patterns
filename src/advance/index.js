import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import Link from '../_examples/Link'

function Root () {
  return <div className='root'>
    <Link page="http://www.facebook.com">Facebook</Link>
  </div>
}

ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>
  ,
  document.getElementById('root')
)