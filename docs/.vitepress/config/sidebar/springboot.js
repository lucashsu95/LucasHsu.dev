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
          text: "@Transactional 事務管理",
          link: "/springboot/transactional",
          activeMatch: '/springboot/transactional',
        },
        {
          text: "JPA 持久化上下文",
          link: "/springboot/persistence-context",
          activeMatch: '/springboot/persistence-context',
        },
        {
          text: "Lazy vs Eager 載入策略",
          link: "/springboot/lazy",
          activeMatch: '/springboot/lazy',
        },
        {
          text: "Spring Boot 分頁與 N+1 問題",
          link: "/springboot/data-pagination",
          activeMatch: '/springboot/data-pagination',
        },
        {
          text: "Spring Boot Swagger",
          link: "/springboot/swagger-docs",
          activeMatch: '/springboot/swagger-docs',
        },
        {
          text: "Email 與 Scheduled 排程實作",
          link: "/springboot/email-scheduled",
          activeMatch: '/springboot/email-scheduled',
        },
      ],
    },
  ];
}