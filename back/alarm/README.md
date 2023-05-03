# Alarm

Ядро 0 - раз в 0.5 секунды выводит в терминал "Hello, Goose [ %d ] !" и счетчик.

Ядро 1 - раз в секунду включается и выключается.

```
I (0) cpu_start: App cpu up.
I (217) cpu_start: Pro cpu start user code
I (217) cpu_start: cpu freq: 160000000
I (217) cpu_start: Application information:
I (222) cpu_start: Project name:     main
I (226) cpu_start: App version:      9233592-dirty
I (232) cpu_start: Compile time:     May  4 2023 02:24:43
I (238) cpu_start: ELF file SHA256:  8f19ae69ed5aae83...
I (244) cpu_start: ESP-IDF:          v4.4.1-149-g009e66e625-dirty
I (251) heap_init: Initializing. RAM available for dynamic allocation:
I (258) heap_init: At 3FFAE6E0 len 00001920 (6 KiB): DRAM
I (264) heap_init: At 3FFB2C48 len 0002D3B8 (180 KiB): DRAM
I (270) heap_init: At 3FFE0440 len 00003AE0 (14 KiB): D/IRAM
I (276) heap_init: At 3FFE4350 len 0001BCB0 (111 KiB): D/IRAM
I (283) heap_init: At 4008B1A4 len 00014E5C (83 KiB): IRAM
I (290) spi_flash: detected chip: generic
I (294) spi_flash: flash io: dio
I (299) cpu_start: Starting scheduler on PRO CPU.
I (0) cpu_start: Starting scheduler on APP CPU.
I (309) [ Alarm ]: Hello, Goose [ 0 ] !
I (809) [ Alarm ]: Hello, Goose [ 1 ] !
I (1309) [ Alarm ]: Hello, Goose [ 2 ] !
I (1809) [ Alarm ]: Hello, Goose [ 3 ] !
I (2309) [ Alarm ]: Hello, Goose [ 4 ] !
```