#include "fix.h"
#include "led1.h"
#include "button1.h"
#include "buzzer.h"
#include "usart1.h"
#include "dht11.h"
#include "inf.h"
#include "ldr.h"
#include "oled.h"
#include "delay.h"

#include "stm32f10x.h"
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    SetSysClock();

    delay_s(1);

    bool button1_prev_press = true;
    char oled_buffer[16 + 1] = {0};
    uint16_t ms_count = 0;

    led1_init();
    button1_init();
    buzzer_init();
    inf_init();
    usart1_init();
    ldr_init();
    oled_init();

    while (true)
    {
        bool button1_curr_press = button1_read();
        if (!button1_prev_press && button1_curr_press)
        {
            led1_toggle();
        }
        button1_prev_press = button1_curr_press;

        if (usart1_buffer_length == -1)
        {

            if (strcmp(usart1_buffer, "led1_on") == 0)
            {
                if (led1_read() == 1)
                {
                    led1_on();
                    printf("cmd=led1_on=ok\n");
                }
            }
            else if (strcmp(usart1_buffer, "led1_off") == 0)
            {
                if (led1_read() == 0)
                {
                    led1_off();
                    printf("cmd=led1_off=ok\n");
                }
            }
            else if (strcmp(usart1_buffer, "buzzer_on") == 0)
            {
                if (buzzer_read() == 1)
                {
                    buzzer_on();
                    printf("cmd=buzzer_on=ok\n");
                }
            }
            else if (strcmp(usart1_buffer, "buzzer_off") == 0)
            {
                if (buzzer_read() == 0)
                {
                    buzzer_off();
                    printf("cmd=buzzer_off=ok\n");
                }
            }
            else
            {
                printf("cmd=");
                printf(usart1_buffer);
                printf("=error\n");
            }

            usart1_buffer_length = 0;
        }

        if (ms_count++ == 1000)
        {
            sprintf(oled_buffer, "inf=%d", inf_read());
            oled_show_string(0, 0, oled_buffer);
            printf(oled_buffer);
            printf("\n");

            sprintf(oled_buffer, "led=%d", led1_read());
            oled_show_string(0, 5, oled_buffer);
            printf(oled_buffer);
            printf("\n");

            sprintf(oled_buffer, "btn=%d", button1_read());
            oled_show_string(0, 10, oled_buffer);
            printf(oled_buffer);
            printf("\n");

            sprintf(oled_buffer, "bzr=%d", buzzer_read());
            oled_show_string(1, 0, oled_buffer);
            printf(oled_buffer);
            printf("\n");

            sprintf(oled_buffer, "light=%d", ldr_lux());
            oled_show_string(1, 6, oled_buffer);
            printf(oled_buffer);
            printf("\n");

            if (DHT_Read())
            {
                sprintf(oled_buffer, "temp=%02d.%02d", dht_data[2], dht_data[3]);
                oled_show_string(2, 0, oled_buffer);
                printf(oled_buffer);
                printf("\n");

                sprintf(oled_buffer, "hum=%02d.%02d", dht_data[0], dht_data[1]);
                oled_show_string(3, 0, oled_buffer);
                printf(oled_buffer);
                printf("\n");
            }

            ms_count = 0;
        }

        delay_ms(1);
    }
}
