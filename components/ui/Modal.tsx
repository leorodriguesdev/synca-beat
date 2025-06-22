import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Modal as RNModal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  animationType?: 'slide' | 'fade' | 'none';
  transparent?: boolean;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  testID?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  animationType = 'fade',
  transparent = true,
  closeOnBackdrop = true,
  showCloseButton = true,
  size = 'medium',
  testID = 'modal',
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const overlayColor = useThemeColor({}, 'tabIconDefault');

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'w-3/4 max-h-1/3';
      case 'medium':
        return 'w-5/6 max-h-1/2';
      case 'large':
        return 'w-11/12 max-h-3/4';
      case 'fullscreen':
        return 'w-full h-full';
      default:
        return 'w-5/6 max-h-1/2';
    }
  };

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onClose}
      testID={testID}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View 
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: `${overlayColor}50` }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <ThemedView 
              className={`${getSizeStyles()} rounded-lg p-6 shadow-lg`}
              style={{ backgroundColor }}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <View className="flex-row justify-between items-center mb-4">
                  {title && (
                    <ThemedText 
                      className="text-lg font-semibold flex-1"
                      style={{ color: textColor }}
                    >
                      {title}
                    </ThemedText>
                  )}
                  {showCloseButton && (
                    <TouchableOpacity
                      onPress={onClose}
                      className="p-2 rounded-full"
                      testID={`${testID}-close-button`}
                    >
                      <ThemedText 
                        className="text-xl font-bold"
                        style={{ color: textColor }}
                      >
                        ×
                      </ThemedText>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Content */}
              <View className="flex-1">
                {children}
              </View>
            </ThemedView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal; 