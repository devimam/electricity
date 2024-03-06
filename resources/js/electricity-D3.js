/*
Title: electricity
Author: Mohammad Imam Hossain
Update Date: 03/03/2024
All rights reserved
*/

///energy rate update section
var lt_d3 = {
  srrate: 9.62,
  offpkrate: 8.66,
  pkrate: 12.14,
  soffpkrate: 7.68,
};

var demandcharge = 90; ///per kW for LT-D3

///single or double register selection
var isdoubleregister = document.getElementById("dreg");
isdoubleregister.addEventListener("change", singledoubleregister);

function singledoubleregister() {
  if (isdoubleregister.checked) {
    resetdoubleregisterview();
    resetdr();
  } else {
    resetsingleregisterview();
    resetsr();
  }
}

function resetdoubleregisterview() {
  document.getElementById("offpkregister").classList.remove("d-none");
  document.getElementById("offpkbilledunit").value = "";
  document
    .getElementById("offpkbilledunit")
    .classList.remove("is-valid", "is-invalid");
  document.getElementById("soffpkregister").classList.remove("d-none");
  document.getElementById("soffpkbilledunit").value = "";
  document
    .getElementById("soffpkbilledunit")
    .classList.remove("is-valid", "is-invalid");
  document.getElementById("pkregister").classList.remove("d-none");
  document.getElementById("pkbilledunit").value = "";
  document
    .getElementById("pkbilledunit")
    .classList.remove("is-valid", "is-invalid");

  document
    .getElementById("offpklabel")
    .classList.remove("text-secondary", "text-black");
  document
    .getElementById("soffpklabel")
    .classList.remove("text-secondary", "text-black");
  document
    .getElementById("pklabel")
    .classList.remove("text-secondary", "text-black");
  document.getElementById("offpklabel").classList.add("text-black");
  document.getElementById("soffpklabel").classList.add("text-black");
  document.getElementById("pklabel").classList.add("text-black");

  document.getElementById("offpkunit").innerHTML = "";
  document.getElementById("soffpkunit").innerHTML = "";
  document.getElementById("offpkbill").innerHTML = "";
  document.getElementById("soffpkbill").innerHTML = "";
  document.getElementById("pkunit").innerHTML = "";
  document.getElementById("pkbill").innerHTML = "";

  document.getElementById("singleregister").classList.add("d-none");
  document.getElementById("srbilledunit").value = "";
  document
    .getElementById("srbilledunit")
    .classList.remove("is-valid", "is-invalid");

  document
    .getElementById("srlabel")
    .classList.remove("text-black", "text-secondary");
  document.getElementById("srlabel").classList.add("text-secondary");

  document.getElementById("srunit").innerHTML = "-";
  document.getElementById("srbill").innerHTML = "-";
}

function resetsingleregisterview() {
  document.getElementById("offpkregister").classList.add("d-none");
  document.getElementById("offpkbilledunit").value = "";
  document
    .getElementById("offpkbilledunit")
    .classList.remove("is-valid", "is-invalid");
  document.getElementById("soffpkregister").classList.add("d-none");
  document.getElementById("soffpkbilledunit").value = "";
  document
    .getElementById("soffpkbilledunit")
    .classList.remove("is-valid", "is-invalid");
  document.getElementById("pkregister").classList.add("d-none");
  document.getElementById("pkbilledunit").value = "";
  document
    .getElementById("pkbilledunit")
    .classList.remove("is-valid", "is-invalid");

  document
    .getElementById("offpklabel")
    .classList.remove("text-black", "text-secondary");
  document
    .getElementById("soffpklabel")
    .classList.remove("text-black", "text-secondary");
  document
    .getElementById("pklabel")
    .classList.remove("text-black", "text-secondary");
  document.getElementById("offpklabel").classList.add("text-secondary");
  document.getElementById("soffpklabel").classList.add("text-secondary");
  document.getElementById("pklabel").classList.add("text-secondary");

  document.getElementById("offpkunit").innerHTML = "-";
  document.getElementById("soffpkunit").innerHTML = "-";
  document.getElementById("offpkbill").innerHTML = "-";
  document.getElementById("soffpkbill").innerHTML = "-";
  document.getElementById("pkunit").innerHTML = "-";
  document.getElementById("pkbill").innerHTML = "-";

  document.getElementById("singleregister").classList.remove("d-none");
  document.getElementById("srbilledunit").value = "";
  document
    .getElementById("srbilledunit")
    .classList.remove("is-valid", "is-invalid");

  document
    .getElementById("srlabel")
    .classList.remove("text-secondary", "text-black");
  document.getElementById("srlabel").classList.add("text-black");

  document.getElementById("srunit").innerHTML = "";
  document.getElementById("srbill").innerHTML = "";
}

