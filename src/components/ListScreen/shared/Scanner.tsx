import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { RNCamera, BarCodeType, Point, Size } from 'react-native-camera';

interface ScannerProps {
  componentId: string;
}

interface ScannerState {
  torchOn: boolean;
}

type BarcodeEvent = {
  data: string;
  rawData?: string;
  type: keyof BarCodeType;
  bounds:
    | { width: number; height: number; origin: Array<Point<string>> }
    | { origin: Point<string>; size: Size<string> };
};

export default class Scanner extends Component<ScannerProps, ScannerState> {
  constructor(props: ScannerProps) {
    super(props);

    this.state = {
      torchOn: false,
    };
  }

  onBarCodeRead = (e: BarcodeEvent) => {
    Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera style={styles.preview} onBarCodeRead={this.onBarCodeRead} captureAudio={false}>
          <Text style={styles.text_style}>BARCODE SCANNER</Text>
        </RNCamera>
      </View>
    );
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
  text_style: {
    backgroundColor: 'transparent',
    color: '#fff',
  },
});
