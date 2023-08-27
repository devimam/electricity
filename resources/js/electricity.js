///change here for updating the rates
var lt_a = {
    lifelinerate: 4.35,
    step1rate: 4.85,
    step2rate: 6.63,
    step3rate: 6.95,
    step4rate: 7.34,
    step5rate: 11.51,
    step6rate: 13.26
};

loadltarates();

function loadltarates() {
    for (let key in lt_a) {
        document.getElementById(key).innerHTML = lt_a[key];
    }
}

///billed unit portion
var billedunitelm = document.getElementById('billedunit');
billedunitelm.addEventListener('keyup', validateunit);

function validateunit() {
    document.getElementById('billedamount').value = "";
    document.getElementById('billedamount').classList.remove('is-valid', 'is-invalid');

    if (billedunitelm.value == "") {
        billedunitelm.classList.remove('is-invalid');
        billedunitelm.classList.remove('is-valid');
        resetall();
        return;
    }
    let billedunit = parseFloat(billedunitelm.value);
    let isvalid = Number.isSafeInteger(billedunit);
    if (isvalid) {
        console.log("valid");
        billedunitelm.classList.remove('is-invalid');
        billedunitelm.classList.add('is-valid');
        calculateunitbill(billedunit);
    } else {
        console.log("invalid");
        billedunitelm.classList.remove('is-valid');
        billedunitelm.classList.add('is-invalid');
        resetall();
    }
}

function resetall() {
    let fieldnames = ['lifelineunit', 'lifelinebill',
        'step1unit', 'step1bill',
        'step2unit', 'step2bill',
        'step3unit', 'step3bill',
        'step4unit', 'step4bill',
        'step5unit', 'step5bill',
        'step6unit', 'step6bill',
        'energycost', 'energyunit'
    ];
    for (let val of fieldnames) {
        document.getElementById(val).innerHTML = "";
    }
}

function calculateunitbill(units) {
    resetall();
    let energycost = 0.0;
    if (units <= 50) {
        energycost = (units * lt_a['lifelinerate']);

        document.getElementById('lifelineunit').innerHTML = units;
        document.getElementById('lifelinebill').innerHTML = energycost.toFixed(2);
    } else {
        document.getElementById('lifelineunit').innerHTML = "-";
        document.getElementById('lifelinebill').innerHTML = "-";

        let restunits = units;

        ///for step1
        let step1unit = Math.min(75, restunits);
        let step1bill = step1unit * lt_a['step1rate'];
        energycost += step1bill;

        document.getElementById('step1unit').innerHTML = step1unit;
        document.getElementById('step1bill').innerHTML = step1bill.toFixed(2);
        restunits = restunits - 75;

        if (restunits > 0) {
            let step2unit = Math.min(125, restunits);
            let step2bill = step2unit * lt_a['step2rate'];
            energycost += step2bill;

            document.getElementById('step2unit').innerHTML = step2unit;
            document.getElementById('step2bill').innerHTML = step2bill.toFixed(2);
            restunits = restunits - 125;
        }

        if (restunits > 0) {
            let step3unit = Math.min(100, restunits);
            let step3bill = step3unit * lt_a['step3rate'];
            energycost += step3bill;

            document.getElementById('step3unit').innerHTML = step3unit;
            document.getElementById('step3bill').innerHTML = step3bill.toFixed(2);
            restunits = restunits - 100;
        }

        if (restunits > 0) {
            let step4unit = Math.min(100, restunits);
            let step4bill = step4unit * lt_a['step4rate'];
            energycost += step4bill;

            document.getElementById('step4unit').innerHTML = step4unit;
            document.getElementById('step4bill').innerHTML = step4bill.toFixed(2);
            restunits = restunits - 100;
        }

        if (restunits > 0) {
            let step5unit = Math.min(200, restunits);
            let step5bill = step5unit * lt_a['step5rate'];
            energycost += step5bill;

            document.getElementById('step5unit').innerHTML = step5unit;
            document.getElementById('step5bill').innerHTML = step5bill.toFixed(2);
            restunits = restunits - 200;
        }

        if (restunits > 0) {
            let step6unit = restunits;
            let step6bill = step6unit * lt_a['step6rate'];
            energycost += step6bill;

            document.getElementById('step6unit').innerHTML = step6unit;
            document.getElementById('step6bill').innerHTML = step6bill.toFixed(2);
        }
    }
    document.getElementById('energycost').innerHTML = energycost.toFixed(2);
    document.getElementById('energyunit').innerHTML = units;
}

