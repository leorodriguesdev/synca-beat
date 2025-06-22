import * as Haptics from 'expo-haptics';
import { Animated } from 'react-native';
import {
    ANIMATION_DURATION,
    buttonPressAnimation,
    cardEnterAnimation,
    createBounceAnimation,
    createFadeAnimation,
    createLoopAnimation,
    createOpacityInterpolation,
    createParallelAnimation,
    createRotationInterpolation,
    createScaleAnimation,
    createSequenceAnimation,
    createSlideAnimation,
    createStaggerAnimation,
    createTranslateInterpolation,
    EASING,
    loadingAnimation,
    modalEnterAnimation,
    triggerHapticFeedback,
    useAnimatedValue,
} from '../../../utils/animations';

// Mock do Animated
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Animated: {
      ...RN.Animated,
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      sequence: jest.fn(() => ({
        start: jest.fn(),
      })),
      parallel: jest.fn(() => ({
        start: jest.fn(),
      })),
      stagger: jest.fn(() => ({
        start: jest.fn(),
      })),
      loop: jest.fn(() => ({
        start: jest.fn(),
      })),
      Value: jest.fn(() => ({
        interpolate: jest.fn(),
      })),
    },
  };
});

// Mock do expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  selectionAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

describe('Animations Utils', () => {
  let mockAnimatedValue: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAnimatedValue = new Animated.Value(0);
  });

  describe('Constants', () => {
    it('should have correct animation durations', () => {
      expect(ANIMATION_DURATION.fast).toBe(200);
      expect(ANIMATION_DURATION.normal).toBe(300);
      expect(ANIMATION_DURATION.slow).toBe(500);
    });

    it('should have correct easing functions', () => {
      expect(EASING.linear).toBeDefined();
      expect(EASING.ease).toBeDefined();
      expect(EASING.easeIn).toBeDefined();
      expect(EASING.easeOut).toBeDefined();
      expect(EASING.easeInOut).toBeDefined();
      expect(EASING.bounce).toBeDefined();
      expect(EASING.elastic).toBeDefined();
    });
  });

  describe('Basic Animations', () => {
    it('should create fade animation', () => {
      const animation = createFadeAnimation(mockAnimatedValue, 1);
      
      expect(Animated.timing).toHaveBeenCalledWith(mockAnimatedValue, {
        toValue: 1,
        duration: ANIMATION_DURATION.normal,
        easing: EASING.easeInOut,
        useNativeDriver: true,
      });
    });

    it('should create slide animation', () => {
      const animation = createSlideAnimation(mockAnimatedValue, 100);
      
      expect(Animated.timing).toHaveBeenCalledWith(mockAnimatedValue, {
        toValue: 100,
        duration: ANIMATION_DURATION.normal,
        easing: EASING.easeOut,
        useNativeDriver: true,
      });
    });

    it('should create scale animation', () => {
      const animation = createScaleAnimation(mockAnimatedValue, 1.2);
      
      expect(Animated.timing).toHaveBeenCalledWith(mockAnimatedValue, {
        toValue: 1.2,
        duration: ANIMATION_DURATION.fast,
        easing: EASING.easeOut,
        useNativeDriver: true,
      });
    });

    it('should create bounce animation', () => {
      const animation = createBounceAnimation(mockAnimatedValue, 1);
      
      expect(Animated.timing).toHaveBeenCalledWith(mockAnimatedValue, {
        toValue: 1,
        duration: ANIMATION_DURATION.slow,
        easing: EASING.bounce,
        useNativeDriver: true,
      });
    });
  });

  describe('Composite Animations', () => {
    it('should create sequence animation', () => {
      const animations = [
        createFadeAnimation(mockAnimatedValue, 1),
        createScaleAnimation(mockAnimatedValue, 1.2),
      ];
      
      createSequenceAnimation(animations);
      
      expect(Animated.sequence).toHaveBeenCalledWith(animations);
    });

    it('should create parallel animation', () => {
      const animations = [
        createFadeAnimation(mockAnimatedValue, 1),
        createScaleAnimation(mockAnimatedValue, 1.2),
      ];
      
      createParallelAnimation(animations);
      
      expect(Animated.parallel).toHaveBeenCalledWith(animations);
    });

    it('should create stagger animation', () => {
      const animations = [
        createFadeAnimation(mockAnimatedValue, 1),
        createScaleAnimation(mockAnimatedValue, 1.2),
      ];
      
      createStaggerAnimation(animations, 150);
      
      expect(Animated.stagger).toHaveBeenCalledWith(150, animations);
    });

    it('should create loop animation', () => {
      const animation = createFadeAnimation(mockAnimatedValue, 1);
      
      createLoopAnimation(animation, 3);
      
      expect(Animated.loop).toHaveBeenCalledWith(animation, { iterations: 3 });
    });
  });

  describe('Haptic Feedback', () => {
    it('should trigger light haptic feedback', async () => {
      await triggerHapticFeedback('light');
      
      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    });

    it('should trigger medium haptic feedback', async () => {
      await triggerHapticFeedback('medium');
      
      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
    });

    it('should trigger heavy haptic feedback', async () => {
      await triggerHapticFeedback('heavy');
      
      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
    });

    it('should trigger selection haptic feedback', async () => {
      await triggerHapticFeedback('selection');
      
      expect(Haptics.selectionAsync).toHaveBeenCalled();
    });

    it('should trigger success haptic feedback', async () => {
      await triggerHapticFeedback('success');
      
      expect(Haptics.notificationAsync).toHaveBeenCalledWith(Haptics.NotificationFeedbackType.Success);
    });

    it('should trigger warning haptic feedback', async () => {
      await triggerHapticFeedback('warning');
      
      expect(Haptics.notificationAsync).toHaveBeenCalledWith(Haptics.NotificationFeedbackType.Warning);
    });

    it('should trigger error haptic feedback', async () => {
      await triggerHapticFeedback('error');
      
      expect(Haptics.notificationAsync).toHaveBeenCalledWith(Haptics.NotificationFeedbackType.Error);
    });

    it('should handle haptic feedback errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      (Haptics.impactAsync as jest.Mock).mockRejectedValue(new Error('Haptic not available'));
      
      await triggerHapticFeedback('light');
      
      expect(consoleSpy).toHaveBeenCalledWith('Haptic feedback not available:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('Predefined Animations', () => {
    it('should create button press animation', () => {
      buttonPressAnimation(mockAnimatedValue);
      
      expect(Animated.sequence).toHaveBeenCalled();
    });

    it('should create card enter animation', () => {
      const opacity = new Animated.Value(0);
      const translateY = new Animated.Value(50);
      
      cardEnterAnimation(opacity, translateY);
      
      expect(Animated.parallel).toHaveBeenCalled();
    });

    it('should create modal enter animation', () => {
      const opacity = new Animated.Value(0);
      const scale = new Animated.Value(0.8);
      
      modalEnterAnimation(opacity, scale);
      
      expect(Animated.parallel).toHaveBeenCalled();
    });

    it('should create loading animation', () => {
      const rotation = new Animated.Value(0);
      
      loadingAnimation(rotation);
      
      expect(Animated.loop).toHaveBeenCalled();
    });
  });

  describe('Utility Functions', () => {
    it('should create animated value', () => {
      const value = useAnimatedValue(0.5);
      
      expect(Animated.Value).toHaveBeenCalledWith(0.5);
    });

    it('should create rotation interpolation', () => {
      const mockInterpolate = jest.fn();
      mockAnimatedValue.interpolate = mockInterpolate;
      
      createRotationInterpolation(mockAnimatedValue);
      
      expect(mockInterpolate).toHaveBeenCalledWith({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });
    });

    it('should create opacity interpolation', () => {
      const mockInterpolate = jest.fn();
      mockAnimatedValue.interpolate = mockInterpolate;
      
      createOpacityInterpolation(mockAnimatedValue, [0, 1], [0, 1]);
      
      expect(mockInterpolate).toHaveBeenCalledWith({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });
    });

    it('should create translate interpolation', () => {
      const mockInterpolate = jest.fn();
      mockAnimatedValue.interpolate = mockInterpolate;
      
      createTranslateInterpolation(mockAnimatedValue, [0, 1], [0, 100]);
      
      expect(mockInterpolate).toHaveBeenCalledWith({
        inputRange: [0, 1],
        outputRange: [0, 100],
      });
    });
  });
}); 