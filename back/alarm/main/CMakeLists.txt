idf_component_register(SRCS "esp_rest_main.c"
                            "ds1302.c" 
                            "rest_server.c"
                            "audio_setup.c"
                            "sntp_server_time.c"
                            "UrlDecoder.c"
                        INCLUDE_DIRS "include"
                        REQUIRES fatfs esp_http_server spiffs nvs_flash mdns json audio_hal  
                                esp_peripherals esp_dispatcher audio_stream audio_sal esp-adf-libs 
                                wifi_service esp_wifi audio_recorder esp_event audio_board player
                        EMBED_TXTFILES telegram_certificate.pem)

set(WEB_SRC_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../front/alarm")
spiffs_create_partition_image(spiffs ${WEB_SRC_DIR}/dist FLASH_IN_PROJECT)
