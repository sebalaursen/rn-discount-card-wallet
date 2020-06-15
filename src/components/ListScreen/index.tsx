import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CardCell from './shared/CardCell';
import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation';

import { connect } from 'react-redux';
import { AppState } from '../../store/reducer';
import { load, add, remove, edit } from '../../store/wallet';
import Card from '../../models/Card';
import CustomButton from '../shared/CustomButton';
import NavigationService from 'src/services/NavigationService';
import Input from '../shared/Input';

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
  currentCard: Card;
  currendIndex: number;

  query: string;
  isSearching: boolean;
  filtered: Card[];

  isAdding: boolean;
}

const isAndroid = Platform.OS === 'android';
const { width, height } = Dimensions.get('screen');

class ListScreen extends Component<ListScreenProps, ListScreenState> {
  private carousel: any = null;

  constructor(props: Readonly<ListScreenProps>) {
    super(props);

    this.state = {
      currentCard: {
        name: '',
        code: '',
        isFavourite: false,
      },
      currendIndex: 0,
      query: '',
      isSearching: false,
      filtered: [],
      isAdding: false,
    };
    this.props.load();
  }

  componentDidMount() {
    if (!this.props.isFavourites) {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          rightButtons: [
            {
              id: 'rightAddBtn',
              component: {
                name: 'AddButton',
                passProps: { addAction: this.openScanner },
              },
            },
          ],
        },
      });
    }
  }

  private readonly openScanner = async () => {
    await NavigationService.shared.push(
      {
        component: {
          name: 'Scanner',
          passProps: { onScan: this.onScan },
          options: {
            topBar: {
              visible: true,
              title: {
                text: 'Scanner',
              },
              noBorder: true,
              backButton: {
                showTitle: false,
                color: '#1abc9c',
              },
            },
          },
        },
      },
      this.props.componentId,
    );
  };

  private readonly onScan = async (code: string) => {
    NavigationService.shared.pop();
    await NavigationService.shared.pushModal({
      component: {
        name: 'PopUpName',
        passProps: { code: code, onSave: this.onSave },
        options: {
          modalPresentationStyle: OptionsModalPresentationStyle.overFullScreen,
          layout: { componentBackgroundColor: 'rgba(0,0,0,0.2)' },
          modal: {
            swipeToDismiss: false,
          },
        },
      },
    });
  };

  private readonly onSave = (title: string, code: string) => {
    this.props.add(
      {
        name: title,
        code: code,
        isFavourite: false,
      },
      this.props.cards,
    );
  };

  private readonly onSearchChange = (text: string) => {
    this.setState({
      query: text,
      isSearching: true,
      filtered: this.props.cards.filter((val) => val.name.includes(text)),
    });
  };

  private readonly onEndSearch = () => {
    this.setState({ isSearching: false, filtered: [], query: '' });
  };

  private readonly onNameChange = (text: string) => {
    const edited = { ...this.state.currentCard, name: text };
    this.props.edit(this.state.currendIndex, edited);
    this.setState({ currentCard: edited });
  };

  private readonly onSnap = (index: number) => {
    this.setState({ currentCard: this.props.cards[index], currendIndex: index });
  };

  private readonly favCard = () => {
    this.setState(
      { currentCard: { ...this.state.currentCard, isFavourite: !this.state.currentCard.isFavourite } },
      () => {
        this.props.edit(this.state.currendIndex, this.state.currentCard);
      },
    );
  };

  private readonly remove = () => {
    this.props.remove(this.state.currendIndex);
  };

  private readonly renderCard = (e: { item: Card; index: number }): JSX.Element => {
    if (e.index === 0 && this.state.currentCard.code !== e.item.code && this.state.currendIndex === 0) {
      this.setState({ currentCard: e.item, currendIndex: 0 });
    }
    return (
      <CardCell
        width={this.props.isFavourites ? width : width * 0.9}
        height={this.props.isFavourites ? height * 0.55 : height * (isAndroid ? 0.45 : 0.52)}
        code={e.item.code}
        title={e.item.name}
        isVertical={this.props.isFavourites}
      />
    );
  };

  render() {
    if (this.props.isFavourites) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle={'dark-content'} />
          <View style={styles.list}>
            <Carousel
              data={this.props.cards.filter((card) => card.isFavourite)}
              renderItem={this.renderCard}
              vertical={true}
              sliderHeight={height * 0.7}
              itemHeight={height * 0.55}
              onSnapToItem={this.onSnap}
              ref={(c: any) => (this.carousel = c)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle={'dark-content'} />
          <Input
            containerStyle={styles.header}
            inputStyle={styles.search}
            onChangeText={this.onSearchChange}
            onEndEdititng={this.onEndSearch}
            value={this.state.query}
            iconStyle={styles.search_icon}
            iconName={'search'}
            iconColorHex={'#1abc9c'}
            iconSize={28}
          />
          <Input
            containerStyle={{ ...styles.header, marginTop: 20 }}
            inputStyle={styles.search}
            onChangeText={this.onNameChange}
            value={this.state.currentCard?.name}
            iconStyle={styles.search_icon}
            iconName={'edit'}
            iconColorHex={'#1abc9c'}
            iconSize={28}
          />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.btn_container}>
              <CustomButton
                style={
                  this.state.currentCard.isFavourite
                    ? { ...styles.button_style, backgroundColor: 'rgba(26, 188, 156, 0.2)' }
                    : styles.button_style
                }
                iconName={'grade'}
                iconColorHex={'#1abc9c'}
                iconSize={40}
                onPress={this.favCard}
              />
              <CustomButton
                style={styles.button_style}
                iconName={'delete'}
                iconColorHex={'#1abc9c'}
                iconSize={40}
                onPress={this.remove}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.list}>
            <Carousel
              data={this.state.isSearching ? this.state.filtered : this.props.cards}
              renderItem={this.renderCard}
              sliderWidth={width}
              itemWidth={width * 0.9}
              onSnapToItem={this.onSnap}
              ref={(c: any) => (this.carousel = c)}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
    width: width,
    alignItems: 'center',
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
    paddingTop: isAndroid ? -5 : 0,
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
  button_style: {
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

const mapStateToProps = (state: AppState): Partial<ListScreenProps> => ({
  cards: state.wallet.cards,
});

const mapDispatchToProps: Partial<ListScreenProps> = {
  load: load,
  add: add,
  remove: remove,
  edit: edit,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
