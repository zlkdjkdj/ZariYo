package com.zariyo.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Spring MVC 관련 커스텀 설정을 담당하는 클래스입니다.
 * (CORS 통제는 SecurityConfig.corsConfigurationSource() 단일 지점에서 전담합니다)
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
}
