import React, { Component } from 'react'
import { Switch, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './Styles/LoginScreenStyles'

export default class LoginScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor (props) {
    super(props)
    this.state = {
      rememberMe: false,
      autoLogin: true
    }
  }

  login () {
    this.props.navigator.push({
      screen: 'CoursesScreen'
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.loginContainer}>
          <TextInput
            autoCorrect={false}
            placeholder={'Canvas Username'}
            style={styles.input}
          />
          <TextInput
            secureTextEntry
            autoCorrect={false}
            placeholder={'Password'}
            style={styles.input}
          />
          <Button
            large
            title='Login'
            buttonStyle={styles.button}
            containerViewStyle={{marginLeft: 0, marginRight: 0}}
            onPress={() => this.login()}
          />
          <View style={{flexDirection: 'row', marginTop: 25}}>
            <Text style={styles.switch}>Use TouchID on Login</Text>
            <Switch
              value={this.state.rememberMe}
              onValueChange={(value) => this.setState({rememberMe: value})}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Text style={styles.switch}>Auto login for next time</Text>
            <Switch
              value={this.state.autoLogin}
              onValueChange={(value) => this.setState({autoLogin: value})}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
