#include "inf.h"

void inf_init()
{
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
    GPIO_InitTypeDef init;
    init.GPIO_Pin = GPIO_Pin_12;
    init.GPIO_Speed = GPIO_Speed_50MHz;
    init.GPIO_Mode = GPIO_Mode_IPU;
    GPIO_Init(GPIOB, &init);
}

BitAction inf_read()
{
    return GPIO_ReadInputDataBit(GPIOB, GPIO_Pin_12) == Bit_SET ? Bit_SET : Bit_RESET;
}
