export function sidebarJava() {
    return [
        {
            text: "Basic",
            items: [
                { text: "安裝｜變數", link: "/java/basic/install-java", activeMatch: '/java/basic/install-java' },
                { text: "輸入Scanner", link: "/java/basic/Scanner" },
                { text: "Array陣列與List列表", link: "/java/basic/Array與List深入比較" },
                { text: "HashSet & TreeSet介紹與應用", link: "/java/basic/HashSetTreeSet" },
                { text: "Java - Stream介紹與應用", link: "/java/basic/JavaStream常見的操作" },
                { text: "Interface的生活化應用", link: "/java/basic/java-interface" },
                { text: "什麼是固定簽名", link: "/java/basic/什麼是固定簽名" },
                { text: "是否相等", link: "/java/basic/是否相等" },
                { text: "Integer和int的差別", link: "/java/basic/Integer和int的差別" },
            ],
        },
        {
            text: "OOP",
            items: [
                { text: "混亂到秩序的重構之旅 混亂體驗", link: "/java/oop/oop-1" },
                { text: "混亂到秩序的重構之旅 概念學習", link: "/java/oop/class-object-interface" },
                { text: "混亂到秩序的重構之旅 抽象理解", link: "/java/oop/polymorphism-abstract" },
                { text: "混亂到秩序的重構之旅 實戰應用", link: "/java/oop/oop-2" },
            ],
        },
    ];
}
