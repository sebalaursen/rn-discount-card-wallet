import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { RNCamera, BarCodeType, Point, Size } from 'react-native-camera';
import NavigationService from 'src/services/NavigationService';

interface ScannerProps {
  componentId: string;
  onScan: (code: string) => void;
}

interface ScannerState {}

type BarcodeEvent = {
  data: string;
  rawData?: string;
  type: keyof BarCodeType;
  bounds:
    | { width: number; height: number; origin: Array<Point<string>> }
    | { origin: Point<string>; size: Size<string> };
};

export default class Scanner extends Component<ScannerProps, ScannerState> {
  private didRead = false;
  constructor(props: ScannerProps) {
    super(props);

    this.state = {
      didRead: false,
    };
  }

  onBarCodeRead = (e: BarcodeEvent) => {
    if (!this.didRead) {
      this.didRead = true;
      this.props.onScan(e.data);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera style={styles.preview} onBarCodeRead={this.onBarCodeRead} captureAudio={false}>
          <Text style={styles.text_style}>{'SCAN THE BARCODE ON YOUR CARD'}</Text>
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
