// import _ from 'lodash'
import React from 'react'
import { ActivityIndicator, FlatList, StatusBar, View, Text, TouchableHighlight } from 'react-native'
import API from '../Services/Api'
import styles from './Styles/HomeScreenStyles'

export default class HomeScreen extends React.Component {
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      courseList: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    return this.api.getCourses()
      .then((response) => {
        this.setState({ courseList: response.data, loading: false })
      }).catch((e) => {
        console.log(e)
      })
  }

  _getCourseDetails = (id) => {
    this.api.getCourseActivity(id)
      .then((response) => {
        console.log(response.data)
      })
  }

  _filterCourseView = ({item}) => {
    return (
      <TouchableHighlight>
        <View style={styles.courseBox}>
          <Text onPress={() => this._getCourseDetails(item.id)}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    if (this.state.loading) {
      return (
        <View style={styles.mainContainer}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          barStyle='dark-content'
        />
        <FlatList
          data={this.state.courseList}
          keyExtractor={item => item.id}
          renderItem={this._filterCourseView}
        />
      </View>
    )
  }
}
