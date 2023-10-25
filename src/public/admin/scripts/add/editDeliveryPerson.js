var currentLocation = window.location.href;
var url = new URL(currentLocation);
var deliveryPersonId = url.searchParams.get("id");

function details() {
    $.ajax({
        type: "get",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/admin/deliveryPerson/get?delivery_personId=${deliveryPersonId}`,
    }).done(function (data) {
        // If successful
        console.log(data, "slsl")
        document.getElementById('name').value = data.data.name ? data.data.name : "N/A",
            document.getElementById('phoneNumber').value = data.data.phoneNumber ? data.data.phoneNumber : "N/A",
            document.getElementById('blah1').src = data.data.image ? data.data.image : "../../admin/assets/img/emptyphoto.png";
        document.getElementById('countryCode').value = data.data.countryCode
        document.getElementById('delivery_personId').value = data.data._id
        mobileNoselect();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        // alert(jqXHR.responseJSON.error)
        alert("Data Not Found")
        // window.location.reload()

    })
}

$(document).ready(function () {
    $('#form').submit(function (event) {
        event.preventDefault()
        const data1 = document.getElementById('addButton')
        data1.disabled = true
        const formData = new FormData(this)
        formData.append('delivery_personId', document.getElementById('delivery_personId').value)
        var number_withcounrtCode = document.getElementById('countryCode').value + "" + document.getElementById('phoneNumber').value
        if ((document.getElementById('phoneNumber').value).length >= 2) {
            if (libphonenumber.parsePhoneNumber(number_withcounrtCode).isValid() == true) {
                $.ajax({
                    url: host + '/api/v1/admin/deliveryPerson/edit',
                    data: formData,
                    type: "Put",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
                    },
                    contentType: false,
                    processData: false,
                }).done(function (data) {
                    data1.disabled = false
                    window.location.replace('/admin/deliveryPersonList');
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    data1.disabled = false
                    alert(jqXHR.responseJSON.error)
                })
            } else {
                alert('Invalid Phone Number Please enter valid Phone Number')
                data1.disabled = false
            }
        } else {
            alert('Invalid Phone Number Please enter valid Phone Number')
            data1.disabled = false
        }

    })
})


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah1')
                .attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}