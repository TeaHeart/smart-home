#ifndef LED1_H
#define LED1_H

#include "stm32f10x.h"

void led1_init();
void led1_on();
void led1_off();
void led1_toggle();
BitAction led1_read();

#endif // LED1_H
