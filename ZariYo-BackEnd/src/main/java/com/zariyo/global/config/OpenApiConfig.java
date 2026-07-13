package com.zariyo.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger (OpenAPI 3) 설정 클래스입니다.
 * - Swagger UI 상단에 표기될 API 설명 문서의 타이틀, 설명, 버전을 커스터마이징합니다.
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("자리요 (ZariYo) API 명세서")
                        .description("실시간 좌석 예약 및 5분 임시 선점 시스템 '자리요'의 백엔드 REST API 명세서입니다.")
                        .version("v1.0.0"));
    }
}
