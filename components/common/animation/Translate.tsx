import { Animated, Easing } from 'react-native';
import { randomBool } from '../../../utils';

interface IOption {
  duration: number;
  minValue: number;
  maxValue: number;
}

const defaultOption: IOption = {
  duration: 10000,
  minValue: 0,
  maxValue: 1
};

export const animateTranslateInitThenLoop = (
  anim: Animated.Value,
  init: number,
  option: Partial<IOption> = {}
) =>
  Animated.sequence([animateTranslateInit(anim, init, option), animateTranslateLoop(anim, option)]);

export const animateTranslateInit = (
  anim: Animated.Value,
  init: number,
  option: Partial<IOption> = {}
) => {
  const opt = { ...defaultOption, ...option };
  const progress = (init - opt.minValue) / (opt.maxValue - opt.minValue);

  if (randomBool()) {
    return Animated.timing(anim, {
      toValue: opt.maxValue,
      duration: (opt.duration / 2) * (1 - progress),
      easing: Easing.linear,
      useNativeDriver: true
    });
  }
  return Animated.sequence([
    Animated.timing(anim, {
      toValue: opt.minValue,
      duration: (opt.duration / 2) * progress,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    Animated.timing(anim, {
      toValue: opt.maxValue,
      duration: opt.duration / 2,
      easing: Easing.linear,
      useNativeDriver: true
    })
  ]);
};

export const animateTranslateLoop = (anim: Animated.Value, option: Partial<IOption> = {}) =>
  Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: option.minValue || defaultOption.minValue,
        duration: (option.duration || defaultOption.duration) / 2,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(anim, {
        toValue: option.maxValue || defaultOption.maxValue,
        duration: (option.duration || defaultOption.duration) / 2,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ])
  );
