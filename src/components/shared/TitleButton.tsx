import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

interface CustomButtonProps {
  title: string;
  style: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  noFeedback?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  shadowStyles?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const CustomButton = (props: CustomButtonProps) => {
  if (props.noFeedback) {
    return (
      <TouchableWithoutFeedback onPress={props.onPress} style={props.shadowStyles} disabled={props.disabled}>
        <View style={props.style}>
          <Text style={props.textStyle}>{props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.onPress} style={props.shadowStyles} disabled={props.disabled}>
        <View style={props.style}>
          <Text style={props.textStyle}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export default React.memo(CustomButton);
