import React from 'react';
import { StyleProp, ViewStyle, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InputProps {
  containerStyle: StyleProp<ViewStyle>;
  inputStyle: StyleProp<ViewStyle>;
  iconStyle: StyleProp<ViewStyle>;

  iconName: string;
  iconColorHex: string;
  iconSize: number;

  onChangeText?: (text: string) => void;
  onEndEdititng?: () => void;
  value?: string;
}

const Input = (props: InputProps) => {
  return (
    <View style={props.containerStyle}>
      <TextInput
        style={props.inputStyle}
        underlineColorAndroid={'transparent'}
        selectionColor={'#1abc9c'}
        onChangeText={props.onChangeText}
        onEndEditing={props.onEndEdititng}
        value={props.value}
        maxLength={50}
      />
      <View style={props.iconStyle}>
        <Icon name={props.iconName} size={props.iconSize} color={props.iconColorHex} />
      </View>
    </View>
  );
};

export default React.memo(Input);
