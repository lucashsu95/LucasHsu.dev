package com.birc.backend101;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 啟動類別。整個 Spring Boot 應用程式只需要這一行的 main。
 *
 * 對照 NativeApiServer.java：原生版要自己 new HttpServer、自己 start、
 * 自己處理生命週期，這裡一行就完成。
 */
@SpringBootApplication
public class Backend101Application {

    public static void main(String[] args) {
        SpringApplication.run(Backend101Application.class, args);
    }
}
