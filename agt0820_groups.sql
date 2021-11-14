-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 12-11-2021 a las 17:21:25
-- Versión del servidor: 5.7.30
-- Versión de PHP: 7.4.9

USE AgenthosDB;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `agenthos_development`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agt0820_groups`
--

CREATE TABLE `agt0820_groups` (
  `groupId` char(16) NOT NULL,
  `name` varchar(100) NOT NULL,
  `avatarUrl` varchar(150) NOT NULL,
  `groupStatusId` tinyint(3) UNSIGNED NOT NULL DEFAULT '4',
  `workspaceId` char(16) NOT NULL,
  `createdBy` char(16) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agt0820_groups`
--
ALTER TABLE `agt0820_groups`
  ADD PRIMARY KEY (`groupId`),
  ADD KEY `fk_groups_workspaceId` (`workspaceId`),
  ADD KEY `fk_groups_groupStatusId` (`groupStatusId`),
  ADD KEY `fk_groups_createdBy` (`createdBy`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agt0820_groups`
--
ALTER TABLE `agt0820_groups`
  ADD CONSTRAINT `fk_groups_createdBy` FOREIGN KEY (`createdBy`) REFERENCES `agt0820_users` (`userId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_groups_groupStatusId` FOREIGN KEY (`groupStatusId`) REFERENCES `agt0820_catgroupstatus` (`groupStatusId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_groups_workspaceId` FOREIGN KEY (`workspaceId`) REFERENCES `agt0820_workspaces` (`workspaceId`) ON DELETE CASCADE ON UPDATE CASCADE;
