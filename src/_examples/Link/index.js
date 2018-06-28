import React, { Component, Fragment } from 'react'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal'
}

class Link extends Component {
  constructor (props) {
    super(props)

    this._onMouseEnter = this._onMouseEnter.bind(this)
    this._onMouseLeave = this._onMouseLeave.bind(this)

    this.state = {
      class: STATUS.NORMAL
    }
  }

  _onMouseEnter () {
    this.setState({class: STATUS.HOVERED})
  }

  _onMouseLeave () {
    this.setState({class: STATUS.NORMAL})
  }

  render () {
    return (
      <Fragment>
        <h1 className={styles.title}>Title</h1>
        <a
          className={this.state.class}
          href={this.props.page || '#'}
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
        >
          {this.props.children}
        </a>
      </Fragment>
    )
  }
}

export default hot(module)(Link)