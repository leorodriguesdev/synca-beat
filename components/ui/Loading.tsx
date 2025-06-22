import React from 'react';
import {
    ActivityIndicator,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

export type LoadingVariant = 'default' | 'overlay' | 'inline' | 'minimal';
export type LoadingSize = 'small' | 'medium' | 'large';

export interface LoadingProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  text?: string;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  variant = 'default',
  size = 'medium',
  text,
  color,
  backgroundColor,
  textColor,
  style,
  textStyle,
  testID = 'loading',
  accessibilityLabel = 'Carregando',
}) => {
  const defaultColor = useThemeColor(
    { light: '#007AFF', dark: '#0A84FF' },
    'tint'
  );
  const defaultTextColor = useThemeColor(
    { light: '#000000', dark: '#ffffff' },
    'text'
  );
  const defaultBackgroundColor = useThemeColor(
    { light: '#ffffff', dark: '#000000' },
    'background'
  );

  const getSpinnerSize = () => {
    switch (size) {
      case 'small':
        return 'small' as const;
      case 'large':
        return 'large' as const;
      default:
        return 'small' as const;
    }
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
    };

    switch (variant) {
      case 'overlay':
        return {
          ...baseStyle,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: backgroundColor || 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          ...style,
        };
      
      case 'inline':
        return {
          ...baseStyle,
          flexDirection: 'row',
          backgroundColor: backgroundColor || 'transparent',
          ...style,
        };
      
      case 'minimal':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          ...style,
        };
      
      default:
        return {
          ...baseStyle,
          backgroundColor: backgroundColor || defaultBackgroundColor,
          padding: 24,
          borderRadius: 12,
          minWidth: 120,
          ...style,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      color: textColor || defaultTextColor,
      textAlign: 'center',
      ...textStyle,
    };

    switch (size) {
      case 'small':
        return {
          ...baseStyle,
          fontSize: 12,
          marginTop: variant === 'inline' ? 0 : 8,
          marginLeft: variant === 'inline' ? 8 : 0,
        };
      
      case 'large':
        return {
          ...baseStyle,
          fontSize: 18,
          fontWeight: '500',
          marginTop: variant === 'inline' ? 0 : 12,
          marginLeft: variant === 'inline' ? 12 : 0,
        };
      
      default:
        return {
          ...baseStyle,
          fontSize: 14,
          marginTop: variant === 'inline' ? 0 : 10,
          marginLeft: variant === 'inline' ? 10 : 0,
        };
    }
  };

  const renderContent = () => {
    if (variant === 'minimal') {
      return (
        <ActivityIndicator
          size={getSpinnerSize()}
          color={color || defaultColor}
          testID={`${testID}-spinner`}
        />
      );
    }

    if (variant === 'inline') {
      return (
        <>
          <ActivityIndicator
            size={getSpinnerSize()}
            color={color || defaultColor}
            testID={`${testID}-spinner`}
          />
          {text && (
            <Text style={getTextStyle()} testID={`${testID}-text`}>
              {text}
            </Text>
          )}
        </>
      );
    }

    return (
      <>
        <ActivityIndicator
          size={getSpinnerSize()}
          color={color || defaultColor}
          testID={`${testID}-spinner`}
        />
        {text && (
          <Text style={getTextStyle()} testID={`${testID}-text`}>
            {text}
          </Text>
        )}
      </>
    );
  };

  return (
    <View
      style={getContainerStyle()}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
    >
      {renderContent()}
    </View>
  );
}; 