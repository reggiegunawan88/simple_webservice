//run method after HTML render / loaded
document.addEventListener("DOMContentLoaded", function () {
  load_data();
});

function load_data() {
  fetch("http://localhost:4000/api/barang")
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data);
      var string = "";
      var tbody = document.getElementById("database-record");
      for (let i = 0; i < res.data.length; i++) {
        var btnUpdate =
          "<td><button type='button' onclick='get_row_data()'>Update</button></td>";
        var btnDelete =
          "<td><button type='button' onclick='delete_data()'>Delete</button></td>";
        string +=
          "<tr><td>" +
          res.data[i].id +
          "</td><td>" +
          res.data[i].nama +
          "</td><td>" +
          res.data[i].harga +
          "</td>" +
          btnUpdate +
          " " +
          btnDelete +
          "</tr>";
      }
      tbody.innerHTML = string;
    });
}

//add item to db
function add_data() {
  var data = {
    nama: document.getElementById("input-nama").value,
    harga: parseInt(document.getElementById("input-harga").value),
  };

  fetch("http://localhost:4000/api/tambahbarang", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      load_data();
    })
    .catch((err) => console.log(err));
}

function update_data() {
  var data = {
    id: document.getElementById("id-barang").value,
    nama: document.getElementById("update-nama").value,
    harga: parseInt(document.getElementById("update-harga").value),
  };
  fetch("http://localhost:4000/api/updatebarang", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      document.getElementById("update-section").style.display = "none";
      load_data();
    })
    .catch((err) => console.log(err));
}

//delete item from db
function delete_data() {
  //get id barang from table\
  var data;
  var table = document.getElementById("table");
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      data = { id_barang: this.cells[0].innerHTML };
      fetch("http://localhost:4000/api/hapusbarang", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          load_data();
        })
        .catch((err) => console.log(err));
    };
  }
}

//get row data for update
function get_row_data() {
  var table = document.getElementById("table");
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      document.getElementById("update-section").style.display = "block";
      document.getElementById("id-barang").value = this.cells[0].innerHTML;
      document.getElementById("update-nama").value = this.cells[1].innerHTML;
      document.getElementById("update-harga").value = this.cells[2].innerHTML;
    };
  }
}

function cancel_update() {
  document.getElementById("update-section").style.display = "none";
}
