export function sidebarBackend() {
  return [
    {
      text: "Spring Boot",
      items: [
        {
          text: "後端技術總覽",
          link: "/backend/",
          activeMatch: '/backend/',
        },
        {
          text: "Email 與 Scheduled 排程實作",
          link: "/backend/spring-boot/spring-boot-email-scheduled",
          activeMatch: '/backend/spring-boot/spring-boot-email-scheduled',
        },
        {
          text: "Lazy vs Eager 載入策略",
          link: "/backend/spring-boot/lazy",
          activeMatch: '/backend/spring-boot/lazy',
        },
        {
          text: "Spring Boot 分頁與 N+1 問題",
          link: "/backend/spring-boot/spring-data-pagination",
          activeMatch: '/backend/spring-boot/spring-data-pagination',
        },
        {
          text: "JPA 持久化上下文",
          link: "/backend/spring-boot/persistence-context",
          activeMatch: '/backend/spring-boot/persistence-context',
        },
        {
          text: "Spring Boot Swagger",
          link: "/backend/spring-boot/swagger-docs",
          activeMatch: '/backend/spring-boot/swagger-docs',
        },
        {
          text: "Transactional 事務管理",
          link: "/backend/spring-boot/transactional",
          activeMatch: '/backend/spring-boot/transactional',
        },
      ],
    },
  ];
}
