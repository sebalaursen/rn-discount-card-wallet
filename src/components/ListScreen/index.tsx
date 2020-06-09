import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CardCell from './shared/CardCell';

interface ListScreenProps {}

interface ListScreenState {}

const { width, height } = Dimensions.get('screen');

export default class ListScreen extends Component<ListScreenProps, ListScreenState> {
  constructor(props: Readonly<ListScreenProps>) {
    super(props);

    this.state = {};
  }

  private readonly renderCard = (e: { item: number }): JSX.Element => {
    return <CardCell width={width * 0.8} height={height * 0.45} code={'481570249288430'} title={'Title'} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.list}>
          <Carousel
            data={[1, 2, 3]}
            renderItem={this.renderCard}
            sliderWidth={width}
            itemWidth={width * 0.8}
            onSnapToItem={(index) => console.log(index)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'purple',
  },
  list: {
    position: 'absolute',
    height: height * 0.5,
    backgroundColor: 'red',
    bottom: 0,
  },
  header: {},
});
