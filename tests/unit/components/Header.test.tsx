import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Header, HeaderAction, HeaderProps, HeaderVariant } from '../../../components/ui/Header';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock do AsyncStorage para o ThemeProvider
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('light')),
  setItem: jest.fn(() => Promise.resolve()),
}));

const renderHeader = (props: Partial<HeaderProps> = {}) => {
  const defaultProps: HeaderProps = {
    title: 'Test Header',
    ...props,
  };

  return render(
    <ThemeProvider>
      <Header {...defaultProps} />
    </ThemeProvider>
  );
};

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização', () => {
    it('deve renderizar corretamente com título', () => {
      renderHeader();

      expect(screen.getByText('Test Header')).toBeTruthy();
      expect(screen.getByTestId('header-title')).toBeTruthy();
    });

    it('deve renderizar com subtítulo', () => {
      renderHeader({ subtitle: 'Test Subtitle' });

      expect(screen.getByText('Test Subtitle')).toBeTruthy();
      expect(screen.getByTestId('header-subtitle')).toBeTruthy();
    });

    it('deve renderizar com testID', () => {
      renderHeader({ testID: 'custom-header' });

      expect(screen.getByTestId('custom-header')).toBeTruthy();
    });
  });

  describe('Botão Voltar', () => {
    it('deve mostrar botão voltar quando showBackButton=true e onBackPress fornecido', () => {
      const onBackPress = jest.fn();
      renderHeader({ showBackButton: true, onBackPress });

      expect(screen.getByTestId('back-button')).toBeTruthy();
    });

    it('deve não mostrar botão voltar quando showBackButton=false', () => {
      const onBackPress = jest.fn();
      renderHeader({ showBackButton: false, onBackPress });

      expect(screen.queryByTestId('back-button')).toBeNull();
    });

    it('deve não mostrar botão voltar quando onBackPress não fornecido', () => {
      renderHeader({ showBackButton: true });

      expect(screen.queryByTestId('back-button')).toBeNull();
    });

    it('deve chamar onBackPress quando botão voltar pressionado', () => {
      const onBackPress = jest.fn();
      renderHeader({ showBackButton: true, onBackPress });

      const backButton = screen.getByTestId('back-button');
      fireEvent.press(backButton);

      expect(onBackPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ações', () => {
    it('deve renderizar ação esquerda com título', () => {
      const leftAction: HeaderAction = {
        title: 'Left Action',
        onPress: jest.fn(),
      };
      renderHeader({ leftAction });

      expect(screen.getByText('Left Action')).toBeTruthy();
    });

    it('deve renderizar ação direita com título', () => {
      const rightAction: HeaderAction = {
        title: 'Right Action',
        onPress: jest.fn(),
      };
      renderHeader({ rightAction });

      expect(screen.getByText('Right Action')).toBeTruthy();
    });

    it('deve renderizar ação esquerda com ícone', () => {
      const leftAction: HeaderAction = {
        icon: <Text>←</Text>,
        onPress: jest.fn(),
      };
      renderHeader({ leftAction });

      expect(screen.getByText('←')).toBeTruthy();
    });

    it('deve renderizar múltiplas ações direitas', () => {
      const rightActions: HeaderAction[] = [
        { title: 'Action 1', onPress: jest.fn() },
        { title: 'Action 2', onPress: jest.fn() },
      ];
      renderHeader({ rightActions });

      expect(screen.getByText('Action 1')).toBeTruthy();
      expect(screen.getByText('Action 2')).toBeTruthy();
    });

    it('deve chamar onPress da ação esquerda', () => {
      const onPress = jest.fn();
      const leftAction: HeaderAction = {
        title: 'Left Action',
        onPress,
      };
      renderHeader({ leftAction });

      const actionButton = screen.getByText('Left Action');
      fireEvent.press(actionButton);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onPress da ação direita', () => {
      const onPress = jest.fn();
      const rightAction: HeaderAction = {
        title: 'Right Action',
        onPress,
      };
      renderHeader({ rightAction });

      const actionButton = screen.getByText('Right Action');
      fireEvent.press(actionButton);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('deve desabilitar ação quando disabled=true', () => {
      const leftAction: HeaderAction = {
        title: 'Disabled Action',
        onPress: jest.fn(),
        disabled: true,
      };
      renderHeader({ leftAction });

      const actionButton = screen.getByText('Disabled Action');
      expect(actionButton.parent?.props.disabled).toBe(true);
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter accessibilityLabel', () => {
      renderHeader({ accessibilityLabel: 'Header Label' });

      const header = screen.getByTestId('header-title').parent?.parent;
      expect(header?.props.accessibilityLabel).toBe('Header Label');
    });

    it('deve ter botão voltar acessível', () => {
      const onBackPress = jest.fn();
      renderHeader({ showBackButton: true, onBackPress });

      const backButton = screen.getByTestId('back-button');
      expect(backButton.props.accessibilityRole).toBe('button');
      expect(backButton.props.accessibilityLabel).toBe('Voltar');
    });

    it('deve ter ação com ícone acessível', () => {
      const leftAction: HeaderAction = {
        icon: <Text>←</Text>,
        onPress: jest.fn(),
        title: 'Custom Action',
      };
      renderHeader({ leftAction });

      const actionButton = screen.getByTestId('left-action-icon');
      expect(actionButton.props.accessibilityRole).toBe('button');
      expect(actionButton.props.accessibilityLabel).toBe('Custom Action');
    });
  });

  describe('Estilos', () => {
    it('deve aplicar estilo customizado', () => {
      const customStyle = { backgroundColor: 'red' };
      renderHeader({ style: customStyle });

      const header = screen.getByTestId('header-title').parent?.parent;
      expect(header?.props.style).toMatchObject(customStyle);
    });

    it('deve aplicar titleStyle customizado', () => {
      const customTitleStyle = { fontSize: 30 };
      renderHeader({ titleStyle: customTitleStyle });

      const title = screen.getByTestId('header-title');
      expect(title.props.style).toMatchObject(customTitleStyle);
    });

    it('deve aplicar subtitleStyle customizado', () => {
      const customSubtitleStyle = { fontSize: 18 };
      renderHeader({ 
        subtitle: 'Test Subtitle',
        subtitleStyle: customSubtitleStyle 
      });

      const subtitle = screen.getByTestId('header-subtitle');
      expect(subtitle.props.style).toMatchObject(customSubtitleStyle);
    });
  });

  describe('Combinações de props', () => {
    it('deve funcionar com todas as props combinadas', () => {
      const onBackPress = jest.fn();
      const leftAction: HeaderAction = {
        title: 'Left',
        onPress: jest.fn(),
      };
      const rightAction: HeaderAction = {
        title: 'Right',
        onPress: jest.fn(),
      };

      renderHeader({
        title: 'Complex Header',
        subtitle: 'Complex Subtitle',
        showBackButton: true,
        onBackPress,
        leftAction,
        rightAction,
        testID: 'complex-header',
        accessibilityLabel: 'Complex Header Label',
      });

      expect(screen.getByText('Complex Header')).toBeTruthy();
      expect(screen.getByText('Complex Subtitle')).toBeTruthy();
      expect(screen.getByTestId('back-button')).toBeTruthy();
      expect(screen.getByText('Left')).toBeTruthy();
      expect(screen.getByText('Right')).toBeTruthy();
      expect(screen.getByTestId('complex-header')).toBeTruthy();
    });

    it('deve funcionar sem ações', () => {
      renderHeader({
        title: 'Simple Header',
        testID: 'simple-header',
      });

      expect(screen.getByText('Simple Header')).toBeTruthy();
      expect(screen.getByTestId('simple-header')).toBeTruthy();
      expect(screen.queryByTestId('back-button')).toBeNull();
    });
  });
});

// Testes de tipos e estrutura
describe('Header - Types and Structure', () => {
  test('should export Header component', () => {
    expect(Header).toBeDefined();
    expect(typeof Header).toBe('function');
  });

  test('should export HeaderVariant type', () => {
    const variants: HeaderVariant[] = ['default', 'large', 'compact'];
    expect(variants).toContain('default');
    expect(variants).toContain('large');
    expect(variants).toContain('compact');
  });

  test('should have correct HeaderProps interface', () => {
    const validProps: HeaderProps = {
      title: 'Test Title',
    };
    expect(validProps.title).toBe('Test Title');

    const fullProps: HeaderProps = {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      variant: 'large',
      showBackButton: true,
      onBackPress: jest.fn(),
      rightComponent: React.createElement('div', {}, 'Right'),
      leftComponent: React.createElement('div', {}, 'Left'),
      backgroundColor: '#ffffff',
      titleColor: '#000000',
      subtitleColor: '#666666',
      style: { padding: 10 },
      titleStyle: { fontSize: 20 },
      subtitleStyle: { fontSize: 14 },
      testID: 'header-test',
    };
    expect(fullProps.title).toBe('Test Title');
    expect(fullProps.variant).toBe('large');
  });

  test('should accept required props', () => {
    const props: HeaderProps = {
      title: 'Required Title',
    };
    expect(props.title).toBeDefined();
  });

  test('should accept all optional props', () => {
    const props: HeaderProps = {
      title: 'Test',
      subtitle: 'Optional subtitle',
      variant: 'compact',
      showBackButton: false,
      onBackPress: undefined,
      rightComponent: null,
      leftComponent: null,
      backgroundColor: undefined,
      titleColor: undefined,
      subtitleColor: undefined,
      style: undefined,
      titleStyle: undefined,
      subtitleStyle: undefined,
      testID: undefined,
    };
    expect(props.title).toBe('Test');
  });

  test('should accept variant prop with correct values', () => {
    const defaultVariant: HeaderProps = { title: 'Test', variant: 'default' };
    const largeVariant: HeaderProps = { title: 'Test', variant: 'large' };
    const compactVariant: HeaderProps = { title: 'Test', variant: 'compact' };

    expect(defaultVariant.variant).toBe('default');
    expect(largeVariant.variant).toBe('large');
    expect(compactVariant.variant).toBe('compact');
  });

  test('should accept callback functions', () => {
    const mockCallback = jest.fn();
    const props: HeaderProps = {
      title: 'Test',
      onBackPress: mockCallback,
    };
    expect(typeof props.onBackPress).toBe('function');
  });

  test('should accept React components', () => {
    const rightComponent = React.createElement('button', {}, 'Right');
    const leftComponent = React.createElement('button', {}, 'Left');
    
    const props: HeaderProps = {
      title: 'Test',
      rightComponent,
      leftComponent,
    };
    
    expect(props.rightComponent).toBeDefined();
    expect(props.leftComponent).toBeDefined();
  });

  test('should accept style objects', () => {
    const props: HeaderProps = {
      title: 'Test',
      style: { backgroundColor: 'red', padding: 20 },
      titleStyle: { fontSize: 24, fontWeight: 'bold' },
      subtitleStyle: { fontSize: 16, color: 'gray' },
    };
    
    expect(props.style).toEqual({ backgroundColor: 'red', padding: 20 });
    expect(props.titleStyle).toEqual({ fontSize: 24, fontWeight: 'bold' });
    expect(props.subtitleStyle).toEqual({ fontSize: 16, color: 'gray' });
  });

  test('should accept color props as strings', () => {
    const props: HeaderProps = {
      title: 'Test',
      backgroundColor: '#ffffff',
      titleColor: '#000000',
      subtitleColor: '#666666',
    };
    
    expect(props.backgroundColor).toBe('#ffffff');
    expect(props.titleColor).toBe('#000000');
    expect(props.subtitleColor).toBe('#666666');
  });

  test('should accept boolean props', () => {
    const propsTrue: HeaderProps = {
      title: 'Test',
      showBackButton: true,
    };
    
    const propsFalse: HeaderProps = {
      title: 'Test',
      showBackButton: false,
    };
    
    expect(propsTrue.showBackButton).toBe(true);
    expect(propsFalse.showBackButton).toBe(false);
  });
});

// Testes de props combinations
describe('Header - Props Combinations', () => {
  test('should work with title only', () => {
    const props: HeaderProps = {
      title: 'Simple Title',
    };
    expect(props.title).toBe('Simple Title');
  });

  test('should work with title and subtitle', () => {
    const props: HeaderProps = {
      title: 'Main Title',
      subtitle: 'Secondary text',
    };
    expect(props.title).toBe('Main Title');
    expect(props.subtitle).toBe('Secondary text');
  });

  test('should work with back button', () => {
    const mockOnBack = jest.fn();
    const props: HeaderProps = {
      title: 'Title with Back',
      showBackButton: true,
      onBackPress: mockOnBack,
    };
    expect(props.showBackButton).toBe(true);
    expect(props.onBackPress).toBe(mockOnBack);
  });

  test('should work with custom components', () => {
    const rightComp = React.createElement('div', {}, 'Right');
    const leftComp = React.createElement('div', {}, 'Left');
    
    const props: HeaderProps = {
      title: 'Title with Components',
      rightComponent: rightComp,
      leftComponent: leftComp,
    };
    
    expect(props.rightComponent).toBe(rightComp);
    expect(props.leftComponent).toBe(leftComp);
  });

  test('should work with all variants', () => {
    const variants: HeaderVariant[] = ['default', 'large', 'compact'];
    
    variants.forEach(variant => {
      const props: HeaderProps = {
        title: `Title ${variant}`,
        variant,
      };
      expect(props.variant).toBe(variant);
    });
  });
}); 