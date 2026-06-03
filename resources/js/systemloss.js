/*
Title: electricity
Author: Mohammad Imam Hossain
Date: 30/08/2023
All rights reserved
*/

(function () {
  let slossimportelm = document.getElementById("slossimport");
  slossimportelm.addEventListener("keyup", calculatesloss);
  slossimportelm.addEventListener("change", calculatesloss);

  function validateslossimport() {
    let slossimport = parseFloat(slossimportelm.value);
    let isvalid = !Number.isNaN(slossimport);
    if (isvalid && slossimport > 0) { // import can't be negative or zero
      console.log("valid import unit");
      slossimportelm.classList.remove("is-invalid");
      slossimportelm.classList.add("is-valid");
      
      return slossimport; // valid unit value
    } else {
      console.log("invalid import unit");
      slossimportelm.classList.remove("is-valid");
      slossimportelm.classList.add("is-invalid");

      return 0; // invalid value
    }

    return 0; //invalid value
  }

  let slosspostpaidelm = document.getElementById("slosspostpaid");
  slosspostpaidelm.addEventListener("keyup", calculatesloss);
  slosspostpaidelm.addEventListener("change", calculatesloss);

  function validateslosspostpaid() {
    let slosspostpaid = parseFloat(slosspostpaidelm.value);
    let isvalid = !Number.isNaN(slosspostpaid);
    if (isvalid) { // allowing both positive and negative units
      console.log("valid postpaid sold unit");
      slosspostpaidelm.classList.remove("is-invalid");
      slosspostpaidelm.classList.add("is-valid");

      return slosspostpaid; // valid unit value
    } else {
      console.log("invalid postpaid sold unit");
      slosspostpaidelm.classList.remove("is-valid");
      slosspostpaidelm.classList.add("is-invalid");

      return 0; // invalid unit value
    }

    return 0; // invalid unit value
  }

  let slossprepaidelm = document.getElementById("slossprepaid");
  slossprepaidelm.addEventListener("keyup", calculatesloss);
  slossprepaidelm.addEventListener("change", calculatesloss);

  function validateslossprepaid() {
    let slossprepaid = parseFloat(slossprepaidelm.value);
    let isvalid = !Number.isNaN(slossprepaid);
    if (isvalid) { // allowing both positive and negative units
      console.log("valid prepaid sold unit");
      slossprepaidelm.classList.remove("is-invalid");
      slossprepaidelm.classList.add("is-valid");

      return slossprepaid; // valid unit value
    } else {
      console.log("invalid prepaid sold unit");
      slossprepaidelm.classList.remove("is-valid");
      slossprepaidelm.classList.add("is-invalid");

      return 0; // invalid unit value
    }

    return 0; // invalid unit value
  }

  let slossmiscelm = document.getElementById("slossmisc");
  slossmiscelm.addEventListener("keyup", calculatesloss);
  slossmiscelm.addEventListener("change", calculatesloss);

  function validateslossmisc() {
    let slossmisc = parseFloat(slossmiscelm.value);
    let isvalid = !Number.isNaN(slossmisc);
    if (isvalid) { // allowing both positive and negative units
      console.log("valid misc sold unit");
      slossmiscelm.classList.remove("is-invalid");
      slossmiscelm.classList.add("is-valid");

      return slossmisc; // valid unit value
    } else {
      console.log("invalid misc sold unit");
      slossmiscelm.classList.remove("is-valid");
      slossmiscelm.classList.add("is-invalid");

      return 0; // invalid unit value
    }

    return 0; // invalid unit value
  }

  ///system loss calculation section
  function calculatesloss() {
    let slossimport = validateslossimport();
    let slosspostpaid = validateslosspostpaid();
    let slossprepaid = validateslossprepaid();
    let slossmisc = validateslossmisc();


    if(slossimport<=0){
      console.log("invalid system loss value");
      document.getElementById("slossvalue").innerHTML = "--.-- %";
      document.getElementById("slossprogress").innerHTML = "";
      document.getElementById("slossprogress").style.width = "0%";
    }
    else{
      let totalsold = slosspostpaid + slossprepaid + slossmisc;
      let systemloss = (1 - totalsold / slossimport) * 100;

      document.getElementById("slossvalue").innerHTML =
      systemloss.toFixed(2) + " %";
      document.getElementById("slossprogress").innerHTML =
        systemloss.toFixed(2) + " %";
      document.getElementById("slossprogress").style.width =
        systemloss.toFixed(2) + "%";
    }
  }

  const modalelm = document.getElementById("systemloss");
  modalelm.addEventListener("show.bs.modal", (event) => {
    document.getElementById("slossimport").value = "";
    document
      .getElementById("slossimport")
      .classList.remove("is-invalid", "is-valid");

    document.getElementById("slosspostpaid").value = "";
    document
      .getElementById("slosspostpaid")
      .classList.remove("is-invalid", "is-valid");

    document.getElementById("slossprepaid").value = "";
    document
      .getElementById("slossprepaid")
      .classList.remove("is-invalid", "is-valid");

    document.getElementById("slossmisc").value = "";
    document
      .getElementById("slossmisc")
      .classList.remove("is-invalid", "is-valid");

    document.getElementById("slossvalue").innerHTML = "--.-- %";
    document.getElementById("slossprogress").innerHTML = "";
    document.getElementById("slossprogress").style.width = "0%";
  });
})();
