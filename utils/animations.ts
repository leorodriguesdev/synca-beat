import * as Haptics from 'expo-haptics';
import { Animated, Easing } from 'react-native';

// Tipos de animações
export type AnimationType = 'fadeIn' | 'fadeOut' | 'slideIn' | 'slideOut' | 'scale' | 'bounce';
export type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

// Configurações de animação
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
};

export const EASING = {
  linear: Easing.linear,
  ease: Easing.ease,
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
  bounce: Easing.bounce,
  elastic: Easing.elastic(2),
};

// Animações básicas
export const createFadeAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = ANIMATION_DURATION.normal,
  easing: any = EASING.easeInOut
): Animated.CompositeAnimation => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing,
    useNativeDriver: true,
  });
};

export const createSlideAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = ANIMATION_DURATION.normal,
  easing: any = EASING.easeOut
): Animated.CompositeAnimation => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing,
    useNativeDriver: true,
  });
};

export const createScaleAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = ANIMATION_DURATION.fast,
  easing: any = EASING.easeOut
): Animated.CompositeAnimation => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing,
    useNativeDriver: true,
  });
};

export const createBounceAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = ANIMATION_DURATION.slow
): Animated.CompositeAnimation => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing: EASING.bounce,
    useNativeDriver: true,
  });
};

// Animações compostas
export const createSequenceAnimation = (
  animations: Animated.CompositeAnimation[]
): Animated.CompositeAnimation => {
  return Animated.sequence(animations);
};

export const createParallelAnimation = (
  animations: Animated.CompositeAnimation[]
): Animated.CompositeAnimation => {
  return Animated.parallel(animations);
};

export const createStaggerAnimation = (
  animations: Animated.CompositeAnimation[],
  staggerDelay: number = 100
): Animated.CompositeAnimation => {
  return Animated.stagger(staggerDelay, animations);
};

// Animações de loop
export const createLoopAnimation = (
  animation: Animated.CompositeAnimation,
  iterations?: number
): Animated.CompositeAnimation => {
  return Animated.loop(animation, { iterations });
};

// Feedback háptico
export const triggerHapticFeedback = async (type: HapticType): Promise<void> => {
  try {
    switch (type) {
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'selection':
        await Haptics.selectionAsync();
        break;
      case 'success':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      default:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  } catch (error) {
    console.warn('Haptic feedback not available:', error);
  }
};

// Animações predefinidas para componentes comuns
export const buttonPressAnimation = (scale: Animated.Value) => {
  return createSequenceAnimation([
    createScaleAnimation(scale, 0.95, ANIMATION_DURATION.fast),
    createScaleAnimation(scale, 1, ANIMATION_DURATION.fast),
  ]);
};

export const cardEnterAnimation = (
  opacity: Animated.Value,
  translateY: Animated.Value
) => {
  return createParallelAnimation([
    createFadeAnimation(opacity, 1),
    createSlideAnimation(translateY, 0),
  ]);
};

export const modalEnterAnimation = (
  opacity: Animated.Value,
  scale: Animated.Value
) => {
  return createParallelAnimation([
    createFadeAnimation(opacity, 1),
    createScaleAnimation(scale, 1, ANIMATION_DURATION.normal, EASING.elastic),
  ]);
};

export const loadingAnimation = (rotation: Animated.Value) => {
  return createLoopAnimation(
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      easing: EASING.linear,
      useNativeDriver: true,
    })
  );
};

// Hook para animações com estado
export const useAnimatedValue = (initialValue: number = 0) => {
  return new Animated.Value(initialValue);
};

// Interpolações úteis
export const createRotationInterpolation = (animatedValue: Animated.Value) => {
  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
};

export const createOpacityInterpolation = (
  animatedValue: Animated.Value,
  inputRange: number[] = [0, 1],
  outputRange: number[] = [0, 1]
) => {
  return animatedValue.interpolate({
    inputRange,
    outputRange,
  });
};

export const createTranslateInterpolation = (
  animatedValue: Animated.Value,
  inputRange: number[] = [0, 1],
  outputRange: number[] = [0, 100]
) => {
  return animatedValue.interpolate({
    inputRange,
    outputRange,
  });
}; 