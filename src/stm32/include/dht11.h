// copy from https://blog.csdn.net/u011878611/article/details/110122644
#ifndef DHT11_H
#define DHT11_H

#include "stm32f10x.h"

uint8_t dht_data[5];

void DHT11_GPIO_OUT(void);
void DHT11_GPIO_IN(void);
uint8_t DHT_Read_Byte(void);
uint8_t DHT_Read(void);

#endif // DHT11_H