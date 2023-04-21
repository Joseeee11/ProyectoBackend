-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2023 at 09:01 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_audiovisuales`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipos`
--

CREATE TABLE `equipos` (
  `id` int(15) NOT NULL,
  `nombre` text NOT NULL,
  `serial` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_adquisicion` date NOT NULL,
  `estatus` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipos`
--

INSERT INTO `equipos` (`id`, `nombre`, `serial`, `descripcion`, `fecha_adquisicion`, `estatus`) VALUES
(1, 'Canaima', 'ETSYDUFY', 'robot futurista', '2023-02-25', 'Disponible'),
(2, 'Aro de Luz', 'CHGUIFGWU5463723', 'potente luz que tehara ver las stars', '2023-04-09', 'Mantenimiento'),
(3, 'Camara 360', 'OEIQRUIWG7633476', 'camara pequeña, lente ultrasonico, vision nocturna', '2016-07-11', 'Ocupado'),
(4, 'Pendrive 32gb', 'YYYU72GYU5003723', 'Azul de alto rendimiento', '2023-04-06', 'Mantenimiento');

-- --------------------------------------------------------

--
-- Table structure for table `espacios`
--

CREATE TABLE `espacios` (
  `id` int(15) NOT NULL,
  `nombre` text NOT NULL,
  `direccion` text NOT NULL,
  `descripcion` text NOT NULL,
  `estatus` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `espacios`
--

INSERT INTO `espacios` (`id`, `nombre`, `direccion`, `descripcion`, `estatus`) VALUES
(1, 'Espacio de Edicion Visual', 'Edificio 3 Aula 15', 'Se encarga de la edición de los videos educativos de los estudiantes', 'Disponible'),
(2, 'Espacio de Grabación con Pantalla Verde', 'Edificio 1 Aula 4', 'Se encarga de la grabación de videos con efectos especiales', 'Ocupado'),
(6, 'Espacio de Musica XD', 'Edificio 3 Aula 16', 'Se encarga de la edición especifica del audio', 'Disponible');

-- --------------------------------------------------------

--
-- Table structure for table `personal`
--

CREATE TABLE `personal` (
  `id` int(15) NOT NULL,
  `usuario_unico` varchar(50) NOT NULL,
  `nombre` text NOT NULL,
  `CI` int(20) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `especialidad` varchar(50) NOT NULL,
  `contrasena` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personal`
--

INSERT INTO `personal` (`id`, `usuario_unico`, `nombre`, `CI`, `cargo`, `especialidad`, `contrasena`) VALUES
(1, 'gordito_Roko', 'Roko Balboa Rangel Barrios', 7923236, 'Técnico Mecático', 'Software', '$2a$08$f0zeQc3mLRHak72hLwXj7.spq3oMtqjsMT373OQlK/28HUHTbx/q2');

-- --------------------------------------------------------

--
-- Table structure for table `reservas_equipos`
--

CREATE TABLE `reservas_equipos` (
  `id` int(15) NOT NULL,
  `solicitante` int(15) NOT NULL,
  `hora_inicio` int(8) NOT NULL,
  `hora_fin` int(8) NOT NULL,
  `personal_solici` int(15) NOT NULL,
  `fecha` date NOT NULL,
  `motivo` text NOT NULL,
  `equipo_solici` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservas_equipos`
--

INSERT INTO `reservas_equipos` (`id`, `solicitante`, `hora_inicio`, `hora_fin`, `personal_solici`, `fecha`, `motivo`, `equipo_solici`) VALUES
(1, 1, 300, 600, 1, '2023-04-18', 'Grabacion de Matematica con Symbolab', 2);

-- --------------------------------------------------------

--
-- Table structure for table `reservas_espacios`
--

CREATE TABLE `reservas_espacios` (
  `id` int(15) NOT NULL,
  `hora_inicio` int(8) NOT NULL,
  `hora_fin` int(8) NOT NULL,
  `personal_solici` int(15) NOT NULL,
  `solicitante` int(15) NOT NULL,
  `fecha` date NOT NULL,
  `motivo` text NOT NULL,
  `espacio_solici` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservas_espacios`
--

INSERT INTO `reservas_espacios` (`id`, `hora_inicio`, `hora_fin`, `personal_solici`, `solicitante`, `fecha`, `motivo`, `espacio_solici`) VALUES
(1, 500, 1500, 1, 1, '2023-04-14', 'Uso de Audio para Video', 6);

-- --------------------------------------------------------

--
-- Table structure for table `solicitantes`
--

CREATE TABLE `solicitantes` (
  `id` int(15) NOT NULL,
  `usuario_unico` varchar(50) NOT NULL,
  `nombre_apellido` text NOT NULL,
  `CI` int(20) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `direccion` text NOT NULL,
  `contrasena` varchar(80) NOT NULL,
  `nro_telefono` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `solicitantes`
--

INSERT INTO `solicitantes` (`id`, `usuario_unico`, `nombre_apellido`, `CI`, `fecha_nacimiento`, `direccion`, `contrasena`, `nro_telefono`) VALUES
(1, 'galkoooo11', 'Galko Casimiro Buenvizco', 30375764, '2079-12-31', 'Casa de Los Chinitos', '$2a$08$tWHkURv.QWGZnWn/g7fbmOdru0C.1aG.NN3r1/lKFu21h3yjzoMe.', 22313101);

-- --------------------------------------------------------

--
-- Table structure for table `trabajos`
--

CREATE TABLE `trabajos` (
  `id` int(15) NOT NULL,
  `personal_solici` int(15) NOT NULL,
  `reserva_solici` int(15) NOT NULL,
  `equipos_solici` int(15) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trabajos`
--

INSERT INTO `trabajos` (`id`, `personal_solici`, `reserva_solici`, `equipos_solici`, `fecha_inicio`, `fecha_fin`, `descripcion`) VALUES
(1, 1, 1, 2, '2023-04-19', '2023-04-21', 'Orientacion de Herramientas Virtuales');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(15) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(80) NOT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `contrasena`, `rol`) VALUES
(1, 'anonimus', '$2a$08$TQtDFzw5vR61lnFja8iBVenf5kTGQRBWEMZVzjHHjb2anBNzT.5FW', 'admin'),
(2, 'galkoooo11', '$2a$08$tWHkURv.QWGZnWn/g7fbmOdru0C.1aG.NN3r1/lKFu21h3yjzoMe.', 'solicitante'),
(9, 'gordito_Roko', '$2a$08$f0zeQc3mLRHak72hLwXj7.spq3oMtqjsMT373OQlK/28HUHTbx/q2', 'personal');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `espacios`
--
ALTER TABLE `espacios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservas_equipos`
--
ALTER TABLE `reservas_equipos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `solicitante` (`solicitante`,`personal_solici`,`equipo_solici`),
  ADD KEY `equipo_solicitado` (`equipo_solici`),
  ADD KEY `personal_requerido` (`personal_solici`);

--
-- Indexes for table `reservas_espacios`
--
ALTER TABLE `reservas_espacios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `solicitante` (`personal_solici`,`espacio_solici`),
  ADD KEY `solicitante_2` (`solicitante`),
  ADD KEY `solicitante_3` (`solicitante`),
  ADD KEY `espacio_solicitado` (`espacio_solici`);

--
-- Indexes for table `solicitantes`
--
ALTER TABLE `solicitantes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trabajos`
--
ALTER TABLE `trabajos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reserva_solici` (`reserva_solici`),
  ADD KEY `personal_solici` (`personal_solici`,`reserva_solici`,`equipos_solici`),
  ADD KEY `equipos_relacionados` (`equipos_solici`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `espacios`
--
ALTER TABLE `espacios`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal`
--
ALTER TABLE `personal`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `reservas_equipos`
--
ALTER TABLE `reservas_equipos`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reservas_espacios`
--
ALTER TABLE `reservas_espacios`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `solicitantes`
--
ALTER TABLE `solicitantes`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `trabajos`
--
ALTER TABLE `trabajos`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservas_equipos`
--
ALTER TABLE `reservas_equipos`
  ADD CONSTRAINT `equipo_solicitado` FOREIGN KEY (`equipo_solici`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personal_requerido` FOREIGN KEY (`personal_solici`) REFERENCES `personal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitante_responsable` FOREIGN KEY (`solicitante`) REFERENCES `solicitantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservas_espacios`
--
ALTER TABLE `reservas_espacios`
  ADD CONSTRAINT `espacio_solicitado` FOREIGN KEY (`espacio_solici`) REFERENCES `espacios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personal_solicitado` FOREIGN KEY (`personal_solici`) REFERENCES `personal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitante_respon` FOREIGN KEY (`solicitante`) REFERENCES `solicitantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trabajos`
--
ALTER TABLE `trabajos`
  ADD CONSTRAINT `equipos_relacionados` FOREIGN KEY (`equipos_solici`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personal_involucrado` FOREIGN KEY (`personal_solici`) REFERENCES `personal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_relacionada` FOREIGN KEY (`reserva_solici`) REFERENCES `reservas_equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
