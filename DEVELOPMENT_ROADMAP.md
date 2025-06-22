# 🎵 Synca Beat - Roadmap de Desenvolvimento

> **Atenção:** Toda nova tela, componente, hook, serviço ou lógica criada deve obrigatoriamente ter seu respectivo arquivo de teste (unitário e/ou integração) na pasta `tests/` correspondente. Não avançar nenhuma feature sem o respectivo teste.

## 📋 Visão Geral do Projeto
**Synca Beat** - Aplicação para sincronização de áudio em múltiplos dispositivos Bluetooth

### 🎯 Objetivo Principal
Permitir que usuários conectem múltiplos dispositivos Bluetooth simultaneamente para tocar uma música sincronizada nesses dispositivos.

### 🏗️ Estrutura Base
- ✅ Projeto criado com `npx create-expo-app@latest synca-beat`
- ✅ Estrutura inicial configurada
- ✅ Dependências básicas instaladas
- ✅ Expo Router configurado com nova arquitetura

---

### 🚀 Nova Arquitetura com Expo Router
O projeto utiliza a **nova arquitetura do Expo Router** com sistema de pastas baseado em arquivos, mantendo a estrutura `/app` existente e expandindo com as funcionalidades necessárias.

## 📦 FASE 1: Configuração e Dependências

### 1.1 Instalação de Dependências Essenciais
- ✅ **react-native-ble-plx** - Gerenciamento Bluetooth
- ✅ **nativewind** - Estilização com Tailwind CSS
- ✅ **zustand** - Gerenciamento de estado
- ✅ **expo-ads-admob** - Sistema de anúncios
- ✅ **expo-av** - Reprodução de áudio
- ✅ **expo-permissions** - Gerenciamento de permissões
- ✅ **expo-file-system** - Acesso a arquivos locais
- ✅ **expo-media-library** - Acesso à biblioteca de mídia
- ✅ **Configuração de ambiente de testes**
- ✅ **Criação dos primeiros testes unitários**

### 1.2 Configuração de Tema e Estilos
- ✅ Configurar NativeWind/Tailwind
- ✅ Definir paleta de cores (claro/escuro)
- ✅ Criar arquivo de tema global
- ✅ Configurar tipografia e espaçamentos
- ✅ **Testes para helpers e tema**

### 1.3 Estrutura de Pastas
- ✅ Criar pasta `/contexts`
- ✅ Criar pasta `/services`
- ✅ Criar pasta `/theme`
- ✅ Criar pasta `/utils`
- ✅ Organizar componentes existentes
- ✅ Expandir estrutura `/app` com novas rotas
- ✅ **Testes para estrutura criada**

---

## 🎨 FASE 2: Sistema de Temas e UI Base

### 2.1 Contexto de Tema
- ✅ Criar `ThemeContext`
- ✅ Implementar alternância automática/manual
- ✅ Configurar persistência do tema
- ✅ Criar hook `useTheme`
- ✅ **Testes para contexto e hook de tema**

### 2.2 Componentes Base
- ✅ **Button** - Botão reutilizável com variantes
- ✅ **Card** - Container com bordas arredondadas
- ✅ **Header** - Cabeçalho com navegação
- ✅ **Loading** - Indicador de carregamento
- ✅ **Modal** - Modal customizado
- ✅ **Toast** - Notificações temporárias
- ✅ **Testes para todos os componentes base**

### 2.3 Animações Base
- ✅ Configurar react-native-reanimated
- ✅ Criar animações de transição
- ✅ Implementar feedback háptico
- ✅ Animações de loading e estados
- ✅ **Testes para animações e feedback**

---

## 🔗 FASE 3: Sistema Bluetooth

### 3.1 Serviço Bluetooth
- [ ] Criar `bluetoothService.ts`
- [ ] Implementar busca de dispositivos
- [ ] Gerenciar conexões múltiplas
- [ ] Tratamento de erros e reconexão
- [ ] **Testes para bluetoothService**

### 3.2 Contexto Bluetooth
- [ ] Criar `BluetoothContext`
- [ ] Estado dos dispositivos conectados
- [ ] Status de conexão
- [ ] Hook `useBluetooth`
- [ ] **Testes para contexto e hook de Bluetooth**

### 3.3 Permissões e Consentimento
- [ ] Tela de consentimento Bluetooth
- [ ] Solicitação de permissões
- [ ] Explicação do uso dos dados
- [ ] Conformidade LGPD/GDPR
- [ ] **Testes para telas e lógica de permissões**

