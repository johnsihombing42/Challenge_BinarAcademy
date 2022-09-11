//challenge_chapter 2
//Binar Academy X Kampus Merdeka
//Mentor : Kak Tatang
//Student : John Tri Putra Sihombing

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let nilaiSiswa = [];

function input(question) {
  return new Promise((resolve) => {
    readline.question(question, (data) => {
      return resolve(data);
    });
  });
}

//function mencari nilai tertinggi dan terendah siswa
const nilaiMaxMin = () => {
  console.log("Nilai Tertinggi : " + Math.max(...nilaiSiswa));
  console.log("Nilai Terendah : " + Math.min(...nilaiSiswa));
};

//function mengurutkan nilai siswa
const urutkanData = () => {
  nilaiSiswa.sort(function (a, b) {
    return a - b;
  });
  return nilaiSiswa;
};

//function mencari nilai rata-rata siswa
const rataRataNilai = () => {
  let sum = 0;
  nilaiSiswa.forEach(function (siswa) {
    sum += siswa;
  });
  average = sum / nilaiSiswa.length;
  return average.toFixed(2);
};

//function mencari nilai siswa diatas 60 (lulus)
const siswaLulus = () => {
  let jumlahLulus = 0;
  nilaiSiswa.forEach(function (siswa) {
    if (siswa >= 60) {
      jumlahLulus++;
    }
  });
  return jumlahLulus;
};

//function mencari nilai siswa dibawah 60 (tidak lulus)
const siswaTidakLulus = () => {
  let tidakLulus = 0;
  nilaiSiswa.forEach(function (siswa) {
    if (siswa <= 60) {
      tidakLulus++;
    }
  });
  return tidakLulus;
};

//function memfilter nilai 90 dan 100
const cariNilaiSiswa = () => {
  let nilai90 = nilaiSiswa.filter((element) => element === 90);
  let nilai100 = nilaiSiswa.filter((element) => element === 100);
  return `${nilai90} ${nilai100}`;
};

//function menampilkan data
const tampilkanData = () => {
  nilaiMaxMin();
  console.log("Urutan Nilai :" + urutkanData());
  console.log("Nilai Rata Rata Siswa : " + rataRataNilai());
  console.log("Siswa Lulus : " + siswaLulus());
  console.log("Siswa Tidak Lulus : " + siswaTidakLulus());
  console.log("Siswa nilai 90 dan 100 : " + cariNilaiSiswa());
};

async function main() {
  try {
    while (true) {
      let valueSiswa = await input(
        "Input nilai siswa , tekan tombol Q/q jika anda sudah selesai menginput: "
      );
      if (valueSiswa === "Q" || valueSiswa === "q") {
        console.log("Anda sudah memasukkan semua nilai");
        tampilkanData();
        break;
      } else if (isNaN(valueSiswa)) {
        console.log("Masukkan angka yang benar ");
      } else {
        nilaiSiswa.push(+valueSiswa);
        console.log(nilaiSiswa);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

main();
