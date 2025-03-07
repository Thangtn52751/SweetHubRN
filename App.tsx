import { View } from 'react-native'
import React, { Component } from 'react'
import NavContainer from './compoment/navContainer'

export class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <NavContainer />
      </View>
    )
  }
}

export default App