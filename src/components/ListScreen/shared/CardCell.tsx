import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Barcode from 'react-native-barcode-builder';

interface CardCellProps {
  title: string;
  code: string;
  width: number;
  height: number;
}

const CardCell = (props: CardCellProps) => {
  return (
    <View style={{ ...styles.container, width: props.width, height: props.height }}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.barcode_container}>
        <Barcode value={props.code} format={'CODE128'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 20,
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
