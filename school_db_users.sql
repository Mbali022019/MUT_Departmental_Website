-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: school_db
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('student','staff') NOT NULL,
  `name` varchar(100) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'22415488@live.mut.ac.za','student123','student','Student 22415488',NULL,NULL),(2,'staff@mut.ac.za','staff123','staff','Dr. Mutanga',NULL,NULL),(3,'hod@mut.ac.za','hod123','staff','Prof. Themba Dlamini',NULL,NULL),(4,'dean@mut.ac.za','dean123','staff','Dr. Lungile Mthembu',NULL,NULL),(5,'22322695@live.mut.ac.za','student123','student','Student 22322695',NULL,NULL),(6,'22301773@live.mut.ac.za','student123','student','Student 22301773',NULL,NULL),(7,'22323721@live.mut.ac.za','student123','student','Student 22323721',NULL,NULL),(8,'22320842@live.mut.ac.za','student123','student','Student 22320842',NULL,NULL),(9,'22325063@live.mut.ac.za','student123','student','Student 22325063',NULL,NULL),(10,'22330742@live.mut.ac.za','student123','student','Student 22330742',NULL,NULL),(11,'22330175@live.mut.ac.za','student123','student','Student 22330175',NULL,NULL),(12,'22202388@live.mut.ac.za','student123','student','Student 22202388',NULL,NULL),(13,'22315668@live.mut.ac.za','student123','student','Student 22315668',NULL,NULL),(14,'22333548@live.mut.ac.za','student123','student','Student 22333548',NULL,NULL),(15,'22303495@live.mut.ac.za','student123','student','Student 22303495',NULL,NULL),(16,'22344350@live.mut.ac.za','student123','student','Student 22344350',NULL,NULL),(17,'22325286@live.mut.ac.za','student123','student','Student 22325286',NULL,NULL),(18,'22314172@live.mut.ac.za','student123','student','Student 22314172',NULL,NULL),(19,'22325114@live.mut.ac.za','student123','student','Student 22325114',NULL,NULL),(20,'22305677@live.mut.ac.za','student123','student','Student 22305677',NULL,NULL),(21,'22317991@live.mut.ac.za','student123','student','Student 22317991',NULL,NULL),(22,'22335814@live.mut.ac.za','student123','student','Student 22335814',NULL,NULL),(23,'22322987@live.mut.ac.za','student123','student','Student 22322987',NULL,NULL),(24,'22334567@live.mut.ac.za','student123','student','Student 22334567',NULL,NULL),(25,'22341285@live.mut.ac.za','student123','student','Student 22341285',NULL,NULL),(26,'22337669@live.mut.ac.za','student123','student','Student 22337669',NULL,NULL),(27,'22320593@live.mut.ac.za','student123','student','Student 22320593',NULL,NULL),(28,'22330918@live.mut.ac.za','student123','student','Student 22330918',NULL,NULL),(29,'22338343@live.mut.ac.za','student123','student','Student 22338343',NULL,NULL),(30,'22310899@live.mut.ac.za','student123','student','Student 22310899',NULL,NULL),(31,'22309434@live.mut.ac.za','student123','student','Student 22309434',NULL,NULL),(32,'22312280@live.mut.ac.za','student123','student','Student 22312280',NULL,NULL),(33,'22327734@live.mut.ac.za','student123','student','Student 22327734',NULL,NULL),(34,'22315843@live.mut.ac.za','student123','student','Student 22315843',NULL,NULL),(35,'22361055@live.mut.ac.za','student123','student','Student 22361055',NULL,NULL),(36,'22315517@live.mut.ac.za','student123','student','Student 22315517',NULL,NULL),(37,'22339408@live.mut.ac.za','student123','student','Student 22339408',NULL,NULL),(38,'22422133@live.mut.ac.za','student123','student','Student 22422133',NULL,NULL),(39,'22431737@live.mut.ac.za','student123','student','Student 22431737',NULL,NULL),(40,'22209059@live.mut.ac.za','student123','student','Student 22209059',NULL,NULL),(41,'22416734@live.mut.ac.za','student123','student','Student 22416734',NULL,NULL),(42,'22322900@live.mut.ac.za','student123','student','Student 22322900',NULL,NULL),(43,'22402069@live.mut.ac.za','student123','student','Student 22402069',NULL,NULL),(44,'22420947@live.mut.ac.za','student123','student','Student 22420947',NULL,NULL),(45,'22354752@live.mut.ac.za','student123','student','Student 22354752',NULL,NULL),(46,'22320153@live.mut.ac.za','student123','student','Student 22320153',NULL,NULL),(47,'22407383@live.mut.ac.za','student123','student','Student 22407383',NULL,NULL),(48,'22329264@live.mut.ac.za','student123','student','Student 22329264',NULL,NULL),(49,'22410169@live.mut.ac.za','student123','student','Student 22410169',NULL,NULL),(50,'22304903@live.mut.ac.za','student123','student','Student 22304903',NULL,NULL),(51,'22416153@live.mut.ac.za','student123','student','Student 22416153',NULL,NULL),(52,'22426770@live.mut.ac.za','student123','student','Student 22426770',NULL,NULL),(53,'22435165@live.mut.ac.za','student123','student','Student 22435165',NULL,NULL),(54,'22339617@live.mut.ac.za','student123','student','Student 22339617',NULL,NULL),(55,'22430210@live.mut.ac.za','student123','student','Student 22430210',NULL,NULL),(56,'22000786@live.mut.ac.za','student123','student','Student 22000786',NULL,NULL),(57,'22339019@live.mut.ac.za','student123','student','Student 22339019',NULL,NULL),(58,'22440270@live.mut.ac.za','student123','student','Student 22440270',NULL,NULL),(59,'22329027@live.mut.ac.za','student123','student','Student 22329027',NULL,NULL),(60,'22438195@live.mut.ac.za','student123','student','Student 22438195',NULL,NULL),(61,'22317612@live.mut.ac.za','student123','student','Student 22317612',NULL,NULL),(62,'22444713@live.mut.ac.za','student123','student','Student 22444713',NULL,NULL),(63,'22425322@live.mut.ac.za','student123','student','Student 22425322',NULL,NULL),(64,'22328534@live.mut.ac.za','student123','student','Student 22328534',NULL,NULL),(65,'22364740@live.mut.ac.za','student123','student','Student 22364740',NULL,NULL),(66,'22423967@live.mut.ac.za','student123','student','Student 22423967',NULL,NULL),(67,'22412310@live.mut.ac.za','student123','student','Student 22412310',NULL,NULL),(68,'22443238@live.mut.ac.za','student123','student','Student 22443238',NULL,NULL),(69,'22222405@live.mut.ac.za','student123','student','Student 22222405',NULL,NULL),(70,'22221194@live.mut.ac.za','student123','student','Student 22221194',NULL,NULL),(71,'22356737@live.mut.ac.za','student123','student','Student 22356737',NULL,NULL),(72,'22433510@live.mut.ac.za','student123','student','Student 22433510',NULL,NULL),(73,'22411763@live.mut.ac.za','student123','student','Student 22411763',NULL,NULL),(74,'22401715@live.mut.ac.za','student123','student','Student 22401715',NULL,NULL),(75,'22432232@live.mut.ac.za','student123','student','Student 22432232',NULL,NULL),(76,'22341705@live.mut.ac.za','student123','student','Student 22341705',NULL,NULL),(77,'22432331@live.mut.ac.za','student123','student','Student 22432331',NULL,NULL),(78,'22444223@live.mut.ac.za','student123','student','Student 22444223',NULL,NULL),(79,'22547980@live.mut.ac.za','student123','student','Student 22547980',NULL,NULL),(80,'22422182@live.mut.ac.za','student123','student','Student 22422182',NULL,NULL),(81,'22359147@live.mut.ac.za','student123','student','Student 22359147',NULL,NULL),(82,'22460979@live.mut.ac.za','student123','student','Student 22460979',NULL,NULL),(83,'22424901@live.mut.ac.za','student123','student','Student 22424901',NULL,NULL),(84,'22442801@live.mut.ac.za','student123','student','Student 22442801',NULL,NULL),(85,'22405062@live.mut.ac.za','student123','student','Student 22405062',NULL,NULL),(86,'22329057@live.mut.ac.za','student123','student','Student 22329057',NULL,NULL),(87,'22222778@live.mut.ac.za','student123','student','Student 22222778',NULL,NULL),(88,'22419409@live.mut.ac.za','student123','student','Student 22419409',NULL,NULL),(89,'22409287@live.mut.ac.za','student123','student','Student 22409287',NULL,NULL),(90,'lecturer@mut.ac.za','lecturer123','staff','Mrs. Naidoo',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-14  0:34:57
