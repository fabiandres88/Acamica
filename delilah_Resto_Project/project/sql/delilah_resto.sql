-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:8111
-- Generation Time: Jul 15, 2020 at 03:27 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `order_status_id` int(11) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `id_user`, `order_status_id`, `payment_method_id`, `date`) VALUES
(1, 1, 1, 1, '0000-00-00 00:00:00'),
(2, 1, 1, 1, '0000-00-00 00:00:00'),
(3, 1, 1, 1, '0000-00-00 00:00:00'),
(4, 1, 1, 1, '0000-00-00 00:00:00'),
(5, 1, 1, 1, '0000-00-00 00:00:00'),
(6, 1, 1, 1, '2020-07-07 21:16:43'),
(7, 6, 1, 2, '2020-07-07 21:17:42'),
(8, 14, 2, 1, '2020-07-07 21:20:30'),
(9, 14, 2, 1, '2020-07-07 22:08:40'),
(10, 14, 2, 1, '2020-07-07 22:10:52'),
(11, 14, 2, 1, '2020-07-07 22:11:46'),
(12, 14, 2, 1, '2020-07-07 22:13:01'),
(13, 14, 2, 1, '2020-07-07 22:14:26'),
(14, 14, 2, 1, '2020-07-07 22:15:40'),
(15, 14, 2, 1, '2020-07-07 22:16:23'),
(16, 14, 2, 1, '2020-07-07 22:17:13'),
(17, 14, 2, 1, '2020-07-07 22:18:50'),
(18, 14, 2, 1, '2020-07-07 22:19:09'),
(19, 14, 2, 1, '2020-07-07 22:19:45'),
(20, 14, 2, 1, '2020-07-07 22:23:15'),
(21, 14, 2, 1, '2020-07-07 22:24:12'),
(22, 14, 2, 1, '2020-07-07 22:41:10'),
(23, 14, 2, 1, '2020-07-07 22:42:06'),
(24, 14, 2, 1, '2020-07-07 22:42:26'),
(25, 14, 2, 1, '2020-07-07 22:43:16'),
(26, 14, 2, 1, '2020-07-07 22:46:58'),
(27, 14, 2, 1, '2020-07-07 22:47:20'),
(28, 14, 2, 1, '2020-07-07 22:48:17'),
(29, 14, 2, 1, '2020-07-07 22:48:50'),
(30, 14, 2, 1, '2020-07-07 22:49:30'),
(31, 14, 2, 1, '2020-07-07 22:49:59'),
(32, 14, 2, 1, '2020-07-11 18:34:13'),
(33, 14, 2, 1, '2020-07-11 18:35:32'),
(34, 14, 2, 1, '2020-07-11 18:36:06'),
(35, 14, 2, 1, '2020-07-11 18:38:04'),
(36, 14, 2, 1, '2020-07-11 18:39:09'),
(37, 14, 2, 1, '2020-07-11 20:08:13'),
(38, 14, 2, 1, '2020-07-11 20:09:44'),
(39, 14, 2, 1, '2020-07-11 20:10:59'),
(40, 14, 2, 1, '2020-07-11 20:12:03'),
(41, 14, 2, 1, '2020-07-11 20:13:46'),
(42, 14, 2, 1, '2020-07-11 20:14:27'),
(43, 14, 2, 1, '2020-07-11 20:16:07'),
(44, 14, 2, 1, '2020-07-11 20:17:38'),
(45, 14, 2, 1, '2020-07-11 20:18:16'),
(46, 14, 2, 1, '2020-07-11 20:19:11');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, NULL, NULL, NULL, 16900),
(2, NULL, NULL, NULL, 16900),
(3, 1, NULL, NULL, 16900),
(5, 2, NULL, NULL, 16900),
(7, 3, 2, 2, 16900);

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id`, `name`) VALUES
(5, 'cancelled'),
(2, 'confirmed'),
(6, 'delivered'),
(1, 'new'),
(3, 'preparing'),
(4, 'sent');

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`) VALUES
(1, 'cash'),
(2, 'credit card');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(260) NOT NULL,
  `price` int(11) NOT NULL,
  `available` varchar(3) DEFAULT 'YES'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `price`, `available`) VALUES
(2, 'Hamburguesa Bon Jovi', 16900, 'YES'),
(3, 'Hamburguesa Queen', 27000, 'YES'),
(4, 'Hamburguesa Iron Maiden', 26900, 'NO'),
(5, 'Hamburguesa Beatles', 26900, 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(60) NOT NULL,
  `full_name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `address` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `full_name`, `email`, `phone`, `address`, `password`, `admin`) VALUES
(1, 'Pirula1991', 'Carolina Jaimes', 'carolinajaimes0812@gmail.com', '3166220509', 'Calle 34 # 45 =89', 'pirula0812', 0),
(6, 'fabiano1988', 'Fabian Ramirez', 'fabian1988@gmail.com', '3107564105', 'Calle 57 # 12- 49', 'Millonarios2012', 1),
(14, 'rosita', 'Rosa Vela', 'rosa@gmail.com', '6491674', 'Calle 57 # 12 - 49', 'rosa1961', NULL),
(15, 'FABITO', 'Fabio Ramirez', 'fabito@gmail.com', '6491674', 'Calle 57 # 12 - 49', 'fabio1957', NULL),
(16, 'embajador', 'Pedro Ramirez', 'peter@gmail.com', '310456789', 'Carrera 36 # 27 - 49', 'embas4567', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `order_status_id` (`order_status_id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`),
  ADD UNIQUE KEY `product_id` (`product_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_name` (`product_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `ful_name` (`full_name`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
