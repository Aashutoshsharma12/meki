//*********Listing Table Data**************/

function vendorList() {
    this.setTimeout(() => {
        if (document.getElementById('users').className == 'nav nav-second-level collapse' || document.getElementById('users').className == 'nav nav-second-level collapse in')
            document.getElementById('users')?.classList.add("in");
        document.getElementById('users-nav')?.classList.add("active");
        document.getElementById('vendor-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'pagePage': 10,
        'search': document.getElementById('search').value,
        'status': document.getElementById('status').value
    }
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/user/vendorList?search=${obj.search}&status=${obj.status}&page=${obj.page}&perPage=${obj.pagePage}`,
        type: 'GET',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 200) {
                document.getElementById('loader').style.display = 'none'
            }

            if (data.code == 200 && data.data.count > 0) {
                document.getElementById('noData').style.display = 'none'
                document.getElementById('loader').style.display = 'none'
                $("#table2").removeClass("hide")
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
                            'page': 1,
                            'pagePage': 10,
                            'search': document.getElementById('search').value,
                            'status': document.getElementById('status').value
                        }
                        $.ajax({
                            url: `${host}/api/v1/admin/user/vendorList?search=${obj.search}&status=${obj.status}&page=${obj.page}&perPage=${obj.pagePage}`,
                            type: 'GET',
                            contentType: 'application/json',
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', token);
                            },
                            dataType: 'json',
                            success: function (data, status) {
                                if (data.code == 200) {
                                    $("#table").html(' ');
                                    for (var i = 0; i < data.data.response.length; i++) {
                                        if (data.data.response[i].vendor_status == 'Accepted') {
                                            var x = '<span class="label label-success">' + data.data.response[i].vendor_status
                                        } else {
                                            var x = '<span class="label label-danger">' + data.data.response[i].vendor_status
                                        }
                                        if (data.data.response[i].branchNo) {
                                            var branchNo = "#" + data.data.response[i].branchNo
                                        } else {
                                            var branchNo = "#0000"
                                        }
                                        document.getElementById('table').innerHTML += '<tr >' +
                                            '<td style="font-weight:bold;">' + branchNo +
                                            '<td style="font-weight:bold;">' + (data.data.response[i].restaurantName) +
                                            '<td style="font-weight:bold;">' + `<img style="width: 44px;height: 33px;border-radius:25px;" src=${data.data.response[i].image ? data.data.response[i].image : '../../../admin/assets/img/profileImage.png'}>` +
                                            '<td style="font-weight:bold;">' + (data.data.response[i].name) +
                                            '<td>' + '<span style="font-weight: bold;">' + data.data.response[i].countryCode + " " + data.data.response[i].phoneNumber + '</span>' +
                                            '<td style="text-align: center;vertical-align:middle;">' + x +
                                            '<td style="text-align: center;vertical-align:middle;"> <button type="button" style="border-color:white"   class="btn btn-success" id="Action_button" onclick= "view(' + '\'' + data.data.response[i]._id + '\'' + ')">' + 'View' + '</button>' +
                                            '<td style="text-align: center;vertical-align:middle;"><button type="button" class="btn btn-warning" style="border-color:white;" onclick= edit(' + '\'' + data.data.response[i]._id + '\'' + ')>' + 'Edit' + '</button>' +
                                            '<td style="text-align: center;vertical-align:middle;"> <button type="button" style="border-color:white;"   class="btn btn-success" id="Action_button" onclick= "vendorStatus(' + '\'' + data.data.response[i]._id + '\'' + "," + '\'' + "Accepted" + '\'' + ')">' + 'Accept' + '</button>' +
                                            '<button type="button" class="btn btn-danger" style="border-color:white;margin-left:5px;" onclick= vendorStatus(' + '\'' + data.data.response[i]._id + '\'' + "," + '\'' + "Rejected" + '\'' + ')>' + 'Reject' + '</button>' +
                                            '</tr>'
                                    }
                                }

                            }

                        })
                        $target.next(".show").text('Current: ' + options.current);
                    }
                })
                $("#table").html(' ');
                for (var i = 0; i < data.data.response.length; i++) {
                    if (data.data.response[i].vendor_status == 'Accepted') {
                        var x = '<span class="label label-success">' + data.data.response[i].vendor_status
                    } else {
                        var x = '<span class="label label-danger">' + data.data.response[i].vendor_status
                    }
                    if (data.data.response[i].branchNo) {
                        var branchNo = "#" + data.data.response[i].branchNo
                    } else {
                        var branchNo = "#0000"
                    }
                    document.getElementById('table').innerHTML += '<tr >' +
                        '<td style="font-weight:bold;">' + branchNo +
                        '<td style="font-weight:bold;">' + (data.data.response[i].restaurantName) +
                        '<td style="font-weight:bold;">' + `<img style="width: 47px;height: 45px; border-radius:25px" src=${data.data.response[i].image ? data.data.response[i].image : '../../../admin/assets/img/profileImage.png'}>` +
                        '<td style="font-weight:bold;">' + (data.data.response[i].name) +
                        '<td>' + '<span style="font-weight: bold;">' + data.data.response[i].countryCode + " " + data.data.response[i].phoneNumber + '</span>' +
                        '<td style="text-align: center;vertical-align:middle;">' + x +
                        '<td style="text-align: center;vertical-align:middle;"> <button type="button" style="border-color:white"   class="btn btn-success" id="Action_button" onclick= "view(' + '\'' + data.data.response[i]._id + '\'' + ')">' + 'View' + '</button>' +
                        '<td style="text-align: center;vertical-align:middle;"><button type="button" class="btn btn-warning" style="border-color:white;" onclick= edit(' + '\'' + data.data.response[i]._id + '\'' + ')>' + 'Edit' + '</button>' +
                        '<td style="text-align: center;vertical-align:middle;"> <button type="button" style="border-color:white;"   class="btn btn-success" id="Action_button" onclick= "vendorStatus(' + '\'' + data.data.response[i]._id + '\'' + "," + '\'' + "Accepted" + '\'' + ')">' + 'Accept' + '</button>' +
                        '<button type="button" class="btn btn-danger" style="border-color:white;margin-left:5px;" onclick= vendorStatus(' + '\'' + data.data.response[i]._id + '\'' + "," + '\'' + "Rejected" + '\'' + ')>' + 'Reject' + '</button>' +
                        '</tr>'
                }
            } else {
                document.getElementById('loader').style.display = 'none'
                $("#table").html(' ');
                $("#table2").addClass("hide");
                $("#page1").hide();
                document.getElementById('noData').style.display = 'block'

            }
        }

    });
}

//**********Satus Update***************/

function vendorStatus(vendorId, status) {
    console.log(vendorId, "dkkdd", status)
    swal({
        title: "Are you sure?",
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
                    url: `${host}/api/v1/admin/user/updateStatus?status=${status}&vendorId=${vendorId}`,
                }).done(function (data) {
                    // If successful
                    // alert("Success")
                    swal.close();
                    vendorList();
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    // If fail
                    alert(jqXHR.responseJSON.error)

                })
            } else {
                swal("Cancelled", "Your file is safe :");
            }
        });
}

//************Details View functions************ */

function view(user_id) {
    window.location.href = host + "/admin/vendorDetails?id=" + user_id;
}

function edit(Id) {
    window.location.href = host + "/admin/update_vendorProfile?id=" + Id;
}
