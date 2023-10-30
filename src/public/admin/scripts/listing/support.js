//*********Listing Table Data**************/
function supportList() {
    this.setTimeout(() => {
        document.getElementById('support-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'perPage': 10,
        search: '',
        status: ''
    }
    if (document.getElementById('search').value) {
        obj = {
            ...obj,
            search: document.getElementById('search').value
        }
    }
    if (document.getElementById('status').value) {
        obj = {
            ...obj,
            status: document.getElementById('status').value
        }
    }
    $.ajax({
        url: `${host}/api/v1/common/support/list?page=${obj.page}&perPage=${obj.perPage}&status=${obj.status}&search=${obj.search}`,
        type: 'GET',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 200) {
                console.log(data.data, "slsld")
                document.getElementById('loader').style.display = 'none'
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
                            status: '',
                            search: ''
                        }
                        if (document.getElementById('search').value) {
                            obj = {
                                ...obj,
                                search: document.getElementById('search').value
                            }
                        }
                        if (document.getElementById('status').value) {
                            obj = {
                                ...obj,
                                role: document.getElementById('status').value
                            }
                        }
                        $.ajax({
                            url: `${host}/api/v1/common/support/list?page=${obj.page}&perPage=${obj.perPage}&status=${obj.status}&search=${obj.search}`,
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
                                        if (data.data.list[i].addBy == "deliveryPerson") {
                                            var name = data.data.list[i].deliveryPersonDetails[0].name
                                            var email = data.data.list[i].deliveryPersonDetails[0].email ? data.data.list[i].deliveryPersonDetails[0].email : 'N/A'
                                            var phoneNumber = data.data.list[i].deliveryPersonDetails[0].phoneNumber
                                        } else {
                                            var name = data.data.list[i].UserDetails[0].name
                                            var email = data.data.list[i].UserDetails[0].email
                                            var phoneNumber = data.data.list[i].UserDetails[0].phoneNumber
                                        }
                                        if(data.data.list[i].status == 'Open') {
                                            var status = 'Closed'
                                        } else {
                                            var status = 'Opened'
                                        }
                                        var index = i + 1 + (obj.perPage * (obj.page - 1));
                                        document.getElementById('table').innerHTML += '<tr>' +
                                            '<td>' + index +
                                            '<td>' + (data.data.list[i].message) +
                                            '<td>' + name +
                                            '<td>' + email +
                                            '<td>' + phoneNumber +
                                            '<td>'+ '<span class="label label-danger" style="border-radius:3px;"><strong>' + data.data.list[i].status + '</strong></</span>' +
                                            '<td><button type="button" style="border-color:white;" class="btn btn-sm btn-success" onclick= view(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/eye-3-16.png"} style = "height:20px; width:21px;"><strong style="margin-left:3px;">` + 'View' + '</strong></button>' +
                                            '<button style="margin-left: 5px; type="button" class="btn btn-sm btn-primary"  onclick= updateStatus(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/editpen.svg"} style = "height:15px; width:25px;"><strong>` + status + '</strong></button>' + '</tr>'
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
                    if (data.data.list[i].addBy == "deliveryPerson") {
                        var name = data.data.list[i].deliveryPersonDetails[0].name
                        var email = data.data.list[i].deliveryPersonDetails[0].email ? data.data.list[i].deliveryPersonDetails[0].email : 'N/A'
                        var phoneNumber = data.data.list[i].deliveryPersonDetails[0].phoneNumber
                    } else {
                        var name = data.data.list[i].UserDetails[0].name
                        var email = data.data.list[i].UserDetails[0].email
                        var phoneNumber = data.data.list[i].UserDetails[0].phoneNumber
                    }
                    if(data.data.list[i].status == 'Open') {
                        var status = 'Closed'
                    } else {
                        var status = 'Opened'
                    }
                    var index = i + 1
                    document.getElementById('table').innerHTML += '<tr>' +
                        '<td>' + index +
                        '<td>' + (data.data.list[i].message) +
                        '<td>' + name +
                        '<td>' + email +
                        '<td>' + phoneNumber +
                        '<td>'+ '<span class="label label-danger" style="border-radius:3px;"><strong>' + data.data.list[i].status + '</strong></</span>' +
                        '<td><button type="button" style="border-color:white;" class="btn btn-sm btn-success" onclick= view(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/eye-3-16.png"} style = "height:20px; width:21px;"><strong style="margin-left:3px;">` + 'View' + '</strong></button>' +
                        '<button style="margin-left: 5px; type="button" class="btn btn-sm btn-primary"  onclick= updateStatus(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/editpen.svg"} style = "height:15px; width:25px;"><strong>` + status + '</strong></button>' + '</tr>'
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

//Update staus
function updateStatus(reportId) {
    swal({
        title: "Are you want to update this status?",
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
                    type: "get",
                    dataType: 'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', token);
                    },
                    url: `${host}/api/v1/common/support/updateStatus?reportId=${reportId}`,
                }).done(function (data) {
                    // If successful
                    swal.close();
                    supportList();
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

function view(reportId) {
    window.location.href = '/admin/chating?id='+reportId
}


//*********Capital title***********/
function capitalize(input) {
    return input.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}
