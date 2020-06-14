import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Barcode from 'react-native-barcode-builder';

interface CardCellProps {
  title: string;
  code: string;
  width: number;
  height: number;
  isVertical: boolean;
}

const { width, height } = Dimensions.get('screen');

const CardCell = (props: CardCellProps) => {
  return (
    <View
      style={
        props.isVertical
          ? { ...styles.container_vert, width: props.width - 20, height: props.height }
          : { ...styles.container, width: props.width, height: props.height }
      }>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.barcode_container}>
        <Barcode value={props.code} format={'CODE128'} height={props.isVertical ? 280 : 100} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: height * 0.03,
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 5,
  },
  container_vert: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    position: 'absolute',
    left: 20,
    top: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1abc9c',
  },
  barcode_container: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
  },
});

export default React.memo(CardCell);
