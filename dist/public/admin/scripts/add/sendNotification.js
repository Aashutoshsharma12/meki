function classActive() {
    this.setTimeout(() => {
        if (document.getElementById('notification').className == 'nav nav-second-level collapse' || document.getElementById('notification').className == 'nav nav-second-level collapse in')
            document.getElementById('notification')?.classList.add("in");
        document.getElementById('notification-nav')?.classList.add("active");
        document.getElementById('sendNotification-nav')?.classList.add("active");
    }, 1500)
}
const options = Intl.DateTimeFormat().resolvedOptions();
const timezone = options.timeZone;
$(document).ready(function () {
    $('#form').submit(function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const obj = {
            title: document.getElementById('title').value,
            meso_title: document.getElementById('meso_title').value,
            description: document.getElementById('description').value,
            meso_description: document.getElementById('title').value,
            sendTo: document.getElementById('sendTo').value,
            sendFrom: "Admin"
        }

        $.ajax({
            url: host + '/api/v1/common/notification/sendNotification',
            type: 'Post',
            data: obj,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token')),
                    xhr.setRequestHeader('timezone', timezone)
            },
            // contentType: false,
            // processData: false,
        }).done(function (data) {
            alert('Notification send Successfully')
            window.location.replace('/admin/notificationList')
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error)
        })
    })
})