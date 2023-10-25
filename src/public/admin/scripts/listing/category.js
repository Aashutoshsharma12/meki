//*********Listing Table Data**************/
function catList() {
    this.setTimeout(() => {
        document.getElementById('category-nav')?.classList.add("active");
    },1500)
    var obj = {
        'page': 1,
        'perPage': 10,
    }
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/category/list?page=${obj.page}&perPage=${obj.perPage}`,
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 200) {
                document.getElementById('loader').style.display = 'none'
                $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
            }
            if (data.code == 200 && data.data.totalCount > 0) {
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
                            'perPage': options.length
                        }

                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/admin/category/list?page=${obj.page}&perPage=${obj.perPage}`,
                            type: 'GET',
                            contentType: 'application/json',
                            data: JSON.stringify(obj),
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
                                            '<td style="vertical-align:middle;">' + index + '<td style="vertical-align:middle;">' + (data.data.data[i].name) + '<td style="text-align: center;vertical-align:middle;">' + `<img src =${data.data.data[i].image ? data.data.data[i].image : "../../admin/assets/img/emptyphoto.png"} style = "height:65px; width:75px;">` +
                                            '<td style="text-align: center;vertical-align:middle;"><button type="button" class="btn btn-sm btn-white" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.data[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Edit' + '</button>' +
                                            '<button style="margin-left: 5px; type="button" class="btn btn-sm btn-white"  onclick= remove(' + '\'' + data.data.data[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Remove' + '</button>' + '</tr>'
                                    }
                                }
                            }
                        })
                        $target.next(".show").text('Current: ' + options.current);
                    }
                })
                // capitalize(data.data.data[i].name)
                $("#table").html(' ');
                for (var i = 0; i < data.data.data.length; i++) {
                    var index = i + 1
                    document.getElementById('table').innerHTML += '<tr>' +
                        '<td style="vertical-align:middle;">' + index + '<td style="vertical-align:middle;">' + (data.data.data[i].name) + '<td style="text-align: center;vertical-align:middle;">' + `<img src =${data.data.data[i].image ? data.data.data[i].image : "../../admin/assets/img/emptyphoto.png"} style = "height:65px; width:75px;">` +
                        '<td style="text-align: center;vertical-align:middle;"><button type="button" class="btn btn-sm btn-white" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.data[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Edit' + '</button>' +
                        '<button style="margin-left: 5px; type="button" class="btn btn-sm btn-white"  onclick= remove(' + '\'' + data.data.data[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Remove' + '</button>' + '</tr>'
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

//Remove category
function remove(catId) {
    // $(document).on('click', "#Action_button", function () {
    //     var a = ($(this).text());
    //     if (a === 'Active') {
    //         var status = true
    //     } else {
    //         var status = false
    //     }
    swal({
        title: "Are you want to remove this category?",
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
                    data: { status, catId },
                    dataType: 'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', token);
                    },
                    url: `${host}/api/v1/admin/category/delete/${catId}`,
                }).done(function (data) {
                    // If successful
                    swal.close();
                    catList();
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

//************Cat Details ************ */

function edit(catId) {
    $.ajax({
        type: "get",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/admin/category/get?catId=${catId}`,
    }).done(function (data) {
        // If successful
        document.getElementById('name1').value = data.data.name ? data.data.name : "N/A",
            console.log(data.data.name, "dldl", document.getElementById('name').value)
        document.getElementById('meso_name1').value = data.data.meso_name ? data.data.meso_name : "N/A",
            document.getElementById('blah1').src = data.data.image ? data.data.image : "../../admin/assets/img/emptyphoto.png";
        document.getElementById('catId').value = data.data._id
        document.getElementById('position1').value = data.data.position ? data.data.position : 0
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        // alert(jqXHR.responseJSON.error)
        alert("Data Not Found")
        window.location.reload()

    })

}

//*********Capital title***********/
function capitalize(input) {
    return input.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(120)
                .height(120);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function readURL1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah1')
                .attr('src', e.target.result)
                .width(120)
                .height(120);
        };

        reader.readAsDataURL(input.files[0]);
    }
}


//*****************Search bar not empty******************/
function fogData() {
    var fog = document.getElementById('fog').value
    var fromDate = document.getElementById('fromDate').value
    var toDate = document.getElementById('toDate').value
    if (fromDate && toDate) {
        if (fromDate > toDate) {
            alert(" To Date should be after From Date")
            return
        }
    }
    if (fog && fromDate && toDate) {
        catDetails()
        return
    }
    if (fog) {
        if (!fog) {
            alert("Please Write Something in Search bar")
            return
        } else {
            catDetails()
            return
        }
    } else {
        if (!fromDate) {
            alert("Please Select From Date")
            return
        } else {
            if (!toDate) {
                alert("Please Select To Date")
                return
            } else {
                catDetails()
                return
            }
        }
    }

}