///initializing all the fields
initializeFields();

function initializeFields() {
  singledoubleregister();
  loadLtD3Rates();
  document.getElementById("sload").value = 1;
  document.getElementById("cload").value = 1;
  calculatedemandcharge();
}

///client side energy rate show section
function loadLtD3Rates() {
  for (let key in lt_d3) {
    document.getElementById(key).innerHTML = lt_d3[key].toFixed(2); ///upto 2 decimal places
  }
}

///sanctioned load validation
var sloadelm = document.getElementById("sload");
sloadelm.addEventListener("keyup", validateSLoad);
sloadelm.addEventListener("change", validateSLoad);

function validateSLoad() {
  let sload = parseFloat(sloadelm.value);
  let isvalid = Number.isSafeInteger(sload);
  sloadelm.classList.remove("is-invalid", "is-valid");
  if (isvalid && sload >= 1) {
    console.log("valid sanction load");
    sloadelm.classList.add("is-valid");
  } else {
    console.log("invalid sanction load");
    sloadelm.classList.add("is-invalid");
  }

  calculatedemandcharge();
}

///connected load validation
var cloadelm = document.getElementById("cload");
cloadelm.addEventListener("keyup", validateCLoad);
cloadelm.addEventListener("change", validateCLoad);

function validateCLoad() {
  let cload = parseFloat(cloadelm.value);
  let isvalid = Number.isSafeInteger(cload);
  cloadelm.classList.remove("is-invalid", "is-valid");
  if (isvalid && cload >= 1) {
    console.log("valid connected load");
    cloadelm.classList.add("is-valid");
  } else {
    console.log("invalid connected load");
    cloadelm.classList.add("is-invalid");
  }

  calculatedemandcharge();
}

///units to bill validation
var srbilledunitelm = document.getElementById("srbilledunit");
srbilledunitelm.addEventListener("keyup", srvalidateUnit);
srbilledunitelm.addEventListener("change", srvalidateUnit);

function srvalidateUnit() {
  if (srbilledunitelm.value == "") {
    srbilledunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let srbilledunit = parseFloat(srbilledunitelm.value);
    let issrvalid = Number.isSafeInteger(srbilledunit);
    srbilledunitelm.classList.remove("is-invalid", "is-valid");
    if (issrvalid && srbilledunit >= 0) {
      console.log("valid sr units to bill");
      srbilledunitelm.classList.add("is-valid");
    } else {
      console.log("invalid sr units to bill");
      srbilledunitelm.classList.add("is-invalid");
    }
  }

  resetsr();
  calculatedemandcharge();
}

///reset sr fields
function resetsr() {
  let fieldnames = ["srunit", "srbill", "energyunit", "energycost"];

  for (let val of fieldnames) {
    document.getElementById(val).innerHTML = "";
  }
}

///offpeak & peak unit validation
var offpkbilledunitelm = document.getElementById("offpkbilledunit");
offpkbilledunitelm.addEventListener("keyup", drvalidateUnit);
offpkbilledunitelm.addEventListener("change", drvalidateUnit);

var soffpkbilledunitelm = document.getElementById("soffpkbilledunit");
soffpkbilledunitelm.addEventListener("keyup", drvalidateUnit);
soffpkbilledunitelm.addEventListener("change", drvalidateUnit);

var pkbilledunitelm = document.getElementById("pkbilledunit");
pkbilledunitelm.addEventListener("keyup", drvalidateUnit);
pkbilledunitelm.addEventListener("change", drvalidateUnit);

