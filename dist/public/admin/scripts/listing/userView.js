
//***********User view Details*********/
var currentLocation = window.location.href;
var url = new URL(currentLocation);
var userId = url.searchParams.get("id");

function userDetails() {
    this.setTimeout(() => {
        if (document.getElementById('users').className == 'nav nav-second-level collapse' || document.getElementById('users').className == 'nav nav-second-level collapse in')
            document.getElementById('users')?.classList.add("in");
        document.getElementById('users-nav')?.classList.add("active");
        document.getElementById('user-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        "userId": userId
    }
    $.ajax({
        url: `${host}/api/v1/admin/order/userOrderList?&userId=${obj.userId}`,
        type: 'Get',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
    }).done(function (data) {
        document.getElementById('loader').style.display = 'none'
        if (data.code == 200) {
            document.getElementById('noData').style.display = 'none'
            document.getElementById('name').innerHTML = data.data.userDetails.name
            document.getElementById('email').innerHTML = data.data.userDetails.email
            document.getElementById('phoneNumber').innerHTML = data.data.userDetails.countryCode + " " + data.data.userDetails.phoneNumber
            document.getElementById('name').innerHTML = data.data.userDetails.name
            document.getElementById('image').src = data.data.userDetails.image ? data.data.userDetails.image :'../../admin/assets/img/emptyphoto.png'
        }
        if (data.code == 200 && data.data.count > 0) {
            for (let i = 0; i < data.data.orderDetails.length; i++) {
                document.getElementById('table').innerHTML += '<tr>' +
                    '<td>' + data.data.orderDetails[i].orderId +
                    '<td>' + data.data.orderDetails[i].vendorId.restaurantName +
                    '<td>' + data.data.orderDetails[i].address +
                    '<td>' + data.data.orderDetails[i].orderType +
                    '<td>' + data.data.orderDetails[i].TotalAmount +
                    '<td>' + data.data.orderDetails[i].createdAt +
                    '<td><button type="button" class="label label-danger" style="border-color:red;margin-left:5px;" onclick= delete(' + '\'' + data.data.response[i]._id + '\'' + ')>' + 'View' + '</button>' + '</tr>'
            }
        } else {
            document.getElementById('noData').style.display = 'block'
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        document.getElementById('loader').style.display = 'none'
        alert(jqXHR.responseJSON.error)
    })
}


