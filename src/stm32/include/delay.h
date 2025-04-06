#ifndef DELAY_H
#define DELAY_H

#include "stm32f10x.h"

/**
 * @brief  微秒延时
 * @param  duration 持续时长 [0, 233015]
 */
void delay_us(uint32_t duration);

/**
 * @brief  毫秒延时
 * @param  duration 持续时长
 */
void delay_ms(uint32_t duration);

/**
 * @brief  秒级延时
 * @param  duration 持续时长
 */
void delay_s(uint32_t duration);

#endif // DELAY_H
