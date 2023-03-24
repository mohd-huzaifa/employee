


const header = ["Employee ID", "Name", "Aadhar Number", "Mobile number", "Department", "Address"];
// const updateModal = document.getElementById('updateModal');
const searchBtn = document.querySelector('[searchBtn]');
const inputText = document.querySelector('[type="text"]');
const dataContainer = document.querySelector('.data-container');
const noRecord = document.querySelector('.noRecord');
const addUser = document.querySelector("[addUser]");
const formContainer = document.querySelector(".form");
const body = document.querySelector(".body");
addUser.addEventListener('click',function(){
           body.innerHTML = "";
           console.log("clicked")
           formContainer.innerHTML = form;


},false);

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

  function addBtnUpdateAndDelete(tbody,tr){
    const td1 = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.className = "btn btn-outline-success m-1 p-1 text-black";
    deleteBtn.textContent = "Delete";
    deleteBtn.id = "deleteBtn"
    const td2 = document.createElement('td');
    const updateBtn = document.createElement('button');
    updateBtn.className = "btn btn-outline-info m-1 p-1 text-black";
    updateBtn.textContent = "Update";
    updateBtn.id = "updateBtn"
    updateBtn.setAttribute("data-bs-toggle","collapse");
    updateBtn.setAttribute("data-bs-target","collapseExample");
    updateBtn.setAttribute("aria-expanded","false");
    updateBtn.setAttribute("aria-controls","collapseExample");
    tr.appendChild(td1);
    tr.appendChild(updateBtn);
    tbody.appendChild(tr);
    tr.appendChild(td2);
    tr.appendChild(deleteBtn);
    tbody.appendChild(tr);
  }
  
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
    addBtnUpdateAndDelete(tbody,tr);
    tbody.appendChild(tr);
  }

 

  document.addEventListener( "click", deleteAndButton );
  var tabledata = ""
  async function deleteAndButton(event){
      var element = event.target;
      var parent = element.parentElement;
      if(element.id == 'deleteBtn' ){
         tabledata = parent.firstChild.textContent
          const data = {
               id:tabledata
          }
        const res = await fetch('http://localhost:5550/admin',{
            method: 'DELETE',
            headers: {
                accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        const response = await res.json();
        console.log(response);
        parent.remove();
      }else if(element.id == 'updateBtn'){
          window.location.href = "update.html"
      }
   
  }




//   class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"