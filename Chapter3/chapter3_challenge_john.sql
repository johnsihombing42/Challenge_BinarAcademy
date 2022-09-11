-- Challenge Chapter 3 Binar Academy
-- By : John Tri Putra Sihombing
--Membuat database pemesananan tiket bioskop secara online

--membuat table user
CREATE TABLE customers (
  id BIGSERIAL PRIMARY KEY, 
  name VARCHAR(30) NOT NULL, 
  email VARCHAR(30) NOT NULL,
  password VARCHAR(15) NOT NULL
);

--membuat tabel reservasi
CREATE TABLE reservations (
  id BIGSERIAL PRIMARY KEY, 
  customer_id INT NOT NULL, 
  schedule_id INT NOT NULL,
  seat_id INT NOT NULL
);

--membuat tabel seat
CREATE TABLE seats(
  id BIGSERIAL PRIMARY KEY, 
  seat_code VARCHAR NOT NULL, 
  studio_id INT NOT NULL
);

--membuat tabel studio
CREATE TABLE studios(
  id BIGSERIAL PRIMARY KEY, 
  name VARCHAR NOT NULL, 
  capacity INT NOT NULL
);

--membuat tabel scheduled
CREATE TABLE scheduled(
  id BIGSERIAL PRIMARY KEY, 
  movie_id INT NOT NULL, 
  start_in TIME NOT NULL,
  end_out TIME NOT NULL,
  price int NOT NULL,
  studio_id INT NOT NULL
);

--membuat tabel movies
CREATE TABLE movies(
  id BIGSERIAL PRIMARY KEY, 
  title VARCHAR NOT NULL, 
  category VARCHAR NOT NULL, 
  description VARCHAR NOT NULL, 
  year INT NOT NULL
);


--Melakukan perintah DML pada database
--mengisi data ke tabel customers
INSERT INTO 
customers (id,name,email,password) 
VALUES 
(1, 'John','john@gmail.com','john123' ), 
(2, 'Budiman','budiman@gmail.com','budiman123'),
(5, 'Ara','ara@gmail.com','ara123'),
(6, 'Sihombing','sihombing@gmail.com','hombing123');

--mengisi data ke tabel reservations
INSERT INTO 
reservations (id,customer_id,schedule_id,seat_id) 
VALUES 
(1,1,1,1), 
(2,1,1,1), 
(3,1,1,1), 
(4,2,1,2), 
(5,2,1,3);

--mengisi data ke tabel seats
INSERT INTO 
seats (id,seat_code,studio_id) 
VALUES 
(1,'A1',1), 
(2,'A2',1), 
(3,'A3',1), 
(4,'A4',2),
(5,'C1',1), 
(6,'C2',1), 
(7,'E5',1), 
(8,'E6',2);


--Insert data ke tabel studio
INSERT INTO 
studios (id,name,capacity) 
VALUES 
(1,'A',100), 
(2,'B',150);

--mengisi data ke tabel scheduled
INSERT INTO 
scheduled (id,movie_id,start_in,end_out,price,studio_id) 
VALUES 
(1,1,'16:00','18:00',35000,1)
(2,2,'14:00','16:00',35000,1);

--mengisi data ke tabel movies
INSERT INTO 
movies (id,title,category,description,year) 
VALUES 
(1,'KKN Desa Penari','Horror','Film Horror terlaris tahun ini',2022), 
(2,'Pengabdi Setan 2: Communion','Horror','Film Horror juga',2022), 
(3,'Ngeri Ngeri Sedap','Drama','Drama yang ada komedinya',2022),
(4,'Mencuri Raden Saleh','Drama','Drama juga',2022),
(5,'Kukira kau rumah','Drama','PRAM, seorang pemuda yang kesepian',2022);

--Read isi data tabel
SELECT * FROM customers;
SELECT * FROM reservations;
SELECT * FROM movies;
SELECT * FROM seats;
SELECT * FROM studios;
SELECT * FROM scheduled;

--cek/read isi data table studios yang id =1
SELECT * FROM studios
where id = 1;

--mengurutkan customers berdasarkan id
SELECT * FROM customers
ORDER BY id DESC;

--update isi tabel movies
UPDATE movies 
SET title = 'Gara Gara Warisan'
WHERE id=2;

--update isi tabel scheduled yang id nya = 2
UPDATE scheduled
SET start_in = '14:10'
WHERE id=2;


--delete isi tabel seats
DELETE FROM seats
WHERE id=2;

--delete isi tabel movies
DELETE FROM movies
WHERE id=1;

--join table reservation dan seats
SELECT 
reservations.id AS id_reservasi, 
seats.seat_code AS tempatduduk
FROM reservations 
JOIN seats ON seats.id = reservations.seat_id;

--join table scheduled dan movies
SELECT 
movies.id AS id_movie, 
movies.title AS judul, 
scheduled.start_in AS mulai,
scheduled.end_out AS selesai
FROM movies
JOIN scheduled ON scheduled.id = movies.id;

















