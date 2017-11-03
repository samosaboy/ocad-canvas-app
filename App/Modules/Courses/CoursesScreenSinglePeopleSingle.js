import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { width } from 'react-native-dimension'
import { Avatar, Divider } from 'react-native-elements'
import size from '../../Common/Fonts'
import styles from '../../Components/Styles/LightBoxStyles'
import API from '../../Services/Api'

export default class UserDetails extends Component {
  static propTypes = {
    courseId: PropTypes.any,
    userId: PropTypes.number
  }
  api = {}
  _getUserByCourse = () => {
    this.api.getUserByCourse(this.props.courseId,
      this.props.userId)
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          user: response.data,
          loading: false
        })
      }
      console.log(this.props.courseId,
        this.props.userId,
        this.state)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  _messageUser = () => {
    this.props.navigator.showModal({
      screen: 'CreateMessage',
      title: 'Compose',
      passProps: {
        psUserId: this.props.userId,
        psCourseId: this.props.courseId,
        psUserName: this.state.user.name
      }
    })
  }
  _renderUser = () => {
    return (
      <View style={{
        paddingTop: 10,
        paddingBottom: 10
      }}>
        <View style={memberStyles.avatar}>
          <Avatar
            rounded
            xlarge
            source={{uri: this.state.user.avatar_url}}
          />
        </View>
        <View style={memberStyles.user}>
          <Text style={[styles.textBold, styles.textCenter]}>{this.state.user.name}</Text>
          <Text style={styles.textCenter}>{this.state.user.email}</Text>
        </View>
      </View>
    )
  }
  _renderLadda = () => {
    return (
      <View>
        <View style={memberStyles.laddaContainer}>
          <ActivityIndicator size='small' />
        </View>
      </View>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      user: {},
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getUserByCourse()
  }

  _closeModal () {
    this.props.navigator.dismissLightBox()
  }

// <TouchableOpacity style={[styles.lightBoxIcon, memberStyles.closeContainer]} onPress={() => this._closeModal()}>
// <Icon name='ios-close' size={50} color='#000000' />
// </TouchableOpacity>

  render () {
    return (
      <TouchableOpacity style={styles.lightBoxContainer} onPress={() => this._closeModal()} activeOpacity={100}>
        <View style={memberStyles.container}>
          <View style={styles.lightBoxContent}>
            {this.state.loading
              ? <View style={{top: 35}}>{this._renderLadda()}</View>
              : this._renderUser()}
          </View>
          <View style={[styles.lightBoxContent, memberStyles.userNav]}>
            {this.state.loading
              ? this._renderLadda()
              : (
                <View style={{width: width(100)}}>
                  <TouchableOpacity onPress={() => this._messageUser()}>
                    <Text style={[memberStyles.link]}>
                      Message User
                    </Text>
                  </TouchableOpacity>
                  <Divider />
                  <TouchableOpacity onPress={() => this._closeModal()}>
                    <Text style={[memberStyles.link, styles.close]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const memberStyles = StyleSheet.create({
  laddaContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  closeContainer: {
    flex: 1,
    zIndex: 500
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  userNav: {
    backgroundColor: '#FFFFFF',
    marginTop: 10
  },
  user: {
    justifyContent: 'center',
    padding: 0
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  userBio: {
    fontSize: size.medium
  }
})
