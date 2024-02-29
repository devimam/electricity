/*
Title: electricity
Author: Mohammad Imam Hossain
Date: 30/08/2023
All rights reserved
*/

(function () {
  let slossimportelm = document.getElementById("slossimport");
  slossimportelm.addEventListener("keyup", validateslossimport);
  slossimportelm.addEventListener("change", validateslossimport);

  function validateslossimport() {
    let slossimport = parseFloat(slossimportelm.value);
    let isvalid = Number.isSafeInteger(slossimport);
    if (isvalid && slossimport > 0) {
      console.log("valid import unit");
      slossimportelm.classList.remove("is-invalid");
      slossimportelm.classList.add("is-valid");
    } else {
      console.log("invalid import unit");
      slossimportelm.classList.remove("is-valid");
      slossimportelm.classList.add("is-invalid");
    }

    calculatesloss();
  }

  let slosspostpaidelm = document.getElementById("slosspostpaid");
  slosspostpaidelm.addEventListener("keyup", validateslosspostpaid);
  slosspostpaidelm.addEventListener("change", validateslosspostpaid);

  function validateslosspostpaid() {
    let slosspostpaid = parseFloat(slosspostpaidelm.value);
    let isvalid = Number.isSafeInteger(slosspostpaid);
    if (isvalid && slosspostpaid >= 0) {
      console.log("valid postpaid sold unit");
      slosspostpaidelm.classList.remove("is-invalid");
      slosspostpaidelm.classList.add("is-valid");
    } else {
      console.log("invalid postpaid sold unit");
      slosspostpaidelm.classList.remove("is-valid");
      slosspostpaidelm.classList.add("is-invalid");
    }

    calculatesloss();
  }

  let slossprepaidelm = document.getElementById("slossprepaid");
  slossprepaidelm.addEventListener("keyup", validateslossprepaid);
  slossprepaidelm.addEventListener("change", validateslossprepaid);

  function validateslossprepaid() {
    let slossprepaid = parseFloat(slossprepaidelm.value);
    let isvalid = Number.isSafeInteger(slossprepaid);
    if (isvalid && slossprepaid >= 0) {
      console.log("valid prepaid sold unit");
      slossprepaidelm.classList.remove("is-invalid");
      slossprepaidelm.classList.add("is-valid");
    } else {
      console.log("invalid prepaid sold unit");
      slossprepaidelm.classList.remove("is-valid");
      slossprepaidelm.classList.add("is-invalid");
    }

    calculatesloss();
  }

  ///pf calculation section
  function calculatesloss() {
    let slossimportelm = document.getElementById("slossimport");
    let slossimport = parseFloat(slossimportelm.value);
    let isvalidslossimport = Number.isSafeInteger(slossimport);

    let slosspostpaidelm = document.getElementById("slosspostpaid");
    let slosspostpaid = parseFloat(slosspostpaidelm.value);
    let isvalidslosspostpaid = Number.isSafeInteger(slosspostpaid);

    let slossprepaidelm = document.getElementById("slossprepaid");
    let slossprepaid = parseFloat(slossprepaidelm.value);
    let isvalidslossprepaid = Number.isSafeInteger(slossprepaid);

    if (
      isvalidslossimport &&
      slossimport > 0 &&
      isvalidslosspostpaid &&
      slosspostpaid >= 0 &&
      isvalidslossprepaid &&
      slossprepaid >= 0
    ) {
      let totalsold = slosspostpaid + slossprepaid;
      let systemloss = (1 - totalsold / slossimport) * 100;

      document.getElementById("slossvalue").innerHTML =
        systemloss.toFixed(2) + " %";
      document.getElementById("slossprogress").innerHTML =
        systemloss.toFixed(2) + " %";
      document.getElementById("slossprogress").style.width =
        systemloss.toFixed(2) + "%";
    } else {
      console.log("invalid system loss value");
      document.getElementById("slossvalue").innerHTML = "--.-- %";
      document.getElementById("slossprogress").innerHTML = "";
      document.getElementById("slossprogress").style.width = "0%";
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

    calculatesloss();
  });
})();
