import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CustomButtonProps {
  style: StyleProp<ViewStyle>;
  iconName: string;
  iconColorHex: string;
  iconSize: number
  onPress: () => void;
}

const CustomButton = (props: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={props.style}>
        <Icon name={props.iconName} color={props.iconColorHex} size={props.iconSize} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CustomButton);