function drvalidateUnit() {
  console.log("validating double register inputs");
  if (offpkbilledunitelm.value == "") {
    offpkbilledunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let offpkbilledunit = parseFloat(offpkbilledunitelm.value);
    let isoffpkvalid = Number.isSafeInteger(offpkbilledunit);
    offpkbilledunitelm.classList.remove("is-invalid", "is-valid");
    if (isoffpkvalid && offpkbilledunit >= 0) {
      console.log("valid offpk units to bill");
      offpkbilledunitelm.classList.add("is-valid");
    } else {
      console.log("invalid offpk units to bill");
      offpkbilledunitelm.classList.add("is-invalid");
    }
  }

  if (soffpkbilledunitelm.value == "") {
    soffpkbilledunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let soffpkbilledunit = parseFloat(soffpkbilledunitelm.value);
    let issoffpkvalid = Number.isSafeInteger(soffpkbilledunit);
    soffpkbilledunitelm.classList.remove("is-invalid", "is-valid");
    if (issoffpkvalid && soffpkbilledunit >= 0) {
      console.log("valid offpk units to bill");
      soffpkbilledunitelm.classList.add("is-valid");
    } else {
      console.log("invalid offpk units to bill");
      soffpkbilledunitelm.classList.add("is-invalid");
    }
  }

  if (pkbilledunitelm.value == "") {
    pkbilledunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let pkbilledunit = parseFloat(pkbilledunitelm.value);
    let ispkvalid = Number.isSafeInteger(pkbilledunit);
    pkbilledunitelm.classList.remove("is-invalid", "is-valid");
    if (ispkvalid && pkbilledunit >= 0) {
      console.log("valid pk units to bill");
      pkbilledunitelm.classList.add("is-valid");
    } else {
      console.log("invalid pk units to bill");
      pkbilledunitelm.classList.add("is-invalid");
    }
  }

  resetdr();
  calculatedemandcharge();
}

///reset sr fields
function resetdr() {
  let fieldnames = [
    "offpkunit",
    "offpkbill",
    "soffpkunit",
    "soffpkbill",
    "pkunit",
    "pkbill",
    "energyunit",
    "energycost",
  ];

  for (let val of fieldnames) {
    document.getElementById(val).innerHTML = "";
  }
}

///first step - demand cost calculate section
function calculatedemandcharge() {
  let sload = parseFloat(document.getElementById("sload").value);
  let isvalids = Number.isSafeInteger(sload);

  let cload = parseFloat(document.getElementById("cload").value);
  let isvalidc = Number.isSafeInteger(cload);

  let demandcost = 0;
  if (isvalids && isvalidc && sload >= 1 && cload >= 1) {
    console.log("valid demand charge found");
    if (sload >= cload) {
      demandcost = sload * demandcharge;
      document.getElementById("demandload").innerHTML =
        sload + " x " + demandcharge;
    } else {
      demandcost = sload * demandcharge + (cload - sload) * 2 * demandcharge; ///two times panel demand charge
      document.getElementById("demandload").innerHTML =
        sload +
        " x " +
        demandcharge +
        "<span class='text-danger'> + " +
        (cload - sload) +
        " x 2 x " +
        demandcharge +
        "</span>";
    }

    document.getElementById("demandcost").innerHTML = demandcost.toFixed(2);
  } else {
    console.log("invalid demand charge");
    document.getElementById("demandload").innerHTML = "";
    document.getElementById("demandcost").innerHTML =
      "<span class='text-danger'>????</span>";
  }

  let energycost = 0;
  if (document.getElementById("dreg").checked) {
    ///double register billing section
    let offpkbilledunitelm = document.getElementById("offpkbilledunit");
    let soffpkbilledunitelm = document.getElementById("soffpkbilledunit");
    let pkbilledunitelm = document.getElementById("pkbilledunit");
    let offpkbilledunit = parseFloat(offpkbilledunitelm.value);
    let soffpkbilledunit = parseFloat(soffpkbilledunitelm.value);
    let pkbilledunit = parseFloat(pkbilledunitelm.value);
    let isoffpkvalid = Number.isSafeInteger(offpkbilledunit);
    let issoffpkvalid = Number.isSafeInteger(soffpkbilledunit);
    let ispkvalid = Number.isSafeInteger(pkbilledunit);

    if (
      isoffpkvalid &&
      offpkbilledunit >= 0 &&
      issoffpkvalid &&
      soffpkbilledunit >= 0 &&
      ispkvalid &&
      pkbilledunit >= 0
    ) {
      offpkbilledunitelm.classList.remove("is-invalid", "is-valid");
      offpkbilledunitelm.classList.add("is-valid");
      soffpkbilledunitelm.classList.remove("is-invalid", "is-valid");
      soffpkbilledunitelm.classList.add("is-valid");
      pkbilledunitelm.classList.remove("is-invalid", "is-valid");
      pkbilledunitelm.classList.add("is-valid");

      energycost = doubleregisterunitbill(
        offpkbilledunit,
        pkbilledunit,
        soffpkbilledunit
      );
    }
  } else {
    ///single register billing section
    let srbilledunitelm = document.getElementById("srbilledunit");
    let srbilledunit = parseFloat(srbilledunitelm.value);
    let issrvalid = Number.isSafeInteger(srbilledunit);

    if (issrvalid && srbilledunit >= 0) {
      srbilledunitelm.classList.remove("is-invalid", "is-valid");
      srbilledunitelm.classList.add("is-valid");

      energycost = singleregisterunitbill(srbilledunit);
    }
  }

  ///updating the total bill amount
  updatetotalbill(demandcost, energycost);
}

