export function sidebarJava() {
    return [
        {
            text: "Basic",
            items: [
                { text: "安裝｜變數", link: "/java/basic/install-java", activeMatch: '/java/basic/install-java' },
                { text: "輸入Scanner", link: "/java/basic/Scanner和String[]args" },
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
                { text: "從混亂到秩序的程式碼重構之旅", link: "/java/oop/index" },
                { text: "Java 的三大主角 上文", link: "/java/oop/class-object-part-1" },
                { text: "Java 的三大主角 下文", link: "/java/oop/class-object-part-2" },
            ],
        },
    ];
}
