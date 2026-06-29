/*
Title: electricity
Author: Mohammad Imam Hossain
Update Date: 03/06/2026
All rights reserved
*/

///energy rate update section
var mt_7 = {
  srrate: 22.56,
  offpkrate: 22.56,
  pkrate: 22.56,
  srxfrate: 22.56,
  offpkxfrate: 22.56,
  pkxfrate: 22.56,
};

var demandCharge = 120; ///per kW for MT-6
var minSLoad = 0;
var minOMF = 1;
var minMaxDemand = 0;
var minOffPkUnit = 0;
var minXfCap = 1;
var minXfDays = 1;
var maxXfDays = 31;
var minChildUnit = 1;
var lowxfrent = 2.5;
var highxfrent = 5;
var minXFLoss = 0;

///initializing all the fields
initializeFields();

function initializeFields() {
  loadMT6Rates();

  document.getElementById("kwhomf").value = minOMF;
  document.getElementById("kwhoffpkbilledunit").value = minOffPkUnit;
  document.getElementById("kwhpkbilledunit").value = "";

  document.getElementById("kvarhomf").value = minOMF;
  document.getElementById("kvarhoffpkbilledunit").value = minOffPkUnit;
  document.getElementById("kvarhpkbilledunit").value = "";

  document.getElementById("kwomf").value = minOMF;
  document.getElementById("kwbilledunit").value = minMaxDemand;
  document.getElementById("sloadunit").value = minSLoad;
}

///client side energy rate show section
function loadMT6Rates() {
  for (let key in mt_7) {
    document.getElementById(key).innerHTML = mt_7[key].toFixed(2); ///upto 2 decimal places
  }
}

///kWh single register or off-peak units to bill validation
var kwhoffpkunitelm = document.getElementById("kwhoffpkbilledunit");
kwhoffpkunitelm.addEventListener("keyup", generateBill);
kwhoffpkunitelm.addEventListener("change", generateBill);

function validatekWhOffpkUnit() {
  let kwhoffpkbilledunitval = Number(kwhoffpkunitelm.value);
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

  return NaN;
}

///kWh peak units to bill validation
var kwhpkunitelm = document.getElementById("kwhpkbilledunit");
kwhpkunitelm.addEventListener("keyup", generateBill);
kwhpkunitelm.addEventListener("change", generateBill);

