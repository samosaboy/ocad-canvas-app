import React from 'react'
import { Linking, Text, ScrollView, View, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'
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

  componentDidMount () {
    console.tron.log(this.props.item)
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
          <Text style={[styles.courseActivityDate, styles.lightBoxContentFullContainer]}>{this._formatDate(this.props.item.created_at)}</Text>
          <Divider />
          <Text style={[styles.textBold, styles.courseActivityTitle, styles.lightBoxContentFullContainer]}>{this.props.item.title}</Text>
          <Divider />
          {
            this.props.item.message
              ? <HTMLView
                value={this.props.item.message.replace(/<p>(.*)<\/p>/g, '$1\r\n').replace(/<br>/g, '')}
                onLinkPress={(url) => Linking.openURL(url)}
                style={[styles.courseActivityText, styles.lightBoxContentFullContainer]}
              />
              : null
          }
        </ScrollView>
      </View>
    )
  }
}
