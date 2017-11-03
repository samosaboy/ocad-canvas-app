import moment from 'moment'
import React from 'react'
import { FlatList, Linking, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import AttachmentIcon from '../../Components/AttachmentIcon'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'
import { styles } from './CourseScreenStyles'

export default class CoursesScreenSingleFolder extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    tabBarHidden: true
  }
  api = {}
  _getFolder = () => {
    this.api.getSingleFolder(this.props.folderId,
      this.state.page)
    .then((response) => {
      this.setState({
        files: response.data,
        loading: false
      })
    })
  }
  _getMoreFiles = () => {
    if (this.state.files.length < this.state.numberOfFiles) {
      this.setState({page: this.state.page + 1},
        () => {
          this.api.getSingleFolder(this.props.folderId,
            this.state.page)
          .then((response) => {
            this.setState({
              files: [...this.state.files, ...response.data]
            })
          })
        })
    }
  }
  convertFromByte = (byte, decimals) => {
    if (byte > 0) {
      const k = 1024
      const dm = decimals || 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(byte) / Math.log(k))
      return parseFloat((byte / Math.pow(k,
        i)).toFixed(dm)) + ' ' + sizes[i]
    }
    return byte === 0
      ? '0 Bytes'
      : null
  }
  _formatDate = (date) => {
    return moment.utc(date)
    .format('MM/DD/YYYY h:mm A')
  }
  _open = ({item}) => {
    if (item.url) {
      Linking.openURL(item.url)
    } else {
      const folderId = item.id
      this.props.navigator.push({
        screen: 'CoursesScreenSingleDiscussionsSingle',
        passProps: {
          folderId
        }
      })
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      files: [],
      page: 1,
      numberOfFiles: null,
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this.api.getSingleFolderInfo(this.props.folderId)
    .then((response) => {
      this.setState({
        numberOfFiles: response.data.files_count
      })
      this._getFolder()
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting files'} />
      )
    }
    return (
      <View>
        <FlatList
          data={this.state.files}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0}
          onEndReached={this._getMoreFiles}
          renderItem={({item}) => (
            <ListItem
              hideChevron={!item.files_count}
              containerStyle={[
                styles.listContainer, {
                  paddingLeft: 5,
                  paddingTop: 25,
                  paddingBottom: 25
                }
              ]}
              title={item.display_name || item.name}
              key={item.id}
              rightTitle={this.convertFromByte(item.size)}
              rightTitleContainerStyle={{
                flex: 0,
                marginLeft: 10
              }}
              subtitle={item.files_count
                ? item.files_count + ' Files'
                : this._formatDate(item.created_at)}
              avatar={<AttachmentIcon type={item.mime_class
                ? item.mime_class
                : 'folder'} size={35} />}
              onPress={() => this._open({item})}
            />
          )}
        />
      </View>
    )
  }
}