---

## 🎵 FASE 4: Sistema de Áudio

### 4.1 Serviço de Áudio
- [ ] Criar `audioService.ts`
- [ ] Reprodução de áudio local
- [ ] Sincronização entre dispositivos
- [ ] Controles de mídia (play, pause, stop)
- [ ] **Testes para audioService**

### 4.2 Player de Mídia
- [ ] Interface do player
- [ ] Controles de reprodução
- [ ] Seletor de arquivos de áudio
- [ ] Progresso da música
- [ ] **Testes para player e controles**

### 4.3 Sincronização
- [ ] Algoritmo de sincronização
- [ ] Latência de rede
- [ ] Buffer de áudio
- [ ] Fallback para desconexões
- [ ] **Testes para sincronização**

---

## 📱 FASE 5: Telas e Navegação com Expo Router

### 5.1 Estrutura de Navegação
- [ ] Configurar layout principal em `/app/_layout.tsx`
- [ ] Definir estrutura de tabs em `/app/(tabs)/_layout.tsx`
- [ ] Implementar navegação por tabs
- [ ] Configurar navegação modal para telas específicas
- [ ] **Testes para navegação**

### 5.2 Telas Principais (Estrutura /app)
- [ ] **Home** - `/app/(tabs)/index.tsx` - Tela inicial com status
- [ ] **Devices** - `/app/(tabs)/devices.tsx` - Lista de dispositivos Bluetooth
- [ ] **Player** - `/app/(tabs)/player.tsx` - Controles de reprodução
- [ ] **Settings** - `/app/(tabs)/settings.tsx` - Configurações do app
- [ ] **PrivacyPolicy** - `/app/privacy-policy.tsx` - Termos e privacidade
- [ ] **Testes para todas as telas**

### 5.3 Componentes de Tela
- [ ] Lista de dispositivos com cards
- [ ] Status de conexão visual
- [ ] Controles de mídia
- [ ] Configurações organizadas
- [ ] **Testes para componentes de tela**

---

## 💰 FASE 6: Sistema de Anúncios

### 6.1 Configuração AdMob
- [ ] Configurar expo-ads-admob
- [ ] IDs de teste e produção
- [ ] Configuração de consentimento
- [ ] Política de privacidade para anúncios
- [ ] **Testes para integração de anúncios**

### 6.2 Implementação de Anúncios
- [ ] Banner fixo no rodapé
- [ ] Anúncios intersticiais
- [ ] Posicionamento não invasivo
- [ ] Controle de frequência
- [ ] **Testes para exibição e controle de anúncios**

### 6.3 Serviço de Anúncios
- [ ] Criar `adsService.ts`
- [ ] Gerenciar carregamento de anúncios
- [ ] Tratamento de erros
- [ ] Métricas de performance
- [ ] **Testes para adsService**

---

## 🔧 FASE 7: Funcionalidades Avançadas

### 7.1 Gerenciamento de Dispositivos
- [ ] Lista de dispositivos pareados
- [ ] Renomear dispositivos
- [ ] Remover dispositivos
- [ ] Histórico de conexões
- [ ] **Testes para gerenciamento de dispositivos**

### 7.2 Configurações Avançadas
- [ ] Configurações de áudio
- [ ] Configurações de Bluetooth
- [ ] Configurações de anúncios
- [ ] Backup de configurações
- [ ] **Testes para configurações avançadas**

### 7.3 Utilitários
- [ ] Formatação de tempo
- [ ] Validação de permissões
- [ ] Helpers de Bluetooth
- [ ] Funções de utilidade
- [ ] **Testes para utilitários**

---

## 🧪 FASE 8: Testes e Otimização

### 8.1 Testes de Funcionalidade
- [ ] Testes de conexão Bluetooth
- [ ] Testes de reprodução de áudio
- [ ] Testes de sincronização
- [ ] Testes de anúncios

### 8.2 Testes de Interface
- [ ] Testes em diferentes dispositivos
- [ ] Testes de tema claro/escuro
- [ ] Testes de responsividade
- [ ] Testes de acessibilidade

### 8.3 Otimização
- [ ] Performance de Bluetooth
- [ ] Otimização de memória
- [ ] Redução de bundle size
- [ ] Melhorias de UX

---

## 📱 FASE 9: Finalização e Deploy

### 9.1 Polimento Final
- [ ] Revisão de código
- [ ] Correção de bugs
- [ ] Melhorias de UI/UX
- [ ] Documentação final
- [ ] **Testes finais e cobertura 100%**

