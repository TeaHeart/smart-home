#ifndef BUZZER_H
#define BUZZER_H

#include "stm32f10x.h"

void buzzer_init();
void buzzer_on();
void buzzer_off();
void buzzer_toggle();
void buzzer_set_time(int16_t duration);
void buzzer_scan();
BitAction buzzer_read();

#endif // BUZZER_H
