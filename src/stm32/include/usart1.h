#ifndef UART1_H
#define UART1_H

#include "stm32f10x.h"
#include <stdbool.h>

void usart1_init();
void usart1_send_char(char ch);
void usart1_send_string(const char *str);
char usart1_read();

char usart1_buffer[100];
int8_t usart1_buffer_length;

#endif // UART1_H
