-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： my-db
-- 產生時間： 2024 年 07 月 27 日 13:40
-- 伺服器版本： 10.11.8-MariaDB-ubu2204
-- PHP 版本： 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `test`
--

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `account` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `account`, `password`) VALUES
(1, 'user01', 'user01pass'),
(2, 'user02', 'user02pass'),
(3, 'user03', 'user03pass'),
(4, 'user04', 'user04pass');

-- --------------------------------------------------------

--
-- 資料表結構 `user_quotas`
--

CREATE TABLE `user_quotas` (
  `id` int(11) NOT NULL,
  `value` int(20) NOT NULL,
  `reason` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user_quotas`
--

INSERT INTO `user_quotas` (`id`, `value`, `reason`, `user_id`) VALUES
(1, 10, 'CREATE_USER', 1),
(2, 10, 'CREATE_USER', 2),
(3, 10, 'CREATE_USER', 3),
(4, 10, 'CREATE_USER', 4),
(5, -1, 'CREATE_TASK', 1),
(6, -1, 'CREATE_TASK', 2),
(7, -1, 'CREATE_TASK', 1),
(8, -1, 'CREATE_TASK', 3),
(9, -1, 'CREATE_TASK', 1),
(10, -1, 'CREATE_TASK', 4),
(11, -1, 'CREATE_TASK', 4),
(12, -1, 'CREATE_TASK', 3);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user_quotas`
--
ALTER TABLE `user_quotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_quotas`
--
ALTER TABLE `user_quotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `user_quotas`
--
ALTER TABLE `user_quotas`
  ADD CONSTRAINT `user_quotas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
