import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CardCell from './shared/CardCell';
import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';
import { AppState } from '../../store/reducer';
import { load, add, remove, edit } from '../../store/wallet';
import Card from '../../models/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ListScreenProps {
  componentId: string;
  cards: Card[];
  load: typeof load;
  add: typeof add;
  remove: typeof remove;
  edit: typeof edit;
  isFavourites: boolean;
}

interface ListScreenState {
  currentName: string;
  query: string;
}

const { width, height } = Dimensions.get('screen');

class ListScreen extends Component<ListScreenProps, ListScreenState> {
  constructor(props: Readonly<ListScreenProps>) {
    super(props);

    this.state = {
      currentName: '',
      query: '',
    };
  }

  componentDidMount() {
    // this.props.load();
    if (!this.props.isFavourites) {
      this.setState({ currentName: this.props.cards[0].name });
    }

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'rightAddBtn',
            component: {
              name: 'AddButton',
            },
          },
        ],
      },
    });
  }

  private readonly onSearchChange = (text: string) => {
    this.setState({ query: text });
  };

  private readonly onNameChange = (text: string) => {
    this.setState({ currentName: text });
  };

  private readonly onSnap = (index: number) => {
    this.setState({ currentName: this.props.cards[index].name });
  };

  private readonly renderCard = (e: { item: Card }): JSX.Element => {
    return <CardCell width={width * 0.8} height={height * 0.55} code={e.item.code} title={e.item.name} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.search}
            underlineColorAndroid={'transparent'}
            selectionColor={'#1abc9c'}
            onChangeText={this.onSearchChange}
            value={this.state.query}
            maxLength={100}
          />
          <View style={styles.search_icon}>
            <Icon name={'search'} size={28} color={'#1abc9c'} />
          </View>
        </View>
        <View style={{ ...styles.header, marginTop: 20 }}>
          <TextInput
            style={styles.search}
            underlineColorAndroid={'transparent'}
            selectionColor={'#1abc9c'}
            onChangeText={this.onNameChange}
            value={this.state.currentName}
            maxLength={100}
          />
          <View style={styles.search_icon}>
            <Icon name={'edit'} size={28} color={'#1abc9c'} />
          </View>
        </View>
        <View style={styles.btn_container}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.fav_btn}>
              <Icon name={'grade'} color={'#1abc9c'} size={40} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.fav_btn}>
              <Icon name={'delete'} color={'#1abc9c'} size={40} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <Carousel
            data={this.props.cards}
            renderItem={this.renderCard}
            sliderWidth={width}
            itemWidth={width * 0.8}
            onSnapToItem={this.onSnap}
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
    backgroundColor: '#fff',
  },
  list: {
    position: 'absolute',
    height: height * 0.6,
    bottom: 0,
  },
  header: {
    width: width,
    height: 30,
    marginTop: 10,
  },
  search: {
    flex: 1,
    marginLeft: 50,
    marginRight: 10,
    borderBottomColor: '#1abc9c',
    borderBottomWidth: 1,
  },
  search_icon: {
    position: 'absolute',
    top: 5,
    left: 12,
  },
  name: {
    position: 'absolute',
    top: 5,
    left: 12,
  },
  btn_container: {
    width: width,
    height: height * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  fav_btn: {
    width: width * 0.4,
    height: '80%',
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#1abc9c',
    borderWidth: 1,
  },
});

const mapStateToProps = (state: AppState): Partial<ListScreenProps> => ({});

const mapDispatchToProps: Partial<ListScreenProps> = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
