import React from 'react';
import {
    Pressable,
    View,
    ViewStyle
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  disabled = false,
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const { theme } = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    };

    const variantStyles: Record<CardVariant, ViewStyle> = {
      default: {
        ...theme.shadows.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      elevated: {
        ...theme.shadows.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      outlined: {
        borderWidth: 2,
        borderColor: theme.colors.border,
      },
      flat: {
        backgroundColor: theme.colors.backgroundSecondary,
      },
    };

    const disabledStyle: ViewStyle = disabled ? {
      opacity: 0.5,
    } : {};

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...disabledStyle,
      ...style,
    };
  };

  const getAccessibilityRole = () => {
    return onPress ? 'button' : undefined;
  };

  const getAccessibilityState = () => {
    if (!onPress) return undefined;
    
    return {
      disabled,
    };
  };

  if (onPress) {
    return (
      <Pressable
        style={getCardStyle()}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole={getAccessibilityRole()}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={getAccessibilityState()}
        testID={testID}
        android_ripple={{ color: theme.colors.primary + '20' }}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={getCardStyle()}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
}; 