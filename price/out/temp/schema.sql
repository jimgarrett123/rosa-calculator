-- MySQL dump 10.19  Distrib 10.3.28-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: rosa
-- ------------------------------------------------------
-- Server version	10.3.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Sequence structure for `hibernate_sequence`
--

DROP SEQUENCE IF EXISTS `hibernate_sequence`;
CREATE SEQUENCE `hibernate_sequence` start with 1 minvalue 1 maxvalue 9223372036854775806 increment by 1 cache 1000 nocycle ENGINE=InnoDB;
SELECT SETVAL(`hibernate_sequence`, 13001, 0);

--
-- Table structure for table `CpuMemory`
--

DROP TABLE IF EXISTS `CpuMemory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CpuMemory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `instance` varchar(255) NOT NULL,
  `cpu` int(11) NOT NULL,
  `memory` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=289 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Instances`
--

DROP TABLE IF EXISTS `Instances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Instances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `instance` varchar(255) NOT NULL,
  `instancetype` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `operatingsystem` varchar(255) NOT NULL,
  `ondemandprice` decimal(40,10) DEFAULT NULL,
  `std_1yr_nuri_effhourly` decimal(40,10) DEFAULT NULL,
  `std_3yr_auri_effhourly` decimal(40,10) DEFAULT NULL,
  `cpu` decimal(40,10) DEFAULT NULL,
  `memory` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28404 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PriceRequest`
--

DROP TABLE IF EXISTS `PriceRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PriceRequest` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `client` varchar(255) NOT NULL,
  `numRosaClusters` int(11) NOT NULL,
  `numOfInstancesPerCluster` int(11) NOT NULL,
  `region` varchar(255) NOT NULL,
  `ec2InstanceType` varchar(255) NOT NULL,
  `operatingSystem` varchar(255) NOT NULL,
  `ebsGbInstance` int(11) NOT NULL,
  `controlPlaneStorageType` varchar(255) NOT NULL,
  `controlPlaneStorageAmount` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `cpu` varchar(255) NOT NULL,
  `memory` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12131 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RhelPricing`
--

DROP TABLE IF EXISTS `RhelPricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RhelPricing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rhel_type` varchar(255) NOT NULL,
  `ec2_instance_type` varchar(255) NOT NULL,
  `price` decimal(40,5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1224 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31 17:41:41
