CREATE DATABASE  IF NOT EXISTS `superheroes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `superheroes`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: superheroes
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `powers`
--

DROP TABLE IF EXISTS `powers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `powers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `superheroId` int NOT NULL,
  `power` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `superheroId_idx` (`superheroId`),
  CONSTRAINT `superheroId` FOREIGN KEY (`superheroId`) REFERENCES `superheroes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,1,'superstrength'),(2,1,'web slinging'),(3,1,'wall crawling'),(5,12,'I\'m Batman'),(6,12,'Big brain'),(7,12,'money'),(8,13,'Superstrength'),(9,13,'Laser eyes'),(10,13,'Flight'),(11,14,'Superstrength'),(12,14,'Laser eyes'),(13,14,'Flight'),(17,19,'Superspeed'),(18,19,'Phasing'),(19,19,'Geekyness'),(20,21,'Superstrength'),(21,21,'Honesty'),(22,21,'Strategy');
/*!40000 ALTER TABLE `powers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `superheroes`
--

DROP TABLE IF EXISTS `superheroes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `superheroes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `alias` varchar(45) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superheroes`
--

LOCK TABLES `superheroes` WRITE;
/*!40000 ALTER TABLE `superheroes` DISABLE KEYS */;
INSERT INTO `superheroes` VALUES (1,'Spiderman','Peter Parker','2024-05-04','2024-05-04'),(12,'Batman','Bruce Wayne','2024-05-04','2024-05-04'),(13,'Superwoman','Kiara Kent','2024-05-04','2024-05-04'),(14,'Superman','Clark Kent','2024-05-04','2024-05-04'),(19,'Flash','Barry Bonds','2024-05-04','2024-05-05'),(21,'Captain America','Steve Rogers','2024-05-04','2024-05-05');
/*!40000 ALTER TABLE `superheroes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timers`
--

DROP TABLE IF EXISTS `timers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `superheroId` int NOT NULL,
  `triggerTime` datetime(6) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `message` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `superheroId_idx` (`superheroId`),
  KEY `superheroId_timers_idx` (`superheroId`),
  CONSTRAINT `superheroId_timer` FOREIGN KEY (`superheroId`) REFERENCES `superheroes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timers`
--

LOCK TABLES `timers` WRITE;
/*!40000 ALTER TABLE `timers` DISABLE KEYS */;
INSERT INTO `timers` VALUES (1,1,'2024-05-04 15:25:17.000000','',''),(2,1,'2024-05-04 17:25:17.000000','',''),(4,1,'2024-05-04 17:25:17.000000','',''),(6,13,'2024-05-04 14:25:17.000000','three',''),(9,13,'2024-05-05 14:02:31.000000','two','Hi there!'),(10,13,'2024-05-05 14:10:02.000000','two','Hi there!'),(11,13,'2024-05-05 14:11:55.000000','two','Hi there!');
/*!40000 ALTER TABLE `timers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-05 17:20:41
