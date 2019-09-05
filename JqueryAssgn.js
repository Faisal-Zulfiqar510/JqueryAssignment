$(document).ready(function () {
 $('#datatable').DataTable({
   'paging':false
 });
});

function ValidateIPAddress(ipAddress) {

  console.log("ip is", ipAddress);
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
    ajaxCall(ipAddress);
  } else {
    alert("Invalid ip address");
  }
}

function ajaxCall(ip) {

    $.get("http://api.ipstack.com/" + ip + "?access_key=ae8d1fc5c6cba186830565c1a5c23d03&format=1", function (data, status) {
      //alert("Data: " + data.city + "\nStatus: " + status);
      var t = $('#datatable').DataTable();

      t.row.add([

        data.ip,
        data.country_name,
        data.country_code,
        $('#datatable').innerHTML='<button id="removeBtn" onclick="removeParents(this)">Delete Row</button>'
      ]).draw(false);
    });

}

/*function removeParents(r) {
  var i = r.parentNode.parentNode.rowIndex;
  console.log(i);
  var tab = $('#datatable').DataTable();
  tab.row(i).remove().draw();

}*/
function removeParents() {
  var btn=$('#removeBtn');
  btn.closest('tr').remove().draw();

}
