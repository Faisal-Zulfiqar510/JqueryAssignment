
$(document).ready(function () {
    let d_t=$('#ipInfoTable').DataTable();

});


function characterCheck(e){
    let key = e.keyCode,
        $return = ((key > 64 && key < 91) || (key > 96 && key < 123) || key == 8 || key == 32  || key == 13 || (key >= 45 && key <= 57));
    if(!$return) {

        return false;
    }
    else if (key==13){
        console.log($('#inputTxt').val());
        ValidateIPAddress($('#inputTxt').val());
        return true;
    }
}




function ValidateIPAddress(ipAddress) {

  console.log("ip is", ipAddress);
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
    ajaxCall(ipAddress);
  } else {
    alert("Invalid ip address");
  }
}

function ajaxCall(ip) {
    $('#inputTxt').val('');
    $.get("http://api.ipstack.com/" + ip + "?access_key=ae8d1fc5c6cba186830565c1a5c23d03&format=1", function (data, status) {
        //alert("Data: " + data.city + "\nStatus: " + status);
        let t = $('#ipInfoTable').DataTable();

        t.row.add([

            data.ip,
            data.country_name,
            data.country_code,
            $('#ipInfoTable').innerHTML='<button class="btn btn-outline-danger" id="removeBtn"onclick="removeParents(this)">Delete Row</button>'

        ]).draw(true);
    });

}

function removeParents(r) {
   let ans= confirm("Are you sure to delete entry from table");
   if(ans) {
    let selRow = r.parentNode.parentNode;
    let d_t = $('#ipInfoTable').DataTable();
    d_t.row(selRow).remove().draw();
   }
   else {
       return;
   }

}

/*function removeParents() {
    var table = $('#ipInfoTable').DataTable();

    $('#ipInfoTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('sel') ) {
            $(this).removeClass('sel');
        }
        else {
            table.$('tr.sel').removeClass('sel');
            $(this).addClass('sel');
        }
    } );

   // $('#removeBtn').click( function () {
        table.row('.selected').remove().draw( false );
    //} );

}*/

/*function removeParents() {
  var btn=$('#removeBtn');
  btn.parents('tr').remove();

}*/
