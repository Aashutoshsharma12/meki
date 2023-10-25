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
        url: `${host}/api/v1/admin/user/vendorDetails?vendorId=${vendorId}`,
    }).done(function (data) {
        // If successful
        document.getElementById('name').value = data.data.profile_details.name ? data.data.profile_details.name : "N/A",
            document.getElementById('phoneNumber').value = data.data.profile_details.phoneNumber ? data.data.profile_details.phoneNumber : "N/A",
            document.getElementById('blah1').src = data.data.profile_details.image ? data.data.profile_details.image : "../../admin/assets/img/emptyphoto.png";
        document.getElementById('countryCode').value = data.data.profile_details.countryCode
        document.getElementById('vendorId').value = data.data.profile_details._id
        mobileNoselect();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        alert(jqXHR.responseJSON.error)
        // alert("Data Not Found")
        // window.location.reload()

    })
}

$(document).ready(function () {
    $('#form').submit(function (event) {
        event.preventDefault()
        const data1 = document.getElementById('addButton')
        data1.disabled = true
        const formData = new FormData(this)
        formData.append('vendorId', document.getElementById('vendorId').value)
        var number_withcounrtCode = document.getElementById('countryCode').value + "" + document.getElementById('phoneNumber').value
        if ((document.getElementById('phoneNumber').value).length >= 2) {
            if (libphonenumber.parsePhoneNumber(number_withcounrtCode).isValid() == true) {
                $.ajax({
                    url: host + '/api/v1/admin/user/edit',
                    data: formData,
                    type: "Put",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
                    },
                    contentType: false,
                    processData: false,
                }).done(function (data) {
                    data1.disabled = false
                    window.location.replace('/admin/vendor');
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