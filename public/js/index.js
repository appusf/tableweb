var c = 2;
//var data = [{ id: , name: , dec: , auh: }];
var data = [{ id: ``, name: "", dec: "", auh: "", btn: "" }];
console.log('Index.js')

$(document).ready(function() {
    getdata();



    $("#flip").click(function() {
        $("#panel").slideToggle("slow");
    });
});
//view();
function getdata(newd) {

    if (newd) {
        axios.get("http://localhost:3000/")
            .then(function(response) {
                Swal(
                    'Success!',
                    'Your Data has been added successfully.',
                    'success'
                )

                getdata();

            })
            .catch(function(response) {
                console.log(error)
            }).then(function() {
                console.log('Ok : entered if')
            });

    } else {
        axios.get("http://localhost:3000/view")
            .then(function(response) {
                console.log('Response From view : ', response.data)

                pushData(response.data);
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            })
            .then(function() {
                // always executed
            });
    }
}


function addbtn(no) {
    var btn = document.createElement('div')
    btn.innerHTML = '<button id="btn" class="btn btn-primary" onclick="editfunc(' + no + ')"> <strong> Edit</strong></button>';
    return btn.outerHTML;
}

function editfunc(idd) {
    //console.log(idd);
    getFormValues(idd);
    //alert("finally a small sol : id number is : " + idd);
}


function pushData(details) {
    console.log('Data before push : ', details)

    $('#myTable').DataTable().clear().draw();
    data.splice(0, data.length);

    details.map(dd => {

        data.push({ id: dd.id, name: dd.aname, dec: dd.desc, auh: dd.author, btn: addbtn(dd.id) })

    });
    console.log('In push function : ', data);

    $('#myTable').DataTable().clear().draw();
    data.map((d) => {
        $('#myTable').DataTable().row.add(
            [d.id, d.name, d.dec, d.auh, d.btn]
        ).draw(false)
    })


}

console.log('datassss : ', data);

function getFormValues(idd) {
    console.log(idd);
    console.log(data[idd - 1].name);
    var f = 15;
    const {
        value: formValues
    } = swal({
        title: 'Edit Article',
        html: '<input type="text" id="swal-input1" class="swal2-input" value=' + data[idd - 1].name.replace(" ", "\u00a0") + ' > ' +
            '<input type="text" id="swal-input2" class="swal2-input" value=' + data[idd - 1].dec.replace(" ", "\u00a0") + '>' +
            '<input type="text" id="swal-input3" class="swal2-input" value=' + data[idd - 1].auh.replace(" ", "\u00a0") + '>',
        focusConfirm: true,
        preConfirm: () => {
            // 127.0.0.1:3000/addTask

            let d1 = document.getElementById('swal-input1').value;
            let d2 = document.getElementById('swal-input2').value;
            let d3 = document.getElementById('swal-input3').value;
            if (d1 != "" && d2 != "" && d3 != "") {


                let d4 = {
                    "name": d1,
                    "desc": d2,
                    "auh": d3
                }

                console.log('Have content  :', d1);
                axios.put("http://localhost:3000/edit", { id: idd, aname: d1, desc: d2, author: d3 }

                    )
                    .then(function(response) {
                        console.log('Finally Edited : ', response.data)
                        getdata();

                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            } else {
                //alert("Please Enter Inputs for all the fields");

                // getFormValues.preventDefault();
                swal('Incomplete/Invalid', 'Please Enter Inputs in all the fields ', 'error ');
                event.preventDefault();
            }



        }
    })


}

function fix(idd) {


    let str = data[idd - 1].name.replace(" ", "\u00a0");

    //alert("worked like a charm");
    return str;
}

// $(document).ready(function() {
//     $('#myTable').DataTable().clear().draw();

//     data.map((d) => {
//         $('#myTable').DataTable().row.add(
//             [d.id, d.name, d.dec, d.auh]
//         ).draw(false)
//     })
// });