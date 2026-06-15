export function sidebarSpringboot() {
  return [
    {
      text: "後端技術總覽",
      link: "/springboot/",
      activeMatch: '/springboot/$',
    },
    {
      text: "基礎核心",
      collapsed: false,
      items: [
        {
          text: "@Valid",
          link: "/springboot/valid-service",
          activeMatch: '/springboot/valid-service',
        },
        {
          text: "JPA 持久化上下文",
          link: "/springboot/persistence-context",
          activeMatch: '/springboot/persistence-context',
        },
        {
          text: "@Transactional 事務管理",
          link: "/springboot/transactional",
          activeMatch: '/springboot/transactional',
        },
      ],
    },
    {
      text: "效能優化",
      collapsed: false,
      items: [
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
      ],
    },
    {
      text: "設定檔",
      collapsed: false,
      items: [
        {
          text: "@ConfigurationProperties",
          link: "/springboot/configuration-properties",
          activeMatch: '/springboot/configuration-properties',
        },
        {
          text: "Spring Profiles：dev/prod 切換",
          link: "/springboot/spring-profiles",
          activeMatch: '/springboot/spring-profiles',
        },
        {
          text: "整合實作：Config + Security",
          link: "/springboot/config-security-integration",
          activeMatch: '/springboot/config-security-integration',
        },
      ],
    },
    {
      text: "安全認證",
      collapsed: false,
      items: [
        {
          text: "Security & Authentication",
          link: "/springboot/security",
          activeMatch: '/springboot/security',
        },
      ],
    },
    {
      text: "檔案處理",
      collapsed: false,
      items: [
        {
          text: "Spring Boot 檔案上傳與下載",
          link: "/springboot/file-upload-download",
          activeMatch: '/springboot/file-upload-download',
        },
        {
          text: "Spring Boot Word 檔案下載",
          link: "/springboot/file-word",
          activeMatch: '/springboot/file-word',
        },
      ],
    },
    {
      text: "進階技術",
      collapsed: true,
      items: [
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
        {
          text: "Spring Boot AOP + @Async",
          link: "/springboot/aop-async",
          activeMatch: '/springboot/aop-async',
        },
        {
          text: "Application Events + @TransactionalEventListener",
          link: "/springboot/application-events",
          activeMatch: '/springboot/application-events',
        },
        {
          text: "Spring Boot Specification 動態查詢指南",
          link: "/springboot/specification-guide",
          activeMatch: '/springboot/specification-guide',
        },
      ],
    },
    {
      text: "開發工具",
      collapsed: true,
      items: [
        {
          text: "Checkstyle / PMD / Spotless",
          link: "/springboot/code-quality-tools",
          activeMatch: '/springboot/code-quality-tools',
        },
      ],
    },
  ];
}
