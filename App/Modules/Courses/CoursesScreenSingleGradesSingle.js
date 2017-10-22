import React from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import moment from 'moment'
import Pages from '../../Common/DeepPages'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingleAssignments extends React.Component {
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
      item: {},
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseSubmissionSingle()
  }

  _getCourseSubmissionSingle = () => {
    this.api.getCourseSubmissionsSingle(this.props.courseId, this.props.assignId, this.props.userId)
      .then((response) => {
        console.tron.log(response.data)
        this.setState({ item: response.data, loading: false })
      })
  }

  _formatDate = (date) => {
    return moment.utc(date).fromNow()
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting grade'} />
      )
    }
    return (
      <ScrollView>
        <ListItem
          roundAvatar
          hideChevron
          // avatar={{uri: item.author.avatar_image_url}}
          title={'Bob'}
          // rightTitle={this._formatDate(item.created_at)}
          containerStyle={Pages.authorContainer}
        />
      </ScrollView>
    )
  }
}
