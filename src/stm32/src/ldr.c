#include "ldr.h"
#include "adc1.h"

#include <math.h>

void ldr_init()
{
    adc1_init();
}

uint16_t ldr_lux()
{
    float voltage = toVoltage(adc1Value);
    float r = voltage / (3.3f - voltage) * 10000;
    uint16_t lux = 40000 * pow(r, -0.6021);
    return lux > 999 ? 999 : lux;
}