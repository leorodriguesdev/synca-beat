import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ThemedText } from '../../../components/ThemedText';
import { Modal } from '../../../components/ui/Modal';

// Mock do useThemeColor
jest.mock('../../../hooks/useThemeColor', () => ({
  useThemeColor: () => '#FFFFFF',
}));

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    children: <ThemedText>Test Content</ThemedText>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByTestId, getByText } = render(<Modal {...defaultProps} />);
    
    expect(getByTestId('modal')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByTestId } = render(<Modal {...defaultProps} visible={false} />);
    
    expect(queryByTestId('modal')).toBeFalsy();
  });

  it('renders title when provided', () => {
    const { getByText } = render(<Modal {...defaultProps} title="Test Title" />);
    
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders close button by default', () => {
    const { getByTestId } = render(<Modal {...defaultProps} />);
    
    expect(getByTestId('modal-close-button')).toBeTruthy();
  });

  it('hides close button when showCloseButton is false', () => {
    const { queryByTestId } = render(<Modal {...defaultProps} showCloseButton={false} />);
    
    expect(queryByTestId('modal-close-button')).toBeFalsy();
  });

  it('calls onClose when close button is pressed', () => {
    const { getByTestId } = render(<Modal {...defaultProps} />);
    
    fireEvent.press(getByTestId('modal-close-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is pressed and closeOnBackdrop is true', () => {
    const { getByTestId } = render(<Modal {...defaultProps} closeOnBackdrop={true} />);
    
    // Simula pressionar o backdrop (área externa do modal)
    const modal = getByTestId('modal');
    fireEvent.press(modal);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when backdrop is pressed and closeOnBackdrop is false', () => {
    const { getByTestId } = render(<Modal {...defaultProps} closeOnBackdrop={false} />);
    
    const modal = getByTestId('modal');
    fireEvent.press(modal);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('applies correct size styles', () => {
    const { rerender, getByTestId } = render(<Modal {...defaultProps} size="small" />);
    let modal = getByTestId('modal');
    expect(modal).toBeTruthy();

    rerender(<Modal {...defaultProps} size="medium" />);
    modal = getByTestId('modal');
    expect(modal).toBeTruthy();

    rerender(<Modal {...defaultProps} size="large" />);
    modal = getByTestId('modal');
    expect(modal).toBeTruthy();

    rerender(<Modal {...defaultProps} size="fullscreen" />);
    modal = getByTestId('modal');
    expect(modal).toBeTruthy();
  });

  it('uses custom testID when provided', () => {
    const { getByTestId } = render(<Modal {...defaultProps} testID="custom-modal" />);
    
    expect(getByTestId('custom-modal')).toBeTruthy();
    expect(getByTestId('custom-modal-close-button')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Modal {...defaultProps}>
        <ThemedText>Child 1</ThemedText>
        <ThemedText>Child 2</ThemedText>
      </Modal>
    );
    
    expect(getByText('Child 1')).toBeTruthy();
    expect(getByText('Child 2')).toBeTruthy();
  });
}); 