import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  Button,
  Input,
  Text,
  makeStyles,
  tokens,
  shorthands,
  Spinner,
  MessageBar,
  MessageBarBody,
  ProgressBar,
} from '@fluentui/react-components';
import {
  BotRegular,
  SendRegular,
  DismissRegular,
  WarningRegular,
} from '@fluentui/react-icons';
import { useState, useEffect, useRef } from 'react';
import { chatService, ChatMessage, SubscriptionUsage } from '../services/chatService';

const useStyles = makeStyles({
  floatingButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    zIndex: 1000,
    boxShadow: tokens.shadow16,
    ...shorthands.border('none'),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  dialogSurface: {
    width: '90vw',
    maxWidth: '500px',
    height: '80vh',
    maxHeight: '700px',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.overflow('hidden'),
  },
  dialogBody: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    ...shorthands.overflow('hidden'),
    padding: 0,
  },
  dialogHeader: {
    padding: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
  },
  usageInfo: {
    padding: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    flexShrink: 0,
  },
  usageBar: {
    marginTop: tokens.spacingVerticalXS,
  },
  usageText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    borderRadius: tokens.borderRadiusMedium,
    ...shorthands.border('none'),
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    borderRadius: tokens.borderRadiusMedium,
    ...shorthands.border('none'),
  },
  messageContent: {
    fontSize: tokens.fontSizeBase300,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  inputContainer: {
    padding: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalS),
    flexShrink: 0,
  },
  input: {
    flex: 1,
  },
  sendButton: {
    flexShrink: 0,
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingVerticalL,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    ...shorthands.gap(tokens.spacingVerticalL),
    color: tokens.colorNeutralForeground3,
  },
  warningBar: {
    marginBottom: tokens.spacingVerticalM,
  },
});

export const Jarvis = () => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usage, setUsage] = useState<SubscriptionUsage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadUsage();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadUsage = async () => {
    try {
      const usageData = await chatService.getUsage();
      setUsage(usageData);
    } catch (err: any) {
      console.error('Error loading usage:', err);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatService.sendMessage({
        message: userMessage.content,
        conversationHistory: messages,
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Actualizar uso
      if (response.usage) {
        setUsage(response.usage);
      }

      // Verificar alertas de límite
      if (response.usage) {
        const tokensPercentage = response.usage.usagePercentageTokens;
        const messagesPercentage = response.usage.usagePercentageMessages;

        if (tokensPercentage >= 95 || messagesPercentage >= 95) {
          setError('Has alcanzado el 95% de tu límite mensual. Considera actualizar tu suscripción.');
        } else if (tokensPercentage >= 90 || messagesPercentage >= 90) {
          setError('Has alcanzado el 90% de tu límite mensual.');
        } else if (tokensPercentage >= 80 || messagesPercentage >= 80) {
          setError('Has alcanzado el 80% de tu límite mensual.');
        }
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
      setError(errorMsg);
      
      // Si es un error de suscripción, mostrar mensaje más específico
      if (errorMsg.includes('suscripción') || errorMsg.includes('subscription') || err.statusCode === 400) {
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: `⚠️ ${errorMsg}\n\nPor favor, contacta con soporte para activar o actualizar tu suscripción.`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else {
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: `Error: ${errorMsg}`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getUsagePercentage = (usage: SubscriptionUsage | null): number => {
    if (!usage) return 0;
    return Math.max(usage.usagePercentageTokens, usage.usagePercentageMessages);
  };

  const getUsageColor = (percentage: number): string => {
    if (percentage >= 95) return tokens.colorPaletteRedBackground3;
    if (percentage >= 90) return tokens.colorPaletteOrangeBackground3;
    if (percentage >= 80) return tokens.colorPaletteYellowBackground3;
    return tokens.colorBrandBackground;
  };

  return (
    <>
      <button
        className={styles.floatingButton}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir chat de Jarvis"
      >
        <BotRegular fontSize={24} />
      </button>

      <Dialog open={isOpen} onOpenChange={(_, data) => setIsOpen(data.open)} modalType="modal">
        <DialogSurface className={styles.dialogSurface}>
          <DialogBody className={styles.dialogBody}>
            <div className={styles.dialogHeader}>
              <div className={styles.dialogTitle}>
                <BotRegular />
                <Text>Jarvis - Asistente IA</Text>
              </div>
              <Button
                appearance="subtle"
                icon={<DismissRegular />}
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar"
              />
            </div>

            {usage && (
              <div className={styles.usageInfo}>
                <Text size={200} weight="semibold">
                  Uso mensual
                </Text>
                <div className={styles.usageBar}>
                  <ProgressBar
                    value={getUsagePercentage(usage)}
                    max={100}
                    color={getUsageColor(getUsagePercentage(usage))}
                  />
                </div>
                <div className={styles.usageText}>
                  Tokens: {usage.monthlyUsageTokens} / {usage.maxTokensPerMonth ?? '∞'} (
                  {usage.usagePercentageTokens}%) | Mensajes: {usage.monthlyUsageMessages} /{' '}
                  {usage.maxMessagesPerMonth ?? '∞'} ({usage.usagePercentageMessages}%)
                </div>
              </div>
            )}

            {error && (
              <div className={styles.warningBar}>
                <MessageBar intent="warning">
                  <MessageBarBody>
                    <Text size={200}>{error}</Text>
                  </MessageBarBody>
                </MessageBar>
              </div>
            )}

            <div className={styles.messagesContainer}>
              {messages.length === 0 ? (
                <div className={styles.emptyState}>
                  <BotRegular fontSize={48} />
                  <Text size={400} weight="semibold">
                    Hola, soy Jarvis
                  </Text>
                  <Text size={300} align="center">
                    Puedo ayudarte a consultar información, resolver problemas de logística y
                    analizar datos del sistema. ¿En qué puedo ayudarte?
                  </Text>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${
                      message.role === 'user' ? styles.userMessage : styles.assistantMessage
                    }`}
                  >
                    <Text className={styles.messageContent}>{message.content}</Text>
                  </div>
                ))
              )}

              {isLoading && (
                <div className={styles.loadingContainer}>
                  <Spinner size="small" label="Jarvis está pensando..." />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputContainer}>
              <Input
                className={styles.input}
                placeholder="Escribe tu mensaje..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <Button
                className={styles.sendButton}
                appearance="primary"
                icon={<SendRegular />}
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                aria-label="Enviar mensaje"
              >
                Enviar
              </Button>
            </div>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

