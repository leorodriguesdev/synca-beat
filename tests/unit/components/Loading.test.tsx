import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Loading, LoadingProps, LoadingSize, LoadingVariant } from '../../../components/ui/Loading';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock do AsyncStorage para o ThemeProvider
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('light')),
  setItem: jest.fn(() => Promise.resolve()),
}));

const renderLoading = (props: Partial<LoadingProps> = {}) => {
  const defaultProps: LoadingProps = {
    ...props,
  };

  return render(
    <ThemeProvider>
      <Loading {...defaultProps} />
    </ThemeProvider>
  );
};

describe('Loading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização', () => {
    it('deve renderizar corretamente com props padrão', () => {
      renderLoading();

      expect(screen.getByTestId('loading-spinner')).toBeTruthy();
    });

    it('deve renderizar com testID', () => {
      renderLoading({ testID: 'custom-loading' });

      expect(screen.getByTestId('custom-loading')).toBeTruthy();
    });

    it('deve renderizar com texto', () => {
      renderLoading({ text: 'Carregando...' });

      expect(screen.getByText('Carregando...')).toBeTruthy();
      expect(screen.getByTestId('loading-text')).toBeTruthy();
    });
  });

  describe('Tipos', () => {
    it('deve renderizar tipo spinner por padrão', () => {
      renderLoading();

      expect(screen.getByTestId('loading-spinner')).toBeTruthy();
    });

    it('deve renderizar tipo dots', () => {
      renderLoading({ type: 'dots' });

      expect(screen.getByTestId('loading-dot-0')).toBeTruthy();
      expect(screen.getByTestId('loading-dot-1')).toBeTruthy();
      expect(screen.getByTestId('loading-dot-2')).toBeTruthy();
    });

    it('deve renderizar tipo pulse', () => {
      renderLoading({ type: 'pulse' });

      expect(screen.getByTestId('loading-pulse')).toBeTruthy();
    });
  });

  describe('Tamanhos', () => {
    it('deve renderizar tamanho large por padrão', () => {
      renderLoading();

      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner.props.size).toBe('large');
    });

    it('deve renderizar tamanho small', () => {
      renderLoading({ size: 'small' });

      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner.props.size).toBe('small');
    });

    it('deve aplicar tamanho correto para dots', () => {
      renderLoading({ type: 'dots', size: 'small' });

      const dot0 = screen.getByTestId('loading-dot-0');
      expect(dot0.props.style).toMatchObject({
        width: 6,
        height: 6,
        borderRadius: 3,
      });
    });

    it('deve aplicar tamanho correto para pulse', () => {
      renderLoading({ type: 'pulse', size: 'large' });

      const pulse = screen.getByTestId('loading-pulse');
      expect(pulse.props.style).toMatchObject({
        width: 30,
        height: 30,
        borderRadius: 15,
      });
    });
  });

  describe('Cores', () => {
    it('deve usar cor primária do tema por padrão', () => {
      renderLoading();

      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner.props.color).toBe('#3b82f6'); // cor primária do tema light
    });

    it('deve usar cor customizada', () => {
      renderLoading({ color: '#ff0000' });

      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner.props.color).toBe('#ff0000');
    });

    it('deve aplicar cor customizada para dots', () => {
      renderLoading({ type: 'dots', color: '#00ff00' });

      const dot0 = screen.getByTestId('loading-dot-0');
      expect(dot0.props.style.backgroundColor).toBe('#00ff00');
    });

    it('deve aplicar cor customizada para pulse', () => {
      renderLoading({ type: 'pulse', color: '#0000ff' });

      const pulse = screen.getByTestId('loading-pulse');
      expect(pulse.props.style.backgroundColor).toBe('#0000ff');
    });
  });

  describe('Estilos', () => {
    it('deve aplicar estilo customizado', () => {
      const customStyle = { backgroundColor: 'red' };
      renderLoading({ style: customStyle });

      const container = screen.getByTestId('loading-spinner').parent;
      expect(container?.props.style).toMatchObject(customStyle);
    });

    it('deve aplicar textStyle customizado', () => {
      const customTextStyle = { fontSize: 20 };
      renderLoading({ text: 'Test', textStyle: customTextStyle });

      const text = screen.getByTestId('loading-text');
      expect(text.props.style).toMatchObject(customTextStyle);
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter role progressbar', () => {
      renderLoading();

      const container = screen.getByTestId('loading-spinner').parent;
      expect(container?.props.accessibilityRole).toBe('progressbar');
    });

    it('deve ter accessibilityLabel padrão para spinner', () => {
      renderLoading();

      const container = screen.getByTestId('loading-spinner').parent;
      expect(container?.props.accessibilityLabel).toBe('carregando');
    });

    it('deve ter accessibilityLabel padrão para dots', () => {
      renderLoading({ type: 'dots' });

      const container = screen.getByTestId('loading-dot-0').parent?.parent;
      expect(container?.props.accessibilityLabel).toBe('carregando com pontos');
    });

    it('deve ter accessibilityLabel padrão para pulse', () => {
      renderLoading({ type: 'pulse' });

      const container = screen.getByTestId('loading-pulse').parent;
      expect(container?.props.accessibilityLabel).toBe('carregando com pulso');
    });

    it('deve ter accessibilityLabel com texto', () => {
      renderLoading({ text: 'Carregando dados' });

      const container = screen.getByTestId('loading-spinner').parent;
      expect(container?.props.accessibilityLabel).toBe('Carregando dados, carregando');
    });

    it('deve usar accessibilityLabel customizado', () => {
      renderLoading({ accessibilityLabel: 'Custom Label' });

      const container = screen.getByTestId('loading-spinner').parent;
      expect(container?.props.accessibilityLabel).toBe('Custom Label');
    });
  });

  describe('Combinações de props', () => {
    it('deve funcionar com todas as props combinadas', () => {
      renderLoading({
        size: 'small',
        type: 'dots',
        text: 'Carregando...',
        color: '#ff0000',
        testID: 'complex-loading',
        accessibilityLabel: 'Complex Loading',
      });

      expect(screen.getByTestId('complex-loading')).toBeTruthy();
      expect(screen.getByTestId('loading-dot-0')).toBeTruthy();
      expect(screen.getByText('Carregando...')).toBeTruthy();
      
      const dot0 = screen.getByTestId('loading-dot-0');
      expect(dot0.props.style.backgroundColor).toBe('#ff0000');
      
      const container = screen.getByTestId('complex-loading');
      expect(container.props.accessibilityLabel).toBe('Complex Loading');
    });

    it('deve funcionar sem texto', () => {
      renderLoading({
        type: 'pulse',
        size: 'large',
        testID: 'pulse-only',
      });

      expect(screen.getByTestId('pulse-only')).toBeTruthy();
      expect(screen.getByTestId('loading-pulse')).toBeTruthy();
      expect(screen.queryByTestId('loading-text')).toBeNull();
    });
  });
});

