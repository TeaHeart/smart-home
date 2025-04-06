#include "led1.h"

void led1_init()
{
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
    GPIO_InitTypeDef init;
    init.GPIO_Pin = GPIO_Pin_0;
    init.GPIO_Speed = GPIO_Speed_50MHz;
    init.GPIO_Mode = GPIO_Mode_Out_PP;
    GPIO_Init(GPIOB, &init);
    led1_off();
}

void led1_on()
{
    GPIO_ResetBits(GPIOB, GPIO_Pin_0);
}

void led1_off()
{
    GPIO_SetBits(GPIOB, GPIO_Pin_0);
}

void led1_toggle()
{
    if (GPIO_ReadOutputDataBit(GPIOB, GPIO_Pin_0) == Bit_SET)
    {
        led1_on();
    }
    else
    {
        led1_off();
    }
}

BitAction led1_read()
{
    return GPIO_ReadInputDataBit(GPIOB, GPIO_Pin_0) == Bit_SET ? Bit_SET : Bit_RESET;
}
