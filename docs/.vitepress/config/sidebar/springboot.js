export function sidebarSpringboot() {
  return [
    {
      text: "Spring Boot",
      items: [
        {
          text: "後端技術總覽",
          link: "/springboot/",
          activeMatch: '/springboot/',
        },
        {
          text: "Email 與 Scheduled 排程實作",
          link: "/springboot/spring-boot-email-scheduled",
          activeMatch: '/springboot/spring-boot-email-scheduled',
        },
        {
          text: "Lazy vs Eager 載入策略",
          link: "/springboot/lazy",
          activeMatch: '/springboot/lazy',
        },
        {
          text: "Spring Boot 分頁與 N+1 問題",
          link: "/springboot/spring-data-pagination",
          activeMatch: '/springboot/spring-data-pagination',
        },
        {
          text: "JPA 持久化上下文",
          link: "/springboot/persistence-context",
          activeMatch: '/springboot/persistence-context',
        },
        {
          text: "Spring Boot Swagger",
          link: "/springboot/swagger-docs",
          activeMatch: '/springboot/swagger-docs',
        },
        {
          text: "Transactional 事務管理",
          link: "/springboot/transactional",
          activeMatch: '/springboot/transactional',
        },
      ],
    },
  ];
}
