#ifndef I2C_H
#define I2C_H

#include "stm32f10x.h"

void i2c_init();
void i2c_start();
void i2c_stop();
void i2c_write(uint8_t data);

#endif // I2C_H
