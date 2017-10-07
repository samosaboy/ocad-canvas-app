import React from 'react'
import { Linking, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import moment from 'moment'
import { styles } from './CourseScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingleFiles extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    tabBarHidden: true
  }
  api = {}
  constructor (props) {
    super(props)
    this.state = {
      files: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseFiles()
  }

  _getCourseFiles = () => {
    this.api.getCourseFiles(this.props.id)
      .then((response) => {
        this.setState({ files: response.data, loading: false })
      })
  }

  convertFromByte = (byte, decimals) => {
    if (byte > 0) {
      const k = 1024
      const dm = decimals || 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(byte) / Math.log(k))
      return parseFloat((byte / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }
    return byte === 0 ? '0 Bytes' : null
  }

  _formatDate = (date) => {
    return moment.utc(date).format('DD MMMM YYYY')
  }

  _showIcon = (type) => {
    switch (type) {
      case 'pdf':
        return (<Icon type='octicons' name='file-pdf' size={35} />)
      case 'image':
        return (<Icon type='octicons' name='file-media' size={35} />)
      case 'doc':
        return (<Icon type='octicons' name='file-text' size={35} />)
      default:
        return (<Icon type='octicons' name='file' size={35} />)
    }
  }

  _openAttachment = (url) => {
    Linking.openURL(url)
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting assignments'} />
      )
    }
    return (
      <ScrollView>
        {this.state.files.map((file) => (
          <ListItem
            hideChevron
            containerStyle={[styles.listContainer, { paddingLeft: 5, paddingTop: 25, paddingBottom: 25 }]}
            key={file.id}
            title={file.display_name}
            titleNumberOfLines={1}
            subtitle={<Text style={{ marginLeft: 10 }}>{this.convertFromByte(file.size)}</Text>}
            avatar={this._showIcon(file.mime_class)}
            onPress={() => this._openAttachment(file.url)}
            label={<Text style={[styles.subTitleText, { marginTop: 2 }]}>{this._formatDate(file.created_at)}</Text>}
          />
        ))}
      </ScrollView>
    )
  }
}
