//*********Listing Table Data**************/
function deliveryPersonList() {
    this.setTimeout(() => {
        if (document.getElementById('users').className == 'nav nav-second-level collapse' || document.getElementById('users').className == 'nav nav-second-level collapse in')
            document.getElementById('users')?.classList.add("in");
        document.getElementById('users-nav')?.classList.add("active");
        document.getElementById('deliveryPerson-nav')?.classList.add("active");
    }, 1500)
    if (!document.getElementById('search').value) {
        var search = ''
    } else {
        var search = document.getElementById('search').value
    }
    var obj = {
        'page': 1,
        'perPage': 10,
        search: search,
        status: document.getElementById('status').value
    }
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/deliveryPerson/list?page=${obj.page}&perPage=${obj.perPage}&search=${obj.search}&status=${obj.status}`,
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
                var x = data.data.totalCount
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
                            search: search,
                            status: document.getElementById('status').value
                        }

                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/admin/deliveryPerson/list?page=${obj.page}&perPage=${obj.perPage}&search=${obj.search}&status=${obj.status}`,
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
                                    for (var i = 0; i < data.data.check.length; i++) {
                                        var index = i + 1
                                        if (data.data.check[i].status == true) {
                                            var status = '<td style="vertical-align:middle;"><div class="btn btn-primary btn-lg" >' + 'Online' + '</div>'
                                        } else {
                                            var status = '<td style="vertical-align:middle;"><div class="btn btn-danger btn-lg" >' + 'Offline' + '</div>'
                                        }
                                        document.getElementById('table').innerHTML += '<tr>' +
                                            '<td style="vertical-align:middle;">' + index +
                                            '<td style="vertical-align:middle;">' + `<img src =${data.data.check[i].image ? data.data.check[i].image : "../../admin/assets/img/emptyphoto.png"} style ="height: 40px;width: 48px;">` +
                                            '<td style="vertical-align:middle;">' + (data.data.check[i].name) +
                                            '<td style="vertical-align:middle;">' + (data.data.check[i].countryCode) + " " + (data.data.check[i].phoneNumber) +
                                            status +
                                            '<td style="vertical-align:middle;"><button style="margin-left: 5px; type="button" class="btn btn-primary btn-lg"  onclick= view(' + '\'' + data.data.check[i]._id + '\'' + ')>' + 'View' + '</button>' +
                                            '<button style="margin-left:3px" type="button" class="btn btn-info btn-lg" onclick= edit(' + '\'' + data.data.check[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/editpen.svg"}>` + '</button>' +
                                            '<td style="vertical-align:middle;"><button style="margin-right:35px" type="button" class="btn btn-danger btn-lg" onclick= remove(' + '\'' + data.data.check[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/icons8-delete-50.png"} style = "height:20px; width:20px;">` + '</button></tr>'
                                    }
                                }
                            }
                        })
                        $target.next(".show").text('Current: ' + options.current);
                    }
                })
                // capitalize(data.data.data[i].name)
                $("#table").html(' ');
                for (var i = 0; i < data.data.check.length; i++) {
                    var index = i + 1
                    if (data.data.check[i].status == true) {
                        var status = '<td style="vertical-align:middle;"><div class="btn btn-primary btn-lg" >' + 'Online' + '</div>'
                    } else {
                        var status = '<td style="vertical-align:middle;"><div class="btn btn-danger btn-lg" >' + 'Offline' + '</div>'
                    }
                    document.getElementById('table').innerHTML += '<tr>' +
                        '<td style="vertical-align:middle;">' + index +
                        '<td style="vertical-align:middle;">' + `<img src =${data.data.check[i].image ? data.data.check[i].image : "../../admin/assets/img/emptyphoto.png"} style ="height: 40px;width: 48px;">` +
                        '<td style="vertical-align:middle;">' + (data.data.check[i].name) +
                        '<td style="vertical-align:middle;">' + (data.data.check[i].countryCode) + " " + (data.data.check[i].phoneNumber) +
                        status +
                        '<td style="vertical-align:middle;"><button style="margin-left: 5px; type="button" class="btn btn-primary btn-lg"  onclick= view(' + '\'' + data.data.check[i]._id + '\'' + ')>' + 'View' + '</button>' +
                        '<button style="margin-left:3px" type="button" class="btn btn-info btn-lg" onclick= edit(' + '\'' + data.data.check[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/editpen.svg"}>` + '</button>' +
                        '<td style="vertical-align:middle;"><button style="margin-right:35px" type="button" class="btn btn-danger btn-lg" onclick= remove(' + '\'' + data.data.check[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/icons8-delete-50.png"} style = "height:20px; width:20px;">` + '</button></tr>'
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

//Remove delivery Person
function remove(deliveryPersonId) {
    swal({
        title: "Are you want to delete this Delivery Person?",
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
                    url: `${host}/api/v1/admin/deliveryPerson/delete?delivery_personId=${deliveryPersonId}`,
                }).done(function (data) {
                    // If successful
                    swal.close();
                    deliveryPersonList();
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

//************Delivery Person Details ************ */

function view(deliveryPersonId) {
    window.location.href = '/admin/deliveryPersonDetails?id=' + deliveryPersonId
}

function edit(deliveryPersonId) {
    window.location.href = '/admin/editDeliveryPerson?id=' + deliveryPersonId
}
