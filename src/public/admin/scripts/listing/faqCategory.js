//*********Listing Table Data**************/
function faqCategoryList() {
    this.setTimeout(() => {
        document.getElementById('faq-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'perPage': 10,
        search: ''
    }
    if (document.getElementById('search').value) {
        obj = {
            ...obj,
            search: document.getElementById('search').value
        }
    }
    $.ajax({
        url: `${host}/api/v1/common/faq/faqCatList?page=${obj.page}&perPage=${obj.perPage}&search=${obj.search}`,
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
                            role: '',
                            search: ''
                        }
                        if (document.getElementById('search').value) {
                            obj = {
                                ...obj,
                                search: document.getElementById('search').value
                            }
                        }
                        if (document.getElementById('role1').value) {
                            obj = {
                                ...obj,
                                role: document.getElementById('role1').value
                            }
                        }

                        $.ajax({
                            url: `${host}/api/v1/common/faq/faqCatList?page=${obj.page}&perPage=${obj.perPage}&search=${obj.search}`,
                            type: 'GET',
                            contentType: 'application/json',
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', token);
                            },
                            dataType: 'json',
                            success: function (data, status) {
                                if (data.code == 200) {
                                    $("#table").html(' ');
                                    for (var i = 0; i < data.data.list.length; i++) {
                                        var index = i + 1 + (obj.perPage * (obj.page - 1));
                                        document.getElementById('table').innerHTML += '<tr>' +
                                            '<td>' + index +
                                            '<td>' + (data.data.list[i].question) +
                                            '<td>' + (data.data.list[i].answer) +
                                            '<td>' + (data.data.list[i].role) +
                                            '<td style="text-align: center;vertical-align:middle;"><button type="button" class="btn btn-sm btn-white" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Edit' + '</button>' +
                                            '<button style="margin-left: 5px; type="button" class="btn btn-sm btn-white"  onclick= remove(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Remove' + '</button>' + '</tr>'
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
                        '<td style="font-weight:bold;">' + index +
                        '<td style="font-weight:bold;">' + (data.data.list[i].name) +
                        '<td><button type="button" class="btn btn-sm btn-white" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Edit' + '</button>' +
                        '<button style="margin-left: 5px; type="button" class="btn btn-sm btn-white"  onclick= remove(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Remove' + '</button>' + '</tr>'
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

//Remove Faq
function remove(faqCatId) {
    swal({
        title: "Are you want to remove this faq category?",
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
                    url: `${host}/api/v1/common/faq/deleteFaqCat?faqCatId=${faqCatId}`,
                }).done(function (data) {
                    // If successful
                    swal.close();
                    faqCategoryList();
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

//************faq Details ************ */

function edit(faqCatId) {
    $.ajax({
        type: "get",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/common/faq/getFaqCat?faqCatId=${faqCatId}`,
    }).done(function (data) {
        // If successful
        document.getElementById('name').value = data.data.name ? data.data.name : "N/A",
            document.getElementById('messo_name').value = data.data.messo_name ? data.data.messo_name : "N/A",
            document.getElementById('faqCatId').value = data.data._id
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        alert(jqXHR.responseJSON.error)
    })

}

//*********Capital title***********/
function capitalize(input) {
    return input.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}
