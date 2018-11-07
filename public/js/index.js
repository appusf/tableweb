var c = 2;
//var data = [{ id: , name: , dec: , auh: }];
var data = [{ id: ``, name: "", dec: "", auh: "" }];
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
                alert("Success, Your data has been saved");
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



function pushData(details) {
    console.log('Data before push : ', details)
    $('#myTable').DataTable().clear().draw();
    data.splice(1, data.length);
    details.map(dd => {

        data.push({ id: dd.id, name: dd.aname, dec: dd.desc, auh: dd.author })
    });

    console.log('In push function : ', data);

    $('#myTable').DataTable().clear().draw();

    data.map((d) => {
        $('#myTable').DataTable().row.add(
            [d.id, d.name, d.dec, d.auh]
        ).draw(false)
    })

    // $('#myTable').DataTable().clear().draw();
    // displayTable()

}



$(document).ready(function() {
    $('#myTable').DataTable().clear().draw();

    data.map((d) => {
        $('#myTable').DataTable().row.add(
            [d.id, d.name, d.dec, d.auh]
        ).draw(false)
    })
});





// $(document).ready(displayTable());

// function displayTable() {

//     data.map((d) => {
//         $('#myTable').DataTable().row.add(
//             [d.id, d.name, d.dec, d.auh]
//         ).draw(false)
//     })
//}