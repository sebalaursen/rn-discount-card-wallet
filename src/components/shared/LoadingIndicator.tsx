import React from 'react';
import { StyleProp, View, ViewStyle, ActivityIndicator } from 'react-native';

interface LoadingIndicatorProps {
  style: StyleProp<ViewStyle>;
  colorHex: string;
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
  return (
    <View style={props.style}>
      <ActivityIndicator size="large" color={props.colorHex} />
    </View>
  );
};

export default React.memo(LoadingIndicator);
