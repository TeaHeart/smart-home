#include "delay.h"

void delay_us(uint32_t duration)
{
    SysTick->LOAD = 72 * duration;            // 设置定时器重装值
    SysTick->VAL = 0x00000000;                // 清空当前计数值
    SysTick->CTRL = 0x00000005;               // 设置时钟源为HCLK, 启动定时器
    while ((SysTick->CTRL & 0x00010000) == 0) // 等待计数到0
    {
    }
    SysTick->CTRL = 0x00000004; // 关闭定时器
}

void delay_ms(uint32_t duration)
{
    while (duration-- != 0)
    {
        delay_us(1000);
    }
}

void delay_s(uint32_t duration)
{
    while (duration-- != 0)
    {
        delay_ms(1000);
    }
}