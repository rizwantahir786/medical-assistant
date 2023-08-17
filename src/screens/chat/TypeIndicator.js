import React, { useRef, useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import { styles } from './styles';

function TypeIndicator() {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;
  
    const animateDots = (dot, delay) => {
      Animated.sequence([
        Animated.timing(dot, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          delay: delay
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => {
        animateDots(dot, delay);
      });
    };
  
    useEffect(() => {
      animateDots(dot1, 0);
      animateDots(dot2, 150);
      animateDots(dot3, 300);
    }, []);
  
    return (
      <View style={styles.typingContainer}>
        <Text style={styles.headerTypingText}>Typing</Text>
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { transform: [{ translateY: dot1.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ translateY: dot2.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ translateY: dot3.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] }]} />
        </View>
      </View>
    );
}

export default TypeIndicator;
