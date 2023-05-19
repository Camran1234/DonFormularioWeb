
DROP DATABASE IF EXISTS `dbTec`;
CREATE DATABASE `dbTec`;
USE `dbTec`;

CREATE TABLE IF NOT EXISTS `Usuario`(
    `correo` VARCHAR(450) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `sexo` VARCHAR(150) NOT NULL,
    `estadoCivil` VARCHAR(150) NOT NULL,
    `fechaNacimiento` DATE NOT NULL,
    `nivelEscolaridad` VARCHAR(100) NOT NULL,
    `tipo` VARCHAR(25) NOT NULL,
    PRIMARY KEY(`correo`)
);

CREATE TABLE IF NOT EXISTS `Encuesta` (
    `idEncuesta` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(250) NOT NULL,
    `fecha_abertura` DATETIME NULL,
    `fecha_cierre` DATETIME NULL,
    `fechaLimite` BOOLEAN NOT NULL,
    PRIMARY KEY(`idEncuesta`)
);

CREATE TABLE IF NOT EXISTS `Acceso` (
    `idEncuesta` INT NOT NULL,
    `idUsuario` VARCHAR(450) NOT NULL,
    PRIMARY KEY(`idEncuesta`, `idUsuario`),
    INDEX `fk_acceso_encuesta_idEncuesta_idx` (`idEncuesta` ASC) VISIBLE,
    CONSTRAINT `fk_acceso_encuesta_idEncuesta`
        FOREIGN KEY (`idEncuesta`)
        REFERENCES `dbTec`.`Encuesta` (`idEncuesta`),
    INDEX `fk_acceso_usuario_idUsuario_idx` (`idUsuario` ASC) VISIBLE,
    CONSTRAINT `fk_acceso_usuario_idUsuario`
        FOREIGN KEY (`idUsuario`)
        REFERENCES `dbTec`.`Usuario` (`correo`)
);

CREATE TABLE IF NOT EXISTS `Pregunta` (
    `idPregunta` INT NOT NULL AUTO_INCREMENT,
    `idEncuesta` INT NOT NULL,
    `enunciado` TEXT NOT NULL,
    `tipo` VARCHAR(20) NOT NULL,
    PRIMARY KEY(`idPregunta`, `idEncuesta`),
    INDEX `fk_pregunta_encuesta_idEncuesta_idx` (`idEncuesta` ASC) VISIBLE,
    CONSTRAINT `fk_pregunta_encuesta_idEncuesta`
        FOREIGN KEY (`idEncuesta`)
        REFERENCES `dbTec`.`Encuesta` (`idEncuesta`)
);

CREATE TABLE IF NOT EXISTS `Opcion` (
    `idOpcion` INT NOT NULL AUTO_INCREMENT,
    `idPregunta` INT NOT NULL,
    `opcion` TEXT NOT NULL,
    PRIMARY KEY (`idOpcion`, `idPregunta`),
    INDEX `fk_opcion_pregunta_idPregunta_idx` (`idPregunta` ASC) VISIBLE,
    CONSTRAINT `fk_opcion_pregunta_idPregunta`
        FOREIGN KEY (`idPregunta`)
        REFERENCES `dbTec`.`Pregunta` (`idPregunta`)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `Respuesta` (
    `idRespuesta` INT NOT NULL AUTO_INCREMENT,
    `idPregunta` INT NOT NULL,
    `idOpcion` INT NULL,
    `idUsuario` VARCHAR(450) NOT NULL,
    `fv` BOOLEAN NULL,
    PRIMARY KEY(`idRespuesta`, `idPregunta`),
    INDEX `fk_respuesta_pregunta_idPregunta_idx` (`idPregunta` ASC) VISIBLE,
    CONSTRAINT `fk_respuesta_pregunta_idPregunta`
        FOREIGN KEY (`idPregunta`)
        REFERENCES `dbTec`.`Pregunta` (`idPregunta`)
        ON DELETE CASCADE
        ,
    INDEX `fk_respuesta_opcion_idOpcion_idx` (`idOpcion` ASC) VISIBLE,
    CONSTRAINT `fk_respuesta_opcion_idOpcion`
        FOREIGN KEY (`idOpcion`)
        REFERENCES `dbTec`.`Opcion` (`idOpcion`),
    INDEX `fk_respuesta_usuario_idUsuario_idx` (`idUsuario` ASC) VISIBLE,
    CONSTRAINT `fk_respuesta_usuario_idUsuario`
        FOREIGN KEY (`idUsuario`)
        REFERENCES `dbTec`.`Usuario` (`correo`)
);

INSERT INTO Usuario
    (correo, password, sexo, estadoCivil, fechaNacimiento, nivelEscolaridad, tipo)
    VALUES ("admin", "21232f297a57a5a743894a0e4a801fc3", "masculino", "casado","2000-5-4", "diversificado", "admin");