import React, { Component } from 'react';
import {
  Dimensions,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface SettingsScreenProps {}

interface SettingsScreenState {}

export default class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
  constructor(props: Readonly<SettingsScreenProps>) {
    super(props);

    this.state = {};
  }

  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
});