// Testes de tipos e estrutura
describe('Loading - Types and Structure', () => {
  test('should export Loading component', () => {
    expect(Loading).toBeDefined();
    expect(typeof Loading).toBe('function');
  });

  test('should export LoadingVariant type', () => {
    const variants: LoadingVariant[] = ['default', 'overlay', 'inline', 'minimal'];
    expect(variants).toContain('default');
    expect(variants).toContain('overlay');
    expect(variants).toContain('inline');
    expect(variants).toContain('minimal');
  });

  test('should export LoadingSize type', () => {
    const sizes: LoadingSize[] = ['small', 'medium', 'large'];
    expect(sizes).toContain('small');
    expect(sizes).toContain('medium');
    expect(sizes).toContain('large');
  });

  test('should have correct LoadingProps interface', () => {
    const minimalProps: LoadingProps = {};
    expect(minimalProps).toBeDefined();

    const fullProps: LoadingProps = {
      variant: 'overlay',
      size: 'large',
      text: 'Carregando...',
      color: '#007AFF',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      style: { padding: 10 },
      textStyle: { fontSize: 16 },
      testID: 'loading-test',
      accessibilityLabel: 'Carregando dados',
    };
    expect(fullProps.variant).toBe('overlay');
    expect(fullProps.size).toBe('large');
    expect(fullProps.text).toBe('Carregando...');
  });

  test('should accept all props as optional', () => {
    const props: LoadingProps = {
      variant: undefined,
      size: undefined,
      text: undefined,
      color: undefined,
      backgroundColor: undefined,
      textColor: undefined,
      style: undefined,
      textStyle: undefined,
      testID: undefined,
      accessibilityLabel: undefined,
    };
    expect(props).toBeDefined();
  });

  test('should accept variant prop with correct values', () => {
    const defaultVariant: LoadingProps = { variant: 'default' };
    const overlayVariant: LoadingProps = { variant: 'overlay' };
    const inlineVariant: LoadingProps = { variant: 'inline' };
    const minimalVariant: LoadingProps = { variant: 'minimal' };

    expect(defaultVariant.variant).toBe('default');
    expect(overlayVariant.variant).toBe('overlay');
    expect(inlineVariant.variant).toBe('inline');
    expect(minimalVariant.variant).toBe('minimal');
  });

  test('should accept size prop with correct values', () => {
    const smallSize: LoadingProps = { size: 'small' };
    const mediumSize: LoadingProps = { size: 'medium' };
    const largeSize: LoadingProps = { size: 'large' };

    expect(smallSize.size).toBe('small');
    expect(mediumSize.size).toBe('medium');
    expect(largeSize.size).toBe('large');
  });

  test('should accept text prop as string', () => {
    const props: LoadingProps = {
      text: 'Aguarde...',
    };
    expect(props.text).toBe('Aguarde...');
  });

  test('should accept color props as strings', () => {
    const props: LoadingProps = {
      color: '#007AFF',
      backgroundColor: '#ffffff',
      textColor: '#000000',
    };
    
    expect(props.color).toBe('#007AFF');
    expect(props.backgroundColor).toBe('#ffffff');
    expect(props.textColor).toBe('#000000');
  });

  test('should accept style objects', () => {
    const props: LoadingProps = {
      style: { backgroundColor: 'red', padding: 20 },
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    };
    
    expect(props.style).toEqual({ backgroundColor: 'red', padding: 20 });
    expect(props.textStyle).toEqual({ fontSize: 16, fontWeight: 'bold' });
  });

  test('should accept testID and accessibilityLabel as strings', () => {
    const props: LoadingProps = {
      testID: 'custom-loading',
      accessibilityLabel: 'Carregando conteúdo',
    };
    
    expect(props.testID).toBe('custom-loading');
    expect(props.accessibilityLabel).toBe('Carregando conteúdo');
  });
});

