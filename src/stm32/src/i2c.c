#include "i2c.h"

void i2c_write_scl(BitAction action)
{
    GPIO_WriteBit(GPIOB, GPIO_Pin_8, action);
}

void i2c_write_sda(BitAction action)
{
    GPIO_WriteBit(GPIOB, GPIO_Pin_9, action);
}

void i2c_init()
{
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
    GPIO_InitTypeDef init;
    init.GPIO_Pin = GPIO_Pin_8 | GPIO_Pin_9;
    init.GPIO_Speed = GPIO_Speed_50MHz;
    init.GPIO_Mode = GPIO_Mode_Out_OD;
    GPIO_Init(GPIOB, &init);
}

void i2c_start()
{
    i2c_write_sda(Bit_SET);
    i2c_write_scl(Bit_SET);
    i2c_write_sda(Bit_RESET);
    i2c_write_scl(Bit_RESET);
}

void i2c_stop()
{
    i2c_write_sda(Bit_RESET);
    i2c_write_scl(Bit_SET);
    i2c_write_sda(Bit_SET);
}

void i2c_write(uint8_t byte)
{
    for (uint8_t i = 0x80; i != 0x00; i >>= 1)
    {
        i2c_write_sda((byte & i) != 0 ? Bit_SET : Bit_RESET);
        i2c_write_scl(Bit_SET);
        i2c_write_scl(Bit_RESET);
    }
    i2c_write_scl(Bit_SET);
    i2c_write_scl(Bit_RESET);
}
