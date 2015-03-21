-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Sam 21 Mars 2015 à 18:38
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=8 ;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `type`, `color`) VALUES
(5, 'Design', '#fff'),
(6, 'Travel', '#fff');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `images`
--

INSERT INTO `images` (`id`, `name`, `path`, `thumb_path`) VALUES
(1, 'file', 'images/upload/1426958113715_Fotolia_29467349.jpg', ''),
(2, 'file', 'images/upload/1426958158730_rota_vicentina.jpg', ''),
(3, 'file', 'images/upload/1426958347796_design.jpeg', ''),
(4, 'file', 'images/upload/1426958591524_peru.jpg', ''),
(5, 'file', 'images/upload/1426958667169_architecture.jpg', '');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=5 ;

--
-- Contenu de la table `posts`
--

INSERT INTO `posts` (`id`, `title`, `text`, `creation`, `id_cat`, `id_user`, `id_image`, `views`) VALUES
(1, 'Rota vicentina', 'Rota Vicentina is a long distance path along the Sw coast of Portugal. Comprising the Historical Way and the Fishermen’s Trail, totals 350 km to walk, between the city of Santiago do Cacém and the Cape of St. Vincent, the most southwestern point of Europe.', '2015-03-21 18:16:29', 6, 4, 2, 1),
(2, 'What is design', 'Design is the creation of a plan or convention for the construction of an object or a system (as in architectural blueprints, engineering drawings, business processes, circuit diagrams and sewing patterns).[1] Design has different connotations in different fields (see design disciplines below). In some cases the direct construction of an object (as in pottery, engineering, management, cowboy coding and graphic design) is also considered to be design.', '2015-03-21 18:19:46', 5, 4, 3, 1),
(3, 'The peru', 'Peru is a country in western South America. It is bordered in the north by Ecuador and Colombia, in the east by Brazil, in the southeast by Bolivia, in the south by Chile, and in the west by the Pacific Ocean. Peru is an extremely biodiverse country with habitats ranging from the arid plains of the Pacific coastal region in the west to the peaks of the Andes mountains vertically extending from the north to the southeast of the country to the tropical Amazon Basin rainforest in the east with the Amazon river.', '2015-03-21 18:23:31', 6, 4, 4, 0),
(4, 'The architecture', 'Architecture is both the process and the product of planning, designing, and constructing buildings and other physical structures. Architectural works, in the material form of buildings, are often perceived as cultural symbols and as works of art. Historical civilizations are often identified with their surviving architectural achievements.', '2015-03-21 18:25:24', 5, 4, 5, 2);

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
