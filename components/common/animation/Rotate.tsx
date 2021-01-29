import { Animated, Easing } from 'react-native';
import { randomBool } from '../../../utils';

interface IOption {
  duration: number;
  minValue: number;
  maxValue: number;
}

const defaultOption: IOption = {
  duration: 10000,
  minValue: -1,
  maxValue: 1
};

export const animateRotateInitThenLoop = (
  anim: Animated.Value,
  init: number,
  option: Partial<IOption> = {}
) => Animated.sequence([animateRotateInit(anim, init, option), animateRotateLoop(anim, option)]);

export const animateRotateInit = (
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
      easing: Easing.out((x) => x * x),
      useNativeDriver: true
    });
  }
  return Animated.sequence([
    Animated.timing(anim, {
      toValue: opt.minValue,
      duration: (opt.duration / 2) * progress,
      easing: Easing.out((x) => x * x),
      useNativeDriver: true
    }),
    Animated.timing(anim, {
      toValue: opt.maxValue,
      duration: opt.duration / 2,
      easing: Easing.out((x) => x * x),
      useNativeDriver: true
    })
  ]);
};

export const animateRotateLoop = (anim: Animated.Value, option: Partial<IOption> = {}) =>
  Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: option.minValue || defaultOption.minValue,
        duration: (option.duration || defaultOption.duration) / 2,
        easing: Easing.out((x) => x * x),
        useNativeDriver: true
      }),
      Animated.timing(anim, {
        toValue: option.maxValue || defaultOption.maxValue,
        duration: (option.duration || defaultOption.duration) / 2,
        easing: Easing.out((x) => x * x),
        useNativeDriver: true
      })
    ])
  );
