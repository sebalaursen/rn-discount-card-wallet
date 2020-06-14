import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// interface LoadingIndicatorProps {
//   style: StyleProp<ViewStyle>;
//   colorHex: string;
// }

const AddButton = () => {
  return (
    <TouchableOpacity>
      <Icon color={'#1abc9c'} name={'add'} size={30} />
    </TouchableOpacity>
  );
};

export default React.memo(AddButton);
