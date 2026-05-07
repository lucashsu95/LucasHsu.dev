export function sidebarConcepts() {
  return [
    {
      text: "Architecture",
      items: [
        {
          text: "Clean Architecture 簡潔解析",
          link: "/concepts/clean-architecture",
          activeMatch: '/concepts/clean-architecture',
        },
      ],
    },
    {
      text: "Functional Programming",
      items: [
        {
          text: "FP 入門指南",
          link: "/concepts/fp/functional-programming-intro",
          activeMatch: '/concepts/fp/functional-programming-intro',
        },
        {
          text: "Currying 讓函數更加靈活的魔法",
          link: "/concepts/fp/currying-guide",
          activeMatch: '/concepts/fp/currying-guide',
        },
        {
          text: "Functor 容器與映射的藝術",
          link: "/concepts/fp/functor-guide",
          activeMatch: '/concepts/fp/functor-guide',
        },
        {
          text: "Monad FP設計的終極抽象",
          link: "/concepts/fp/monad-guide",
          activeMatch: '/concepts/fp/monad-guide',
        },
        {
          text: "Point-Free 與管線化",
          link: "/concepts/fp/point-free",
          activeMatch: '/concepts/fp/point-free',
        },
        {
          text: "FP 專案架構實戰指南",
          link: "/concepts/fp/fp-project-architecture",
          activeMatch: '/concepts/fp/fp-project-architecture',
        },
      ],
    },
  ];
}