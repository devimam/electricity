/*
Title: electricity
Author: Mohammad Imam Hossain
Update Date: 03/03/2024
All rights reserved
*/

///energy rate update section
var lt_b = {
  srrate: 5.25,
  offpkrate: 5.25,
  pkrate: 5.25,
};

var demandcharge = 42; ///per kW for LT-B

///single or double register selection
var isdoubleregister = document.getElementById("dreg");
isdoubleregister.addEventListener("change", singledoubleregister);

function singledoubleregister() {
  if (isdoubleregister.checked) {
    resetdoubleregisterview();
  } else {
    resetsingleregisterview();
  }
}

function resetdoubleregisterview() {
  document.getElementById("offpkregister").classList.remove("d-none");
  document.getElementById("offpkbilledunit").value = "";
  document
    .getElementById("offpkbilledunit")
    .classList.remove("is-valid", "is-invalid");
  document.getElementById("pkregister").classList.remove("d-none");
  document.getElementById("pkbilledunit").value = "";
  document
    .getElementById("pkbilledunit")
    .classList.remove("is-valid", "is-invalid");

  document.getElementById("offpklabel").classList.remove("text-secondary");
  document.getElementById("pklabel").classList.remove("text-secondary");
  document.getElementById("offpklabel").classList.add("text-black");
  document.getElementById("pklabel").classList.add("text-black");

  document.getElementById("offpkunit").innerHTML = "";
  document.getElementById("offpkbill").innerHTML = "";
  document.getElementById("pkunit").innerHTML = "";
  document.getElementById("pkbill").innerHTML = "";

  document.getElementById("singleregister").classList.add("d-none");
  document.getElementById("srbilledunit").value = "";
  document
    .getElementById("srbilledunit")
    .classList.remove("is-valid", "is-invalid");

  document.getElementById("srlabel").classList.remove("text-black");
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
  document.getElementById("pkregister").classList.add("d-none");
  document.getElementById("pkbilledunit").value = "";
  document
    .getElementById("pkbilledunit")
    .classList.remove("is-valid", "is-invalid");

  document.getElementById("offpklabel").classList.remove("text-black");
  document.getElementById("pklabel").classList.remove("text-black");
  document.getElementById("offpklabel").classList.add("text-secondary");
  document.getElementById("pklabel").classList.add("text-secondary");

  document.getElementById("offpkunit").innerHTML = "-";
  document.getElementById("offpkbill").innerHTML = "-";
  document.getElementById("pkunit").innerHTML = "-";
  document.getElementById("pkbill").innerHTML = "-";

  document.getElementById("singleregister").classList.remove("d-none");
  document.getElementById("srbilledunit").value = "";
  document
    .getElementById("srbilledunit")
    .classList.remove("is-valid", "is-invalid");

  document.getElementById("srlabel").classList.remove("text-secondary");
  document.getElementById("srlabel").classList.add("text-black");

  document.getElementById("srunit").innerHTML = "";
  document.getElementById("srbill").innerHTML = "";
}

///initializing all the fields
initializeFields();

function initializeFields() {
  singledoubleregister();
  loadLtBRates();
  document.getElementById("sload").value = 1;
  document.getElementById("cload").value = 1;
  calculatedemandcharge();
}

///client side energy rate show section
function loadLtBRates() {
  for (let key in lt_b) {
    document.getElementById(key).innerHTML = lt_b[key].toFixed(2); ///upto 2 decimal places
  }
}

///sanctioned load validation
var sloadelm = document.getElementById("sload");
sloadelm.addEventListener("keyup", validateSLoad);
sloadelm.addEventListener("change", validateSLoad);

