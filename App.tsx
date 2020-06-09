import React, {Component} from 'react';
import NavigationService from './src/services/NavigationService';
import {StyleSheet} from 'react-native';
import LoadingIndicator from './src/components/shared/LoadingIndicator';

interface AppProps {
  componentId?: string;
}

export default class App extends Component<AppProps> {
  async componentDidMount() {
    await this.load();
  }

  private readonly load = async () => {
    await NavigationService.shared.setMenu();
  };

  render() {
    return <LoadingIndicator style={styles.container} colorHex={'#1abc9c'} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
