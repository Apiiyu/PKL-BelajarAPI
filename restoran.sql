-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 02 Agu 2021 pada 05.42
-- Versi server: 10.4.19-MariaDB
-- Versi PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restoran`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `itemCode` varchar(8) NOT NULL,
  `nama` varchar(48) NOT NULL,
  `category` varchar(24) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` varchar(20) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`itemCode`, `nama`, `category`, `qty`, `price`, `image`) VALUES
('DRINK1', 'Sprite Original', 'Drink', 15, 'Rp. 10.000', 'public/images/drinks/Sprite.jpg'),
('DRINK2', 'Stawberry Vanilla', 'Drink', 3, 'Rp. 25.000', 'public/images/drinks/StawberryVanilla.jpg'),
('DRINK3', 'Coffe Millkshake', 'Drink', 5, 'Rp. 20.000', 'public/images/drinks/CoffeMilkshake.jpg'),
('DRINK4', 'Ice Tea', 'Drink', 15, 'Rp. 8.000', 'public/images/drinks/IceTea.jpg'),
('DRINK5', 'Coffe', 'Drink', 12, 'Rp. 15.000', 'public/images/drinks/Coffe.jpeg'),
('FOOD2', 'Indomie Goreng', 'Food', 7, 'Rp. 16.000', 'public/images/foods/Indomie.jpg'),
('FOOD3', 'Sushi', 'Food', 2, 'Rp. 33.000', 'public/images/foods/Sushi.jpg'),
('FOOD4', 'Spaghetti', 'Food', 5, 'Rp. 46.700', 'public/images/foods/Spaghetti.jpg'),
('FOOD5', 'Foodies', 'Food', 10, 'Rp. 10.000', 'public/images/foods/Momogi.jpeg'),
('SNACK1', 'Oreo Vanilla', 'Snack', 5, 'Rp. 5.500', 'public/images/snacks/Oreo.jpg'),
('SNACK2', 'Cheetos Jagung Bakar', 'Snack', 8, 'Rp. 4.500', 'public/images/snacks/Cheetos.jpeg'),
('SNACK3', 'Pilus Garuda Pedas', 'Snack', 12, 'Rp. 1.000', 'public/images/snacks/Pilus.jpg'),
('SNACK4', 'Qtela Original', 'Snack', 24, 'Rp. 3.000', 'public/images/snacks/Qtela.jpeg'),
('SNACK5', 'Momogi', 'Snack', 36, 'Rp. 500', 'public/images/snacks/Momogi.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `nama` varchar(48) NOT NULL,
  `email` varchar(86) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`idUser`, `nama`, `email`, `password`) VALUES
(1, 'Rafi', 'khoirulloh.rafi2@gmail.com', '19b5d5cc7afb05822127ed244fa59ac8');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`itemCode`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
