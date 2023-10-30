//*********Listing Table Data**************/
function faqList() {
    this.setTimeout(() => {
        document.getElementById('faq-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'perPage': 10,
        search: '',
        role: ''
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

    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/common/faq/list?page=${obj.page}&perPage=${obj.perPage}&role=${obj.role}&search=${obj.search}`,
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

                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/common/faq/list?page=${obj.page}&perPage=${obj.perPage}&role=${obj.role}&search=${obj.search}`,
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
                                            '<td>' + index +
                                            '<td>' + (data.data.list[i].question) +
                                            '<td>' + (data.data.list[i].answer) +
                                            '<td>' + (data.data.list[i].faq_cat.name) +
                                            '<td>' + (data.data.list[i].role) +
                                            '<td style="text-align: center;"><button type="button" class="btn btn-sm btn-white" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Edit' + '</button>' +
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
                        '<td>' + index +
                        '<td>' + (data.data.list[i].question) +
                        '<td>' + (data.data.list[i].answer) +
                        '<td>' + (data.data.list[i].faq_cat.name) +
                        '<td>' + (data.data.list[i].role) +
                        '<td style="text-align: center;"><button type="button" class="btn btn-sm btn-white" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.list[i]._id + '\'' + ')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Edit' + '</button>' +
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
function remove(faqId) {
    swal({
        title: "Are you want to remove this faq?",
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
                    url: `${host}/api/v1/common/faq/delete?faqId=${faqId}`,
                }).done(function (data) {
                    // If successful
                    swal.close();
                    faqList();
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

function edit(faqId) {
    $.ajax({
        type: "get",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/common/faq/get?faqId=${faqId}`,
    }).done(function (data) {
        // If successful
        document.getElementById('question1').value = data.data.question ? data.data.question : "N/A",
            document.getElementById('messo_question1').value = data.data.messo_question ? data.data.messo_question : "N/A",
            document.getElementById('answer1').value = data.data.answer ? data.data.answer : data.data.answer;
        document.getElementById('faqId').value = data.data._id
        document.getElementById('messo_answer1').value = data.data.messo_answer ? data.data.messo_answer : data.data.messo_answer
        document.getElementById('role12').value = data.data.role
        document.getElementById('catId2').value = data.data.faq_cat

    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        alert(jqXHR.responseJSON.error)
    })

}

//*********Capital title***********/
function capitalize(input) {
    return input.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

//list of faq categories
function categoryList() {
    $.ajax({
        url: host + '/api/v1/common/faq/all_faqCat',
        type: 'Get',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.token);
        },
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 200) {
                var select = document.getElementById("catId");
                let catId = document.getElementById("catId1").value
                for (var i = 0; i < data.data.length; i++) {
                    var option = document.createElement("option"),
                        txt = document.createTextNode(data.data[i].name);
                    option.appendChild(txt);
                    option.setAttribute("value", data.data[i]._id);
                    option.selected = data.data[i]._id === catId ? true : false
                    select.insertBefore(option, select.lastChild);
                }
            } else {
                document.getElementById('table').innerHTML = ''
            }
        }
    });
}

//list of faq categories for edit time
function categoryList1() {
    $.ajax({
        url: host + '/api/v1/common/faq/all_faqCat',
        type: 'Get',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.token);
        },
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 200) {
                var select = document.getElementById("catId2");
                let catId = document.getElementById("catId12").value
                for (var i = 0; i < data.data.length; i++) {
                    var option = document.createElement("option"),
                        txt = document.createTextNode(data.data[i].name);
                    option.appendChild(txt);
                    option.setAttribute("value", data.data[i]._id);
                    option.selected = data.data[i]._id === catId ? true : false
                    select.insertBefore(option, select.lastChild);
                }
            } else {
                document.getElementById('table').innerHTML = ''
            }
        }
    });
}
