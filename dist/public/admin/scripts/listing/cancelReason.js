//*********Listing Table Data**************/

function cancelReasonList() {
    this.setTimeout(() => {
        document.getElementById('cancelReason-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'perPage': 10
    }
    if (document.getElementById('search').value) {
        obj.search = document.getElementById('search').value
    } else {
        obj.search = ''
    }

    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/cancelReason/list?page=${obj.page}&perPage=${obj.perPage}&search=${obj.search}`,
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
                            'perPage': options.length
                        }
                        if (document.getElementById('search').value) {
                            obj.search = document.getElementById('search').value
                        } else {
                            obj.search = ''
                        }

                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/admin/cancelReason/list?page=${obj.page}&perPage=${obj.perPage}&search=${ob.search}`,
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
                                    for (var i = 0; i < data.data.data.length; i++) {
                                        var index = i + 1 + (obj.perPage * (obj.page - 1));
                                        document.getElementById('table').innerHTML += '<tr>' +
                                            '<td style="vertical-align:middle;width:20px">' + index +
                                            '<td style="vertical-align:middle;width:85%">' + (data.data.check[i].reason) +
                                            '<td style="text-align: center;vertical-align:middle;"><button style="border-color:white" type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.check[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/editpen.svg"} style = "height:20px; width:35px;">` + 'Edit' + '</button>' +
                                            '<button style="margin-left: 18px;margin-top:5px" type="button" class="btn btn-sm btn-danger"  onclick= remove(' + '\'' + data.data.check[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/delete.svg"} style = "height:25px; width:35px;">` + 'Delete' + '</button>' + '</tr>'
                                    }
                                }
                            }
                        })
                        $target.next(".show").text('Current: ' + options.current);
                    }
                })
                $("#table").html(' ');
                for (var i = 0; i < data.data.check.length; i++) {
                    var index = i + 1
                    document.getElementById('table').innerHTML += '<tr>' +
                        '<td style="vertical-align:middle;width:20px">' + index +
                        '<td style="vertical-align:middle;width:85%">' + (data.data.check[i].reason) +
                        '<td style="text-align: center;vertical-align:middle;"><button style="border-color:white" type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.check[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/editpen.svg"} style = "height:20px; width:35px;">` + 'Edit' + '</button>' +
                        '<button style="margin-left: 18px;margin-top:5px" type="button" class="btn btn-sm btn-danger"  onclick= remove(' + '\'' + data.data.check[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/delete.svg"} style = "height:25px; width:35px;">` + 'Delete' + '</button>' + '</tr>'
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


//Remove reason
function remove(cancelReasonId) {
    swal({
        title: "Are you want to delete this reason?",
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
                    url: `${host}/api/v1/admin/cancelReason/delete?cancelReasonId=${cancelReasonId}`,
                }).done(function (data) {
                    // If successful
                    swal.close();
                    cancelReasonList();
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    // If fail
                    alert(jqXHR.responseJSON.error)
                })
            } else {
                swal("Cancelled", "Your explore is safe :");
            }
        });
}

//************cancelReason Details ************ */

function edit(cancelReasonId) {
    $.ajax({
        type: "get",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/admin/cancelReason/get?cancelReasonId=${cancelReasonId}`,
    }).done(function (data) {
        // If successful
        document.getElementById('reason1').value = data.data.reason ? data.data.reason : "N/A",
            document.getElementById('meso_reason1').value = data.data.meso_reason ? data.data.meso_reason : "N/A",
            document.getElementById('cancelReasonId').value = data.data._id
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        // alert(jqXHR.responseJSON.error)
        alert("Data Not Found")
        window.location.reload()

    })

}
