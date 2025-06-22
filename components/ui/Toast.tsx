import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
  position?: 'top' | 'bottom';
  showCloseButton?: boolean;
  testID?: string;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
  position = 'top',
  showCloseButton = false,
  testID = 'toast',
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Cores do tema (não utilizadas diretamente neste componente)
  // const backgroundColor = useThemeColor({}, 'background');
  // const textColor = useThemeColor({}, 'text');

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#10B981',
          borderColor: '#059669',
        };
      case 'error':
        return {
          backgroundColor: '#EF4444',
          borderColor: '#DC2626',
        };
      case 'warning':
        return {
          backgroundColor: '#F59E0B',
          borderColor: '#D97706',
        };
      case 'info':
      default:
        return {
          backgroundColor: '#3B82F6',
          borderColor: '#2563EB',
        };
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  const showToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    }
  };

  const hideToast = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  useEffect(() => {
    if (visible) {
      showToast();
    } else {
      hideToast();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  const typeStyles = getTypeStyles();
  const positionStyles = position === 'top' 
    ? { top: 50 } 
    : { bottom: 50 };

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: 16,
          right: 16,
          zIndex: 9999,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        positionStyles,
      ]}
      testID={testID}
    >
      <View
        className="flex-row items-center p-4 rounded-lg border-l-4 shadow-lg"
        style={{
          backgroundColor: `${typeStyles.backgroundColor}E6`,
          borderLeftColor: typeStyles.borderColor,
        }}
      >
        {/* Icon */}
        <View className="mr-3">
          <ThemedText 
            className="text-lg font-bold"
            style={{ color: '#FFFFFF' }}
          >
            {getTypeIcon()}
          </ThemedText>
        </View>

        {/* Message */}
        <View className="flex-1">
          <ThemedText 
            className="text-sm font-medium"
            style={{ color: '#FFFFFF' }}
          >
            {message}
          </ThemedText>
        </View>

        {/* Close Button */}
        {showCloseButton && (
          <TouchableOpacity
            onPress={hideToast}
            className="ml-3 p-1"
            testID={`${testID}-close-button`}
          >
            <ThemedText 
              className="text-lg font-bold"
              style={{ color: '#FFFFFF' }}
            >
              ×
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default Toast; 