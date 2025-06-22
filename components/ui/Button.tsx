import React from 'react';
import {
    AccessibilityRole,
    ActivityIndicator,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) => {
  const { theme } = useTheme();

  const isDisabled = disabled || loading;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...(fullWidth && { width: '100%' }),
    };

    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        minHeight: 32,
      },
      md: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 44,
      },
      lg: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 56,
      },
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: isDisabled ? theme.colors.textTertiary : theme.colors.primary,
        ...theme.shadows.sm,
      },
      secondary: {
        backgroundColor: isDisabled ? theme.colors.backgroundTertiary : theme.colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: isDisabled ? theme.colors.textTertiary : theme.colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      danger: {
        backgroundColor: isDisabled ? theme.colors.textTertiary : theme.colors.error,
        ...theme.shadows.sm,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...style,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    const sizeStyles: Record<ButtonSize, TextStyle> = {
      sm: {
        fontSize: 14,
        lineHeight: 20,
      },
      md: {
        fontSize: 16,
        lineHeight: 24,
      },
      lg: {
        fontSize: 18,
        lineHeight: 28,
      },
    };

    const variantStyles: Record<ButtonVariant, TextStyle> = {
      primary: {
        color: '#ffffff',
      },
      secondary: {
        color: isDisabled ? theme.colors.textTertiary : theme.colors.text,
      },
      outline: {
        color: isDisabled ? theme.colors.textTertiary : theme.colors.primary,
      },
      ghost: {
        color: isDisabled ? theme.colors.textTertiary : theme.colors.primary,
      },
      danger: {
        color: '#ffffff',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...textStyle,
    };
  };

  const getAccessibilityRole = (): AccessibilityRole => {
    return 'button';
  };

  const getAccessibilityState = () => ({
    disabled: isDisabled,
    busy: loading,
  });

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole={getAccessibilityRole()}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={getAccessibilityState()}
      testID={testID || 'button'}
      activeOpacity={0.7}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? '#ffffff' : theme.colors.primary}
          style={{ marginRight: theme.spacing.xs }}
          testID="activity-indicator"
        />
      )}
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}; 