#include "buzzer.h"

void buzzer_init()
{
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
    GPIO_InitTypeDef init;
    init.GPIO_Pin = GPIO_Pin_13;
    init.GPIO_Speed = GPIO_Speed_50MHz;
    init.GPIO_Mode = GPIO_Mode_Out_PP;
    GPIO_Init(GPIOB, &init);
    buzzer_off();
}

void buzzer_on()
{
    GPIO_ResetBits(GPIOB, GPIO_Pin_13);
}

void buzzer_off()
{
    GPIO_SetBits(GPIOB, GPIO_Pin_13);
}

void buzzer_toggle()
{
    if (GPIO_ReadOutputDataBit(GPIOB, GPIO_Pin_13) == Bit_SET)
    {
        buzzer_on();
    }
    else
    {
        buzzer_off();
    }
}

int16_t timeout = 0;

void buzzer_set_time(int16_t duration)
{
    timeout = duration;
    buzzer_on();
}

void buzzer_scan()
{
    if (timeout > 0)
    {
        timeout--;
    }
    else if (timeout == 0)
    {
        timeout = -1;
        buzzer_off();
    }
}

BitAction buzzer_read()
{
    return GPIO_ReadInputDataBit(GPIOB, GPIO_Pin_13) == Bit_SET ? Bit_SET : Bit_RESET;
}
