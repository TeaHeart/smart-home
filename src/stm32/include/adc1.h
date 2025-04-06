#ifndef ADC1_H
#define ACC1_H

#include "stm32f10x.h"

uint16_t adc1Value;

float toVoltage(uint16_t adc);

void adc1_init();

#endif