/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.7.14 : Database - zyy
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`zyy` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `zyy`;

/*Table structure for table `user_list` */

DROP TABLE IF EXISTS `user_list`;

CREATE TABLE `user_list` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_bin NOT NULL,
  `pwd` varchar(128) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_bin CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `user_list` */

insert  into `user_list`(`id`,`username`,`pwd`) values (1,'zyy','a123456'),(2,'zyy123','dc483e80a7a0bd9ef71d8cf973673924'),(3,'hxr','dc483e80a7a0bd9ef71d8cf973673924'),(4,'hxr','dc483e80a7a0bd9ef71d8cf973673924'),(5,'hxr','5690dddfa28ae085d23518a035707282'),(42,'zyy999','dc483e80a7a0bd9ef71d8cf973673924'),(43,'zyy1234','dc483e80a7a0bd9ef71d8cf973673924'),(40,'zyy1111','dc483e80a7a0bd9ef71d8cf973673924'),(41,'zyy666','dc483e80a7a0bd9ef71d8cf973673924');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
