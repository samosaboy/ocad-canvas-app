import React, { Component } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'

import LoginButton from '../../App/Components/LoginButton'
import { Colors } from '../Common/index'
import styles from './Styles/LoginScreenStyles'

export default class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      borderBottomColor: Colors.darkyellow
    }
  }

  onFocus () {
    this.setState({
      borderBottomColor: Colors.white
    })
  }

  render () {
    return (
      <View style={styles.loginContainer}>
        <ScrollView style={styles.centeredContainer}>
          <View style={styles.section}>
            <Text style={styles.subtitle}>
              OCAD University
            </Text>
            <Text style={styles.header}>
              Canvas Login
            </Text>
          </View>
          <View style={[
            styles.section, {
              borderBottomWidth: 1,
              borderBottomColor: this.state.borderBottomColor
            }
          ]}>
            <TextInput
              style={styles.loginInput}
              autoCorrect={false}
              placeholder={'Enter your username'}
              placeholderTextColor='#A2891A'
              onFocus={() => this.onFocus()}
            />
          </View>
          <View style={[
            styles.section, {
              borderBottomWidth: 1,
              borderBottomColor: this.state.borderBottomColor
            }
          ]}>
            <TextInput
              style={styles.loginInput}
              autoCorrect={false}
              placeholder={'Enter your password'}
              placeholderTextColor='#A2891A'
              onFocus={() => this.onFocus()}
              secureTextEntry
            />
          </View>
          <LoginButton />
        </ScrollView>
      </View>
    )
  }
}
