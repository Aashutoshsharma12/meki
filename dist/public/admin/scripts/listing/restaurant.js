
// import {f} from '../../../../utils/helpers'
function restaurantList() {
    this.setTimeout(() => {
        document.getElementById('restaurant-nav')?.classList.add("active");
    }, 1500)
    const search = document.getElementById('fog').value
    var obj = {
        'page': 1,
        'perPage': 10,
        'search': ''
    }
    if (search) {
        obj.search = search
    }

    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/restaurant/list?page=${obj.page}&perPage=${obj.perPage}&search=${obj.search}`,
        type: 'GET',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        dataType: 'json',
        success: function (data, status) {
            if (data.code == 200) {
                document.getElementById('loader1').style.display = 'none'
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
                        document.getElementById('loader').style.display = 'none'

                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/admin/restaurant/list?page=${obj.page}&perPage=${obj.perPage}&search=${obj.search}`,
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
                                            // Round to nearest half
                                            rating = Math.round(rating * 2) / 2;
                                            let output = [];
                                            // Append all the filled whole stars
                                            for (var i = rating; i >= 1; i--)
                                                output.push('<img style="width: 20px;" src="../../../admin/assets/img/full.svg" />&nbsp;');
                    
                                            // If there is a half a star, append it
                                            if (i == .5) output.push('<img style="width:20px;" src="../../../admin/assets/img/halfstar.svg" />&nbsp;');
                    
                                            // Fill the empty stars
                                            // for (let i = (5 - rating); i >= 1; i--)
                                            //     output.push('<img style="width:25px;" src="../../../admin/assets/img/graystar.svg" />&nbsp;');
                                            return output.join('');
                                        }
                                        const stars = getStars(data.data.data[i].rating)                    
                                        if (data.data.data[i].document_status == true) {
                                            var data1 = `<div class = "d-flex align-items-center"><img src =${data.data.data[i].documents ? data.data.data[i].documents : "../../admin/assets/img/emptyphoto.png"} style = "height: 50px;width: 65px;"><h3 style="margin-left:10px">Verified</h3></div>`
                                        } else {
                                            var data1 = '<h4>Document not uploaded</h4><div class="d-flex align-items-center"><input type="file" name="image" id="imageInput" accept="image/*" onchange="button1(' + '\'' + "upload_image" + (i + 1) + '\'' + "," + '\'' + "loader1" + (i + 1) + '\'' + ');readURL(this);"><div id=' + "loader1" + (i + 1) + ' class="loader10" style="display: none;"></div></div><div><button type="button" style="margin-top:5px" class="btn btn-sm btn-primary" id=' + "upload_image" + (i + 1) + ' disabled onclick= upload(' + '\'' + data.data.data[i]._id + '\'' + ')> Upload </button></div>'
                                        }
                                        if (data.data.data[i].branchNo) {
                                            var branchNo = "#" + data.data.data[i].branchNo
                                        } else {
                                            var branchNo = '#0000'
                                        }
                                        const obj = {
                                            vendorId: data.data.data[i]._id,
                                            name: data.data.data[i].restaurantName
                                        }
                                        if (data.data.data[i].status == 'Approved') {
                                            var status = '<div class="switch-button switch-button-lg switch-button-yesno"><input type="checkbox" name=' + (i + 1) + ' id=' + (i + 1) + ' onclick="updateStatus(' + '\'' + data.data.data[i]._id + '\'' + "," + '\'' + data.data.data[i].status + '\'' + ')" checked><span><label for=' + (i + 1) + '></label></span></div>'
                                        } else {
                                            var status = '<div class="switch-button switch-button-lg switch-button-yesno"><input type="checkbox" name=' + (i + 1) + ' id=' + (i + 1) + ' onclick="updateStatus(' + '\'' + data.data.data[i]._id + '\'' + "," + '\'' + data.data.data[i].status + '\'' + ')" ><span><label for=' + (i + 1) + '></label></span></div>'
                                        }
                                        document.getElementById('table').innerHTML += '<tr>' +
                                            '<td><strong>' + branchNo + '</strong>' +
                                            '<td>' + `<img src =${data.data.data[i].restaurantImage ? data.data.data[i].restaurantImage : "../../admin/assets/img/emptyphoto.png"} style = "height: 50px;width: 65px;">` +
                                            '<td><strong>' + (data.data.data[i].restaurantName) + '</strong><div><b><span id=stars>' + stars + '</span></b></div>' +
                                            '<td>' + status +
                                            '<td>' + data1 +
                                            '<td style="color:green"><strong>' + (data.data.data[i].name) + '</strong>' +
                                            '<td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Branches' + '</strong></button>' +
                                            '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-info"  onclick= remove(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Revenue' + '</strong></button>' +
                                            '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-danger"  onclick= remove(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Cancelled' + '</strong></button>' +
                                            '<td><button type="button" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#myModal2" onclick= view(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Views' + '</strong></button>' +
                                            '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-primary"  onclick= branches(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Branches:' + data.data.data[i].totalBranch + '</strong></button>' +
                                            '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-danger"  onclick= menuItems(\'' + encodeURIComponent(JSON.stringify(obj)) + '\')><strong>' + 'Menu Items:' + data.data.data[i].itemId.length + '</strong></button>' +
                                            '</tr>'
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
                    // const rating = data.data.data[i].rating
                    function getStars(rating) {
                        // Round to nearest half
                        rating = Math.round(rating * 2) / 2;
                        let output = [];
                        // Append all the filled whole stars
                        for (var i = rating; i >= 1; i--)
                            output.push('<img style="width: 20px;" src="../../../admin/assets/img/full.svg" />&nbsp;');

                        // If there is a half a star, append it
                        if (i == .5) output.push('<img style="width:20px;" src="../../../admin/assets/img/halfstar.svg" />&nbsp;');

                        // Fill the empty stars
                        // for (let i = (5 - rating); i >= 1; i--)
                        //     output.push('<img style="width:25px;" src="../../../admin/assets/img/graystar.svg" />&nbsp;');
                        return output.join('');
                    }
                    const stars = getStars(data.data.data[i].rating)
                    // console.log(stars, "s;s;s;s", data.data.data[i].rating)

                    if (data.data.data[i].document_status == true) {
                        var data1 = `<div class = "d-flex align-items-center"><img src =${data.data.data[i].documents ? data.data.data[i].documents : "../../admin/assets/img/emptyphoto.png"} style = "height: 50px;width: 65px;"><h3 style="margin-left:10px">Verified</h3></div>`
                    } else {
                        var data1 = '<h4>Document not uploaded</h4><div class="d-flex align-items-center"><input type="file" name="image" id="imageInput" accept="image/*" onchange="button1(' + '\'' + "upload_image" + (i + 1) + '\'' + "," + '\'' + "loader1" + (i + 1) + '\'' + ');readURL(this);"><div id=' + "loader1" + (i + 1) + ' class="loader10" style="display: none;"></div></div><div><button type="button" style="margin-top:5px" class="btn btn-sm btn-primary" id=' + "upload_image" + (i + 1) + ' disabled onclick= upload(' + '\'' + data.data.data[i]._id + '\'' + ')> Upload </button></div>'
                        // var data1 = '<h4>Document not uploaded</h4><input type="file" name="image" id="imageInput" accept="image/*" onchange="readURL(this)"><div><button type="submit" style="margin-top:7px" class="btn btn-sm btn-primary" onclick= upload1(' + '\'' + data.data.data[i]._id + '\'' + ')> Upload </button></div>'
                    }
                    if (data.data.data[i].branchNo) {
                        var branchNo = "#" + data.data.data[i].branchNo
                    } else {
                        var branchNo = '#0000'
                    }
                    const obj = {
                        vendorId: data.data.data[i]._id,
                        name: data.data.data[i].restaurantName
                    }
                    if (data.data.data[i].status == 'Approved') {
                        var status = '<div class="switch-button switch-button-lg switch-button-yesno"><input type="checkbox" name=' + (i + 1) + ' id=' + (i + 1) + ' onclick="updateStatus(' + '\'' + data.data.data[i]._id + '\'' + "," + '\'' + data.data.data[i].status + '\'' + ')" checked><span><label for=' + (i + 1) + '></label></span></div>'
                    } else {
                        var status = '<div class="switch-button switch-button-lg switch-button-yesno"><input type="checkbox" name=' + (i + 1) + ' id=' + (i + 1) + ' onclick="updateStatus(' + '\'' + data.data.data[i]._id + '\'' + "," + '\'' + data.data.data[i].status + '\'' + ')" ><span><label for=' + (i + 1) + '></label></span></div>'

                    }
                    document.getElementById('table').innerHTML += '<tr>' +
                        '<td><strong>' + branchNo + '</strong>' +
                        '<td>' + `<img src =${data.data.data[i].restaurantImage ? data.data.data[i].restaurantImage : "../../admin/assets/img/emptyphoto.png"} style = "height: 50px;width: 65px;">` +
                        '<td><strong>' + (data.data.data[i].restaurantName) + '</strong><div><b><span id=stars>' + stars + '</span></b></div>' +
                        '<td>' + status +
                        '<td>' + data1 +
                        '<td style="color:green"><strong>' + (data.data.data[i].name) + '</strong>' +
                        '<td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#myModal2" onclick= edit(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Branches' + '</strong></button>' +
                        '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-info"  onclick= remove(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Revenue' + '</strong></button>' +
                        '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-danger"  onclick= remove(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Cancelled' + '</strong></button>' +
                        '<td><button type="button" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#myModal2" onclick= view(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Views' + '</strong></button>' +
                        '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-primary"  onclick= branches(' + '\'' + data.data.data[i]._id + '\'' + ')><strong>' + 'Branches:' + data.data.data[i].totalBranch + '</strong></button>' +
                        '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-danger"  onclick= menuItems(\'' + encodeURIComponent(JSON.stringify(obj)) + '\')><strong>' + 'Menu Items:' + data.data.data[i].itemId.length + '</strong></button>' +
                        '</tr>'
                }
            } else {
                document.getElementById('loader1').style.display = 'none'
                $("#table").html(' ');
                $("#table2").addClass("hide");
                document.getElementById('noData').style.display = 'block'
                $("#page1").hide();
            }
        }
    });
}

