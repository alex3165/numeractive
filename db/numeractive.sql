-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Dim 22 Février 2015 à 22:40
-- Version du serveur :  5.5.34
-- Version de PHP :  5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `numeractive`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8_bin NOT NULL,
  `color` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=5 ;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `type`, `color`) VALUES
(0, 'programmation', 'blue'),
(1, 'inspiration', 'yellow'),
(2, 'creative coding', 'purple'),
(3, 'design', 'red'),
(4, 'vie quotidienne', 'green');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `thumb_path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `path` (`path`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

--
-- Contenu de la table `images`
--

INSERT INTO `images` (`id`, `name`, `path`, `thumb_path`) VALUES
(1, 'img7', 'images/img7.png', ''),
(2, 'img1', 'images/img1.jpg', ''),
(3, 'img5', 'images/img5.jpg', ''),
(4, 'img2', 'images/img2.png', ''),
(31, 'file', 'public/images/upload/1424632091093_dec-14-christmas-lights-under-the-sea-nocal-1920x1440.png', ''),
(32, 'file', 'public/images/upload/1424632138474_Capture d’écran 2014-10-08 à 20.41.21.png', ''),
(33, 'file', 'public/images/upload/1424632240283_P1120404.jpg', ''),
(34, 'file', 'public/images/upload/1424632324655_P1120404.jpg', ''),
(35, 'file', 'public/images/upload/1424632358449_10688421_10203717737238766_222659812760738027_o.jpg', ''),
(36, 'file', 'public/images/upload/1424632614142_IMG_0078.JPG', ''),
(37, 'file', 'images/upload/1424632953134_IMG_0082.PNG', ''),
(38, 'file', 'images/upload/1424633012296_P1120404.jpg', ''),
(39, 'file', 'images/upload/1424633143350_Numériser.jpeg', ''),
(40, 'file', 'images/upload/1424634278350_469651_3630394110800_1983360779_o.jpg', '');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `text` mediumtext CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `creation` datetime NOT NULL,
  `id_cat` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `id_image` int(255) NOT NULL,
  `views` int(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idcat` (`id_cat`),
  KEY `id_user` (`id_user`),
  KEY `fk_idimage` (`id_image`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=17 ;

--
-- Contenu de la table `posts`
--

INSERT INTO `posts` (`id`, `title`, `text`, `creation`, `id_cat`, `id_user`, `id_image`, `views`) VALUES
(5, 'Qui frappuccino trifecta to go milk', 'Extraction skinny, sweet plunger pot wings turkish saucer single shot cappuccino, fair trade coffee as in, mazagran, caramelization cortado est acerbic cortado roast sit siphon. Siphon fair trade, est filter est siphon extraction instant crema, cup, shop, aged sugar to go filter variety at roast seasonal barista seasonal. Macchiato, half and half iced medium chicory single shot, whipped, galão, strong aromatic, a bar milk americano plunger pot. Carajillo half and half sweet et cappuccino est chicory, steamed aftertaste instant in spoon rich spoon galão frappuccino, organic, café au lait in shop dripper eu steamed. Blue mountain instant, as roast extraction arabica brewed cup, body iced, pumpkin spice to go id organic frappuccino caffeine percolator cup qui percolator cream.', '2014-04-29 18:19:09', 3, 4, 4, 1),
(6, 'Skinny, coffee aromatic, acerbic crema eu acerbic single shot', 'Aromatic, sit french press cinnamon, aftertaste java aroma and, dripper variety qui to go, at to go affogato macchiato extra carajillo saucer affogato con panna. Grounds, frappuccino cinnamon turkish espresso filter seasonal, so whipped, spoon to go that aromatic flavour. Spoon trifecta latte, flavour macchiato brewed strong so whipped spoon acerbic mocha rich. Milk, cream seasonal decaffeinated fair trade et robust to go grounds, extra galão, mocha latte cup, aged shop beans, cortado crema macchiato mocha steamed.', '2014-04-29 18:20:09', 2, 4, 2, 0),
(7, 'Leave dead animals as gifts climb leg sun bathe', 'Hate dog climb leg or chase imaginary bugs. Nap all day. Swat at dog sleep on keyboard yet leave dead animals as gifts so hunt anything that moves leave dead animals as gifts or intrigued by the shower chase imaginary bugs. Hate dog destroy couch and need to chase tail. Stick butt in face destroy couch for leave hair everywhere and shake treat bag chew iPad power cord for throwup on your pillow for missing until dinner time. Chase imaginary bugs.', '2014-04-29 18:20:57', 4, 4, 3, 0),
(16, 'qzdqzdz', 'a"ar''"r', '2015-02-22 20:44:44', 1, 4, 40, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `creation` datetime NOT NULL,
  `name` tinytext COLLATE utf8_bin NOT NULL,
  `login` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `password` char(128) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `twitter` varchar(255) COLLATE utf8_bin NOT NULL,
  `github` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=5 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `creation`, `name`, `login`, `password`, `email`, `twitter`, `github`) VALUES
(4, '2015-02-17 16:38:28', 0x61646d696e, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', '', '', '');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_idcat` FOREIGN KEY (`id_cat`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_idimage` FOREIGN KEY (`id_image`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
