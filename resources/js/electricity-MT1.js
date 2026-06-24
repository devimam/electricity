/*
Title: electricity
Author: Mohammad Imam Hossain
Update Date: 03/06/2026
All rights reserved
*/

///energy rate update section
var mt_1 = {
  srrate: 12.5,
  offpkrate: 11.25,
  pkrate: 15.62,
};

var demandCharge = 90; ///per kW for MT-1
var minSLoad = 0;
var minOMF = 1;
var minMaxDemand = 0;
var minOffPkUnit = 0;

///initializing all the fields
initializeFields();

function initializeFields() {
  loadMT1Rates();

  document.getElementById("kwhomf").value = minOMF;
  document.getElementById("kwhoffpkbilledunit").value = minOffPkUnit;

  document.getElementById("kvarhomf").value = minOMF;
  document.getElementById("kvarhoffpkbilledunit").value = minOffPkUnit;

  document.getElementById("kwomf").value = minOMF;
  document.getElementById("kwbilledunit").value = minMaxDemand;

  document.getElementById("sloadunit").value = minSLoad;

  // calculateDemandCharge();
}

///client side energy rate show section
function loadMT1Rates() {
  for (let key in mt_1) {
    document.getElementById(key).innerHTML = mt_1[key].toFixed(2); ///upto 2 decimal places
  }
}

///kWh single register or off-peak units to bill validation
var kwhoffpkunitelm = document.getElementById("kwhoffpkbilledunit");
kwhoffpkunitelm.addEventListener("keyup", kwhoffpkvalidateUnit);
kwhoffpkunitelm.addEventListener("change", kwhoffpkvalidateUnit);

function kwhoffpkvalidateUnit() {
  let kwhoffpkbilledunitval = Number(kwhoffpkunitelm.value);
  // let isvalid = Number.isSafeInteger(kwhoffpkbilledunit);
  kwhoffpkunitelm.classList.remove("is-invalid", "is-valid");
  if (
    kwhoffpkunitelm.value != "" &&
    !isNaN(kwhoffpkbilledunitval) &&
    kwhoffpkbilledunitval >= minOffPkUnit
  ) {
    console.log("valid single register or off-peak units to bill");
    kwhoffpkunitelm.classList.add("is-valid");
  } else {
    console.log("invalid single register or off-peak units to bill");
    kwhoffpkunitelm.classList.add("is-invalid");
  }

  // calculateDemandCharge();
}

///kWh peak units to bill validation
var kwhpkunitelm = document.getElementById("kwhpkbilledunit");
kwhpkunitelm.addEventListener("keyup", kwhpkvalidateUnit);
kwhpkunitelm.addEventListener("change", kwhpkvalidateUnit);

function kwhpkvalidateUnit() {
  if (kwhpkunitelm.value == "") {
    kwhpkunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let kwhpkbilledunitval = Number(kwhpkunitelm.value);
    // let isvalid = Number.isSafeInteger(kwhpkbilledunit);
    kwhpkunitelm.classList.remove("is-invalid", "is-valid");
    if (!isNaN(kwhpkbilledunitval) && kwhpkbilledunitval >= 0) {
      console.log("valid peak units to bill");
      kwhpkunitelm.classList.add("is-valid");
    } else {
      console.log("invalid peak units to bill");
      kwhpkunitelm.classList.add("is-invalid");
    }
  }

  // calculateDemandCharge();
}

//kvarh single register or off-peak units to bill
var kvarhoffpkunitelm = document.getElementById("kvarhoffpkbilledunit");
kvarhoffpkunitelm.addEventListener("keyup", kvarhoffpkvalidateUnit);
kvarhoffpkunitelm.addEventListener("change", kvarhoffpkvalidateUnit);

function kvarhoffpkvalidateUnit() {
  let kvarhoffpkbilledunitval = Number(kvarhoffpkunitelm.value);
  // let isvalid = Number.isSafeInteger(kvarhoffpkbilledunit);
  kvarhoffpkunitelm.classList.remove("is-invalid", "is-valid");
  if (
    kvarhoffpkunitelm.value != "" &&
    !isNaN(kvarhoffpkbilledunitval) &&
    kvarhoffpkbilledunitval >= minOffPkUnit
  ) {
    console.log("valid single register or off-peak kvarh units to bill");
    kvarhoffpkunitelm.classList.add("is-valid");
  } else {
    console.log("invalid single register or off-peak kvarh units to bill");
    kvarhoffpkunitelm.classList.add("is-invalid");
  }

  // calculateDemandCharge();
}

