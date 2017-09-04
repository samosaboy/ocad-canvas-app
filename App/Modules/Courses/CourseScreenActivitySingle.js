import React from 'react'
import { Linking, Text, ScrollView, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from '../../Components/Styles/LightBoxStyles'
import moment from 'moment'
import HTMLView from 'react-native-htmlview'

export default class CourseScreenActivitySingle extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  _formatDate = (date) => {
    return moment.utc(date).fromNow()
  }

  _closeModal () {
    this.props.navigator.dismissLightBox()
  }

  render () {
    return (
      <View style={styles.lightBoxContainer}>
        <TouchableOpacity style={styles.lightBoxIcon} onPress={() => this._closeModal()}>
          <Icon name='ios-close' size={40} color='#000000' />
        </TouchableOpacity>
        <ScrollView style={styles.lightBoxContentFull} snapToAlignment={'end'} contentInset={{ top: 0, left: 0, bottom: 50, right: 0 }}>
          <Text style={styles.courseActivityDate}>{this._formatDate(this.props.item.created_at)}</Text>
          <Text style={[styles.textBold, styles.courseActivityTitle]}>{this.props.item.title}</Text>
          <HTMLView
            value={this.props.item.message.replace(/<p>(.*)<\/p>/g, '$1\r\n').replace(/<br>/g, '')}
            onLinkPress={(url) => Linking.openURL(url)}
            style={styles.courseActivityText}
          />
        </ScrollView>
      </View>
    )
  }
}
