#ifndef OLED_H
#define OLED_H

#include "stm32f10x.h"

void oled_init();

void oled_clear();

/**
 * @brief  显示字符
 * @param  row     行 [0, 3]
 * @param  column  列 [0,15]
 * @param  c       字符 [ASCII]
 */
void oled_show_char(uint8_t row, uint8_t column, char ch);

/**
 * @brief  显示字符串
 * @param  row     行 [0,3]
 * @param  column  列 [0,15]
 * @param  str     字符串 [ASCII]
 */
void oled_show_string(uint8_t row, uint8_t column, const char *str);

#endif // OLED_H
