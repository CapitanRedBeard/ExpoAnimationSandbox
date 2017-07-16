import React, { Component } from 'react';
import {
    StyleSheet,
    Text
} from 'react-native'

const TextComponent = ({children, style}) => {
  return  <Text style={[styles.text, style]}>{children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Futura-Medium"
    }
});

export default TextComponent;