///kvarh peak units to bill validation
var kvarhpkunitelm = document.getElementById("kvarhpkbilledunit");
kvarhpkunitelm.addEventListener("keyup", kvarhpkvalidateUnit);
kvarhpkunitelm.addEventListener("change", kvarhpkvalidateUnit);

function kvarhpkvalidateUnit() {
  if (kvarhpkunitelm.value == "") {
    kvarhpkunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let kvarhpkbilledunitval = Number(kvarhpkunitelm.value);
    // let isvalid = Number.isSafeInteger(kvarhpkbilledunit);
    kvarhpkunitelm.classList.remove("is-invalid", "is-valid");
    if (!isNaN(kvarhpkbilledunitval) && kvarhpkbilledunitval >= 0) {
      console.log("valid peak kvarh units to bill");
      kvarhpkunitelm.classList.add("is-valid");
    } else {
      console.log("invalid peak kvarh units to bill");
      kvarhpkunitelm.classList.add("is-invalid");
    }
  }

  // calculateDemandCharge();
}

//kw units to bill
var kwunitelm = document.getElementById("kwbilledunit");
kwunitelm.addEventListener("keyup", calculateDemandCharge);
kwunitelm.addEventListener("change", calculateDemandCharge);

function kwvalidateUnit() {
  let kwbilledunitval = Number(kwunitelm.value);
  // let isvalid = Number.isSafeInteger(kwbilledunit);
  kwunitelm.classList.remove("is-invalid", "is-valid");
  if (
    kwunitelm.value != "" &&
    !isNaN(kwbilledunitval) &&
    kwbilledunitval >= minMaxDemand
  ) {
    console.log("valid kw units to bill");
    kwunitelm.classList.add("is-valid");
    return kwbilledunitval;
  } else {
    console.log("invalid kw units to bill");
    kwunitelm.classList.add("is-invalid");
    return NaN;
  }

  // calculateDemandCharge();
}

///sanctioned load validation
var sloadelm = document.getElementById("sloadunit");
sloadelm.addEventListener("keyup", calculateDemandCharge);
sloadelm.addEventListener("change", calculateDemandCharge);

function validateSLoad() {
  let sload = parseFloat(sloadelm.value);
  let isvalid = Number.isSafeInteger(sload);
  sloadelm.classList.remove("is-invalid", "is-valid");
  if (isvalid && sload >= minSLoad) {
    console.log("valid sanction load");
    sloadelm.classList.add("is-valid");
    return sload;
  } else {
    console.log("invalid sanction load");
    sloadelm.classList.add("is-invalid");
    return NaN;
  }

  // calculateDemandCharge();
}

//kwhomf units to bill
var kwhomfelm = document.getElementById("kwhomf");
kwhomfelm.addEventListener("keyup", kwhomfvalidateUnit);
kwhomfelm.addEventListener("change", kwhomfvalidateUnit);

function kwhomfvalidateUnit() {
  let kwhomfelmval = Number(kwhomfelm.value);
  // let isvalid = Number.isSafeInteger(kwbilledunit);
  kwhomfelm.classList.remove("is-invalid", "is-valid");
  if (
    kkwhomfelm.value != "" &&
    !isNaN(kwhomfelmval) &&
    kwhomfelmval >= minOMF
  ) {
    console.log("valid omf units to bill");
    kwhomfelm.classList.add("is-valid");
  } else {
    console.log("invalid omf units to bill");
    kwhomfelm.classList.add("is-invalid");
  }

  // calculateDemandCharge();
}

//kvarhomf units to bill
var kvarhomfelm = document.getElementById("kvarhomf");
kvarhomfelm.addEventListener("keyup", kvarhomfvalidateUnit);
kvarhomfelm.addEventListener("change", kvarhomfvalidateUnit);

