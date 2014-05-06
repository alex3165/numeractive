-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Mar 06 Mai 2014 à 21:56
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
  `id_cat` int(255) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8_bin NOT NULL,
  `color` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id_cat`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=5 ;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id_cat`, `type`, `color`) VALUES
(0, 'programmation', 'blue'),
(1, 'inspiration', 'yellow'),
(2, 'creative coding', 'purple'),
(3, 'design', 'red'),
(4, 'vie quotidienne', 'green');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `text` mediumtext CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `img` varchar(255) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `creation` datetime NOT NULL,
  `id_cat` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idcat` (`id_cat`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=8 ;

--
-- Contenu de la table `posts`
--

INSERT INTO `posts` (`id`, `title`, `text`, `img`, `creation`, `id_cat`, `id_user`) VALUES
(4, 'blablabla c''est le premier article', 'In Kazakhstan, it is illegal for more than five woman to be in the same place except for in brothel or in grave. In US and A, many womens meet in a groups called feminists.\n\nI arrived in America''s airport with clothings, US dollars, and a jar of gypsy tears to protect me from AIDS.', 'images/img7.png', '2014-04-23 18:30:59', 2, 1),
(5, 'Qui frappuccino trifecta to go milk', 'Extraction skinny, sweet plunger pot wings turkish saucer single shot cappuccino, fair trade coffee as in, mazagran, caramelization cortado est acerbic cortado roast sit siphon. Siphon fair trade, est filter est siphon extraction instant crema, cup, shop, aged sugar to go filter variety at roast seasonal barista seasonal. Macchiato, half and half iced medium chicory single shot, whipped, galão, strong aromatic, a bar milk americano plunger pot. Carajillo half and half sweet et cappuccino est chicory, steamed aftertaste instant in spoon rich spoon galão frappuccino, organic, café au lait in shop dripper eu steamed. Blue mountain instant, as roast extraction arabica brewed cup, body iced, pumpkin spice to go id organic frappuccino caffeine percolator cup qui percolator cream.', 'images/img2.png', '2014-04-29 18:19:09', 3, 1),
(6, 'Skinny, coffee aromatic, acerbic crema eu acerbic single shot', 'Aromatic, sit french press cinnamon, aftertaste java aroma and, dripper variety qui to go, at to go affogato macchiato extra carajillo saucer affogato con panna. Grounds, frappuccino cinnamon turkish espresso filter seasonal, so whipped, spoon to go that aromatic flavour. Spoon trifecta latte, flavour macchiato brewed strong so whipped spoon acerbic mocha rich. Milk, cream seasonal decaffeinated fair trade et robust to go grounds, extra galão, mocha latte cup, aged shop beans, cortado crema macchiato mocha steamed.', 'images/img1.jpg', '2014-04-29 18:20:09', 2, 3),
(7, 'Leave dead animals as gifts climb leg sun bathe', 'Hate dog climb leg or chase imaginary bugs. Nap all day. Swat at dog sleep on keyboard yet leave dead animals as gifts so hunt anything that moves leave dead animals as gifts or intrigued by the shower chase imaginary bugs. Hate dog destroy couch and need to chase tail. Stick butt in face destroy couch for leave hair everywhere and shake treat bag chew iPad power cord for throwup on your pillow for missing until dinner time. Chase imaginary bugs.', 'images/img5.jpg', '2014-04-29 18:20:57', 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` tinytext COLLATE utf8_bin NOT NULL,
  `login` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `mdp` char(128) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `creation`, `name`, `login`, `mdp`) VALUES
(1, '2014-04-23 16:29:06', 0x616c6578616e647265, 'admin', '12ldhbh07'),
(3, '2014-04-28 12:58:08', 0x6d617263656c696e6f, 'marcel', 'porcel');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_idcat` FOREIGN KEY (`id_cat`) REFERENCES `categories` (`id_cat`),
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