///billed amount portion
var billedamountelm = document.getElementById('billedamount');
billedamountelm.addEventListener('keyup', validateamount);

function validateamount() {
    document.getElementById('billedunit').value = "";
    document.getElementById('billedunit').classList.remove('is-valid', 'is-invalid');

    if (billedamountelm.value == "") {
        billedamountelm.classList.remove('is-invalid');
        billedamountelm.classList.remove('is-valid');
        resetall();
        return;
    }

    let billedamount = parseFloat(billedamountelm.value);
    let isvalid = Number.isSafeInteger(billedamount);
    if (isvalid) {
        console.log("valid");
        billedamountelm.classList.remove('is-invalid');
        billedamountelm.classList.add('is-valid');
        calculateamountbill(billedamount);
    } else {
        console.log("invalid");
        billedamountelm.classList.remove('is-valid');
        billedamountelm.classList.add('is-invalid');
        resetall();
    }
}

function calculateamountbill(amounts) {
    resetall();

    let energycost = 0.0;
    let energyunits = 0.0;

    if (amounts <= 50 * lt_a['lifelinerate']) {
        energyunits = Math.floor(amounts / lt_a['lifelinerate']);
        energycost = energyunits * lt_a['lifelinerate'];

        document.getElementById('lifelineunit').innerHTML = energyunits;
        document.getElementById('lifelinebill').innerHTML = energycost.toFixed(2);
    } else {
        document.getElementById('lifelineunit').innerHTML = "-";
        document.getElementById('lifelinebill').innerHTML = "-";

        let restamounts = amounts;

        ///for step1
        let step1amount = Math.min(75 * lt_a['step1rate'], restamounts);
        let step1unit = Math.floor(step1amount / lt_a['step1rate']);
        let step1bill = step1unit * lt_a['step1rate'];
        energyunits += step1unit;
        energycost += step1bill;

        document.getElementById('step1unit').innerHTML = step1unit;
        document.getElementById('step1bill').innerHTML = step1bill.toFixed(2);
        restamounts = restamounts - step1bill;

        if (restamounts > 0) {
            let step2amount = Math.min(125 * lt_a['step2rate'], restamounts);
            let step2unit = Math.floor(step2amount / lt_a['step2rate']);
            let step2bill = step2unit * lt_a['step2rate'];
            energyunits += step2unit;
            energycost += step2bill;

            document.getElementById('step2unit').innerHTML = step2unit;
            document.getElementById('step2bill').innerHTML = step2bill.toFixed(2);
            restamounts = restamounts - step2bill;
        }

        if (restamounts > 0) {
            let step3amount = Math.min(100 * lt_a['step3rate'], restamounts);
            let step3unit = Math.floor(step3amount / lt_a['step3rate']);
            let step3bill = step3unit * lt_a['step3rate'];
            energyunits += step3unit;
            energycost += step3bill;

            document.getElementById('step3unit').innerHTML = step3unit;
            document.getElementById('step3bill').innerHTML = step3bill.toFixed(2);
            restamounts = restamounts - step3bill;
        }

        if (restamounts > 0) {
            let step4amount = Math.min(100 * lt_a['step4rate'], restamounts);
            let step4unit = Math.floor(step4amount / lt_a['step4rate']);
            let step4bill = step4unit * lt_a['step4rate'];
            energyunits += step4unit;
            energycost += step4bill;

            document.getElementById('step4unit').innerHTML = step4unit;
            document.getElementById('step4bill').innerHTML = step4bill.toFixed(2);
            restamounts = restamounts - step4bill;
        }

        if (restamounts > 0) {
            let step5amount = Math.min(200 * lt_a['step5rate'], restamounts);
            let step5unit = Math.floor(step5amount / lt_a['step5rate']);
            let step5bill = step5unit * lt_a['step5rate'];
            energyunits += step5unit;
            energycost += step5bill;

            document.getElementById('step5unit').innerHTML = step5unit;
            document.getElementById('step5bill').innerHTML = step5bill.toFixed(2);
            restamounts = restamounts - step5bill;
        }

        if (restamounts > 0) {
            let step6amount = restamounts;
            let step6unit = Math.floor(step6amount / lt_a['step6rate']);
            let step6bill = step6unit * lt_a['step6rate'];
            energyunits += step6unit;
            energycost += step6bill;

            document.getElementById('step6unit').innerHTML = step6unit;
            document.getElementById('step6bill').innerHTML = step6bill.toFixed(2);
        }
    }
    document.getElementById('energycost').innerHTML = energycost.toFixed(2);
    document.getElementById('energyunit').innerHTML = energyunits;
}
