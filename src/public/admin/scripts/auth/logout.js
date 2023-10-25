function logout() {
    swal({
        title: "Are you want to logout?",
        text: "Ready to Action!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Take Action!",
        cancelButtonText: "No, leave pls!",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                var token = localStorage.getItem('token');
                $.ajax({
                    type: "GET",
                    dataType: 'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', token);
                    },
                    url: host + '/api/v1/admin/auth/logout',
                }).done(function (data) {
                    // If successful
                    localStorage.clear();
                    window.location.replace('/admin/login')
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    // If fail
                    alert(jqXHR.responseJSON.error)
                });
            } else {
                swal("Cancelled", "Your explore is safe :");
            }
        });
}