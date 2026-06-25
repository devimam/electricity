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
  srxfrate: 12.5,
  offpkxfrate: 11.25,
  pkxfrate: 15.62,
};

var demandCharge = 90; ///per kW for MT-1
var minSLoad = 0;
var minOMF = 1;
var minMaxDemand = 0;
var minOffPkUnit = 0;
var minXfCap=1;
var minXfDays=1;
var maxXfDays=31;

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

function validatekWhOffpkUnit() {
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

function validatekWhPkUnit() {
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
kvarhoffpkunitelm.addEventListener("keyup", calculateDemandCharge);
kvarhoffpkunitelm.addEventListener("change", calculateDemandCharge);

function validatekVArhOffpkUnit() {
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
    return kvarhoffpkbilledunitval;
  } else {
    console.log("invalid single register or off-peak kvarh units to bill");
    kvarhoffpkunitelm.classList.add("is-invalid");
    return NaN;
  }

  // calculateDemandCharge();
}

///kvarh peak units to bill validation
var kvarhpkunitelm = document.getElementById("kvarhpkbilledunit");
kvarhpkunitelm.addEventListener("keyup", calculateDemandCharge);
kvarhpkunitelm.addEventListener("change", calculateDemandCharge);

function validatekVArhPkUnit() {
  if (kvarhpkunitelm.value == "") {
    kvarhpkunitelm.classList.remove("is-invalid", "is-valid");
  } else {
    let kvarhpkbilledunitval = Number(kvarhpkunitelm.value);
    // let isvalid = Number.isSafeInteger(kvarhpkbilledunit);
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

  // calculateDemandCharge();
}

//kw units to bill
var kwunitelm = document.getElementById("kwbilledunit");
kwunitelm.addEventListener("keyup", calculateDemandCharge);
kwunitelm.addEventListener("change", calculateDemandCharge);

function validatekWUnit() {
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

function validatekWhOMFUnit() {
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
kvarhomfelm.addEventListener("keyup", calculateDemandCharge);
kvarhomfelm.addEventListener("change", calculateDemandCharge);

function validatekVArhOMFUnit() {
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
    return kvarhomfelmval;
  } else {
    console.log("invalid kvarh omf units to bill");
    kvarhomfelm.classList.add("is-invalid");
    return NaN;
  }

  // calculateDemandCharge();
}

//kwomf units to bill
var kwomfelm = document.getElementById("kwomf");
kwomfelm.addEventListener("keyup", calculateDemandCharge);
kwomfelm.addEventListener("change", calculateDemandCharge);

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

  // calculateDemandCharge();
}

//xfcap validadtion
var xfcapelm = document.getElementById("xfcap");
xfcapelm.addEventListener("keyup", calculateDemandCharge);
xfcapelm.addEventListener("change", calculateDemandCharge);

function validateXfCap() {
  let xfcapelmval = Number(xfcapelm.value);
  xfcapelm.classList.remove("is-invalid", "is-valid");
  if(xfcapelm.value==""){
    xfcapelm.classList.remove("is-invalid", "is-valid");
  }
  else if (!isNaN(xfcapelmval) && xfcapelmval >= minXfCap) {
    console.log("valid xf capacity");
    xfcapelm.classList.add("is-valid");
    return xfcapelmval;
  } else {
    console.log("invalid xf capcacity");
    xfcapelm.classList.add("is-invalid");
    return NaN;
  }

  // calculateDemandCharge();
}

//xfdays validadtion
var xfdayselm = document.getElementById("xfdays");
xfdayselm.addEventListener("keyup", calculateDemandCharge);
xfdayselm.addEventListener("change", calculateDemandCharge);

function validateXfDays() {
  let xfdayselmval = Number(xfdayselm.value);
  xfdayselm.classList.remove("is-invalid", "is-valid");
  if(xfdayselm.value==""){
    xfdayselm.classList.remove("is-invalid", "is-valid");
  }
  else if (!isNaN(xfdayselmval) && xfdayselmval >= minXfDays && xfdayselmval<=maxXfDays) {
    console.log("valid xf days");
    xfdayselm.classList.add("is-valid");
    return xfdayselmval;
  } else {
    console.log("invalid xf days");
    xfdayselm.classList.add("is-invalid");
    return NaN;
  }

  // calculateDemandCharge();
}

//xfrate validadtion
var xfrateelm = document.getElementById("xfrate");
xfrateelm.addEventListener("keyup", calculateDemandCharge);
xfrateelm.addEventListener("change", calculateDemandCharge);

function validateXfRate() {
  var xfrateelmval=xfrateelm.value;
  xfrateelm.classList.remove("is-invalid", "is-valid");
  if (xfrateelm.value!="" && (xfrateelmval == "lowrate" || xfrateelmval == "highrate")) {
    console.log("valid xf rate");
    xfrateelm.classList.add("is-valid");
    if(xfrateelmval=="lowrate") return 2.5;
    else return 5;
  } else {
    console.log("invalid xf rate");
    xfrateelm.classList.add("is-invalid");
    return NaN;
  }

  // calculateDemandCharge();
}

//function for calculating pf value
function calcPF(offpkunit, pkunit){
  var kvarhomfval=validatekVArhOMFUnit();
  var kvarhoffpkval=validatekVArhOffpkUnit();
  var kvarhpkval=validatekVArhPkUnit();

  if(!isNaN(kvarhomfval) && !isNaN(kvarhoffpkval) && !isNaN(kvarhpkval)){
    //double register kvarh
    var totalkvarhunit=(kvarhoffpkval+kvarhpkval)*kvarhomfval;
    var taninverse=Math.atan(totalkvarhunit*1.0/(offpkunit+pkunit));
    var pf=Math.cos(taninverse);
    return pf.toFixed(2);
  }
  else if(!isNaN(kvarhomfval) && !isNaN(kvarhoffpkval)){
    //single register kvarh
    var totalkvarhunit=kvarhoffpkval*kvarhomfval;
    var taninverse=Math.atan(totalkvarhunit/(offpkunit+pkunit));
    var pf=Math.cos(taninverse);
    return pf.toFixed(2);
  }
  else{
    return NaN;
  }
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
  var demandcost = NaN;
  var maxDemand = validatekWUnit();
  var sLoad = validateSLoad();
  var kwomfval = validatekWOMFUnit();

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
  var offpkunit = validatekWhOffpkUnit();
  var pkunit = validatekWhPkUnit();
  var kwhomfval = validatekWhOMFUnit();
  if (!isNaN(offpkunit) && !isNaN(pkunit) && !isNaN(kwhomfval)) {
    //double register meter
    var energyoffpkunit=0;
    var energypkunit=0;
    var energyoffpkcost=0;
    var energypkcost=0;

    var finaloffpkunit = offpkunit * kwhomfval;
    var finaloffpkcost = finaloffpkunit * mt_1["offpkrate"];
    var finalpkunit = pkunit * kwhomfval;
    var finalpkcost = finalpkunit * mt_1["pkrate"];

    document.getElementById("srunit").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("srbill").innerHTML =
      "<span class='text-danger'>-</span>";
    document.getElementById("offpkunit").innerHTML = finaloffpkunit.toFixed(2);
    document.getElementById("offpkbill").innerHTML = finaloffpkcost.toFixed(2);
    document.getElementById("pkunit").innerHTML = finalpkunit.toFixed(2);
    document.getElementById("pkbill").innerHTML = finalpkcost.toFixed(2);

    energyoffpkunit+=finaloffpkunit;
    energypkunit+=finalpkunit;
    energyoffpkcost+=finaloffpkcost;
    energypkcost+=finalpkcost;

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

      energyoffpkunit+=finalxfoffpkunit;
      energypkunit+=finalxfpkunit;
      energyoffpkcost+=finalxfoffpkcost;
      energypkcost+=finalxfpkcost;
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

    //power factor correction
    var calculatedPF=calcPF(energyoffpkunit, energypkunit);
    if(!isNaN(calculatedPF)){
      console.log("valid pf value");
      document.getElementById("srpfval").innerHTML=calculatedPF;
      document.getElementById("offpkpfval").innerHTML=calculatedPF;
      document.getElementById("pkpfval").innerHTML=calculatedPF;

      //pfc unit calculation
      if(calculatedPF!=0){
        var standardoffpkunit=(energyoffpkunit*0.95)/calculatedPF;
        var finalpfcoffpkunit=standardoffpkunit-energyoffpkunit;
        document.getElementById("offpkpfcunit").innerHTML=finalpfcoffpkunit.toFixed(2);

        var standardpkunit=(energypkunit*0.95)/calculatedPF;
        var finalpfcpkunit=standardpkunit-energypkunit;
        document.getElementById("pkpfcunit").innerHTML=finalpfcpkunit.toFixed(2);

        energyoffpkunit+=finalpfcoffpkunit;
        energypkunit+=finalpfcpkunit;
        document.getElementById("srpfcunit").innerHTML="<span class='text-danger'>-</span>";
      }
      else{
        document.getElementById("srpfcunit").innerHTML="<span class='text-danger'>-</span>";
        document.getElementById("offpkpfcunit").innerHTML="<span class='text-danger'>-</span>";
        document.getElementById("pkpfcunit").innerHTML="<span class='text-danger'>-</span>";
      }
      
      //pfc charge calculation
      calculatedPF=Math.min(Math.max(0.75,calculatedPF), 0.95); // in between 0.75 and 0.95
      var correction=(0.95-calculatedPF)*100; //0.75 percent of this difference

      var finalpfcoffpkcost=energyoffpkcost*correction*0.0075;
      var finalpfcpkcost=energypkcost*correction*0.0075;
      document.getElementById("srpfcbill").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcbill").innerHTML=finalpfcoffpkcost.toFixed(2);
      document.getElementById("pkpfcbill").innerHTML=finalpfcpkcost.toFixed(2);

      energyoffpkcost+=finalpfcoffpkcost;
      energypkcost+=finalpfcpkcost;
    }
    else{
      document.getElementById("srpfval").innerHTML="#.##";
      document.getElementById("offpkpfval").innerHTML="#.##";
      document.getElementById("pkpfval").innerHTML="#.##";

      document.getElementById("srpfcunit").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcunit").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("pkpfcunit").innerHTML="<span class='text-danger'>-</span>";

      document.getElementById("srpfcbill").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcbill").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("pkpfcbill").innerHTML="<span class='text-danger'>-</span>";
    }

    if(isNaN(energyunit)){
      energyunit=energyoffpkunit+energypkunit;
      energycost=energyoffpkcost+energyoffpkcost;
    }
    else{
      energyunit+=(energyoffpkunit+energypkunit);
      energycost+=(energyoffpkcost+energyoffpkcost);
    }
  } else if (!isNaN(kwhomfval) && !isNaN(offpkunit)) {
    //single register meter
    var energysrunit=0;
    var energysrcost=0;

    var finalsrunit = offpkunit * kwhomfval;
    var finalsrcost = finalsrunit * mt_1["srrate"];
    
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

    energysrunit = finalsrunit;
    energysrcost = finalsrcost;

    //transformer loss consideration
    if (document.getElementById("ltside").checked) {
      //consider transformer loss
      var finalxfsrunit = Math.ceil(finalsrunit * 0.025);
      var finalxfsrcost = finalxfsrunit * mt_1["srrate"];
      
      document.getElementById("srxfunit").innerHTML = finalxfsrunit.toFixed(2);
      document.getElementById("srxfbill").innerHTML = finalxfsrcost.toFixed(2);
      document.getElementById("offpkxfunit").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("offpkxfbill").innerHTML =
        "<span class='text-danger'>-</span>";
      document.getElementById("pkxfunit").innerHTML = "<span class='text-danger'>-</span>";
      document.getElementById("pkxfbill").innerHTML = "<span class='text-danger'>-</span>";

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

    //power factor correction
    var calculatedPF=calcPF(energysrunit, 0);
    if(!isNaN(calculatedPF)){
      console.log("valid pf value");
      document.getElementById("srpfval").innerHTML=calculatedPF;
      document.getElementById("offpkpfval").innerHTML=calculatedPF;
      document.getElementById("pkpfval").innerHTML=calculatedPF;

      //pfc unit calculation
      if(calculatedPF!=0){
        var standardsrunit=(energysrunit*0.95)/calculatedPF;
        var finalpfcsrunit=standardsrunit-energysrunit;
        document.getElementById("srpfcunit").innerHTML=finalpfcsrunit.toFixed(2);

        energysrunit+=finalpfcsrunit;
        document.getElementById("offpkpfcunit").innerHTML="<span class='text-danger'>-</span>";
        document.getElementById("pkpfcunit").innerHTML="<span class='text-danger'>-</span>";
      }
      else{
        document.getElementById("srpfcunit").innerHTML="<span class='text-danger'>-</span>";
        document.getElementById("offpkpfcunit").innerHTML="<span class='text-danger'>-</span>";
        document.getElementById("pkpfcunit").innerHTML="<span class='text-danger'>-</span>";
      }

      //pfc charge calculation
      calculatedPF=Math.min(Math.max(0.75,calculatedPF), 0.95); // in between 0.75 and 0.95
      var correction=(0.95-calculatedPF)*100; //0.75 percent of this difference

      var finalpfcsrcost=energysrcost*correction*0.0075;
      document.getElementById("srpfcbill").innerHTML=finalpfcsrcost.toFixed(2);
      document.getElementById("offpkpfcbill").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("pkpfcbill").innerHTML="<span class='text-danger'>-</span>";

      energysrcost+=finalpfcsrcost;
    }
    else{
      document.getElementById("srpfval").innerHTML="#.##";
      document.getElementById("offpkpfval").innerHTML="#.##";
      document.getElementById("pkpfval").innerHTML="#.##";

      document.getElementById("srpfcunit").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcunit").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("pkpfcunit").innerHTML="<span class='text-danger'>-</span>";

      document.getElementById("srpfcbill").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcbill").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("pkpfcbill").innerHTML="<span class='text-danger'>-</span>";
    }

    if(isNaN(energyunit)){
      energyunit=energysrunit;
      energycost=energysrcost;
    }
    else{
      energyunit+=energysrunit;
      energycost+=energysrcost;
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
      document.getElementById("srpfcunit").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("srpfcbill").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcunit").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("offpkpfcbill").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("pkpfcunit").innerHTML="<span class='text-danger'>-</span>";
      document.getElementById("pkpfcbill").innerHTML="<span class='text-danger'>-</span>";
  }

  if(!isNaN(energyunit)){
    document.getElementById("energyunit").innerHTML=energyunit.toFixed(2);
    document.getElementById("energycost").innerHTML=energycost.toFixed(2);
  }
  else{
    document.getElementById("energyunit").innerHTML="<span class='text-danger'>-</span>";
    document.getElementById("energycost").innerHTML="<span class='text-danger'>-</span>";
  }

  //transformer rent calculation
  var xfRentCost=NaN;
  var xfcapval=validateXfCap();
  var xfdaysval=validateXfDays();
  var xfrateval=validateXfRate();
  if(!isNaN(xfcapval) && !isNaN(xfdaysval) && xfrateval!=""){
    var xfRentCost=xfcapval*xfrateval*xfdaysval;
    document.getElementById("xfrentrate").innerHTML=xfrateval +
        " x " +
        xfcapval + " x "+xfdaysval;
    document.getElementById("xfrentcost").innerHTML=xfRentCost.toFixed(2);
  }
  else{
    document.getElementById("xfrentrate").innerHTML="<span class='text-danger'>-</span>";
    document.getElementById("xfrentcost").innerHTML="<span class='text-danger'>-</span>";
  }

  ///updating the total bill amount
  updatetotalbill(demandcost, energycost, xfRentCost);
}

///principal bill, vat and total bill update
function updatetotalbill(demandcost, energycost, xfrentcost) {
  console.log("energycost = " + energycost + " , demandcost = " + demandcost);
  
  if (!isNaN(energycost) && !isNaN(demandcost)) {
    let principal = energycost + demandcost;
    if(!isNaN(xfrentcost)) principal+=xfrentcost;
    let vat = principal * 0.05;
    let billtotal = principal + vat;

    document.getElementById("principal").innerHTML = principal.toFixed(2);
    document.getElementById("vat").innerHTML = vat.toFixed(2);
    document.getElementById("billtotal").innerHTML = billtotal.toFixed(2);
  } else {
    console.log("invalid evergycost or demandcost");
    document.getElementById("principal").innerHTML = "<span class='text-danger'>-</span>";
    document.getElementById("vat").innerHTML = "<span class='text-danger'>-</span>";
    document.getElementById("billtotal").innerHTML = "<span class='text-danger'>-</span>";
  }
}