///function to generate double register bill, given units to bill
function doubleregisterunitbill(offpkunit, pkunit, soffpkunit) {
  let offpkenergycost = offpkunit * lt_d3["offpkrate"];
  let soffpkenergycost = soffpkunit * lt_d3["soffpkrate"];
  let pkenergycost = pkunit * lt_d3["pkrate"];

  let energycost = offpkenergycost + pkenergycost + soffpkenergycost;

  document.getElementById("offpkunit").innerHTML = offpkunit;
  document.getElementById("offpkbill").innerHTML = offpkenergycost.toFixed(2);
  document.getElementById("soffpkunit").innerHTML = soffpkunit;
  document.getElementById("soffpkbill").innerHTML = soffpkenergycost.toFixed(2);
  document.getElementById("pkunit").innerHTML = pkunit;
  document.getElementById("pkbill").innerHTML = pkenergycost.toFixed(2);

  document.getElementById("srunit").innerHTML = "-";
  document.getElementById("srbill").innerHTML = "-";

  document.getElementById("energyunit").innerHTML =
    offpkunit + pkunit + soffpkunit;
  document.getElementById("energycost").innerHTML = energycost.toFixed(2);

  return energycost;
}

///function to generate single register bill, given units to bill
function singleregisterunitbill(srunit) {
  let srenergycost = srunit * lt_d3["srrate"];

  let energycost = srenergycost;

  document.getElementById("offpkunit").innerHTML = "-";
  document.getElementById("offpkbill").innerHTML = "-";
  document.getElementById("soffpkunit").innerHTML = "-";
  document.getElementById("soffpkbill").innerHTML = "-";
  document.getElementById("pkunit").innerHTML = "-";
  document.getElementById("pkbill").innerHTML = "-";

  document.getElementById("srunit").innerHTML = srunit;
  document.getElementById("srbill").innerHTML = srenergycost.toFixed(2);

  document.getElementById("energyunit").innerHTML = srunit;
  document.getElementById("energycost").innerHTML = energycost.toFixed(2);

  return energycost;
}

///principal bill, vat and total bill update
function updatetotalbill(demandcost, energycost) {
  if (!isNaN(energycost) && !isNaN(demandcost)) {
    console.log("energycost = " + energycost + " , demandcost = " + demandcost);

    let principal = energycost + demandcost;
    let vat = principal * 0.05;
    let billtotal = principal + vat;

    document.getElementById("principal").innerHTML = principal.toFixed(2);
    document.getElementById("vat").innerHTML = vat.toFixed(2);
    document.getElementById("billtotal").innerHTML = billtotal.toFixed(2);
  } else {
    console.log("invalid everycost or demandcost");
    document.getElementById("principal").innerHTML = "";
    document.getElementById("vat").innerHTML = "";
    document.getElementById("billtotal").innerHTML = "";
  }
}
