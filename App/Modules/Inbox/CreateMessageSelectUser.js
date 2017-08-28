import React, { Component } from 'react'
import { TouchableOpacity, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { List, ListItem } from 'react-native-elements'
import styles from './CreateMessageStyles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../../Redux/Actions/homeActions'

class CreateMessageSelectUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  _closeModal () {
    this.props.navigator.dismissLightBox()
  }

  _dismissCourseListView (id, name) {
    this.props.actions.createMessageSelectUser(id, name)
    this.props.navigator.dismissLightBox()
  }

  render () {
    // TODO: Come back to the way you add Icons here...
    return (
      <View style={styles.lightBoxContainer}>
        <TouchableOpacity style={styles.lightBoxIcon} onPress={() => this._closeModal()}>
          <Icon name='ios-close' size={40} color='#000000' />
        </TouchableOpacity>
        <ScrollView style={styles.lightBoxContent}>
          <List style={{ marginTop: 0 }}>
            {
            this.props.possibleUsers.map((user) => (
              <ListItem
                title={user.name}
                key={user.id}
                style={styles.lightBoxList}
                onPress={() => this._dismissCourseListView(user.id, user.name)}
              />
            ))
          }
          </List>
        </ScrollView>
      </View>
    )
  }

//   render () {
//     return (
//       <View>
//         <List>
//           {
//             this.props.possibleUsers.map((user) => (
//               <ListItem
//                 title={user.name}
//                 key={user.id}
//                 onPress={() => this._dismissCourseListView(user.id, user.name)}
//               />
//             ))
//           }
//         </List>
//       </View>
//     )
//   }
// }
}

const mapStateToProps = (state) => {
  return {
    courseList: state.courseReducer.courseList,
    courseId: state.messageReducer.courseId,
    possibleUsers: state.messageReducer.possibleUsers,
    selectedUserId: state.messageReducer.selectedUserId,
    selectedUserName: state.messageReducer.selectedUserName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageSelectUser)
