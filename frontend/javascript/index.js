const searchBtn = document.querySelector('[searchBtn]');
const inputText = document.querySelector('[type="text"]');
const dataContainer = document.querySelector('.data-container');
const noRecord = document.querySelector('.noRecord');
const header = ["Employee ID", "Name", "Aadhar Number", "Mobile number", "Department", "Address"];

searchBtn.addEventListener('click', async function (e) {
  e.preventDefault();
  dataContainer.innerHTML = "";
  noRecord.innerHTML = "";
  const value = inputText.value;
  const data = await fetch(`http://localhost:5550/admin/${value}`);
  const response = await data.json();
  localStorage.setItem("user",JSON.stringify(response));
  if (response.length == 0) {
    const Error = "<h3>No record found</h3>"

    noRecord.innerHTML = Error;


  } else {

    const table = document.createElement('table');
    table.className = "table table-striped"
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    for (var i = 0; i < header.length; i++) {
      const th = document.createElement('th');
      th.textContent = header[i];
      thead.appendChild(th);
    }

    table.appendChild(thead);

    for (var i = 0; i < response.length; i++) {
      const { AadhaarNumber, address, department, employeID, mobileNumber, name, _v, _id } = response[i];
      addTableItem(employeID, name, AadhaarNumber, mobileNumber, department, address, tbody);
      console.log(response[i])

    }

    table.appendChild(tbody);
    // console.log(table)
    dataContainer.appendChild(table)
    inputText.value = "";

  }



}, false)

function item(value, tr) {
  const td = document.createElement('td');
  tr.appendChild(td);
  td.textContent = value;
}

function addTableItem(employeeID, aadhaa_number, name, mobile_number, Department, address, tbody) {
  const tr = document.createElement('tr');
  item(employeeID, tr);
  item(aadhaa_number, tr);
  item(name, tr);
  item(mobile_number, tr);
  item(Department, tr);
  item(address, tr);
  tbody.appendChild(tr);
}