export function sidebarPhp() {
    return [
        {
            text: "Xampp",
            items: [
                { text: "xampp 起手式｜下載xampp", link: "php/xampp起手式", activeMatch: "php/xampp起手式" },
                { text: "xampp mysql mysql開不起來", link: "php/xampp-mysql-err", activeMatch: "php/xampp-mysql-err" },
            ],
        },
        {
            text: "PHP",
            items: [
                { text: "PHP函式", link: "php/PHP函式", activeMatch: "php/PHP函式" },
                { text: "Day1", link: "php/PHP-Day1", activeMatch: "php/PHP-Day1" },
            ],
        },
        {
            text: "SQL",
            items: [
                { text: "JOIN 關聯式", link: "php/sql-join", activeMatch: "php/sql-join" },
            ],
        },
    ];
}
