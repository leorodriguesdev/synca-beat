import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Toast } from '../../../components/ui/Toast';

// Mock das animações
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Animated: {
      ...RN.Animated,
      timing: jest.fn(() => ({
        start: jest.fn((callback) => callback && callback()),
      })),
      parallel: jest.fn((animations) => ({
        start: jest.fn((callback) => callback && callback()),
      })),
      Value: jest.fn(() => ({
        interpolate: jest.fn(),
      })),
    },
  };
});

describe('Toast Component', () => {
  const mockOnHide = jest.fn();
  const defaultProps = {
    visible: true,
    message: 'Test message',
    onHide: mockOnHide,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly when visible', () => {
    const { getByTestId, getByText } = render(<Toast {...defaultProps} />);
    
    expect(getByTestId('toast')).toBeTruthy();
    expect(getByText('Test message')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByTestId } = render(<Toast {...defaultProps} visible={false} />);
    
    expect(queryByTestId('toast')).toBeFalsy();
  });

  it('renders different types correctly', () => {
    const { rerender, getByText } = render(<Toast {...defaultProps} type="success" />);
    expect(getByText('✓')).toBeTruthy();

    rerender(<Toast {...defaultProps} type="error" />);
    expect(getByText('✕')).toBeTruthy();

    rerender(<Toast {...defaultProps} type="warning" />);
    expect(getByText('⚠')).toBeTruthy();

    rerender(<Toast {...defaultProps} type="info" />);
    expect(getByText('ℹ')).toBeTruthy();
  });

  it('auto-hides after duration', () => {
    render(<Toast {...defaultProps} duration={1000} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('does not auto-hide when duration is 0', () => {
    render(<Toast {...defaultProps} duration={0} />);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    expect(mockOnHide).not.toHaveBeenCalled();
  });

  it('renders close button when showCloseButton is true', () => {
    const { getByTestId } = render(<Toast {...defaultProps} showCloseButton={true} />);
    
    expect(getByTestId('toast-close-button')).toBeTruthy();
  });

  it('hides close button by default', () => {
    const { queryByTestId } = render(<Toast {...defaultProps} />);
    
    expect(queryByTestId('toast-close-button')).toBeFalsy();
  });

  it('calls onHide when close button is pressed', () => {
    const { getByTestId } = render(<Toast {...defaultProps} showCloseButton={true} />);
    
    fireEvent.press(getByTestId('toast-close-button'));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('uses custom testID when provided', () => {
    const { getByTestId } = render(<Toast {...defaultProps} testID="custom-toast" />);
    
    expect(getByTestId('custom-toast')).toBeTruthy();
  });

  it('applies correct position styles', () => {
    const { rerender, getByTestId } = render(<Toast {...defaultProps} position="top" />);
    let toast = getByTestId('toast');
    expect(toast).toBeTruthy();

    rerender(<Toast {...defaultProps} position="bottom" />);
    toast = getByTestId('toast');
    expect(toast).toBeTruthy();
  });

  it('clears timeout when component unmounts', () => {
    const { unmount } = render(<Toast {...defaultProps} duration={1000} />);
    
    unmount();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(mockOnHide).not.toHaveBeenCalled();
  });

  it('handles visibility changes correctly', () => {
    const { rerender } = render(<Toast {...defaultProps} visible={false} />);
    
    rerender(<Toast {...defaultProps} visible={true} />);
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });
}); 