function validatekWhPkUnit() {
  if (kwhpkunitelm.value == "") {
    //empty value is allowed
    kwhpkunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let kwhpkbilledunitval = Number(kwhpkunitelm.value);
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

  return NaN;
}

//kvarh single register or off-peak units to bill
var kvarhoffpkunitelm = document.getElementById("kvarhoffpkbilledunit");
kvarhoffpkunitelm.addEventListener("keyup", generateBill);
kvarhoffpkunitelm.addEventListener("change", generateBill);

function validatekVArhOffpkUnit() {
  let kvarhoffpkbilledunitval = Number(kvarhoffpkunitelm.value);
  kvarhoffpkunitelm.classList.remove("is-invalid", "is-valid");
  if (
    kvarhoffpkunitelm.value != "" &&
    !isNaN(kvarhoffpkbilledunitval) &&
    kvarhoffpkbilledunitval >= minOffPkUnit
  ) {
    console.log("valid single register or off-peak kvarh units to bill");
    kvarhoffpkunitelm.classList.add("is-valid");
    return kvarhoffpkbilledunitval;
  } else {
    console.log("invalid single register or off-peak kvarh units to bill");
    kvarhoffpkunitelm.classList.add("is-invalid");
    return NaN;
  }

  return NaN;
}

///kvarh peak units to bill validation
var kvarhpkunitelm = document.getElementById("kvarhpkbilledunit");
kvarhpkunitelm.addEventListener("keyup", generateBill);
kvarhpkunitelm.addEventListener("change", generateBill);

function validatekVArhPkUnit() {
  if (kvarhpkunitelm.value == "") {
    //empty value is allowed
    kvarhpkunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let kvarhpkbilledunitval = Number(kvarhpkunitelm.value);
    kvarhpkunitelm.classList.remove("is-invalid", "is-valid");
    if (!isNaN(kvarhpkbilledunitval) && kvarhpkbilledunitval >= 0) {
      console.log("valid peak kvarh units to bill");
      kvarhpkunitelm.classList.add("is-valid");
      return kvarhpkbilledunitval;
    } else {
      console.log("invalid peak kvarh units to bill");
      kvarhpkunitelm.classList.add("is-invalid");
      return NaN;
    }
  }

  return NaN;
}

//kw units to bill validation
var kwunitelm = document.getElementById("kwbilledunit");
kwunitelm.addEventListener("keyup", generateBill);
kwunitelm.addEventListener("change", generateBill);

function validatekWUnit() {
  let kwbilledunitval = Number(kwunitelm.value);
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

  return NaN;
}

///sanctioned load validation
var sloadelm = document.getElementById("sloadunit");
sloadelm.addEventListener("keyup", generateBill);
sloadelm.addEventListener("change", generateBill);

function validateSLoad() {
  let sload = parseFloat(sloadelm.value);
  let isvalid = Number.isSafeInteger(sload); //must be an integer
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

  return NaN;
}

//kwhomf units to bill validation
var kwhomfelm = document.getElementById("kwhomf");
kwhomfelm.addEventListener("keyup", generateBill);
kwhomfelm.addEventListener("change", generateBill);

function validatekWhOMFUnit() {
  let kwhomfelmval = Number(kwhomfelm.value);
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

  return NaN;
}

//kvarhomf units to bill validation
var kvarhomfelm = document.getElementById("kvarhomf");
kvarhomfelm.addEventListener("keyup", generateBill);
kvarhomfelm.addEventListener("change", generateBill);

function validatekVArhOMFUnit() {
  let kvarhomfelmval = Number(kvarhomfelm.value);
  kvarhomfelm.classList.remove("is-invalid", "is-valid");
  if (
    kvarhomfelm.value != "" &&
    !isNaN(kvarhomfelmval) &&
    kvarhomfelmval >= minOMF
  ) {
    console.log("valid kvarh omf units to bill");
    kvarhomfelm.classList.add("is-valid");
    return kvarhomfelmval;
  } else {
    console.log("invalid kvarh omf units to bill");
    kvarhomfelm.classList.add("is-invalid");
    return NaN;
  }

  return NaN;
}

//kwomf units to bill
var kwomfelm = document.getElementById("kwomf");
kwomfelm.addEventListener("keyup", generateBill);
kwomfelm.addEventListener("change", generateBill);

function validatekWOMFUnit() {
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

  return NaN;
}

//xfcap validadtion
var xfcapelm = document.getElementById("xfcap");
xfcapelm.addEventListener("keyup", generateBill);
xfcapelm.addEventListener("change", generateBill);

function validateXfCap() {
  let xfcapelmval = Number(xfcapelm.value);
  xfcapelm.classList.remove("is-invalid", "is-valid");
  if (xfcapelm.value == "") {
    //empty value is allowed
    xfcapelm.classList.remove("is-invalid", "is-valid");
  } else if (!isNaN(xfcapelmval) && xfcapelmval >= minXfCap) {
    console.log("valid xf capacity");
    xfcapelm.classList.add("is-valid");
    return xfcapelmval;
  } else {
    console.log("invalid xf capcacity");
    xfcapelm.classList.add("is-invalid");
    return NaN;
  }

  return NaN;
}

//xfdays validadtion
var xfdayselm = document.getElementById("xfdays");
xfdayselm.addEventListener("keyup", generateBill);
xfdayselm.addEventListener("change", generateBill);

function validateXfDays() {
  let xfdayselmval = Number(xfdayselm.value);
  xfdayselm.classList.remove("is-invalid", "is-valid");
  if (xfdayselm.value == "") {
    //empty value is allowed
    xfdayselm.classList.remove("is-invalid", "is-valid");
  } else if (
    !isNaN(xfdayselmval) &&
    xfdayselmval >= minXfDays &&
    xfdayselmval <= maxXfDays
  ) {
    console.log("valid xf days");
    xfdayselm.classList.add("is-valid");
    return xfdayselmval;
  } else {
    console.log("invalid xf days");
    xfdayselm.classList.add("is-invalid");
    return NaN;
  }

  return NaN;
}

//childunit validadtion
var childunitelm = document.getElementById("childunit");
childunitelm.addEventListener("keyup", generateBill);
childunitelm.addEventListener("change", generateBill);

function validateChildUnit() {
  let childunitelmval = Number(childunitelm.value);
  childunitelm.classList.remove("is-invalid", "is-valid");
  if (childunitelm.value == "") {
    //empty value is allowed
    childunitelm.classList.remove("is-invalid", "is-valid");
  } else if (!isNaN(childunitelmval) && childunitelmval >= minChildUnit) {
    console.log("valid child unit");
    childunitelm.classList.add("is-valid");
    return childunitelmval;
  } else {
    console.log("invalid child unit");
    childunitelm.classList.add("is-invalid");
    return NaN;
  }

  return NaN;
}

//transformer loss validadtion
var xflosselm = document.getElementById("xfloss");
xflosselm.addEventListener("keyup", generateBill);
xflosselm.addEventListener("change", generateBill);

function validateXFLoss() {
  let xflosselmval = Number(xflosselm.value);
  xflosselm.classList.remove("is-invalid", "is-valid");
  if (xflosselm.value == "") {
    //empty value is allowed
    xflosselm.classList.remove("is-invalid", "is-valid");
  } else if (!isNaN(xflosselmval) && xflosselmval > minXFLoss) {
    console.log("valid xf loss");
    xflosselm.classList.add("is-valid");
    return xflosselmval;
  } else {
    console.log("invalid xf loss");
    xflosselm.classList.add("is-invalid");
    return NaN;
  }

  return NaN;
}

//xfrate validadtion
var xfrateelm = document.getElementById("xfrate");
xfrateelm.addEventListener("keyup", generateBill);
xfrateelm.addEventListener("change", generateBill);

function validateXfRate() {
  var xfrateelmval = xfrateelm.value;
  xfrateelm.classList.remove("is-invalid", "is-valid");
  if (
    xfrateelm.value != "" &&
    (xfrateelmval == "lowrate" || xfrateelmval == "highrate")
  ) {
    console.log("valid xf rate");
    xfrateelm.classList.add("is-valid");
    if (xfrateelmval == "lowrate") return lowxfrent;
    else return highxfrent;
  } else {
    console.log("invalid xf rate");
    xfrateelm.classList.add("is-invalid");
    return NaN;
  }

  return NaN;
}

//function for calculating the power factor value
function calcPF(offpkunit, pkunit) {
  var kvarhomfval = validatekVArhOMFUnit();
  var kvarhoffpkval = validatekVArhOffpkUnit();
  var kvarhpkval = validatekVArhPkUnit();

  if (!isNaN(kvarhomfval) && !isNaN(kvarhoffpkval) && !isNaN(kvarhpkval)) {
    //double register kvarh
    var totalkvarhunit = (kvarhoffpkval + kvarhpkval) * kvarhomfval;
    var taninverse = Math.atan((totalkvarhunit * 1.0) / (offpkunit + pkunit));
    var pf = Math.cos(taninverse);
    return pf.toFixed(2);
  } else if (!isNaN(kvarhomfval) && !isNaN(kvarhoffpkval)) {
    //single register kvarh
    var totalkvarhunit = kvarhoffpkval * kvarhomfval;
    var taninverse = Math.atan(totalkvarhunit / (offpkunit + pkunit));
    var pf = Math.cos(taninverse);
    return pf.toFixed(2);
  }

  return NaN;
}

//Bill generation section
function generateBill() {
  //Demand Charge Calculation Section
  var demandcost = NaN;
  var kwomfval = validatekWOMFUnit();
  var maxDemand = validatekWUnit();
  var sLoad = validateSLoad();

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

  //calculating regular energy unit and energy charge
  var kwhomfval = validatekWhOMFUnit();
  var offpkunit = validatekWhOffpkUnit();
  var pkunit = validatekWhPkUnit();
  if (!isNaN(offpkunit) && !isNaN(pkunit) && !isNaN(kwhomfval)) {
    //double register meter
    var energyoffpkunit = 0;
    var energypkunit = 0;
    var energyoffpkcost = 0;
    var energypkcost = 0;

    var finaloffpkunit = offpkunit * kwhomfval;
    var finaloffpkcost = finaloffpkunit * mt_7["offpkrate"];
    var finalpkunit = pkunit * kwhomfval;
    var finalpkcost = finalpkunit * mt_7["pkrate"];

    document.getElementById("srunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("srbill").innerHTML =
      "<span class='text-danger'>-</span>";
    //child unit section
    var childunit = validateChildUnit();
    var childunitoffpk = NaN;
    var childunitpk = NaN;
    var childunitoffpkcost = NaN;
    var childunitpkcost = NaN;
    if (!isNaN(childunit)) {
      //valid child unit found, distributing based on the off pk and pk unit ratio
      childunitoffpk = Math.round(
        (finaloffpkunit * childunit) / (finaloffpkunit + finalpkunit),
      );
      childunitoffpk = Math.min(childunitoffpk, finaloffpkunit); //child unit can't be more than the mother meter unit
      childunitoffpkcost = childunitoffpk * mt_7["offpkrate"];
      childunitpk = Math.round(
        (finalpkunit * childunit) / (finaloffpkunit + finalpkunit),
      );
      childunitpk = Math.min(childunitpk, finalpkunit);
      childunitpkcost = childunitpk * mt_7["pkrate"];

      document.getElementById("offpkunit").innerHTML =
        finaloffpkunit.toFixed(2) +
        " - " +
        childunitoffpk.toFixed(2) +
        " = " +
        (finaloffpkunit - childunitoffpk).toFixed(2);
      document.getElementById("offpkbill").innerHTML = (
        finaloffpkcost - childunitoffpkcost
      ).toFixed(2);
      document.getElementById("pkunit").innerHTML =
        finalpkunit.toFixed(2) +
        " - " +
        childunitpk.toFixed(2) +
        " = " +
        (finalpkunit - childunitpk).toFixed(2);
      document.getElementById("pkbill").innerHTML = (
        finalpkcost - childunitpkcost
      ).toFixed(2);

      energyoffpkunit += finaloffpkunit - childunitoffpk;
      energypkunit += finalpkunit - childunitpk;
      energyoffpkcost += finaloffpkcost - childunitoffpkcost;
      energypkcost += finalpkcost - childunitpkcost;
    } else {
      //no valid child unit
      document.getElementById("offpkunit").innerHTML =
        finaloffpkunit.toFixed(2);
      document.getElementById("offpkbill").innerHTML =
        finaloffpkcost.toFixed(2);
      document.getElementById("pkunit").innerHTML = finalpkunit.toFixed(2);
      document.getElementById("pkbill").innerHTML = finalpkcost.toFixed(2);

      energyoffpkunit += finaloffpkunit;
      energypkunit += finalpkunit;
      energyoffpkcost += finaloffpkcost;
      energypkcost += finalpkcost;
    }

    var xflosspercentage = validateXFLoss();
    if (!isNaN(xflosspercentage) && xflosspercentage > minXFLoss) {
      var finalxfoffpkunit = finaloffpkunit * xflosspercentage * 0.01;
      var finalxfoffpkcost = finalxfoffpkunit * mt_7["offpkrate"];
      var finalxfpkunit = finalpkunit * xflosspercentage * 0.01;
      var finalxfpkcost = finalxfpkunit * mt_7["pkrate"];

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

      energyoffpkunit += finalxfoffpkunit;
      energypkunit += finalxfpkunit;
      energyoffpkcost += finalxfoffpkcost;
      energypkcost += finalxfpkcost;
    } else {
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

    //power factor correction section
    var calculatedPF = calcPF(finaloffpkunit, finalpkunit);
    if (!isNaN(calculatedPF)) {
      console.log("valid pf value: " + calculatedPF);
      document.getElementById("srpfval").innerHTML = calculatedPF;
      document.getElementById("offpkpfval").innerHTML = calculatedPF;
      document.getElementById("pkpfval").innerHTML = calculatedPF;

      if (calculatedPF > 0.0 && calculatedPF < 0.95) {
        //pfc unit calculation, considering transformer loss if any
        var requiredoffpkunit = (energyoffpkunit * 0.95) / calculatedPF;
        var finalpfcoffpkunit = requiredoffpkunit - energyoffpkunit;
        document.getElementById("offpkpfcunit").innerHTML =
          finalpfcoffpkunit.toFixed(2);

        var requiredpkunit = (energypkunit * 0.95) / calculatedPF;
        var finalpfcpkunit = requiredpkunit - energypkunit;
        document.getElementById("pkpfcunit").innerHTML =
          finalpfcpkunit.toFixed(2);

        energyoffpkunit += finalpfcoffpkunit;
        energypkunit += finalpfcpkunit;
        document.getElementById("srpfcunit").innerHTML =
          "<span class='text-danger'>-</span>";

        //pfc charge calculation, range between 0.75 to 0.95
        calculatedPF = Math.min(Math.max(0.75, calculatedPF), 0.95); // in between 0.75 and 0.95
        var correction = (0.95 - calculatedPF) * 100; //0.75 percent of this difference

        //only considers the offpk and pk energy charges
        var finalpfcoffpkcost =
          (finaloffpkcost -
            (isNaN(childunitoffpkcost) ? 0 : childunitoffpkcost)) *
          correction *
          0.0075;
        var finalpfcpkcost =
          (finalpkcost - (isNaN(childunitpkcost) ? 0 : childunitpkcost)) *
          correction *
          0.0075;
        document.getElementById("srpfcbill").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("offpkpfcbill").innerHTML =
          finalpfcoffpkcost.toFixed(2);
        document.getElementById("pkpfcbill").innerHTML =
          finalpfcpkcost.toFixed(2);

        energyoffpkcost += finalpfcoffpkcost;
        energypkcost += finalpfcpkcost;
      } else {
        document.getElementById("srpfcunit").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("offpkpfcunit").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("pkpfcunit").innerHTML =
          "<span class='text-danger'>-</span>";

        document.getElementById("srpfcbill").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("offpkpfcbill").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("pkpfcbill").innerHTML =
          "<span class='text-danger'>-</span>";
      }
    } else {
      document.getElementById("srpfval").innerHTML = "#.##";
      document.getElementById("offpkpfval").innerHTML = "#.##";
      document.getElementById("pkpfval").innerHTML = "#.##";

      document.getElementById("srpfcunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkpfcunit").innerHTML =
        "<span class='text-danger'>-</span>";

      document.getElementById("srpfcbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkpfcbill").innerHTML =
        "<span class='text-danger'>-</span>";
    }

    if (isNaN(energyunit)) {
      energyunit = energyoffpkunit + energypkunit;
      energycost = energyoffpkcost + energypkcost;
    } else {
      energyunit += energyoffpkunit + energypkunit;
      energycost += energyoffpkcost + energypkcost;
    }
  } else if (!isNaN(kwhomfval) && !isNaN(offpkunit)) {
    //single register meter
    var energysrunit = 0;
    var energysrcost = 0;

    var finalsrunit = offpkunit * kwhomfval;
    var finalsrcost = finalsrunit * mt_7["srrate"];

    document.getElementById("offpkunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("offpkbill").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("pkunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("pkbill").innerHTML =
      "<span class='text-danger'>-</span>";
    //child unit section
    var childunit = validateChildUnit();
    var childunitsr = NaN;
    var childunitsrcost = NaN;
    if (!isNaN(childunit)) {
      //valid child unit found
      childunitsr = Math.min(childunit, finalsrunit); //child unit can't be more than the mother meter unit
      childunitsrcost = childunitsr * mt_7["srrate"];

      document.getElementById("srunit").innerHTML =
        finalsrunit.toFixed(2) +
        " - " +
        childunitsr.toFixed(2) +
        " = " +
        (finalsrunit - childunitsr).toFixed(2);
      document.getElementById("srbill").innerHTML = (
        finalsrcost - childunitsrcost
      ).toFixed(2);

      energysrunit += finalsrunit - childunitsr;
      energysrcost += finalsrcost - childunitsrcost;
    } else {
      document.getElementById("srunit").innerHTML = finalsrunit.toFixed(2);
      document.getElementById("srbill").innerHTML = finalsrcost.toFixed(2);

      energysrunit = finalsrunit;
      energysrcost = finalsrcost;
    }

    //transformer loss section
    var xflosspercentage = validateXFLoss();
    if (!isNaN(xflosspercentage) && xflosspercentage > minXFLoss) {
      var finalxfsrunit = finalsrunit * xflosspercentage * 0.01;
      var finalxfsrcost = finalxfsrunit * mt_7["srrate"];

      document.getElementById("srxfunit").innerHTML = finalxfsrunit.toFixed(2);
      document.getElementById("srxfbill").innerHTML = finalxfsrcost.toFixed(2);
      document.getElementById("offpkxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkxfbill").innerHTML =
        "<span class='text-danger'>-</span>";

      energysrunit += finalxfsrunit;
      energysrcost += finalxfsrcost;
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

    //power factor correction section
    var calculatedPF = calcPF(finalsrunit, 0);
    if (!isNaN(calculatedPF)) {
      console.log("valid pf value: " + calculatedPF);
      document.getElementById("srpfval").innerHTML = calculatedPF;
      document.getElementById("offpkpfval").innerHTML = calculatedPF;
      document.getElementById("pkpfval").innerHTML = calculatedPF;

      if (calculatedPF > 0.0 && calculatedPF < 0.95) {
        //pfc unit calculation, considering transformer loss unit if any
        var standardsrunit = (energysrunit * 0.95) / calculatedPF;
        var finalpfcsrunit = standardsrunit - energysrunit;
        document.getElementById("srpfcunit").innerHTML =
          finalpfcsrunit.toFixed(2);

        energysrunit += finalpfcsrunit;
        document.getElementById("offpkpfcunit").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("pkpfcunit").innerHTML =
          "<span class='text-danger'>-</span>";

        //pfc charge calculation, range between 0.75 to 0.95
        calculatedPF = Math.min(Math.max(0.75, calculatedPF), 0.95); // in between 0.75 and 0.95
        var correction = (0.95 - calculatedPF) * 100; //0.75 percent of this difference

        //only considers the sr unit energy costs
        var finalpfcsrcost =
          (finalsrcost - (isNaN(childunitsrcost) ? 0 : childunitsrcost)) *
          correction *
          0.0075;
        document.getElementById("srpfcbill").innerHTML =
          finalpfcsrcost.toFixed(2);
        document.getElementById("offpkpfcbill").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("pkpfcbill").innerHTML =
          "<span class='text-danger'>-</span>";

        energysrcost += finalpfcsrcost;
      } else {
        document.getElementById("srpfcunit").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("offpkpfcunit").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("pkpfcunit").innerHTML =
          "<span class='text-danger'>-</span>";

        document.getElementById("srpfcbill").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("offpkpfcbill").innerHTML =
          "<span class='text-danger'>-</span>";
        document.getElementById("pkpfcbill").innerHTML =
          "<span class='text-danger'>-</span>";
      }
    } else {
      document.getElementById("srpfval").innerHTML = "#.##";
      document.getElementById("offpkpfval").innerHTML = "#.##";
      document.getElementById("pkpfval").innerHTML = "#.##";

      document.getElementById("srpfcunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkpfcunit").innerHTML =
        "<span class='text-danger'>-</span>";

      document.getElementById("srpfcbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkpfcbill").innerHTML =
        "<span class='text-danger'>-</span>";
    }

    if (isNaN(energyunit)) {
      energyunit = energysrunit;
      energycost = energysrcost;
    } else {
      energyunit += energysrunit;
      energycost += energysrcost;
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

    document.getElementById("srpfcunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("srpfcbill").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("offpkpfcunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("offpkpfcbill").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("pkpfcunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("pkpfcbill").innerHTML =
      "<span class='text-danger'>-</span>";

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

  //total energy unit and energy cost placement
  if (!isNaN(energyunit) && !isNaN(energycost)) {
    document.getElementById("energyunit").innerHTML = energyunit.toFixed(2);
    document.getElementById("energycost").innerHTML = energycost.toFixed(2);
  } else {
    document.getElementById("energyunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("energycost").innerHTML =
      "<span class='text-danger'>-</span>";
  }

  //transformer rent calculation
  var xfRentCost = NaN;
  var xfcapval = validateXfCap();
  var xfdaysval = validateXfDays();
  var xfrateval = validateXfRate();
  if (!isNaN(xfcapval) && !isNaN(xfdaysval) && !isNaN(xfrateval)) {
    var xfRentCost = xfcapval * xfrateval * xfdaysval;
    document.getElementById("xfrentrate").innerHTML =
      xfrateval + " x " + xfcapval + " x " + xfdaysval;
    document.getElementById("xfrentcost").innerHTML = xfRentCost.toFixed(2);
  } else {
    document.getElementById("xfrentrate").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("xfrentcost").innerHTML =
      "<span class='text-danger'>-</span>";
  }

  ///updating the total bill amount
  updateTotalBill(demandcost, energycost, xfRentCost);
}

///principal bill, vat and total bill update
function updateTotalBill(demandcost, energycost, xfrentcost) {
  console.log(
    "energycost = " +
      energycost +
      " , demandcost = " +
      demandcost +
      " , xfrentcost = " +
      xfrentcost,
  );

  if (!isNaN(energycost) && !isNaN(demandcost)) {
    //xfrentcost is optional
    let principal = energycost + demandcost;
    if (!isNaN(xfrentcost)) principal += xfrentcost;
    let vat = principal * 0.05;
    let billtotal = principal + vat;

    document.getElementById("principal").innerHTML = principal.toFixed(2);
    document.getElementById("vat").innerHTML = vat.toFixed(2);
    document.getElementById("billtotal").innerHTML = billtotal.toFixed(2);
  } else {
    console.log("invalid evergycost or demandcost");
    document.getElementById("principal").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("vat").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("billtotal").innerHTML =
      "<span class='text-danger'>-</span>";
  }
}
