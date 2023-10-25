
//*********Listing Table Data**************/

function userList() {
    this.setTimeout(() => {
        if (document.getElementById('users').className == 'nav nav-second-level collapse' || document.getElementById('users').className == 'nav nav-second-level collapse in')
            document.getElementById('users')?.classList.add("in");
        document.getElementById('users-nav')?.classList.add("active");
        document.getElementById('user-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'pagePage': 10,
        'search': document.getElementById('search').value,
        'status': document.getElementById('status').value
    }
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/user/list?search=${obj.search}&status=${obj.status}&page=${obj.page}&perPage=${obj.pagePage}`,
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
                            url: `${host}/api/v1/admin/user/list?search=${obj.search}&status=${obj.status}&page=${obj.page}&perPage=${obj.pagePage}`,
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
                                        if (data.data.response[i].isActive == true) {
                                            var x = 'Active'
                                        } else {
                                            var x = 'Inactive'
                                        }
                                        var index = i + 1 + (obj.pageSize * (obj.page - 1));
                                        document.getElementById('table').innerHTML += '<tr >' +
                                            '<td >' + index +
                                            '<td style="font-weight:bold">' + capitalize(data.data.response[i].name) +
                                            '<td style="font-weight:bold">' + moment(data.data.response[i].createdAt).format('DD-MM-YYYY HH:mm') +
                                            '<td style="font-weight:bold">' + (data.data.response[i].email) +
                                            '<td>' + '<span style="font-weight: bold;">' + data.data.response[i].phoneNumber + '</span>' +
                                            '<td style="text-align: center;vertical-align:middle;"><span class="label label-success">' + x +
                                            '<td style="text-align: center;vertical-align:middle;"> <button type="button" style="border-color:chartreuse;background-color:chartreuse;color:white"   class="label label-primary" id="Action_button" onclick= "view(' + '\'' + data.data.response[i]._id + '\'' + ')">' + 'View' + '</button>' +
                                            '<button type="button" class="label label-danger" style="border-color:red;margin-left:5px;" onclick= delete1(' + '\'' + data.data.response[i]._id + '\'' + ')>' + 'Delete' + '</button>' +
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
                    if (data.data.response[i].isActive == true) {
                        var x = 'Active'
                    } else {
                        var x = 'Inactive'
                    }
                    var index = i + 1
                    document.getElementById('table').innerHTML += '<tr >' +
                        '<td style="font-weight:bold;">' + index +
                        '<td style="font-weight:bold;">' + capitalize(data.data.response[i].name) +
                        '<td style="font-weight:bold;">' + moment(data.data.response[i].createdAt).format('DD-MM-YYYY HH:mm') +
                        '<td style="font-weight:bold;">' + (data.data.response[i].email) +
                        '<td>' + '<span style="font-weight: bold;">' + data.data.response[i].phoneNumber + '</span>' +
                        '<td style="text-align: center;vertical-align:middle;"><span class="label label-success">' + x +
                        '<td style="text-align: center;vertical-align:middle;"> <button type="button" style="border-color:chartreuse;background-color:chartreuse;color:white"   class="label label-primary" id="Action_button" onclick= "view(' + '\'' + data.data.response[i]._id + '\'' + ')">' + 'View' + '</button>' +
                        '<button type="button" class="label label-danger" style="border-color:red;margin-left:5px;" onclick= delete1(' + '\'' + data.data.response[i]._id + '\'' + ')>' + 'Delete' + '</button>' +
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

function delete1(user_id) {
    var userId = (user_id)
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
                    type: "Post",
                    data: { userId: userId },
                    dataType: 'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', token);
                    },
                    url: `${host}/api/v1/admin/user/deleteUser`,
                }).done(function (data) {
                    // If successful
                    // alert("Success")
                    swal.close();
                    window.location.reload();
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
    window.location.href = host + "/admin/userView?id=" + user_id
}

//*********Capital title***********/
function capitalize(input) {
    return input.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

// *****************Export Excel File of user Data Function*****
function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers); // Add headers as the first row
    }
    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);

    var exportedFilename = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8;'
    });

    if (navigator.msSaveBlob) {
        // For IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}


function download() {
    $.ajax({
        url: host + '/api/v1/admin/user/userExcelList',
        type: 'Get',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
        },
        dataType: 'json',
    }).done(function (data) {
        if (data.data.length > 0) {
            exportToExcel1(data.data, 'users');

            // var headers = {
            //     identity: "ID Number",
            //     name: "Full Name",
            //     email: "Email",
            //     countryCode: "Country Code",
            //     phoneNumber: 'Mobile',
            //     // image: 'Profile Image',
            // };
            // var itemsNotFormatted = data.data;
            // var fileTitle = 'users'; // or 'my-unique-title'
            // exportCSVFile(headers, itemsNotFormatted, fileTitle);
        } else {
            alert('No Users Here')
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        alert(jqXHR.responseJSON.error)
    })
}


// Other method convert json data into an excel sheets
function exportToExcel1(data, filename) {
    const workbook = XLSX.utils.book_new();
    const sheetData = data.map(item => {
        return [item.identity, item.name, item.email, item.countryCode, item.phoneNumber];
    });

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([['ID Number', 'Full Name', 'Email', 'Country Code', 'Mobile',], ...sheetData]);

    // Style the header row with borders
    worksheet['!cols'] = [
        { wch: 15 },
        { wch: 30 },
        { wch: 30 },
        { wch: 15 },
        { wch: 15 },
    ];
    worksheet['!rows'] = [{ hpx: 20 }];

    const borderStyle = {
        bottom: { style: 'thin', color: { rgb: '000000' } }
    };
    worksheet['A1'].s = borderStyle;
    worksheet['B1'].s = borderStyle;
    worksheet['C1'].s = borderStyle;
    worksheet['D1'].s = borderStyle;
    worksheet['E1'].s = borderStyle;
    // worksheet['F1'].s = borderStyle;

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    // Generate Excel file
    XLSX.writeFile(workbook, filename + '.xlsx');
}

