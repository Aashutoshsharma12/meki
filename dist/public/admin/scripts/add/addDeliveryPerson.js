this.setTimeout(() => {
    if (document.getElementById('users').className == 'nav nav-second-level collapse' || document.getElementById('users').className == 'nav nav-second-level collapse in')
        document.getElementById('users')?.classList.add("in");
    document.getElementById('users-nav')?.classList.add("active");
    document.getElementById('add_deliveryPerson-nav')?.classList.add("active");
}, 1500)


$(document).ready(function () {
    $('#form').submit(function (event) {
        event.preventDefault()
        const data1 = document.getElementById('addButton')
        data1.disabled = true
        const formData = new FormData(this)
        var number_withcounrtCode = document.getElementById('countryCode').value + "" + document.getElementById('phoneNumber').value
        if ((document.getElementById('phoneNumber').value).length >= 2) {
            if (libphonenumber.parsePhoneNumber(number_withcounrtCode).isValid() == true) {
                $.ajax({
                    url: host + '/api/v1/admin/deliveryPerson/add',
                    data: formData,
                    type:"Post",
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
        } else{
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