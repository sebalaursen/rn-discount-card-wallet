import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false,
    };
  }
  onBarCodeRead = (e) => {
    Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
  };
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          flashMode={
            this.state.torchOn
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          onBarCodeRead={this.onBarCodeRead}
          captureAudio
          ref={(cam) => (this.camera = cam)}>
          <Text
            style={{
              backgroundColor: 'white',
            }}>
            BARCODE SCANNER
          </Text>
        </RNCamera>
        <View style={styles.bottomOverlay}>
          <TouchableOpacity
            onPress={() => this.handleTourch(this.state.torchOn)}>
            <Image style={styles.cameraIcon} source={{uri: ''}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  handleTourch(value) {
    if (value === true) {
      this.setState({torchOn: false});
    } else {
      this.setState({torchOn: true});
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
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
