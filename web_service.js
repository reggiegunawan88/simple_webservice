const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

//prevent cors (important)
app.use(cors());
app.options("*", cors());

//parsing post req body (important)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//open connection to SQLITE3 db
let db = new sqlite3.Database("./barang.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the barang.db in SQLITE3");
});

//root endpoint
app.get("/", (res) => res.send("endpoint hit success"));

//get barang
app.get("/api/barang", (req, res) => {
  var query = "SELECT * FROM BARANG";
  var params = [];
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "get all barang success",
      data: rows,
    });
  });
});

//add barang
app.post("/api/tambahbarang", (req, res) => {
  var data = {
    nama: req.body.nama,
    harga: req.body.harga,
  };
  var nama_barang = `'` + data.nama + `'`; //add '' to string
  var query =
    "INSERT INTO barang (nama, harga) VALUES (" +
    nama_barang +
    "," +
    data.harga +
    ")";
  var params = [data.name, data.email, data.password];
  db.run(query, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "add barang success",
      data: data,
    });
  });
});

//update barang
app.post("/api/updatebarang", (req, res) => {
  var data = {
    id: req.body.id,
    nama: req.body.nama,
    harga: req.body.harga,
  };
  var nama_barang = `'` + data.nama + `'`; //add '' to string
  db.run(
    "UPDATE barang SET nama = " +
      nama_barang +
      ", harga = " +
      data.harga +
      " WHERE id = " +
      data.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "id " + data.id + " updated" });
    }
  );
});

//delete barang
app.post("/api/hapusbarang", (req, res) => {
  var id = req.body.id_barang;
  db.run("DELETE FROM barang WHERE id = " + id, function (err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "row " + id + " is deleted" });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