function addRestaurant() {
    window.location.replace('/admin/addRestaurant')
}

function view(restaurantId) {
    window.location.href = host + "/admin/restaurantView?id=" + restaurantId
}
function branches(restaurantId) {
    window.location.href = host + "/admin/branchList?id=" + restaurantId
}

function updateStatus(Id, status) {
    // swal({
    //     title: "Are you sure?",
    //     text: "Ready to Action!",
    //     type: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#DD6B55",
    //     confirmButtonText: "Yes, Take Action!",
    //     cancelButtonText: "No, leave pls!",
    //     closeOnConfirm: false,
    //     closeOnCancel: true
    // },
    //     function (isConfirm) {
    //         if (isConfirm) {
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
                // swal.close();
                // restaurantList();
                console.log('success')
            } else {
                console.log("error")
                alert("Something Wrong, Try again")
            }
        }
    })
   
}
// function menuItems(vendorId) {
//     const jsonString = decodeURIComponent(vendorId);

//     console.log(JSON.parse(jsonString), "slslsl", name)
//     // localStorage.setItem('restaurantName',name)
//     // window.location.href = '/admin/list_ItemCat?id=' + vendorId
// }
function menuItems(vendorId) {
    const jsonString = decodeURIComponent(vendorId);
    const details = JSON.parse(jsonString)
    localStorage.setItem('restaurantName', details.name)
    window.location.href = '/admin/list_ItemCat?id=' + details.vendorId
}
function button1(data, data1) {
    localStorage.setItem('buttonId', data)
    localStorage.setItem('loaderId', data1)
}
function readURL(input) {
    document.getElementById(localStorage.getItem('loaderId')).style.display = 'block'
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            upload1(e.target.result)
            $('#blah')
                .attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}
const upload1 = async (input) => {
    $.ajax({
        url: host + '/api/v1/upload_image',
        type: 'Post',
        data: { image: input },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
        }
    }).done(function (data) {
        localStorage.setItem('imageUrl', JSON.stringify(data.data))
        document.getElementById(localStorage.getItem("loaderId")).style.display = 'none'
        document.getElementById(localStorage.getItem("buttonId")).disabled = false
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseJSON.error)
    })
}
function upload(vendorId) {
    swal({
        title: "Are you want to upload documents?",
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
                    url: `${host}/api/v1/admin/restaurant/upload_document`,
                    type: 'Post',
                    data: { "image": JSON.parse(localStorage.getItem('imageUrl')), "vendorId": vendorId },
                    // contentType: 'application/json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
                    },
                    dataType: 'json',
                }).done(function (data) {
                    localStorage.removeItem('imageUrl');
                    swal.close();
                    restaurantList();
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    alert(jqXHR.responseJSON.error)
                })
            }
            else {
                swal("Cancelled", "Your file is safe :");
            }
        });
}