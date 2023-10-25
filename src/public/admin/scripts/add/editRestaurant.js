var currentLocation = window.location.href;
var url = new URL(currentLocation);
var vendorId = url.searchParams.get("id");


function details() {
    $.ajax({
        type: "get",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/admin/restaurant/details?vendorId=${vendorId}`,
    }).done(function (data) {
        // If successful
        document.getElementById('restaurantName1').value = data.data.restaurantName ? data.data.restaurantName : "N/A",
            document.getElementById('name1').value = data.data.name ? data.data.name : "N/A",
            document.getElementById('blah1').src = data.data.restaurantImage ? data.data.restaurantImage : "../../admin/assets/img/emptyphoto.png";
        document.getElementById('adminPercentage').value = data.data.adminPercentage ? data.data.adminPercentage :0
        document.getElementById('restaurant_mesoName1').value = data.data.restaurant_mesoName ? data.data.restaurant_mesoName : "N/A"
        document.getElementById('vendorId').value = data.data._id 
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        // alert(jqXHR.responseJSON.error)
        alert("Data Not Found")

    });
}