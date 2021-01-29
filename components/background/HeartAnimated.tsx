import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';
import { useWindowDimensions, Animated, Easing } from 'react-native';
import {
  animateOpacityInitThenLoop,
  animateRotateInitThenLoop,
  animateScaleInitThenLoop,
  animateTranslateInitThenLoop
} from '../common/animation';
import { random } from '../../utils';

const IconAnimatedView = styled(Animated.View)`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
`;

export const HeartAnimated = () => {
  const { width, height } = useWindowDimensions();
  const fadeAnimInitValue = useMemo(() => random(0, 1), []);
  const fadeAnim = useRef(new Animated.Value(fadeAnimInitValue)).current;
  const rotateAnimInitValue = useMemo(() => random(-1, 1), []);
  const rotateAnim = useRef(new Animated.Value(rotateAnimInitValue)).current;
  const scaleAnimInitValue = useMemo(() => random(0, 1), []);
  const scaleAnim = useRef(new Animated.Value(scaleAnimInitValue)).current;
  const translationXInitValue = useMemo(() => random(0, 1), []);
  const translationXAnim = useRef(new Animated.Value(translationXInitValue)).current;
  const translationYInitValue = useMemo(() => random(0, 1), []);
  const translationYAnim = useRef(new Animated.Value(translationYInitValue)).current;

  useEffect(() => {
    Animated.parallel([
      animateOpacityInitThenLoop(fadeAnim, fadeAnimInitValue),
      animateRotateInitThenLoop(rotateAnim, rotateAnimInitValue),
      animateScaleInitThenLoop(scaleAnim, scaleAnimInitValue),
      animateTranslateInitThenLoop(translationXAnim, translationXInitValue),
      animateTranslateInitThenLoop(translationYAnim, translationYInitValue, { duration: 20000 })
    ]).start();
  }, []);

  return (
    <IconAnimatedView
      style={{
        opacity: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1]
        }),
        transform: [
          {
            translateX: translationXAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width - 50]
            })
          },
          {
            translateY: translationYAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, height - 50]
            })
          },
          {
            rotate: rotateAnim.interpolate({
              inputRange: [-1, 1],
              outputRange: ['-40deg', '40deg']
            })
          },
          {
            scale: scaleAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1.3]
            })
          }
        ]
      }}>
      <Icon name="favorite" type="material" color="#ff9999" size={50} />
    </IconAnimatedView>
  );
};

export const MemoHearthAnimated = memo(HeartAnimated);