// Testes de combinações de props
describe('Loading - Props Combinations', () => {
  test('should work with default props', () => {
    const props: LoadingProps = {};
    expect(props).toBeDefined();
  });

  test('should work with variant and size', () => {
    const props: LoadingProps = {
      variant: 'overlay',
      size: 'large',
    };
    expect(props.variant).toBe('overlay');
    expect(props.size).toBe('large');
  });

  test('should work with text and colors', () => {
    const props: LoadingProps = {
      text: 'Processando...',
      color: '#FF0000',
      textColor: '#0000FF',
    };
    expect(props.text).toBe('Processando...');
    expect(props.color).toBe('#FF0000');
    expect(props.textColor).toBe('#0000FF');
  });

  test('should work with all variants', () => {
    const variants: LoadingVariant[] = ['default', 'overlay', 'inline', 'minimal'];
    
    variants.forEach(variant => {
      const props: LoadingProps = {
        variant,
        text: `Loading ${variant}`,
      };
      expect(props.variant).toBe(variant);
    });
  });

  test('should work with all sizes', () => {
    const sizes: LoadingSize[] = ['small', 'medium', 'large'];
    
    sizes.forEach(size => {
      const props: LoadingProps = {
        size,
        text: `Loading ${size}`,
      };
      expect(props.size).toBe(size);
    });
  });

  test('should work with custom styles', () => {
    const props: LoadingProps = {
      variant: 'inline',
      style: { flexDirection: 'row', alignItems: 'center' },
      textStyle: { marginLeft: 10, fontSize: 14 },
    };
    
    expect(props.variant).toBe('inline');
    expect(props.style).toEqual({ flexDirection: 'row', alignItems: 'center' });
    expect(props.textStyle).toEqual({ marginLeft: 10, fontSize: 14 });
  });

  test('should work with accessibility props', () => {
    const props: LoadingProps = {
      testID: 'main-loading',
      accessibilityLabel: 'Carregando dados principais',
      text: 'Carregando...',
    };
    
    expect(props.testID).toBe('main-loading');
    expect(props.accessibilityLabel).toBe('Carregando dados principais');
    expect(props.text).toBe('Carregando...');
  });
}); 