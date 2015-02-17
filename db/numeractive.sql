-- phpMyAdmin SQL Dump
-- version 4.3.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 17, 2015 at 06:01 PM
-- Server version: 10.0.15-MariaDB
-- PHP Version: 5.6.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `numeractive`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(255) NOT NULL,
  `type` varchar(255) COLLATE utf8_bin NOT NULL,
  `color` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `type`, `color`) VALUES
(0, 'programmation', 'blue'),
(1, 'inspiration', 'yellow'),
(2, 'creative coding', 'purple'),
(3, 'design', 'red'),
(4, 'vie quotidienne', 'green');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `name`, `path`) VALUES
(1, 'img7', 'images/img7.png'),
(2, 'img1', 'images/img1.jpg'),
(3, 'img5', 'images/img5.jpg'),
(4, 'img2', 'images/img2.png');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(255) unsigned NOT NULL,
  `title` text CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `text` mediumtext CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `creation` datetime NOT NULL,
  `id_cat` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `id_image` int(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `text`, `creation`, `id_cat`, `id_user`, `id_image`) VALUES
(4, 'blablabla c''est le premier article', 'In Kazakhstan, it is illegal for more than five woman to be in the same place except for in brothel or in grave. In US and A, many womens meet in a groups called feminists.\n\nI arrived in America''s airport with clothings, US dollars, and a jar of gypsy tears to protect me from AIDS.', '2014-04-23 18:30:59', 2, 4, 1),
(5, 'Qui frappuccino trifecta to go milk', 'Extraction skinny, sweet plunger pot wings turkish saucer single shot cappuccino, fair trade coffee as in, mazagran, caramelization cortado est acerbic cortado roast sit siphon. Siphon fair trade, est filter est siphon extraction instant crema, cup, shop, aged sugar to go filter variety at roast seasonal barista seasonal. Macchiato, half and half iced medium chicory single shot, whipped, galão, strong aromatic, a bar milk americano plunger pot. Carajillo half and half sweet et cappuccino est chicory, steamed aftertaste instant in spoon rich spoon galão frappuccino, organic, café au lait in shop dripper eu steamed. Blue mountain instant, as roast extraction arabica brewed cup, body iced, pumpkin spice to go id organic frappuccino caffeine percolator cup qui percolator cream.', '2014-04-29 18:19:09', 3, 4, 4),
(6, 'Skinny, coffee aromatic, acerbic crema eu acerbic single shot', 'Aromatic, sit french press cinnamon, aftertaste java aroma and, dripper variety qui to go, at to go affogato macchiato extra carajillo saucer affogato con panna. Grounds, frappuccino cinnamon turkish espresso filter seasonal, so whipped, spoon to go that aromatic flavour. Spoon trifecta latte, flavour macchiato brewed strong so whipped spoon acerbic mocha rich. Milk, cream seasonal decaffeinated fair trade et robust to go grounds, extra galão, mocha latte cup, aged shop beans, cortado crema macchiato mocha steamed.', '2014-04-29 18:20:09', 2, 4, 2),
(7, 'Leave dead animals as gifts climb leg sun bathe', 'Hate dog climb leg or chase imaginary bugs. Nap all day. Swat at dog sleep on keyboard yet leave dead animals as gifts so hunt anything that moves leave dead animals as gifts or intrigued by the shower chase imaginary bugs. Hate dog destroy couch and need to chase tail. Stick butt in face destroy couch for leave hair everywhere and shake treat bag chew iPad power cord for throwup on your pillow for missing until dinner time. Chase imaginary bugs.', '2014-04-29 18:20:57', 4, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL,
  `creation` datetime NOT NULL,
  `name` tinytext COLLATE utf8_bin NOT NULL,
  `login` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `mdp` char(128) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `creation`, `name`, `login`, `mdp`) VALUES
(4, '2015-02-17 16:38:28', 'admin', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `type` (`type`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `path` (`path`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_idcat` (`id_cat`), ADD KEY `id_user` (`id_user`), ADD KEY `fk_idimage` (`id_image`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(255) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
ADD CONSTRAINT `fk_idcat` FOREIGN KEY (`id_cat`) REFERENCES `categories` (`id`),
ADD CONSTRAINT `fk_idimage` FOREIGN KEY (`id_image`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
