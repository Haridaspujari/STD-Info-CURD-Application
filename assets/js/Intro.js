var cl = console.log;

// CRUD Application

// C - create
// R - Read
// U - Update
// D - Delete

 const createForm = document.getElementById("createForm");
 const fName = document.getElementById("fName");
 const lName = document.getElementById("lName");
 const email = document.getElementById("email");
 const contact = document.getElementById("contact");
 const table = document.getElementById("tableData");
 const submit = document.getElementById("submit");
 const upDate = document.getElementById("upDate");

let stdInfoArray=[];
upDate.style.display="none"


//  uuid Function
function uuid () {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid
}

// templeting Function

let templeting =(eve1)=>{
  let result="";
  eve1.forEach((std,i)=>{
     result+=`<tr>
     <td>${i+1}</td>
     <td>${std.fName}</td>
     <td>${std.lName}</td>
     <td>${std.email}</td>
     <td>${std.contact}</td>
     <td><button class="btn btn-primary" onclick="onEditHandler(this)" data-id="${std.id}">Edit</button></td>
     <td><button class="btn btn-danger" onclick="onDeleteHandler(this)" data-id="${std.id}">Delete</button></td>
     </tr>`
  })
  table.innerHTML=result;
}

// function for >> GetsudentInfo >> localStorage

let getStudent = ()=>{
  if(localStorage.getItem("stdInfo")){
    return JSON.parse(localStorage.getItem("stdInfo"));    
  }
  }

  
// function for set Students >> set for Local 

let setlocalStd = (setArray)=>{
  localStorage.setItem("stdInfo",JSON.stringify(setArray));
}

// local Storages declearation to Globle
if(localStorage.getItem("stdInfo")){
   stdInfoArray = getStudent();    
  templeting(stdInfoArray);
}


// Edit Function
let onEditHandler = (ele =>{
  submit.style.display="none"
  upDate.style.display="inline-block"
  let getId = ele.getAttribute("data-id")
  localStorage.setItem("setId",getId)
  let getLocaldata = getStudent();
  let getObj = getLocaldata.filter(ele=>{
    return ele.id===getId
  })
 fName.value = getObj[0].fName
 lName.value = getObj[0].lName
 email.value = getObj[0].email
 contact.value = getObj[0].contact
 
})


//  upDate Function

let onUpDateHandle= ()=>{
  let getId=localStorage.getItem("setId")
  let getLocaldata= getStudent();
  getLocaldata.forEach(eve=>{
    if(eve.id === getId){
      eve.fName=fName.value,
      eve.lName=lName.value,
      eve.email=email.value,
      eve.contact=contact.value
    }
  })
  createForm.reset()
  // localStorage.setItem("stdInfo",JSON.stringify(getLocaldata));
  setlocalStd(getLocaldata)
  templeting(getLocaldata)
  upDate.style.display="none"
  submit.style.display="inline-block"
}

// Delete function 

let onDeleteHandler = (obj)=>{
  let getId = obj.getAttribute("data-id")
  let getstdArray = getStudent();
  deleteArray = getstdArray.filter(obj=>{
    return obj.id!==getId
  })
  // localStorage.setItem("stdInfo",JSON.stringify(deleteArray));
  createForm.reset()
  setlocalStd(deleteArray)
  templeting(deleteArray)
}


// 1st Function SubmitForm

 const submitHandler = (eve=>{
  eve.preventDefault()
  let stdObj= {
    fName:fName.value,
    lName:lName.value,
    email:email.value,
    contact:contact.value,
    id:uuid()
  }
  stdInfoArray.push(stdObj)
  eve.target.reset()
  // localStorage.setItem("stdInfo",JSON.stringify(stdInfoArray))       // Js Obj to >> JSON obj
  setlocalStd(stdInfoArray)
  stdInfoArray = getStudent();    // JSON obj to >> Js Obj
 templeting(stdInfoArray);

 })
// event's
 upDate.addEventListener("click", onUpDateHandle)
 createForm.addEventListener("submit", submitHandler)
