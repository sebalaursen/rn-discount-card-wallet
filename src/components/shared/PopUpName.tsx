import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TitleButton from './TitleButton';
import NavigationService from '../../services/NavigationService';
import Input from './Input';

interface PopUpMessageProps {
  componentId: string;
  code: string;
  onSave: (title: string, code: string) => void;
}

interface PopUpMessageState {
  name: string;
}

const { height, width } = Dimensions.get('screen');
const isAndroid = Platform.OS === 'android';

export default class PopUpName extends Component<PopUpMessageProps, PopUpMessageState> {
  constructor(props: PopUpMessageProps) {
    super(props);

    this.state = {
      name: '',
    };
  }

  private readonly onNameChange = (text: string) => {
    this.setState({ name: text });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.pop_up_title}>{'Name the card'}</Text>
          <Input
            containerStyle={{ ...styles.header, marginTop: 20 }}
            inputStyle={styles.title_input}
            onChangeText={this.onNameChange}
            value={this.state.name}
            iconStyle={styles.title_icon}
            iconName={'label'}
            iconColorHex={'#1abc9c'}
            iconSize={28}
          />
          <TitleButton
            title={'OK'}
            style={styles.close_button}
            textStyle={styles.btn_text}
            onPress={() => {
              this.props.onSave(this.state.name, this.props.code);
              NavigationService.shared.popModal();
            }}
          />
          <TitleButton
            title={'CANCEL'}
            style={{ ...styles.close_button, backgroundColor: '#FF3D2F' }}
            textStyle={styles.btn_text}
            onPress={() => NavigationService.shared.popModal()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: height * 0.3,
    borderRadius: 20,
  },
  pop_up_title: {
    fontSize: 16,
    marginVertical: 25,
  },
  header: {
    width: width * 0.8,
    height: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  close_button: {
    height: 56,
    width: width * 0.8,
    backgroundColor: '#1abc9c',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btn_text: {
    fontSize: 16,
    color: '#fff',
  },
  title_input: {
    flex: 1,
    marginLeft: 50,
    marginRight: 10,
    borderBottomColor: '#1abc9c',
    borderBottomWidth: 1,
    paddingTop: isAndroid ? -5 : 0,
  },
  title_icon: {
    position: 'absolute',
    top: 5,
    left: 12,
  },
});
