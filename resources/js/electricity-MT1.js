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
  srpfcrate: 12.5,
  offpkpfcrate: 11.25,
  pkpfcrate: 15.62,
  srxfrate: 12.5,
  offpkxfrate: 11.25,
  pkxfrate: 15.62,
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
kwhoffpkunitelm.addEventListener("keyup", calculateDemandCharge);
kwhoffpkunitelm.addEventListener("change", calculateDemandCharge);

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
    return kwhoffpkbilledunitval;
  } else {
    console.log("invalid single register or off-peak units to bill");
    kwhoffpkunitelm.classList.add("is-invalid");
    return NaN;
  }

  // calculateDemandCharge();
}

///kWh peak units to bill validation
var kwhpkunitelm = document.getElementById("kwhpkbilledunit");
kwhpkunitelm.addEventListener("keyup", calculateDemandCharge);
kwhpkunitelm.addEventListener("change", calculateDemandCharge);

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
      return kwhpkbilledunitval;
    } else {
      console.log("invalid peak units to bill");
      kwhpkunitelm.classList.add("is-invalid");
      return NaN;
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
kwhomfelm.addEventListener("keyup", calculateDemandCharge);
kwhomfelm.addEventListener("change", calculateDemandCharge);

function kwhomfvalidateUnit() {
  let kwhomfelmval = Number(kwhomfelm.value);
  // let isvalid = Number.isSafeInteger(kwbilledunit);
  kwhomfelm.classList.remove("is-invalid", "is-valid");
  if (kwhomfelm.value != "" && !isNaN(kwhomfelmval) && kwhomfelmval >= minOMF) {
    console.log("valid omf units to bill");
    kwhomfelm.classList.add("is-valid");
    return kwhomfelmval;
  } else {
    console.log("invalid omf units to bill");
    kwhomfelm.classList.add("is-invalid");
    return NaN;
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

document
  .getElementById("ltside")
  .addEventListener("change", calculateDemandCharge);
document
  .getElementById("htside")
  .addEventListener("change", calculateDemandCharge);

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
    document.getElementById("demandload").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("demandcost").innerHTML =
      "<span class='text-danger'>-</span>";
  }

  var energycost = NaN;
  var energyunit = NaN;

  //calculating regular enercy unit and energy charge
  var offpkunit = kwhoffpkvalidateUnit();
  var pkunit = kwhpkvalidateUnit();
  var kwhomfval = kwhomfvalidateUnit();
  if (!isNaN(offpkunit) && !isNaN(pkunit) && !isNaN(kwhomfval)) {
    var finaloffpkunit = offpkunit * kwhomfval;
    var finaloffpkcost = finaloffpkunit * mt_1["offpkrate"];
    var finalpkunit = pkunit * kwhomfval;
    var finalpkcost = finalpkunit * mt_1["pkrate"];
    //double register meter
    document.getElementById("srunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("srbill").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("offpkunit").innerHTML = finaloffpkunit.toFixed(2);
    document.getElementById("offpkbill").innerHTML = finaloffpkcost.toFixed(2);
    document.getElementById("pkunit").innerHTML = finalpkunit.toFixed(2);
    document.getElementById("pkbill").innerHTML = finalpkcost.toFixed(2);

    if (isNaN(energyunit)) {
      energyunit = finaloffpkunit + finalpkunit;
      energycost = finaloffpkcost + finalpkcost;
    } else {
      energyunit += finaloffpkunit + finalpkunit;
      energycost += finaloffpkcost + finalpkcost;
    }

    //transformer loss consideration
    if (document.getElementById("ltside").checked) {
      //consider transformer loss
      var finalxfoffpkunit = Math.ceil(offpkunit * kwhomfval * 0.025);
      var finalxfoffpkcost = finalxfoffpkunit * mt_1["offpkrate"];
      var finalxfpkunit = Math.ceil(pkunit * kwhomfval * 0.025);
      var finalxfpkcost = finalxfpkunit * mt_1["pkrate"];
      
      document.getElementById("srxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("srxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkxfunit").innerHTML =
        finalxfoffpkunit.toFixed(2);
      document.getElementById("offpkxfbill").innerHTML =
        finalxfoffpkcost.toFixed(2);
      document.getElementById("pkxfunit").innerHTML = finalxfpkunit.toFixed(2);
      document.getElementById("pkxfbill").innerHTML = finalxfpkcost.toFixed(2);

      if (isNaN(energyunit)) {
        energyunit = finalxfoffpkunit + finalxfpkunit;
        energycost = finalxfoffpkcost + finalxfpkcost;
      } else {
        energyunit += finalxfoffpkunit + finalxfpkunit;
        energycost += finalxfoffpkcost + finalxfpkcost;
      }
    } else {
      //double register meter
      document.getElementById("srxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("srxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
    }
  } else if (!isNaN(kwhomfval) && !isNaN(offpkunit)) {
    var finalsrunit = offpkunit * kwhomfval;
    var finalsrcost = finalsrunit * mt_1["srrate"];
    //single register meter
    document.getElementById("srunit").innerHTML = finalsrunit.toFixed(2);
    document.getElementById("srbill").innerHTML = finalsrcost.toFixed(2);
    document.getElementById("offpkunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("offpkbill").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("pkunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("pkbill").innerHTML =
      "<span class='text-danger'>-</span>";

    if (isNaN(energyunit)) {
      energyunit = finalsrunit;
      energycost = finalsrcost;
    } else {
      energyunit += finalsrunit;
      energycost += finalsrcost;
    }

    //transformer loss consideration
    if (document.getElementById("ltside").checked) {
      //consider transformer loss
      var finalxfsrunit = Math.ceil(offpkunit * kwhomfval * 0.025);
      var finalxfsrcost = finalxfsrunit * mt_1["srrate"];
      
      document.getElementById("srxfunit").innerHTML = finalxfsrunit.toFixed(2);
      document.getElementById("srxfbill").innerHTML = finalxfsrcost.toFixed(2);
      document.getElementById("offpkxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkxfunit").innerHTML = "<span class='text-danger'>-</span>";
      document.getElementById("pkxfbill").innerHTML = "<span class='text-danger'>-</span>";

      if (isNaN(energyunit)) {
        energyunit = finalxfsrunit;
        energycost = finalxfsrcost;
      } else {
        energyunit += finalxfsrunit;
        energycost += finalxfsrcost;
      }
    } else {
      //double register meter
      document.getElementById("srxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("srxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
    }
  } else {
    document.getElementById("srunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("srbill").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("offpkunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("offpkbill").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("pkunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("pkbill").innerHTML =
      "<span class='text-danger'>-</span>";
  }

  ///updating the total bill amount
  // updatetotalbill(demandcost, energycost);
}

/*
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
