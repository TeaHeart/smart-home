#ifndef OLED_H
#define OLED_H

#include "oled.h"
#include "oled-font.h"
#include "i2c.h"

void oled_send_command(uint8_t command)
{
    i2c_start();
    i2c_write(0x78);
    i2c_write(0x00);
    i2c_write(command);
    i2c_stop();
}

void oled_send_data(uint8_t data)
{
    i2c_start();
    i2c_write(0x78);
    i2c_write(0x40);
    i2c_write(data);
    i2c_stop();
}

void oled_set_cursor(uint8_t row, uint8_t column)
{
    oled_send_command(0xB0 | row);
    oled_send_command(0x10 | ((column & 0xF0) >> 4));
    oled_send_command(0x00 | ((column & 0x0F) >> 0));
}

void oled_init()
{
    i2c_init();

    oled_send_command(0xAE); // 关闭显示
    oled_send_command(0xD5); // 设置显示时钟分频比/振荡器频率
    oled_send_command(0x80);
    oled_send_command(0xA8); // 设置多路复用率
    oled_send_command(0x3F);
    oled_send_command(0xD3); // 设置显示偏移
    oled_send_command(0x00);
    oled_send_command(0x40); // 设置显示开始行
    oled_send_command(0xA1); // 设置左右方向，0xA1正常 0xA0左右反置
    oled_send_command(0xC8); // 设置上下方向，0xC8正常 0xC0上下反置
    oled_send_command(0xDA); // 设置COM引脚硬件配置
    oled_send_command(0x12);
    oled_send_command(0x81); // 设置对比度控制
    oled_send_command(0xCF);
    oled_send_command(0xD9); // 设置预充电周期
    oled_send_command(0xF1);
    oled_send_command(0xDB); // 设置VCOMH取消选择级别
    oled_send_command(0x30);
    oled_send_command(0xA4); // 设置整个显示打开/关闭
    oled_send_command(0xA6); // 设置正常/倒转显示
    oled_send_command(0x8D); // 设置充电泵
    oled_send_command(0x14);
    oled_send_command(0xAF); // 开启显示

    oled_clear(); // OLED清屏
}

void oled_clear()
{
    for (uint8_t i = 0; i < 8; ++i)
    {
        oled_set_cursor(i, 0);
        for (uint8_t j = 0; j < 128; ++j)
        {
            oled_send_data(0x00);
        }
    }
}

/**
 * @brief  显示字符
 * @param  row     行 [0, 3]
 * @param  column  列 [0,15]
 * @param  c       字符 [ASCII]
 */
void oled_show_char(uint8_t row, uint8_t column, char ch)
{
    oled_set_cursor(row * 2, column * 8); // 设置光标位置在上半部分
    for (uint8_t i = 0; i < 8; ++i)
    {
        oled_send_data(OLED_F8x16[ch - ' '][i]); // 显示上半部分内容
    }
    oled_set_cursor(row * 2 + 1, column * 8); // 设置光标位置在下半部分
    for (uint8_t i = 0; i < 8; ++i)
    {
        oled_send_data(OLED_F8x16[ch - ' '][i + 8]); // 显示下半部分内容
    }
}

/**
 * @brief  显示字符串
 * @param  row     行 [0,3]
 * @param  column  列 [0,15]
 * @param  str     字符串 [ASCII]
 */
void oled_show_string(uint8_t row, uint8_t column, const char *str)
{
    for (uint8_t i = 0; str[i] != '\0'; ++i)
    {
        oled_show_char(row, column + i, str[i]);
    }
}

#endif // OLED_H
