import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Octicons'

export default class AttachmentIcon extends Component {
  static defaultProps = { size: 20 }
  static propTypes = {
    size: PropTypes.number,
    type: PropTypes.string
  }

  render () {
    switch (this.props.type) {
      case 'folder':
        return (<Icon type='octicons' name='file-directory' size={this.props.size} />)
      case 'zip':
        return (<Icon type='octicons' name='file-zip' size={this.props.size} />)
      case 'pdf':
        return (<Icon type='octicons' name='file-pdf' size={this.props.size} />)
      case 'image':
        return (<Icon type='octicons' name='file-media' size={this.props.size} />)
      case 'doc':
        return (<Icon type='octicons' name='file-text' size={this.props.size} />)
      default:
        return (<Icon type='octicons' name='file' size={this.props.size} />)
    }
  }
}