### 9.2 Preparação para Deploy
- [ ] Configuração de build
- [ ] Configuração de ícones
- [ ] Configuração de splash screen
- [ ] Configuração de metadados

### 9.3 Deploy
- [ ] Build para Android
- [ ] Build para iOS
- [ ] Submissão às lojas
- [ ] Monitoramento pós-lançamento

---

## 📊 Métricas de Progresso

### Progresso Geral: 27% (24/89 tarefas concluídas)

**Fase 1:** 12/12 tarefas (100%) ✅
**Fase 2:** 12/12 tarefas (100%) ✅
**Fase 3:** 0/12 tarefas (0%)
**Fase 4:** 0/12 tarefas (0%)
**Fase 5:** 0/12 tarefas (0%)
**Fase 6:** 0/12 tarefas (0%)
**Fase 7:** 0/12 tarefas (0%)
**Fase 8:** 0/12 tarefas (0%)
**Fase 9:** 0/5 tarefas (0%)

---

## 🎯 Próximos Passos

1. **FASE 3: Sistema Bluetooth** - Implementar serviços e contextos Bluetooth
2. **Sempre criar testes para cada nova feature, componente, hook, serviço ou tela**
3. **Não avançar nenhuma feature sem o respectivo teste**
4. **Cobertura mínima: 100%**

---

## 📝 Notas de Desenvolvimento

### Dependências Principais Instaladas:
- ✅ `react-native-ble-plx` - Bluetooth
- ✅ `nativewind` - Estilização
- ✅ `zustand` - Estado
- ✅ `expo-ads-admob` - Anúncios
- ✅ `expo-av` - Áudio
- ✅ `jest` e `@testing-library/react-native` - Testes

### Configurações Importantes:
- ✅ Permissões Bluetooth configuradas
- ✅ NativeWind configurado
- ✅ Tema global criado
- ✅ Estrutura de pastas organizada
- ✅ Ambiente de testes configurado

### Arquivos Criados:
- ✅ `/theme/index.ts` - Sistema de temas
- ✅ `/utils/helpers.ts` - Utilitários
- ✅ `/contexts/ThemeContext.tsx` - Contexto de tema
- ✅ `/components/ui/Button.tsx` - Componente Button
- ✅ `/components/ui/Card.tsx` - Componente Card
- ✅ `/components/ui/Header.tsx` - Componente Header
- ✅ `/components/ui/Loading.tsx` - Componente Loading
- ✅ `tailwind.config.js` - Configuração Tailwind
- ✅ `metro.config.js` - Configuração Metro
- ✅ `global.css` - CSS global
- ✅ `nativewind-env.d.ts` - Tipos TypeScript
- ✅ `jest.config.js` - Configuração Jest
- ✅ `tests/unit/utils/helpers.test.ts` - Testes helpers
- ✅ `tests/unit/theme/index.test.ts` - Testes tema
- ✅ `tests/unit/contexts/ThemeContext.test.tsx` - Testes contexto
- ✅ `tests/unit/components/Button.test.tsx` - Testes Button
- ✅ `tests/unit/components/Card.test.tsx` - Testes Card
- ✅ `tests/unit/components/Header.test.tsx` - Testes Header
- ✅ `tests/unit/components/Loading.test.tsx` - Testes Loading
- ✅ `components/ui/Modal.tsx` - Componente Modal
- ✅ `components/ui/Toast.tsx` - Componente Toast
- ✅ `utils/animations.ts` - Utilitários de animações
- ✅ `tests/unit/components/Modal.test.tsx` - Testes Modal
- ✅ `tests/unit/components/Toast.test.tsx` - Testes Toast
- ✅ `tests/unit/utils/animations.test.ts` - Testes animações

### Estrutura de Rotas (Expo Router):
- ✅ `/app/_layout.tsx` - Layout principal (atualizado)
- `/app/(tabs)/_layout.tsx` - Layout das tabs
- `/app/(tabs)/index.tsx` - Home
- `/app/(tabs)/devices.tsx` - Dispositivos
- `/app/(tabs)/player.tsx` - Player
- `/app/(tabs)/settings.tsx` - Configurações
- `/app/privacy-policy.tsx` - Política de Privacidade

---

**Última atualização:** $(date)
**Versão do documento:** 1.4
**Status:** Fase 1 Concluída ✅ | Fase 2 Concluída ✅ | Pronto para Fase 3 🚀 