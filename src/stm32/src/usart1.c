#include "usart1.h"

void usart1_init()
{
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
    // USART TX
    GPIO_InitTypeDef init;
    init.GPIO_Pin = GPIO_Pin_9;
    init.GPIO_Speed = GPIO_Speed_50MHz;
    init.GPIO_Mode = GPIO_Mode_AF_PP;
    GPIO_Init(GPIOA, &init);
    // RX
    init.GPIO_Pin = GPIO_Pin_10;
    init.GPIO_Speed = GPIO_Speed_50MHz;
    init.GPIO_Mode = GPIO_Mode_IPU;
    GPIO_Init(GPIOA, &init);
    // USART
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1, ENABLE);
    USART_InitTypeDef usart_init;
    usart_init.USART_BaudRate = 9600;
    usart_init.USART_WordLength = USART_WordLength_8b;
    usart_init.USART_StopBits = USART_StopBits_1;
    usart_init.USART_Parity = USART_Parity_No;
    usart_init.USART_Mode = USART_Mode_Tx | USART_Mode_Rx;
    usart_init.USART_HardwareFlowControl = USART_HardwareFlowControl_None;
    USART_Init(USART1, &usart_init);
    USART_Cmd(USART1, ENABLE);
    // IT
    USART_ClearFlag(USART1, USART_FLAG_RXNE);
    USART_ITConfig(USART1, USART_IT_RXNE, ENABLE);
    // NVIC
    NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);
    NVIC_InitTypeDef NVICInit = {
        USART1_IRQn,
        0,
        0,
        ENABLE,
    };
    NVIC_Init(&NVICInit);
}

void usart1_send_char(char ch)
{
    USART_SendData(USART1, ch);
    while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET)
    {
    }
}

void usart1_send_string(const char *str)
{
    while (*str != '\0')
    {
        usart1_send_char(*str);
        str++;
    }
}

char usart1_read()
{
    while (USART_GetFlagStatus(USART1, USART_FLAG_RXNE) == RESET)
    {
    }
    return USART_ReceiveData(USART1);
}

char usart1_buffer[100] = {0};
int8_t usart1_buffer_length = -1;

void USART1_IRQHandler()
{
    if (USART_GetITStatus(USART1, USART_IT_RXNE) == SET)
    {
        if (usart1_buffer_length >= 0)
        {
            char ch = usart1_read();
            if (ch == '\n')
            {
                usart1_buffer[usart1_buffer_length] = '\0';
                usart1_buffer_length = -1;
            }
            else
            {
                usart1_buffer[usart1_buffer_length++] = ch;
            }
        }
        USART_ClearITPendingBit(USART1, USART_IT_RXNE);
    }
}

#ifdef __GNUC__
int __io_putchar(int ch)
{
    usart1_send_char(ch);
    return ch;
}

int _write(int file, char *ptr, int length)
{
    for (int i = 0; i < length; ++i)
    {
        __io_putchar(ptr[i]);
    }
    return length;
}
#else
int fputc(int ch, FILE *f)
{
    // ...
}
#endif
