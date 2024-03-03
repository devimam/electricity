/*
Title: electricity
Author: Mohammad Imam Hossain
Update Date: 29/02/2024
All rights reserved
*/

///energy rate update section
var lt_a = {
  lifelinerate: 4.63,
  step1rate: 5.26,
  step2rate: 7.2,
  step3rate: 7.59,
  step4rate: 8.02,
  step5rate: 12.67,
  step6rate: 14.61,
};

var demandcharge = 42; ///per kW for LT-A

///initializing all the fields
initializeFields();

function initializeFields() {
  loadLtARates();
  document.getElementById("sload").value = 1;
  document.getElementById("cload").value = 1;
  calculatedemandcharge();
}

///client side energy rate show section
function loadLtARates() {
  for (let key in lt_a) {
    document.getElementById(key).innerHTML = lt_a[key].toFixed(2); ///upto 2 decimal places
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
var billedunitelm = document.getElementById("billedunit");
billedunitelm.addEventListener("keyup", validateUnit);
billedunitelm.addEventListener("change", validateUnit);

function validateUnit() {
  ///resetting amount to bill section
  document.getElementById("billedamount").value = "";
  document
    .getElementById("billedamount")
    .classList.remove("is-valid", "is-invalid");

  if (billedunitelm.value == "") {
    billedunitelm.classList.remove("is-invalid", "is-valid");
    resetall();
  } else {
    let billedunit = parseFloat(billedunitelm.value);
    let isvalid = Number.isSafeInteger(billedunit);
    if (isvalid && billedunit >= 0) {
      console.log("valid units to bill");
      billedunitelm.classList.remove("is-invalid");
      billedunitelm.classList.add("is-valid");
      resetall();
    } else {
      console.log("invalid  units to bill");
      billedunitelm.classList.remove("is-valid");
      billedunitelm.classList.add("is-invalid");
      resetall();
    }
  }

  calculatedemandcharge();
}

///amount to bill validation
var billedamountelm = document.getElementById("billedamount");
billedamountelm.addEventListener("keyup", validateAmount);
billedamountelm.addEventListener("change", validateAmount);

function validateAmount() {
  ///resetting units to bill section
  document.getElementById("billedunit").value = "";
  document
    .getElementById("billedunit")
    .classList.remove("is-valid", "is-invalid");

  if (billedamountelm.value == "") {
    billedamountelm.classList.remove("is-invalid", "is-valid");
    resetall();
  } else {
    let billedamount = parseFloat(billedamountelm.value);
    let isvalid = Number.isSafeInteger(billedamount);
    if (isvalid && billedamount >= 0) {
      console.log("valid amount to bill");
      billedamountelm.classList.remove("is-invalid");
      billedamountelm.classList.add("is-valid");
      resetall();
    } else {
      console.log("invalid amount to bill");
      billedamountelm.classList.remove("is-valid");
      billedamountelm.classList.add("is-invalid");
      resetall();
    }
  }

  calculatedemandcharge();
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
  ///calling units to bill if valid
  let billedunitelm = document.getElementById("billedunit");
  let billedunit = parseFloat(billedunitelm.value);
  let isvalid = Number.isSafeInteger(billedunit);
  if (isvalid && billedunit >= 0) {
    billedunitelm.classList.remove("is-invalid");
    billedunitelm.classList.add("is-valid");
    resetall();
    energycost = calculateunitbill(billedunit);
  }

  ///calling amounts to bill if valid
  let billedamountelm = document.getElementById("billedamount");
  let billedamount = parseFloat(billedamountelm.value);
  let isvalid1 = Number.isSafeInteger(billedamount);
  if (isvalid1 && billedamount >= 0) {
    billedamountelm.classList.remove("is-invalid");
    billedamountelm.classList.add("is-valid");
    resetall();
    energycost = calculateamountbill(billedamount, demandcost);
  }

  ///updating the total bill amount
  updatetotalbill(demandcost, energycost);
}

///function to generate bill, given units to bill
///will be called from calculatedemandcharge
function calculateunitbill(units) {
  let energycost = 0.0;

  if (units <= 50) {
    energycost = units * lt_a["lifelinerate"];

    document.getElementById("lifelineunit").innerHTML = units;
    document.getElementById("lifelinebill").innerHTML = energycost.toFixed(2);
  } else {
    document.getElementById("lifelineunit").innerHTML = "-";
    document.getElementById("lifelinebill").innerHTML = "-";

    let restunits = units;

    ///step1 section
    let step1unit = Math.min(75, restunits);
    let step1bill = step1unit * lt_a["step1rate"];
    energycost += step1bill;

    document.getElementById("step1unit").innerHTML = step1unit;
    document.getElementById("step1bill").innerHTML = step1bill.toFixed(2);
    restunits = restunits - 75;

    ///step2 section
    if (restunits > 0) {
      let step2unit = Math.min(125, restunits);
      let step2bill = step2unit * lt_a["step2rate"];
      energycost += step2bill;

      document.getElementById("step2unit").innerHTML = step2unit;
      document.getElementById("step2bill").innerHTML = step2bill.toFixed(2);
      restunits = restunits - 125;
    }

    ///step3 section
    if (restunits > 0) {
      let step3unit = Math.min(100, restunits);
      let step3bill = step3unit * lt_a["step3rate"];
      energycost += step3bill;

      document.getElementById("step3unit").innerHTML = step3unit;
      document.getElementById("step3bill").innerHTML = step3bill.toFixed(2);
      restunits = restunits - 100;
    }

    ///step4 section
    if (restunits > 0) {
      let step4unit = Math.min(100, restunits);
      let step4bill = step4unit * lt_a["step4rate"];
      energycost += step4bill;

      document.getElementById("step4unit").innerHTML = step4unit;
      document.getElementById("step4bill").innerHTML = step4bill.toFixed(2);
      restunits = restunits - 100;
    }

    ///step5 section
    if (restunits > 0) {
      let step5unit = Math.min(200, restunits);
      let step5bill = step5unit * lt_a["step5rate"];
      energycost += step5bill;

      document.getElementById("step5unit").innerHTML = step5unit;
      document.getElementById("step5bill").innerHTML = step5bill.toFixed(2);
      restunits = restunits - 200;
    }

    ///step6 section
    if (restunits > 0) {
      let step6unit = restunits;
      let step6bill = step6unit * lt_a["step6rate"];
      energycost += step6bill;

      document.getElementById("step6unit").innerHTML = step6unit;
      document.getElementById("step6bill").innerHTML = step6bill.toFixed(2);
    }
  }
  document.getElementById("energyunit").innerHTML = units;
  document.getElementById("energycost").innerHTML = energycost.toFixed(2);

  return energycost;
}

///function to generate bill, given amount to bill
///will be called from calculatedemandcharge
function calculateamountbill(totalamounts, demandcost) {
  let amounts = totalamounts;
  if (!isNaN(demandcost)) {
    amounts = (totalamounts - demandcost * 1.05) / 1.05; ///backtracking energy amount
  }

  if (amounts < 0) amounts = 0;

  let energycost = 0.0;
  let energyunits = 0.0;

  if (amounts <= 50 * lt_a["lifelinerate"]) {
    energyunits = Math.floor(amounts / lt_a["lifelinerate"]);
    energycost = energyunits * lt_a["lifelinerate"];

    document.getElementById("lifelineunit").innerHTML = energyunits;
    document.getElementById("lifelinebill").innerHTML = energycost.toFixed(2);
  } else {
    document.getElementById("lifelineunit").innerHTML = "-";
    document.getElementById("lifelinebill").innerHTML = "-";

    let restamounts = amounts;

    ///for step1
    let step1amount = Math.min(75 * lt_a["step1rate"], restamounts);
    let step1unit = Math.floor(step1amount / lt_a["step1rate"]);
    let step1bill = step1unit * lt_a["step1rate"];
    energyunits += step1unit;
    energycost += step1bill;

    document.getElementById("step1unit").innerHTML = step1unit;
    document.getElementById("step1bill").innerHTML = step1bill.toFixed(2);
    restamounts = restamounts - step1bill;

    ///for step2
    if (restamounts > 0) {
      let step2amount = Math.min(125 * lt_a["step2rate"], restamounts);
      let step2unit = Math.floor(step2amount / lt_a["step2rate"]);
      let step2bill = step2unit * lt_a["step2rate"];
      energyunits += step2unit;
      energycost += step2bill;

      if (step2unit > 0) {
        document.getElementById("step2unit").innerHTML = step2unit;
        document.getElementById("step2bill").innerHTML = step2bill.toFixed(2);
      }
      restamounts = restamounts - step2bill;
    }

    ///for step3
    if (restamounts > 0) {
      let step3amount = Math.min(100 * lt_a["step3rate"], restamounts);
      let step3unit = Math.floor(step3amount / lt_a["step3rate"]);
      let step3bill = step3unit * lt_a["step3rate"];
      energyunits += step3unit;
      energycost += step3bill;

      if (step3unit > 0) {
        document.getElementById("step3unit").innerHTML = step3unit;
        document.getElementById("step3bill").innerHTML = step3bill.toFixed(2);
      }
      restamounts = restamounts - step3bill;
    }

    ///for step4
    if (restamounts > 0) {
      let step4amount = Math.min(100 * lt_a["step4rate"], restamounts);
      let step4unit = Math.floor(step4amount / lt_a["step4rate"]);
      let step4bill = step4unit * lt_a["step4rate"];
      energyunits += step4unit;
      energycost += step4bill;

      if (step4unit > 0) {
        document.getElementById("step4unit").innerHTML = step4unit;
        document.getElementById("step4bill").innerHTML = step4bill.toFixed(2);
      }
      restamounts = restamounts - step4bill;
    }

    ///for step5
    if (restamounts > 0) {
      let step5amount = Math.min(200 * lt_a["step5rate"], restamounts);
      let step5unit = Math.floor(step5amount / lt_a["step5rate"]);
      let step5bill = step5unit * lt_a["step5rate"];
      energyunits += step5unit;
      energycost += step5bill;

      if (step5unit > 0) {
        document.getElementById("step5unit").innerHTML = step5unit;
        document.getElementById("step5bill").innerHTML = step5bill.toFixed(2);
      }
      restamounts = restamounts - step5bill;
    }

    ///for step6
    if (restamounts > 0) {
      let step6amount = restamounts;
      let step6unit = Math.floor(step6amount / lt_a["step6rate"]);
      let step6bill = step6unit * lt_a["step6rate"];
      energyunits += step6unit;
      energycost += step6bill;

      if (step6unit > 0) {
        document.getElementById("step6unit").innerHTML = step6unit;
        document.getElementById("step6bill").innerHTML = step6bill.toFixed(2);
      }
    }
  }
  document.getElementById("energyunit").innerHTML = energyunits;
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

///reset section
function resetall() {
  let fieldnames = [
    "lifelineunit",
    "lifelinebill",
    "step1unit",
    "step1bill",
    "step2unit",
    "step2bill",
    "step3unit",
    "step3bill",
    "step4unit",
    "step4bill",
    "step5unit",
    "step5bill",
    "step6unit",
    "step6bill",
    "energyunit",
    "energycost",
  ];

  for (let val of fieldnames) {
    document.getElementById(val).innerHTML = "";
  }
}
