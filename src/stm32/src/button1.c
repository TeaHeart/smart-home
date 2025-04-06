#include "button1.h"

void button1_init()
{
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);
    GPIO_InitTypeDef init;
    init.GPIO_Pin = GPIO_Pin_13;
    init.GPIO_Speed = GPIO_Speed_50MHz;
    init.GPIO_Mode = GPIO_Mode_IPU;
    GPIO_Init(GPIOC, &init);
}

BitAction button1_read()
{
    return GPIO_ReadInputDataBit(GPIOC, GPIO_Pin_13) == Bit_SET ? Bit_SET : Bit_RESET;
}
