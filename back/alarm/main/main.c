#include <stdio.h>
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "driver/gpio.h"

#define BLINK_GPIO 22

#define TAG "[ Alarm ]"

void hello(void *pvParameter)
{
    int counter = 0;
	while(true)
	{
	    ESP_LOGI(TAG, "Hello, Goose [ %d ] !", counter++);
	    vTaskDelay(500 / portTICK_RATE_MS);
	}
}
void blink(void *pvParameter)
{
    gpio_pad_select_gpio(BLINK_GPIO);
    /* Set the GPIO as a push/pull output */
    gpio_set_direction(BLINK_GPIO, GPIO_MODE_OUTPUT);
    while(1) {
        /* Blink off (output low) */
        gpio_set_level(BLINK_GPIO, 0);
        vTaskDelay(1000 / portTICK_RATE_MS);
        /* Blink on (output high) */
        gpio_set_level(BLINK_GPIO, 1);
        vTaskDelay(1000 / portTICK_RATE_MS);
    }
}

void app_main(void)
{
    xTaskCreatePinnedToCore(&hello, "hello", 2048, NULL, 5, NULL, 0);
    xTaskCreatePinnedToCore(&blink, "blink", 512,NULL,5,NULL, 1);
}
