CREATE DATABASE db_camper_impact;
USE db_camper_impact;
CREATE TABLE Pais(
    pai_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pai_nombre VARCHAR(50) NOT NULL
);
CREATE TABLE Region(
    reg_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reg_pais_fk INT NOT NULL,
    reg_nombre VARCHAR(45) NOT NULL
);
CREATE TABLE Ciudad(
    ciu_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ciu_region_fk INT NOT NULL,
    ciu_nombre VARCHAR(45) NOT NULL
);
CREATE TABLE Genero(
    gen_id INT(2) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    gen_nombre VARCHAR(45) NOT NULL
);
CREATE TABLE Tipo_documento(
    tip_doc_id INT(2) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tip_doc_nombre VARCHAR(45) NOT NULL,
    tip_doc_abreviatura VARCHAR(5) NOT NULL
);
CREATE TABLE Tipo_reaccion(
    tip_reacc_id INT(2) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tip_reacc_nombre VARCHAR(45) NOT NULL
);
CREATE TABLE Usuario(
    usu_id VARCHAR(15) NOT NULL PRIMARY KEY,
    usu_tipo_doc_fk INT(2) NOT NULL,
    usu_documento INT(12) NOT NULL UNIQUE,
    usu_nombre VARCHAR(70) NOT NULL,
    usu_password VARCHAR(12) NOT NULL,
    usu_apodo VARCHAR(45) NOT NULL,
    usu_genero_fk INT(2) NOT NULL,
    usu_edad INT(3) NOT NULL,
    usu_ciudad_fk INT NOT NULL,
    usu_direccion VARCHAR(45) NULL,
    usu_descripcion VARCHAR(500) NOT NULL,
    usu_image BLOB NULL
);

CREATE TABLE Post (
    post_id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    post_info  VARCHAR(500) NULL,
    post_image BLOB NULL,
    post_usuario_fk VARCHAR(15) NOT NULL,
    post_fecha DATETIME NOT NULL DEFAULT NOW() 
);
CREATE TABLE Comentarios (
    com_id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    com_usuario_fk VARCHAR(15) NOT NULL,
    com_info  VARCHAR(500) NOT NULL,
    com_post_fk INT(10) NOT NULL
    );
CREATE TABLE Reaccion (
    reacc_id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reacc_tipo_fk INT(2) NOT NULL,
    reacc_post_fk INT(10) NOT NULL
);
/*FOREIGN KEYS Y RELACIONES*/

ALTER TABLE Region ADD CONSTRAINT Region_Pais_fk FOREIGN KEY(reg_pais_fk) REFERENCES Pais(pai_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Ciudad ADD CONSTRAINT Ciudad_Region_fk FOREIGN KEY(ciu_region_fk) REFERENCES Region(reg_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Usuario ADD CONSTRAINT Usuario_Ciudad_fk FOREIGN KEY(usu_ciudad_fk) REFERENCES Ciudad(ciu_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Usuario ADD CONSTRAINT Usuario_Genero_fk FOREIGN KEY(usu_genero_fk) REFERENCES Genero(gen_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Usuario ADD CONSTRAINT Usuario_Tipo_Documento_fk FOREIGN KEY(usu_tipo_doc_fk) REFERENCES Tipo_documento(tip_doc_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Post ADD CONSTRAINT Post_Usuario_fk FOREIGN KEY(post_usuario_fk) REFERENCES Usuario(usu_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Comentarios ADD CONSTRAINT Comentarios_Post_fk FOREIGN KEY(com_post_fk) REFERENCES Post(post_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Comentarios ADD CONSTRAINT Comentarios_Usuario_fk FOREIGN KEY(com_usuario_fk) REFERENCES Usuario(usu_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Reaccion ADD CONSTRAINT Reacciom_Post_fk FOREIGN KEY(reacc_post_fk) REFERENCES Post(post_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Reaccion ADD CONSTRAINT Reacciom_Tipo_reaccion_fk FOREIGN KEY(reacc_tipo_fk) REFERENCES Tipo_reaccion(tip_reacc_id) ON UPDATE CASCADE ON DELETE CASCADE;


/*INSERTAR DATOS POR DEFECTO*/

INSERT INTO Pais (pai_nombre) VALUES
('Argentina'),
('Brasil'),
('Colombia');

INSERT INTO Region (reg_pais_fk, reg_nombre) VALUES
(1, 'Buenos Aires'),
(1, 'Córdoba'),
(2, 'São Paulo'),
(2, 'Rio de Janeiro'),
(3, 'Santander'),
(3, 'Antioquia');

INSERT INTO Ciudad (ciu_region_fk, ciu_nombre) VALUES
(1, 'Ciudad Autónoma de Buenos Aires'),
(1, 'La Plata'),
(2, 'Córdoba'),
(3, 'São Paulo'),
(4, 'Campinas'),
(5, 'Bucaramanga'),
(6, 'Medellin');

INSERT INTO Genero (gen_nombre) VALUES
('Masculino'),
('Femenino'),
('No binario');

INSERT INTO Tipo_documento (tip_doc_nombre, tip_doc_abreviatura) VALUES
('Cedula Ciudadania', 'CC'),
('Tarjeta Identidad', 'TI');

INSERT INTO Tipo_reaccion (tip_reacc_nombre) VALUES
('Me gusta'),
('No me gusta'),
('Me encanta'),
('Me entristece'),
('Me enoja');

INSERT INTO Usuario (usu_id, usu_tipo_doc_fk, usu_documento, usu_nombre, usu_password, usu_apodo, usu_genero_fk, usu_edad, usu_ciudad_fk, usu_descripcion)
VALUES
("JJPEREZ", 1, 6321654, 'Juan Pérez Perez', 'contra123', 'Juanito', 1, 30, 1, 'Hola, soy Juan Pérez y me encanta viajar.'),
("MARIA123", 2, 68957481, 'María Silva Gomez',  'clave456', 'MaryClass', 2, 25, 4, '¡Hola! Soy María, me apasiona la música y la fotografía.'),
("ALEXXX", 1, 62254316, 'Alex Smith Corralejo', 'pass789', 'AlexMor', 1, 28, 6, '¡Hola a todos! Soy Alex y estoy explorando nuevos lugares.');

INSERT INTO Post (post_info, post_usuario_fk) VALUES
('¡Hermoso día en la playa!', "JJPEREZ"),
('Nueva receta de pastel de chocolate.', "MARIA123"),
('Viajando por el mundo.', "ALEXXX");

INSERT INTO Comentarios (com_usuario_fk, com_info, com_post_fk) VALUES
("JJPEREZ", 'Qué delicia, quiero la receta.', 5),
("MARIA123", '¡Espectacular! ¿En qué lugar estás ahora?', 6),
("ALEXXX", 'Me encanta esta publicacion.', 4);

INSERT INTO Reaccion (reacc_tipo_fk, reacc_post_fk) VALUES
(1, 4),
(2, 4),
(3, 4),
(1, 5),
(5, 5),
(2, 6);



