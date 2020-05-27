import React, {Component} from 'react';
import NavigationService from './src/services/NavigationService';
import {View, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Barcode from 'react-native-barcode-builder';

interface AppProps {
  componentId?: string;
}

export default class App extends Component<AppProps> {
  async componentDidMount() {}

  private readonly load = async () => {
    NavigationService.shared.push({
      component: {
        name: 'Test',
        options: {
          topBar: {
            visible: true,
            noBorder: true,
            backButton: {
              showTitle: false,
              color: '#383838',
            },
          },
        },
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Barcode value="Hello World" format="CODE128" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
