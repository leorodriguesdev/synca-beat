import React from 'react';
import {
    StatusBar,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useThemeColor } from '../../hooks/useThemeColor';

export type HeaderVariant = 'default' | 'large' | 'compact';

export interface HeaderAction {
  icon?: React.ReactNode;
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  variant?: HeaderVariant;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  variant = 'default',
  showBackButton = false,
  onBackPress,
  rightComponent,
  leftComponent,
  backgroundColor,
  titleColor,
  subtitleColor,
  style,
  titleStyle,
  subtitleStyle,
  testID,
  accessibilityLabel,
}) => {
  const { theme, isDark } = useTheme();
  const defaultBackgroundColor = useThemeColor(
    { light: '#ffffff', dark: '#000000' },
    'background'
  );
  const defaultTitleColor = useThemeColor(
    { light: '#000000', dark: '#ffffff' },
    'text'
  );
  const defaultSubtitleColor = useThemeColor(
    { light: '#666666', dark: '#999999' },
    'text'
  );

  const getHeaderHeight = () => {
    switch (variant) {
      case 'large':
        return subtitle ? 120 : 96;
      case 'compact':
        return 48;
      default:
        return subtitle ? 80 : 56;
    }
  };

  const getTitleSize = () => {
    switch (variant) {
      case 'large':
        return 28;
      case 'compact':
        return 16;
      default:
        return 20;
    }
  };

  const getSubtitleSize = () => {
    switch (variant) {
      case 'large':
        return 16;
      case 'compact':
        return 12;
      default:
        return 14;
    }
  };

  const headerStyles: ViewStyle = {
    height: getHeaderHeight(),
    backgroundColor: backgroundColor || defaultBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: variant === 'large' ? 16 : 8,
    paddingBottom: variant === 'large' ? 16 : 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    ...style,
  };

  const titleStyles: TextStyle = {
    fontSize: getTitleSize(),
    fontWeight: variant === 'large' ? '700' : '600',
    color: titleColor || defaultTitleColor,
    ...titleStyle,
  };

  const subtitleStyles: TextStyle = {
    fontSize: getSubtitleSize(),
    fontWeight: '400',
    color: subtitleColor || defaultSubtitleColor,
    marginTop: 4,
    ...subtitleStyle,
  };

  const BackButton = () => (
    <TouchableOpacity
      onPress={onBackPress}
      style={{
        padding: 8,
        marginLeft: -8,
      }}
      testID={`${testID}-back-button`}
    >
      <Text style={{ fontSize: 18, color: defaultTitleColor }}>←</Text>
    </TouchableOpacity>
  );

  const renderLeftSection = () => {
    if (showBackButton && onBackPress) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <BackButton />
          {leftComponent}
          
          <View style={{ flex: 1, marginLeft: showBackButton || leftComponent ? 12 : 0 }}>
            <Text style={titleStyles} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={subtitleStyles} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      );
    }

    if (leftComponent) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {leftComponent}
          
          <View style={{ flex: 1, marginLeft: leftComponent ? 12 : 0 }}>
            <Text style={titleStyles} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={subtitleStyles} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      );
    }

    return <View style={{ flex: 1, marginLeft: showBackButton ? 12 : 0 }}>
      <Text style={titleStyles} numberOfLines={1}>
        {title}
      </Text>
      {subtitle && (
        <Text style={subtitleStyles} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </View>;
  };

  const renderRightSection = () => {
    if (rightComponent) {
      return (
        <View style={{ marginLeft: 12 }}>
          {rightComponent}
        </View>
      );
    }

    return <View style={{ width: 60 }} />;
  };

  return (
    <View
      style={headerStyles}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      {renderLeftSection()}
      
      {renderRightSection()}
    </View>
  );
}; 