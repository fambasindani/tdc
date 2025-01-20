CREATE DATABASE  IF NOT EXISTS `bdtdc` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `bdtdc`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: bdtdc
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `arrets`
--

DROP TABLE IF EXISTS `arrets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arrets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrets`
--

LOCK TABLES `arrets` WRITE;
/*!40000 ALTER TABLE `arrets` DISABLE KEYS */;
INSERT INTO `arrets` VALUES (1,'FULU'),(3,'MASANGAMBILA'),(4,'LIYOLO');
/*!40000 ALTER TABLE `arrets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Vehicule'),(2,'Moto'),(3,'Camion'),(5,'Train');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) DEFAULT NULL,
  `datecourse` date DEFAULT NULL,
  `idtarification` int(11) DEFAULT NULL,
  `montant` decimal(10,2) DEFAULT NULL,
  `idvehicule` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (6,3,'2025-01-15',1,6000.00,2),(7,1,'2025-01-16',2,5500.00,4),(8,1,'2025-01-20',1,6000.00,1),(9,3,'2025-01-20',1,6000.00,3);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itinairaires`
--

DROP TABLE IF EXISTS `itinairaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinairaires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinairaires`
--

LOCK TABLES `itinairaires` WRITE;
/*!40000 ALTER TABLE `itinairaires` DISABLE KEYS */;
INSERT INTO `itinairaires` VALUES (1,'UPN-UNIKIN'),(2,'UPN-NGABA'),(3,'MBUDI-ZANDO');
/*!40000 ALTER TABLE `itinairaires` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `justifications`
--

DROP TABLE IF EXISTS `justifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `justifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) DEFAULT NULL,
  `dateinitiale` datetime DEFAULT NULL,
  `datefin` datetime DEFAULT NULL,
  `idarret` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `justifications`
--

LOCK TABLES `justifications` WRITE;
/*!40000 ALTER TABLE `justifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `justifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `listecourses`
--

DROP TABLE IF EXISTS `listecourses`;
/*!50001 DROP VIEW IF EXISTS `listecourses`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `listecourses` AS SELECT 
 1 AS `nom`,
 1 AS `prenom`,
 1 AS `avatar`,
 1 AS `immatriculation`,
 1 AS `marque`,
 1 AS `montanttarif`,
 1 AS `id`,
 1 AS `iduser`,
 1 AS `datecourse`,
 1 AS `montant`,
 1 AS `idtarification`,
 1 AS `idvehicule`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `listetarifications`
--

DROP TABLE IF EXISTS `listetarifications`;
/*!50001 DROP VIEW IF EXISTS `listetarifications`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `listetarifications` AS SELECT 
 1 AS `id`,
 1 AS `description`,
 1 AS `montant`,
 1 AS `iditineraire`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `listevehicules`
--

DROP TABLE IF EXISTS `listevehicules`;
/*!50001 DROP VIEW IF EXISTS `listevehicules`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `listevehicules` AS SELECT 
 1 AS `nom`,
 1 AS `prenom`,
 1 AS `email`,
 1 AS `telephone`,
 1 AS `avatar`,
 1 AS `id`,
 1 AS `idcat`,
 1 AS `immatriculation`,
 1 AS `num_chassies`,
 1 AS `marque`,
 1 AS `iduser`,
 1 AS `description`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `listeversements`
--

DROP TABLE IF EXISTS `listeversements`;
/*!50001 DROP VIEW IF EXISTS `listeversements`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `listeversements` AS SELECT 
 1 AS `nom`,
 1 AS `prenom`,
 1 AS `avatar`,
 1 AS `immatriculation`,
 1 AS `marque`,
 1 AS `montanttarif`,
 1 AS `iduser`,
 1 AS `datecourse`,
 1 AS `montant`,
 1 AS `idtarification`,
 1 AS `idvehicule`,
 1 AS `id`,
 1 AS `idcourse`,
 1 AS `dateembarquement`,
 1 AS `datedepart`,
 1 AS `datearriver`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_recev` int(11) DEFAULT NULL,
  `id_sender` int(11) DEFAULT NULL,
  `message` text,
  `temps` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paiements`
--

DROP TABLE IF EXISTS `paiements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paiements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idvehicule` int(11) DEFAULT NULL,
  `prix_trajet` decimal(10,1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paiements`
--

LOCK TABLES `paiements` WRITE;
/*!40000 ALTER TABLE `paiements` DISABLE KEYS */;
/*!40000 ALTER TABLE `paiements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,3,'utilisateur');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarifications`
--

DROP TABLE IF EXISTS `tarifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `montant` decimal(15,1) DEFAULT NULL,
  `iditineraire` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarifications`
--

LOCK TABLES `tarifications` WRITE;
/*!40000 ALTER TABLE `tarifications` DISABLE KEYS */;
INSERT INTO `tarifications` VALUES (1,6000.0,1),(2,5500.0,2),(3,4200.0,3);
/*!40000 ALTER TABLE `tarifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_justifications`
--

DROP TABLE IF EXISTS `type_justifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_justifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_justifications`
--

LOCK TABLES `type_justifications` WRITE;
/*!40000 ALTER TABLE `type_justifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_justifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` text,
  `adresse` text,
  `avatar` text,
  `telephone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Famba','Ngoy','p@gmail.com','$2b$12$emVUMRtaFHQL4wp2R2G/KuhneMwboutAfWOwAPQoNxgzJgpOqAM06','KINGI 56','user.png','12365412'),(3,'Abedi','Ketchi','abedi@gmail.com','$2b$12$pga40DQN0dDvYDkML/OFUOI3db5HATg9e2HegP1kXPjRZYpnxPSbi','Kingi 37','user_3_1736772505.jpeg','089765436');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicules`
--

DROP TABLE IF EXISTS `vehicules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcat` int(11) DEFAULT NULL,
  `immatriculation` varchar(45) DEFAULT NULL,
  `num_chassies` varchar(45) DEFAULT NULL,
  `marque` varchar(45) DEFAULT NULL,
  `iduser` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicules`
--

LOCK TABLES `vehicules` WRITE;
/*!40000 ALTER TABLE `vehicules` DISABLE KEYS */;
INSERT INTO `vehicules` VALUES (1,1,'25784512','A524123','Nissan',1),(2,2,'577677','5678455','Keyeseke',3),(3,2,'678543','348765','Yamaha ',1),(4,2,'12337889','133778','Honda',1);
/*!40000 ALTER TABLE `vehicules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `versements`
--

DROP TABLE IF EXISTS `versements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `versements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcourse` int(11) DEFAULT NULL,
  `dateembarquement` datetime DEFAULT NULL,
  `datedepart` datetime DEFAULT NULL,
  `datearriver` datetime DEFAULT NULL,
  `iduser` int(11) DEFAULT NULL,
  `observation` tinyint(4) DEFAULT NULL,
  `valider` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `versements`
--

LOCK TABLES `versements` WRITE;
/*!40000 ALTER TABLE `versements` DISABLE KEYS */;
INSERT INTO `versements` VALUES (20,6,'2025-01-19 17:34:43','2025-01-19 17:50:54','2025-01-19 18:01:46',3,1,NULL),(21,6,'2025-01-19 18:03:10','2025-01-19 18:03:52','2025-01-19 18:04:28',3,1,NULL),(22,7,'2025-01-19 18:37:23','2025-01-19 18:38:34','2025-01-19 18:38:48',1,1,NULL),(23,6,'2025-01-19 18:38:10','2025-01-19 19:40:28','2025-01-20 08:12:13',3,1,NULL),(24,7,'2025-01-20 08:12:21','2025-01-20 08:12:27','2025-01-20 08:12:34',1,1,NULL),(25,6,'2025-01-20 08:14:09','2025-01-20 08:14:15','2025-01-20 08:14:21',3,1,NULL),(26,6,'2025-01-20 08:23:48','2025-01-20 08:23:55','2025-01-20 08:24:01',3,1,NULL),(27,8,'2025-01-20 09:16:44','2025-01-20 09:17:04','2025-01-20 09:17:55',1,1,NULL),(28,8,'2025-01-20 09:29:16','2025-01-20 09:29:23','2025-01-20 09:29:29',1,1,NULL);
/*!40000 ALTER TABLE `versements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bdtdc'
--

--
-- Dumping routines for database 'bdtdc'
--

--
-- Final view structure for view `listecourses`
--

/*!50001 DROP VIEW IF EXISTS `listecourses`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `listecourses` AS select `users`.`nom` AS `nom`,`users`.`prenom` AS `prenom`,`users`.`avatar` AS `avatar`,`vehicules`.`immatriculation` AS `immatriculation`,`vehicules`.`marque` AS `marque`,`tarifications`.`montant` AS `montanttarif`,`courses`.`id` AS `id`,`courses`.`iduser` AS `iduser`,`courses`.`datecourse` AS `datecourse`,`courses`.`montant` AS `montant`,`courses`.`idtarification` AS `idtarification`,`courses`.`idvehicule` AS `idvehicule` from (((`users` join `vehicules`) join `tarifications`) join `courses`) where ((`users`.`id` = `courses`.`iduser`) and (`vehicules`.`id` = `courses`.`idvehicule`) and (`tarifications`.`id` = `courses`.`idtarification`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `listetarifications`
--

/*!50001 DROP VIEW IF EXISTS `listetarifications`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `listetarifications` AS select `tarifications`.`id` AS `id`,`itinairaires`.`description` AS `description`,`tarifications`.`montant` AS `montant`,`tarifications`.`iditineraire` AS `iditineraire` from (`tarifications` join `itinairaires`) where (`tarifications`.`iditineraire` = `itinairaires`.`id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `listevehicules`
--

/*!50001 DROP VIEW IF EXISTS `listevehicules`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `listevehicules` AS select `users`.`nom` AS `nom`,`users`.`prenom` AS `prenom`,`users`.`email` AS `email`,`users`.`telephone` AS `telephone`,`users`.`avatar` AS `avatar`,`vehicules`.`id` AS `id`,`vehicules`.`idcat` AS `idcat`,`vehicules`.`immatriculation` AS `immatriculation`,`vehicules`.`num_chassies` AS `num_chassies`,`vehicules`.`marque` AS `marque`,`vehicules`.`iduser` AS `iduser`,`categories`.`description` AS `description` from ((`categories` join `vehicules`) join `users`) where ((`vehicules`.`idcat` = `categories`.`id`) and (`users`.`id` = `vehicules`.`iduser`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `listeversements`
--

/*!50001 DROP VIEW IF EXISTS `listeversements`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `listeversements` AS select `listecourses`.`nom` AS `nom`,`listecourses`.`prenom` AS `prenom`,`listecourses`.`avatar` AS `avatar`,`listecourses`.`immatriculation` AS `immatriculation`,`listecourses`.`marque` AS `marque`,`listecourses`.`montanttarif` AS `montanttarif`,`listecourses`.`iduser` AS `iduser`,`listecourses`.`datecourse` AS `datecourse`,`listecourses`.`montant` AS `montant`,`listecourses`.`idtarification` AS `idtarification`,`listecourses`.`idvehicule` AS `idvehicule`,`versements`.`id` AS `id`,`versements`.`idcourse` AS `idcourse`,`versements`.`dateembarquement` AS `dateembarquement`,`versements`.`datedepart` AS `datedepart`,`versements`.`datearriver` AS `datearriver` from (`versements` join `listecourses`) where (`listecourses`.`id` = `versements`.`idcourse`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-20 17:34:22
