var currentLocation = window.location.href;
var url = new URL(currentLocation);
var id = url.searchParams.get("id");
const split = id.split(',');
const itemId = split[1]
const vendorId = split[0]

function addAddonCat() {
    window.location.href = '/admin/addAddons_Cat?id=' + vendorId
}
function restaurantList() {
    window.location.replace('/admin/restaurant')
}

function edit(item_categoryId) {
    window.location.href = '/admin/edit_ItemCat?id=' + [vendorId, item_categoryId]
}

function addAddons(id) {
    const split = id.split(',')
    const vendorId = split[0]
    const itemId = split[1]
    const addonsCatId = split[2]
    window.location.href = '/admin/addAddons?id=' + [vendorId, itemId, addonsCatId]
}

function addonsCat_list() {
    this.setTimeout(() => {
        document.getElementById('restaurant-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'perPage': 10,
        'vendorId': vendorId,
        'itemId': itemId
    }
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/addons_cat/list?page=${obj.page}&perPage=${obj.perPage}&vendorId=${obj.vendorId}&itemId=${obj.itemId}`,
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
                            'perPage': options.length,
                            'vendorId': vendorId,
                            'itemId': itemId
                        }

                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/admin/addons_cat/list?page=${obj.page}&perPage=${obj.perPage}&vendorId=${obj.vendorId}&itemId=${obj.itemId}`,
                            type: 'GET',
                            contentType: 'application/json',
                            // data: JSON.stringify(obj),
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', token);
                            },
                            dataType: 'json',
                            success: function (data, status) {
                                if (data.code == 200) {
                                    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                                    $("#dynamic").html(' ');
                                    for (var i = 0; i < data.data.result.length; i++) {
                                        let addons = ''
                                        if (data.data.result[i].addonsList.length) {
                                            for (var j = 0; j < data.data.result[i].addonsList.length; j++) {
                                                addons += `<div class="col-6 col-sm-3 col-md-2 col-lg-2 my-3">
                                                <div class="d-flex justify-content-center align-items-center shadow-lg py-3 px-4"
                                                    style="border-radius: 10px; background-color:antiquewhite;">
                                                    <div class="d-flex flex-column justify-content-center align-items-center">
                                                        <h3 style="font-weight: 600;">${data.data.result[i].addonsList[j].name}</h3>
                                                        <h3 class="fw-bold"><strong>Price:</strong> <span
                                                                style="font-weight: 600;">${data.data.result[i].addonsList[j].price} MKD</span></h3>
                                                        <div class="d-flex gap-2">
                                                            <button type=" button" class="btn btn-sm btn-danger"
                                                                onclick="deleteAddons('${data.data.result[i].addonsList[j]._id}');"><strong><img style="color: white;"
                                                                        src="../../admin/assets/img/icons8-delete-50.png" width="16px"
                                                                        height="20px"></strong></button>
                                                            <button
                                                                style="margin-left: 4px;background-color:rgba(210, 129, 30, 0.955); ;"
                                                                type=" button" class="btn btn-sm btn-white"
                                                                onclick="editAddons('${data.data.result[i].addonsList[j].vendorId},${itemId},${data.data.result[i].addonsList[j]._id}');"><strong><img
                                                                        src="../../admin/assets/img/editpen.svg"></strong></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
                                            }
                                        } else {
                                            addons = `<div class="col-12 col-sm-6 col-md-9 col-lg-9 my-3"><h3 class="d-flex justify-content-center">No Addons</h3></div>`
                                        }
                                        document.getElementById('dynamic').innerHTML += ` <div class="col-lg-12 mt-4">
                                        <div class="ibox-title d-flex align-items-center justify-content-between"
                                            style="background-color:rgba(210, 129, 30, 0.955);">
                                            <h3 style="color: white;"><strong>${data.data.result[i].addonsCat.name}</strong></h3>
                                            <div>
                                                <button type=" button" class="btn btn-sm btn-white"
                                                    onclick="editAddons_cat('${data.data.result[i].addonsCat.vendorId},${data.data.result[i].addonsCat._id}');"><strong><img
                                                            src="../../admin/assets/img/pencil-24.png"></strong></button>
                                            </div>
                                        </div>
                                        <div class="row m-0 w-100">
                                            <div class="py-2 px-3 col-6 col-sm-3 col-md-2 col-lg-2 my-2">
                                                <button class="addBtn shadow" style="border-radius: 10px; height: 120px;"
                                                    onclick="addAddons('${data.data.result[i].addonsCat.vendorId},${itemId},${data.data.result[i].addonsCat._id}')"><img src="../../admin/assets/img/plus_icon.svg"
                                                        width="70px"></button>
                                            </div>`+ addons + `</div></div>`
                                    }
                                }
                            }
                        })
                        $target.next(".show").text('Current: ' + options.current);
                    }
                })
                $("#dynamic").html(' ');
                for (var i = 0; i < data.data.result.length; i++) {
                    let addons = ''
                    if (data.data.result[i].addonsList.length) {
                        for (var j = 0; j < data.data.result[i].addonsList.length; j++) {
                            addons += `<div class="col-6 col-sm-3 col-md-2 col-lg-2 my-3">
                            <div class="d-flex justify-content-center align-items-center shadow-lg py-3 px-4"
                                style="border-radius: 10px; background-color:antiquewhite;">
                                <div class="d-flex flex-column justify-content-center align-items-center">
                                    <h3 style="font-weight: 600;">${data.data.result[i].addonsList[j].name}</h3>
                                    <h3 class="fw-bold"><strong>Price:</strong> <span
                                            style="font-weight: 600;">${data.data.result[i].addonsList[j].price} MKD</span></h3>
                                    <div class="d-flex gap-2">
                                        <button type=" button" class="btn btn-sm btn-danger"
                                            onclick="deleteAddons('${data.data.result[i].addonsList[j]._id}');"><strong><img style="color: white;"
                                                    src="../../admin/assets/img/icons8-delete-50.png" width="16px"
                                                    height="20px"></strong></button>
                                        <button
                                            style="margin-left: 4px;background-color:rgba(210, 129, 30, 0.955); ;"
                                            type=" button" class="btn btn-sm btn-white"
                                            onclick="editAddons('${data.data.result[i].addonsList[j].vendorId},${itemId},${data.data.result[i].addonsList[j]._id}');"><strong><img
                                                    src="../../admin/assets/img/editpen.svg"></strong></button>
                                    </div>
                                </div>
                            </div>
                        </div>`
                        }
                    } else {
                        addons = `<div class="col-12 col-sm-6 col-md-9 col-lg-9 my-3"><h3 class="d-flex justify-content-center">No Addons</h3></div>`
                    }
                    document.getElementById('dynamic').innerHTML += ` <div class="col-lg-12 mt-4">
                    <div class="ibox-title d-flex align-items-center justify-content-between"
                        style="background-color:rgba(210, 129, 30, 0.955);">
                        <h3 style="color: white;"><strong>${data.data.result[i].addonsCat.name}</strong></h3>
                        <div>
                            <button type=" button" class="btn btn-white btn-lg" style="background-color:white"
                                onclick="editAddons_cat('${data.data.result[i].addonsCat.vendorId},${data.data.result[i].addonsCat._id}');"><strong><img
                                        src="../../admin/assets/img/pencil-24.png"></strong></button>
                        </div>
                    </div>
                    <div class="row m-0 w-100">
                        <div class="py-2 px-3 col-6 col-sm-3 col-md-2 col-lg-2 my-2">
                            <button class="addBtn shadow" style="border-radius: 10px; height: 120px;"
                                onclick="addAddons('${data.data.result[i].addonsCat.vendorId},${itemId},${data.data.result[i].addonsCat._id}')"><img src="../../admin/assets/img/plus_icon.svg"
                                    width="70px"></button>
                        </div>`+ addons + `</div></div>`
                }
            } else {
                document.getElementById('loader').style.display = 'none'
                // $("#table2").addClass("hide");
                $("#dynamic").html(' ');
                document.getElementById('noData').style.display = 'block'
                $("#page1").hide();
            }
        }
    });
}

function editAddons(itemId) {
    window.location.href = '/admin/editAddons?id=' + itemId
}

function deleteAddons(addonsId) {
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
                    url: `${host}/api/v1/admin/addons/delete?vendorId=${vendorId}&addonsId=${addonsId}`,
                    type: 'Delete',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
                    },
                    dataType: 'json',
                    success: function (data, status) {
                        if (data.code == 200) {
                            swal.close();
                            addonsCat_list();
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

function addons(vendorId) {
    const split = vendorId.split(',')
    localStorage.setItem('itemName', split[1])
    window.location.href = '/admin/addonsList?id=' + split[0]
}

function editAddons_cat(obj) {
    const split = obj.split(',')
    window.location.href = '/admin/editAddons_Cat?id=' + [split[0], split[1]]
}

function backtoMenuItem(){
    window.location.href = '/admin/list_ItemCat?id=' + vendorId

}