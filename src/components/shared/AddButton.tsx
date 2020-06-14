import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AddButtonProps {
  addAction?: () => void;
}

const AddButton = (props: AddButtonProps) => {
  return (
    <TouchableOpacity onPress={props.addAction}>
      <Icon color={'#1abc9c'} name={'add'} size={30} />
    </TouchableOpacity>
  );
};

export default React.memo(AddButton);
