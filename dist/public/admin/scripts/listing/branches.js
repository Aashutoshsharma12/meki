
var currentLocation = window.location.href;
var url = new URL(currentLocation);
var vendorId = url.searchParams.get("id");


function branchList() {
    this.setTimeout(() => {
        document.getElementById('restaurant-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'perPage': 10,
        'vendorId': vendorId
    }

    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/restaurant/branchList?page=${obj.page}&perPage=${obj.perPage}&vendorId=${obj.vendorId}`,
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
                document.getElementById('page1').style.display = 'block'
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
                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/admin/restaurant/branchList?page=${obj.page}&perPage=${obj.perPage}&vendorId=${obj.vendorId}`,
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
                                        function getStars(rating) {
                                            rating = Math.round(rating * 2) / 2;
                                            let output = [];
                                            for (var i = rating; i >= 1; i--)
                                                output.push('<img style="width: 20px;" src="../../../admin/assets/img/full.svg" />&nbsp;');
                                            if (i == .5) output.push('<img style="width:20px;" src="../../../admin/assets/img/halfstar.svg" />&nbsp;');
                                            return output.join('');
                                        }
                                        const stars = getStars(data.data.data[i].rating)
                                        if (data.data.data[i].branchType == 'Main') {
                                            localStorage.setItem('restaurantName', data.data.data[i].restaurantName ? data.data.data[i].restaurantName : "N/A")
                                        }

                                        if (data.data.data[i].branchNo) {
                                            var branchNo = "#" + data.data.data[i].branchNo
                                        } else {
                                            var branchNo = '#0000'
                                        }
                                        if (data.data.data[i].status == 'Approved') {
                                            var status = '<button type="button" style="margin-top:2px;" class="btn btn-danger btn-lg"  onclick= updateStatus(' + '\'' + data.data.data[i]._id + '\'' + "," + '\'' + data.data.data[i].status + '\'' + ')><strong>' + 'Disapprove now' + '</strong></button>'
                                            // var statusName = '<button type="button" style="border-radius: 18px;border:blue;" class="btn btn-sm btn-success"><strong>' + data.data.data[i].status + '</strong></button>'
                                            var statusName = '<div type="button" style="border-radius: 18px;border:blue;" class="btn btn-sm btn-success"><strong>' + data.data.data[i].status + '</strong></div>'

                                        } else {
                                            var status = '<button type="button" style="margin-top:2px;" class="btn btn-info btn-lg"  onclick= updateStatus(' + '\'' + data.data.data[i]._id + '\'' + "," + '\'' + data.data.data[i].status + '\'' + ')><strong>' + 'Approve now' + '</strong></button>'
                                            var statusName = '<div type="button" style="border-radius: 18px;border:blue;" class="btn btn-sm btn-danger"><strong>' + data.data.data[i].status + '</strong></div>'
                                        }
                                        if (data.data.data[i].branchDetails.paymentMehod[0] == 'Cash On Delivery' || data.data.data[i].branchDetails.paymentMehod[1] == 'Cash On Delivery') {
                                            var COD = 'Yes'
                                        } else {
                                            var COD = 'No'
                                        }
                                        if (data.data.data[i].branchDetails.paymentMehod[0] == 'Accept Card' || data.data.data[i].branchDetails.paymentMehod[1] == 'Accept Card') {
                                            var Card = 'Yes,'
                                        } else {
                                            var Card = 'No,'
                                        }
                                        const obj = {
                                            vendorId: data.data.data[i]._id,
                                            name: localStorage.getItem('restaurantName') ? localStorage.getItem('restaurantName') : "N/A"
                                        }
                                        const split = (data.data.data[i].branchDetails.max_deliveryTime).split(':');
                                        const hours = split[0]
                                        const minutes = split[1]
                                        const totalMinutes = Number(hours * 60) + Number(minutes)
                                        document.getElementById('table').innerHTML += '<tr>' +
                                            '<td><strong>' + branchNo + '</strong>' +
                                            '<td>' + `<img src =${data.data.data[i].branchDetails.branchImage ? data.data.data[i].branchDetails.branchImage : "../../admin/assets/img/emptyphoto.png"} style = "height:50px; width:60px;">` +
                                            '<td><strong>' + (data.data.data[i].branchDetails.addressDetails.fullAddress) + '</strong><div><b><span id=stars>' + stars + '</span></b></div>' +
                                            '<td>' + totalMinutes +
                                            '<td>' + (data.data.data[i].branchDetails.minimum_orderAmount) + " MKD" +
                                            '<td>' + moment(data.data.data[i].branchDetails.openingTime, 'HH:mm A').format('HH:mm A') + " to " + moment(data.data.data[i].branchDetails.closingTime, 'HH:mm A').format('HH:mm A') +
                                            '<td>' + '<div>Card:<strong>' + Card + '</strong></div><div>COD:<strong>' + COD + '</strong></div>' +
                                            '<td>' + statusName +
                                            '<td>' + '<button type="button" style="width:100px; border:blue;" class="btn btn-sm btn-success" onclick="menuItems(\'' + encodeURIComponent(JSON.stringify(obj)) + '\')"><strong>' + 'Menu Item:' + data.data.data[i].itemId.length + '</strong></button>' +
                                            '<td><button style="width: 33%;height: 30px;padding:0" type="button" class="btn btn-primary btn-lg" onclick= orders(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Orders' + '</strong></button>' +
                                            '<button style="width: 26%;margin-left: 5px;height: 30px;padding: 0;" type="button" class="btn btn-info btn-lg"  onclick= edit(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Edit' + '</strong></button>' +
                                            '<div style="margin-top:2px"><button style="width:63%;height:30px;padding:0;border:blue;" type="button" class="btn btn-success btn-lg"  onclick= categoty(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Category' + '</strong></button>' +
                                            '<button style="width:63%;height:30px;padding:0;border:blue;margin-top:2px;" type="button" class="btn btn-success btn-lg"  onclick= categoty(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Food type' + '</strong></button>' + status + '</div>' + '</tr>'
                                        status + '</div>' + '</tr>'
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
                    function getStars(rating) {
                        rating = Math.round(rating * 2) / 2;
                        let output = [];
                        for (var i = rating; i >= 1; i--)
                            output.push('<img style="width: 20px;" src="../../../admin/assets/img/full.svg" />&nbsp;');
                        if (i == .5) output.push('<img style="width:20px;" src="../../../admin/assets/img/halfstar.svg" />&nbsp;');
                        return output.join('');
                    }
                    const stars = getStars(data.data.data[i].rating)
                    if (data.data.data[i].branchType == 'Main') {
                        localStorage.setItem('restaurantName', data.data.data[i].restaurantName ? data.data.data[i].restaurantName : "N/A")
                    }

                    if (data.data.data[i].branchNo) {
                        var branchNo = "#" + data.data.data[i].branchNo
                    } else {
                        var branchNo = '#0000'
                    }
                    if (data.data.data[i].status == 'Approved') {
                        var status = '<button type="button" style="margin-top:2px;" class="btn btn-danger btn-lg"  onclick= updateStatus(' + '\'' + data.data.data[i]._id + '\'' + "," + '\'' + data.data.data[i].status + '\'' + ')><strong>' + 'Disapprove now' + '</strong></button>'
                        // var statusName = '<button type="button" style="border-radius: 18px;border:blue;" class="btn btn-sm btn-success"><strong>' + data.data.data[i].status + '</strong></button>'
                        var statusName = '<div type="button" style="border-radius: 18px;border:blue;" class="btn btn-sm btn-success"><strong>' + data.data.data[i].status + '</strong></div>'

                    } else {
                        var status = '<button type="button" style="margin-top:2px;" class="btn btn-info btn-lg"  onclick= updateStatus(' + '\'' + data.data.data[i]._id + '\'' + "," + '\'' + data.data.data[i].status + '\'' + ')><strong>' + 'Approve now' + '</strong></button>'
                        var statusName = '<div type="button" style="border-radius: 18px;border:blue;" class="btn btn-sm btn-danger"><strong>' + data.data.data[i].status + '</strong></div>'
                    }
                    if (data.data.data[i].branchDetails.paymentMehod[0] == 'Cash On Delivery' || data.data.data[i].branchDetails.paymentMehod[1] == 'Cash On Delivery') {
                        var COD = 'Yes'
                    } else {
                        var COD = 'No'
                    }
                    if (data.data.data[i].branchDetails.paymentMehod[0] == 'Accept Card' || data.data.data[i].branchDetails.paymentMehod[1] == 'Accept Card') {
                        var Card = 'Yes,'
                    } else {
                        var Card = 'No,'
                    }
                    const obj = {
                        vendorId: data.data.data[i]._id,
                        name: localStorage.getItem('restaurantName') ? localStorage.getItem('restaurantName') : "N/A"
                    }
                    const split = (data.data.data[i].branchDetails.max_deliveryTime).split(':');
                    const hours = split[0]
                    const minutes = split[1]
                    const totalMinutes = Number(hours * 60) + Number(minutes)
                    document.getElementById('table').innerHTML += '<tr>' +
                        '<td><strong>' + branchNo + '</strong>' +
                        '<td>' + `<img src =${data.data.data[i].branchDetails.branchImage ? data.data.data[i].branchDetails.branchImage : "../../admin/assets/img/emptyphoto.png"} style = "height:50px; width:60px;">` +
                        '<td><strong>' + (data.data.data[i].branchDetails.addressDetails.fullAddress) + '</strong><div><b><span id=stars>' + stars + '</span></b></div>' +
                        '<td>' + totalMinutes +
                        '<td>' + (data.data.data[i].branchDetails.minimum_orderAmount) + " MKD" +
                        '<td>' + moment(data.data.data[i].branchDetails.openingTime, 'HH:mm A').format('HH:mm A') + " to " + moment(data.data.data[i].branchDetails.closingTime, 'HH:mm A').format('HH:mm A') +
                        '<td>' + '<div>Card:<strong>' + Card + '</strong></div><div>COD:<strong>' + COD + '</strong></div>' +
                        '<td>' + statusName +
                        '<td>' + '<button type="button" style="width:100px; border:blue;" class="btn btn-sm btn-success" onclick="menuItems(\'' + encodeURIComponent(JSON.stringify(obj)) + '\')"><strong>' + 'Menu Item:' + data.data.data[i].itemId.length + '</strong></button>' +
                        '<td><button style="width: 33%;height: 30px;padding:0" type="button" class="btn btn-primary btn-lg" onclick= orders(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Orders' + '</strong></button>' +
                        '<button style="width: 26%;margin-left: 5px;height: 30px;padding: 0;" type="button" class="btn btn-info btn-lg"  onclick= edit(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Edit' + '</strong></button>' +
                        '<div style="margin-top:2px"><button style="width:63%;height:30px;padding:0;border:blue;" type="button" class="btn btn-success btn-lg"  onclick= categoty(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Category' + '</strong></button>' +
                        '<button style="width:63%;height:30px;padding:0;border:blue;margin-top:2px;" type="button" class="btn btn-success btn-lg"  onclick= categoty(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Food type' + '</strong></button>' + status + '</div>' + '</tr>'
                    status + '</div>' + '</tr>'
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
function edit(branchId) {
    window.location.href = host + "/admin/editBranch?id=" + branchId
}


function updateStatus(Id, status) {
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
                if (status == "Disapproved") {
                    var y = "Approved"
                } else {
                    var y = "Disapproved"
                }
                $.ajax({
                    url: `${host}/api/v1/admin/restaurant/update_status`,
                    type: 'Put',
                    data: { "status": y, "vendorId": Id },
                    // contentType: 'application/json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
                    },
                    dataType: 'json',
                    success: function (data, status) {
                        // auth(data.code)
                        if (data.code == 201) {
                            swal.close();
                            branchList();
                        } else {
                            console.log("error")
                            alert("Something Wrong, Try again")
                        }
                    }
                })
            }
            else {
                swal("Cancelled", "Your file is safe :");
            }
        });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
        console.log(input.files[0], "slslsl.,,,mjj")
    }
}

function menuItems(vendorId) {
    const jsonString = decodeURIComponent(vendorId);
    const details = JSON.parse(jsonString)
    localStorage.setItem('restaurantName', details.name)
    window.location.href = '/admin/list_ItemCat?id=' + details.vendorId
}