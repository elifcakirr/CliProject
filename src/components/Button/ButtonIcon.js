import React from 'react';
import { Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function ButtonIcon({ onPress, iconName, text }) {
    return (
        <Pressable onPress={onPress}>
            <Icon name={iconName} size={30} />
            <Text>{text} </Text>
        </Pressable>
    );
}

export default ButtonIcon;