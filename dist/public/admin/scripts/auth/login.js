function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    $.ajax({
        type: "POST",
        data: { email, password },
        dataType: 'json',
        url: host + '/api/v1/admin/auth/login',
    }).done(function (data) {
        // If successful
        localStorage.setItem("name", data.data.name);
        localStorage.setItem("token", data.data.token);
        window.location.replace('/admin/category')
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        alert(jqXHR.responseJSON.error)
    });
}

