'use strict';

$(() => {
  // getContactsFromStorage();
  upDateTable();
  $('#addContacts').submit(addContact);
  // $('tr').on('click','td',editContact);
  let ed = $('<span>').text('Edit').addClass('btn btn-danger btn-xs edit-btn');
  $('.edit').append(ed);
  $('tr').on('click','span',editContact);
  // $('.edit').click(() => {
  //   console.log($(this));
  // });
});

function editContact(){
  let index = $(this).parent().index();
  let fname= $(this).siblings('td').eq(0).text();
  let lname= $(this).siblings('td').eq(1).text();
  let mail= $(this).siblings('td').eq(2).text();
  let ph= $(this).siblings('td').eq(3).text();
  $('#editModal').modal('show');
  $('#eFirstname').val(fname);
  $('#eLastname').val(lname);
  $('#eEmail').val(mail);
  $('#ePhoneNum').val(ph);

  // let cFname = $('#eFirstname').val();
  // let cLast = $('#eLastname').val();
  // let cEmail = $('#eEmail').val();
  // let cPhone = $('#ePhoneNum').val();
 let i2 = --index;
  // $('body').data('index',i2);
  // $('#changeContact').submit(changeContact);
  $('#applyChanges').click(()=> changeContact(i2));
  $('#deleteContact').click(() => removeContact(i2));
  // let i3 = $('body').data('index');
  // console.log("index",i3);
}

function changeContact(e){
  // e.preventDefault();
  let firstName = $('#eFirstname').val();
  let lastName = $('#eLastname').val();
  let email = $('#eEmail').val();
  let phone = $('#ePhoneNum').val();
  let arr=[firstName,lastName,email,phone];
  // let i = $('body').data('index');
  // console.log(e);
  let cData = getDataFromStorage();
  cData[e] = toObject(arr);
  // console.log(this);
  // cData.push(i);
  setDataToStorage(cData);
}

function removeContact(i){
  let rData = getDataFromStorage();
  // console.log(rData.splice(i,1));
  rData.splice(i,1);
  setDataToStorage(rData);
}

function upDateTable(){
  let uData = getDataFromStorage();
  let $trr = uData.map(obj => {
    // console.log("udDate Fun", obj);
    return createContactRow(toArray(obj));
  });
  // let jo;
  $trr.forEach(e => {
    // jo = e;
    $('tbody').append(e);
    // console.log("e",e);
  });
  // console.log("$tr", jo);

  // $('tbody').append($tr);
}

function toObject(d){
	return {
		"first-name" : d[0],
		"last-name" : d[1],
		"email" : d[2],
		"phone" : d[3]
	}
}

function toArray(d){
  return [d["first-name"],d["last-name"],d["email"],d["phone"]];
}

// Array.prototype.toContactObj = function(d){
// 	return {
// 		"first-name" : d[0],
// 		"last-name" : d[1],
// 		"email" : d[2],
// 		"phone" : d[3]
// 	}
// }

function getDataFromStorage(){
  try{
    var sData=JSON.parse(localStorage.storedContacts);
  }catch(e){
    sData = [];
  }
  return sData;
}

function setDataToStorage(data){
  localStorage.storedContacts=JSON.stringify(data);
  location.reload();
}

function toContactTable(obj){
  let Data = getDataFromStorage();
  Data.push(obj);
  setDataToStorage(Data);
  // upDateTable();
}


function createContactRow(info) {
  let $tr = $('#template').clone();
  $tr.removeAttr('id');
  // let $trr = $('tr')[1];
  let $td = $tr.children('td');
  let newRow = $td.map((i,e) => {
    // var c = info[i];
    $(e).text(info[i]);
    return e;
    // console.log("addtd",e,"data", info[i]);
  });
  // return newRow;
  // $('tbody').append($('<tr>').append(newRow));
  // debugger;
  // return $td;
  // return $li;
  let $tRow = $('<tr>').addClass("edit").append(newRow);
  // console.log("tRow:",$tRow);
  // debugger;
  return $tRow;
}

function addContact(e){
  e.preventDefault();
  let firstName = $('#firstname').val();
  let lastName = $('#lastname').val();
  let email = $('#email').val();
  let phone = $('#phoneNum').val();
  let arr=[firstName,lastName,email,phone];
  toContactTable(toObject(arr));
  // document.getElementById("addContact").reset();
  //upDateTable();
  // createContact(arr);
}

// function createNewRow(){
//
// }