function kvarhomfvalidateUnit() {
  let kvarhomfelmval = Number(kvarhomfelm.value);
  // let isvalid = Number.isSafeInteger(kwbilledunit);
  kvarhomfelm.classList.remove("is-invalid", "is-valid");
  if (
    kvarhomfelm.value != "" &&
    !isNaN(kvarhomfelmval) &&
    kvarhomfelmval >= minOMF
  ) {
    console.log("valid kvarh omf units to bill");
    kvarhomfelm.classList.add("is-valid");
  } else {
    console.log("invalid kvarh omf units to bill");
    kvarhomfelm.classList.add("is-invalid");
  }

  // calculateDemandCharge();
}

//kwomf units to bill
var kwomfelm = document.getElementById("kwomf");
kwomfelm.addEventListener("keyup", calculateDemandCharge);
kwomfelm.addEventListener("change", calculateDemandCharge);

function kwomfvalidateUnit() {
  let kwomfelmval = Number(kwomfelm.value);
  // let isvalid = Number.isSafeInteger(kwbilledunit);
  kwomfelm.classList.remove("is-invalid", "is-valid");
  if (kwomfelm.value != "" && !isNaN(kwomfelmval) && kwomfelmval >= minOMF) {
    console.log("valid kw omf units to bill");
    kwomfelm.classList.add("is-valid");
    return kwomfelmval;
  } else {
    console.log("invalid kw omf units to bill");
    kwomfelm.classList.add("is-invalid");
    return NaN;
  }

  // calculateDemandCharge();
}

///first step - demand cost calculate section
function calculateDemandCharge() {
  //Demand Charge Calculation Section
  var demandCost = NaN;
  var maxDemand = kwvalidateUnit();
  var sLoad = validateSLoad();
  var kwomfval = kwomfvalidateUnit();

  if (!isNaN(maxDemand) && !isNaN(sLoad) && !isNaN(kwomfval)) {
    var cLoad = maxDemand * kwomfval;
    if (cLoad <= sLoad) {
      //regular demand charge
      demandcost = sLoad * demandCharge;
      document.getElementById("demandload").innerHTML =
        sLoad + " x " + demandCharge;
    } else {
      //panel demand charge
      demandcost = sLoad * demandCharge + (cLoad - sLoad) * 2 * demandCharge; ///two times panel demand charge
      document.getElementById("demandload").innerHTML =
        sLoad +
        " x " +
        demandCharge +
        "<span class='text-danger'> + " +
        (cLoad - sLoad) +
        " x 2 x " +
        demandCharge +
        "</span>";
    }

    document.getElementById("demandcost").innerHTML = demandcost.toFixed(2);
  } else {
    //invalid demand calculation
    console.log("invalid demand charge");
    document.getElementById("demandload").innerHTML = "<span class='text-danger'>-</span>";
    document.getElementById("demandcost").innerHTML =
      "<span class='text-danger'>-</span>";
  }

  ///updating the total bill amount
  // updatetotalbill(demandcost, energycost);
}

/*
///function to generate double register bill, given units to bill
function doubleregisterunitbill(offpkunit, pkunit) {
  let offpkenergycost = offpkunit * lt_t["offpkrate"];
  let pkenergycost = pkunit * lt_t["pkrate"];

  let energycost = offpkenergycost + pkenergycost;

  document.getElementById("offpkunit").innerHTML = offpkunit;
  document.getElementById("offpkbill").innerHTML = offpkenergycost.toFixed(2);
  document.getElementById("pkunit").innerHTML = pkunit;
  document.getElementById("pkbill").innerHTML = pkenergycost.toFixed(2);

  document.getElementById("srunit").innerHTML = "-";
  document.getElementById("srbill").innerHTML = "-";

  document.getElementById("energyunit").innerHTML = offpkunit + pkunit;
  document.getElementById("energycost").innerHTML = energycost.toFixed(2);

  return energycost;
}

///function to generate single register bill, given units to bill
function singleregisterunitbill(srunit) {
  let srenergycost = srunit * lt_t["srrate"];

  let energycost = srenergycost;

  document.getElementById("offpkunit").innerHTML = "-";
  document.getElementById("offpkbill").innerHTML = "-";
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
    document.getElementById("principal").innerHTML = "<span class='text-danger'>-</span>";
    document.getElementById("vat").innerHTML = "<span class='text-danger'>-</span>";
    document.getElementById("billtotal").innerHTML = "<span class='text-danger'>-</span>";
  }
}
*/
