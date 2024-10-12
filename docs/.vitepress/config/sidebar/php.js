export function sidebarPhp() {
    return [
        {
            text: "Xampp",
            items: [
                { text: "xampp 起手式｜下載xampp", link: "php/xampp/xampp起手式", activeMatch: "php/xampp/xampp起手式" },
                { text: "xampp mysql 又壞掉", link: "php/xampp/xampp-mysql-err", activeMatch: "php/xampp/xampp-mysql-err" },
            ],
        },
        {
            text: "PHP",
            items: [
                { text: "PHP 函式", link: "php/PHP函式", activeMatch: "php/PHP函式" },
                { text: "PHP 環境變數", link: "php/PHP環境變數", activeMatch: "php/PHP環境變數" },
                { text: "Day1", link: "php/PHP-Day1", activeMatch: "php/PHP-Day1" },
            ],
        },
        {
            text: "SQL",
            items: [
                { text: "JOIN 關聯式", link: "php/sql/sql-join", activeMatch: "php/sql/sql-join" },
                { text: "SQL CASE...WHEN...THEN", link: "php/sql/sql-case-when-then", activeMatch: "php/sql/sql-case-when-then" },
            ],
        },
    ];
}
