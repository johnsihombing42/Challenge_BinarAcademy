//challenge 01_chapter 1
//Binar Academy X Kampus Merdeka
//Mentor : Kak Tatang
//Student : John Tri Putra Sihombing

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(question) {
  return new Promise((resolve) => {
    readline.question(question, (data) => {
      return resolve(data);
    });
  });
}

//fungsi untuk melakukan operasi
const tambah = (x, y) => +x + +y;
const kurang = (x, y) => +x - +y;
const kali = (x, y) => +x * +y;
const bagi = (x, y) => +x / +y;
const kuadrat = (x, y) => {
  return Math.pow(x, y);
};
const akar = (x) => {
  return Math.sqrt(x);
};
const luasPersegi = (x) => {
  return x * x;
};
const volumeKubus = (x) => {
  return x * x * x;
};
const volumeTabung = (r, t) => {
  return Math.PI * (r * r) * t;
};

async function main() {
  let stop = false;

  try {
    console.log("Program Kalkulator Sederhana");
    console.log("----------------------------");
    console.log("1.Proram Tambah");
    console.log("2.Program Kurang");
    console.log("3.Program Kali");
    console.log("4.Program Bagi");
    console.log("5.Program Kuadrat");
    console.log("6.Program Akar");
    console.log("7.Luas Persegi");
    console.log("8.Volume Kubus");
    console.log("9.Volume Tabung");

    let inputUser = await input("Masukkan Pilihan Anda :");
    switch (inputUser) {
      case "1": {
        let angka1 = await input("Masukkan angka 1 :");
        let angka2 = await input("Masukkan angka 2 :");
        console.log(`${angka1} + ${angka2} = ${tambah(angka1, angka2)}`);
        break;
      }
      case "2": {
        let angka1 = await input("Masukkan angka 1 :");
        let angka2 = await input("Masukkan angka 2 :");
        console.log(`${angka1} - ${angka2} = ${kurang(angka1, angka2)}`);
        break;
      }
      case "3": {
        let angka1 = await input("Masukkan angka 1 :");
        let angka2 = await input("Masukkan angka 2 :");
        console.log(`${angka1} * ${angka2} = ${kali(angka1, angka2)}`);
        break;
      }
      case "4": {
        let angka1 = await input("Masukkan angka 1 :");
        let angka2 = await input("Masukkan angka 2 :");
        console.log(`${angka1} / ${angka2} = ${bagi(angka1, angka2)}`);
        break;
      }
      case "5": {
        let angka1 = await input("Masukkan angka  :");
        let kuadrat1 = await input("Mau kuadrat berapa :");
        console.log(
          `${angka1} kuadrat ${kuadrat1} = ${kuadrat(angka1, kuadrat1)}`
        );
        break;
      }
      case "6": {
        let angka1 = await input("Masukkan angka :");
        console.log(`Akar dari ${angka1} adalah ${akar(angka1)}`);
        break;
      }
      case "7": {
        let sisi = await input("Masukkan sisi persegi  :");
        console.log(`Luas persegi nya adalah ${luasPersegi(sisi)}`);
        break;
      }
      case "8": {
        let sisi = await input("Masukkan sisi Kubus  :");
        console.log(`Volume kubus = ${volumeKubus(sisi)}`);
        break;
      }
      case "9": {
        let jariJari = await input("Masukkan jari-jari :");
        let tinggi = await input("Masukkan tinggi :");
        console.log(`Volume tabung =${volumeTabung(jariJari, tinggi)}`);
        break;
      }
      default:
        console.log(`Pilihan anda salah`);
        break;
    }
    const selesai = await input(
      "Apakah anda ingin melakukan perhitungan lagi ? (Y/N) >> "
    );
    if (selesai === "Y" || selesai === "y") {
      console.log();
      main();
    } else {
      readline.close();
    }
  } catch (err) {
    console.log(err);
  }
}

main();