function validateSLoad() {
  let sload = parseFloat(sloadelm.value);
  let isvalid = Number.isSafeInteger(sload);
  if (isvalid && sload >= 1) {
    console.log("valid sanction load");
    sloadelm.classList.remove("is-invalid");
    sloadelm.classList.add("is-valid");
  } else {
    console.log("invalid sanction load");
    sloadelm.classList.remove("is-valid");
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
  if (isvalid && cload >= 1) {
    console.log("valid connected load");
    cloadelm.classList.remove("is-invalid");
    cloadelm.classList.add("is-valid");
  } else {
    console.log("invalid connected load");
    cloadelm.classList.remove("is-valid");
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
    if (issrvalid && srbilledunit >= 0) {
      console.log("valid sr units to bill");
      srbilledunitelm.classList.remove("is-invalid");
      srbilledunitelm.classList.add("is-valid");
    } else {
      console.log("invalid sr units to bill");
      srbilledunitelm.classList.remove("is-valid");
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

///offpeak peak unit validation
var offpkbilledunitelm = document.getElementById("offpkbilledunit");
offpkbilledunitelm.addEventListener("keyup", drvalidateUnit);
offpkbilledunitelm.addEventListener("change", drvalidateUnit);

var pkbilledunitelm = document.getElementById("pkbilledunit");
pkbilledunitelm.addEventListener("keyup", drvalidateUnit);
pkbilledunitelm.addEventListener("change", drvalidateUnit);

function drvalidateUnit() {
  console.log("validating dr inputs");
  if (offpkbilledunitelm.value == "") {
    offpkbilledunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let offpkbilledunit = parseFloat(offpkbilledunitelm.value);
    let isoffpkvalid = Number.isSafeInteger(offpkbilledunit);

    if (isoffpkvalid && offpkbilledunit >= 0) {
      console.log("valid offpk units to bill");
      offpkbilledunitelm.classList.remove("is-invalid");
      offpkbilledunitelm.classList.add("is-valid");
    } else {
      console.log("invalid offpk units to bill");
      offpkbilledunitelm.classList.remove("is-valid");
      offpkbilledunitelm.classList.add("is-invalid");
    }
  }

  if (pkbilledunitelm.value == "") {
    pkbilledunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let pkbilledunit = parseFloat(pkbilledunitelm.value);
    let ispkvalid = Number.isSafeInteger(pkbilledunit);

    if (ispkvalid && pkbilledunit >= 0) {
      console.log("valid pk units to bill");
      pkbilledunitelm.classList.remove("is-invalid");
      pkbilledunitelm.classList.add("is-valid");
    } else {
      console.log("invalid pk units to bill");
      pkbilledunitelm.classList.remove("is-valid");
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
      demandcost = sload * demandcharge + (cload - sload) * 2 * demandcharge;
      document.getElementById("demandload").innerHTML =
        sload +
        " x " +
        demandcharge +
        " + " +
        (cload - sload) +
        " x 2 x " +
        demandcharge;
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
    let pkbilledunitelm = document.getElementById("pkbilledunit");
    let offpkbilledunit = parseFloat(offpkbilledunitelm.value);
    let pkbilledunit = parseFloat(pkbilledunitelm.value);
    let isoffpkvalid = Number.isSafeInteger(offpkbilledunit);
    let ispkvalid = Number.isSafeInteger(pkbilledunit);

    if (
      isoffpkvalid &&
      offpkbilledunit >= 0 &&
      ispkvalid &&
      pkbilledunit >= 0
    ) {
      offpkbilledunitelm.classList.remove("is-invalid");
      offpkbilledunitelm.classList.add("is-valid");
      pkbilledunitelm.classList.remove("is-invalid");
      pkbilledunitelm.classList.add("is-valid");

      energycost = doubleregisterunitbill(offpkbilledunit, pkbilledunit);
    }
  } else {
    ///single register billing section
    let srbilledunitelm = document.getElementById("srbilledunit");
    let srbilledunit = parseFloat(srbilledunitelm.value);
    let issrvalid = Number.isSafeInteger(srbilledunit);

    if (issrvalid && srbilledunit >= 0) {
      srbilledunitelm.classList.remove("is-invalid");
      srbilledunitelm.classList.add("is-valid");

      energycost = singleregisterunitbill(srbilledunit);
    }
  }

  ///updating the total bill amount
  updatetotalbill(demandcost, energycost);
}

///function to generate bill, given units to bill
///will be called from calculatedemandcharge
function doubleregisterunitbill(offpkunit, pkunit) {
  let offpkenergycost = offpkunit * lt_b["offpkrate"];
  let pkenergycost = pkunit * lt_b["pkrate"];

  let energycost = offpkenergycost + pkenergycost;

  document.getElementById("offpkunit").innerHTML = offpkunit;
  document.getElementById("offpkbill").innerHTML = offpkenergycost.toFixed(2);
  document.getElementById("pkunit").innerHTML = pkunit;
  document.getElementById("pkbill").innerHTML = pkenergycost.toFixed(2);

  document.getElementById("srunit").innerHTML = "-";
  document.getElementById("srbill").innerHTML = "-";

  document.getElementById("energycost").innerHTML = energycost.toFixed(2);

  return energycost;
}

function singleregisterunitbill(srunit) {
  let srenergycost = srunit * lt_b["srrate"];

  let energycost = srenergycost;

  document.getElementById("offpkunit").innerHTML = "-";
  document.getElementById("offpkbill").innerHTML = "-";
  document.getElementById("pkunit").innerHTML = "-";
  document.getElementById("pkbill").innerHTML = "-";

  document.getElementById("srunit").innerHTML = srunit;
  document.getElementById("srbill").innerHTML = srenergycost.toFixed(2);

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
