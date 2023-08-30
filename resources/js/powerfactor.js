/*
Title: electricity
Author: Mohammad Imam Hossain
Date: 30/08/2023
All rights reserved
*/

(
    function() {
        let pfoffpeakelm = document.getElementById('pfoffpeak');
        pfoffpeakelm.addEventListener('keyup', validatepfoffpeak);

        function validatepfoffpeak() {
            let pfoffpeak = parseFloat(pfoffpeakelm.value);
            let isvalid = Number.isSafeInteger(pfoffpeak);
            if (isvalid && pfoffpeak >= 0) {
                console.log("valid pf offpeak unit");
                pfoffpeakelm.classList.remove('is-invalid');
                pfoffpeakelm.classList.add('is-valid');
            } else {
                console.log("invalid pf offpeak unit");
                pfoffpeakelm.classList.remove('is-valid');
                pfoffpeakelm.classList.add('is-invalid');
            }

            calculatepf();
        }

        let pfpeakelm = document.getElementById('pfpeak');
        pfpeakelm.addEventListener('keyup', validatepfpeak);

        function validatepfpeak() {
            let pfpeak = parseFloat(pfpeakelm.value);
            let isvalid = Number.isSafeInteger(pfpeak);
            if (isvalid && pfpeak >= 0) {
                console.log("valid pf peak unit");
                pfpeakelm.classList.remove('is-invalid');
                pfpeakelm.classList.add('is-valid');
            } else {
                console.log("invalid pf peak unit");
                pfpeakelm.classList.remove('is-valid');
                pfpeakelm.classList.add('is-invalid');
            }

            calculatepf();
        }

        let pfvarelm = document.getElementById('pfvar');
        pfvarelm.addEventListener('keyup', validatepfvar);

        function validatepfvar() {
            let pfvar = parseFloat(pfvarelm.value);
            let isvalid = Number.isSafeInteger(pfvar);
            if (isvalid && pfvar >= 0) {
                console.log("valid var unit");
                pfvarelm.classList.remove('is-invalid');
                pfvarelm.classList.add('is-valid');
            } else {
                console.log("invalid var unit");
                pfvarelm.classList.remove('is-valid');
                pfvarelm.classList.add('is-invalid');
            }

            calculatepf();
        }

        ///pf calculation section
        function calculatepf() {
            let pfoffpeakelm = document.getElementById('pfoffpeak');
            let pfoffpeak = parseFloat(pfoffpeakelm.value);
            let isvalidoffpeak = Number.isSafeInteger(pfoffpeak);

            let pfpeakelm = document.getElementById('pfpeak');
            let pfpeak = parseFloat(pfpeakelm.value);
            let isvalidpeak = Number.isSafeInteger(pfpeak);

            let pfvarelm = document.getElementById('pfvar');
            let pfvar = parseFloat(pfvarelm.value);
            let isvalidvar = Number.isSafeInteger(pfvar);

            document.getElementById('pfcard').classList.remove('text-bg-secondary', 'text-bg-success', 'text-bg-warning', 'text-bg-danger');
            document.getElementById('pfprogress').classList.remove('bg-secondary', 'bg-success', 'bg-warning', 'bg-danger');
            if (isvalidoffpeak && pfoffpeak >= 0 && isvalidpeak && pfpeak >= 0 && isvalidvar && pfvar >= 0) {
                let kvarhunit = pfvar;
                let kwhunit = pfoffpeak + pfpeak;
                let ratio = 0;

                if (kvarhunit == 0) {
                    ratio = 0;
                } else {
                    if (kwhunit == 0) {
                        ratio = Number.POSITIVE_INFINITY;
                    } else ratio = kvarhunit / kwhunit;
                }

                let taninverse = Math.atan(ratio);
                let pf = Math.cos(taninverse);
                pf = parseFloat(pf.toFixed(2)); ///for floating point exact compare
                document.getElementById('pfvalue').innerHTML = pf.toFixed(2);
                document.getElementById('pfprogress').innerHTML = pf.toFixed(2);
                if (pf < 0.75) {
                    document.getElementById('pfcard').classList.add('text-bg-danger');

                    document.getElementById('pfprogress').classList.add('bg-danger');
                    document.getElementById('pfprogress').style.width = (pf * 100) + "%";
                } else if (pf >= 0.75 && pf < 0.95) {
                    document.getElementById('pfcard').classList.add('text-bg-warning');

                    document.getElementById('pfprogress').classList.add('bg-warning');
                    document.getElementById('pfprogress').style.width = (pf * 100) + "%";
                } else {
                    document.getElementById('pfcard').classList.add('text-bg-success');

                    document.getElementById('pfprogress').classList.add('bg-success');
                    document.getElementById('pfprogress').style.width = (pf * 100) + "%";
                }
            } else {
                console.log('invalid pf value');
                document.getElementById('pfvalue').innerHTML = "-.--";
                document.getElementById('pfprogress').innerHTML = "";

                document.getElementById('pfcard').classList.add('text-bg-secondary');

                document.getElementById('pfprogress').classList.add('bg-secondary');
                document.getElementById('pfprogress').style.width = "0%";
            }
        }

        const modalelm = document.getElementById('pfcalculator');
        modalelm.addEventListener('show.bs.modal', event => {
            document.getElementById('pfoffpeak').value = "";
            document.getElementById('pfoffpeak').classList.remove('is-invalid', 'is-valid');

            document.getElementById('pfpeak').value = "";
            document.getElementById('pfpeak').classList.remove('is-invalid', 'is-valid');

            document.getElementById('pfvar').value = "";
            document.getElementById('pfvar').classList.remove('is-invalid', 'is-valid');

            calculatepf();
        })
    }
)();
