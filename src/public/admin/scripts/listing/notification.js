function notificationList() {
    this.setTimeout(() => {
        if (document.getElementById('notification').className == 'nav nav-second-level collapse' || document.getElementById('notification').className == 'nav nav-second-level collapse in')
            document.getElementById('notification')?.classList.add("in");
        document.getElementById('notification-nav')?.classList.add("active");
        document.getElementById('notificationList-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'perPage': 10,
        sendTo: ''
    }
    if (document.getElementById('status').value) {
        obj.sendTo = document.getElementById('status').value
    }
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/common/notification/notificationList?page=${obj.page}&perPage=${obj.perPage}&sendTo=${obj.sendTo}`,
        type: 'GET',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 200) {
                document.getElementById('loader').style.display = 'none'
                $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
            }
            if (data.code == 200 && data.data.count > 0) {
                $("#table2").removeClass("hide")
                document.getElementById('noData').style.display = 'none'
                $("#page1").removeClass("hide")
                var x = data.data.count
                $('#example-1').pagination({
                    total: x,
                    current: 1,
                    length: 10,
                    prev: 'Previous',
                    next: 'Next',
                    click: function (options, $target) {
                        let obj = {
                            'page': options.current,
                            'perPage': options.length,
                            sendTo: ''
                        }
                        if (document.getElementById('status').value) {
                            obj.sendTo = document.getElementById('status').value
                        }

                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/common/notification/notificationList?page=${obj.page}&perPage=${obj.perPage}&sendTo=${obj.sendTo}`,
                            type: 'GET',
                            contentType: 'application/json',
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', token);
                            },
                            dataType: 'json',
                            success: function (data, status) {
                                if (data.code == 200) {
                                    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                                    $("#table").html(' ');
                                    for (var i = 0; i < data.data.list.length; i++) {
                                        var index = i + 1 + (obj.perPage * (obj.page - 1));
                                        document.getElementById('table').innerHTML += '<tr>' +
                                            '<td style="vertical-align:middle;">' + index +
                                            '<td style="vertical-align:middle;">' + (data.data.list[i].title) +
                                            '<td style="vertical-align:middle;">' + (data.data.list[i].description) +
                                            '<td style="vertical-align:middle;">' + (data.data.list[i].sendTo) +
                                            '<td style="text-align: center;vertical-align:middle;"><button style="margin-left: 5px; type="button" class="btn btn-sm btn-danger"  onclick= remove(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/delete.svg"} style = "height:25px; width:35px;">` + 'Delete' + '</button>' + '</tr>'
                                    }
                                }
                            }
                        })
                        $target.next(".show").text('Current: ' + options.current);
                    }
                })
                // capitalize(data.data.data[i].name)
                $("#table").html(' ');
                for (var i = 0; i < data.data.list.length; i++) {
                    var index = i + 1
                    document.getElementById('table').innerHTML += '<tr>' +
                        '<td style="vertical-align:middle;">' + index +
                        '<td style="vertical-align:middle;">' + (data.data.list[i].title) +
                        '<td style="vertical-align:middle;">' + (data.data.list[i].description) +
                        '<td style="vertical-align:middle;">' + (data.data.list[i].sendTo) +
                        '<td style="text-align: center;vertical-align:middle;"><button style="margin-left: 5px; type="button" class="btn btn-sm btn-danger"  onclick= remove(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/delete.svg"} style = "height:25px; width:35px;">` + 'Delete' + '</button>' + '</tr>'
                }
            } else {
                document.getElementById('loader').style.display = 'none'
                $("#table").html(' ');
                $("#table2").addClass("hide");
                document.getElementById('noData').style.display = 'block'
                $("#page1").hide();

            }
        }

    });
}

//Remove notification
function remove(notificationId) {
    swal({
        title: "Are you want to remove this notification?",
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

                $.ajax({
                    type: "DELETE",
                    dataType: 'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', token);
                    },
                    url: `${host}/api/v1/common/notification/delete?notificationId=${notificationId}`,
                }).done(function (data) {
                    // If successful
                    swal.close();
                    notificationList();
                    // window.location.reload();
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    // If fail
                    alert(jqXHR.responseJSON.error)
                })
            } else {
                swal("Cancelled", "Your category is safe :");
            }
        });

}