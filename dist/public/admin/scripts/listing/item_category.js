var currentLocation = window.location.href;
var url = new URL(currentLocation);
var vendorId = url.searchParams.get("id");

function addItemCat() {
    window.location.href = '/admin/add_ItemCat?id=' + vendorId
}
function restaurantList() {
    window.location.replace('/admin/restaurant')
}
function deleteCat(item_categoryId) {
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
                    url: `${host}/api/v1/admin/item_category/deleteItemCategory?vendorId=${vendorId}&itemCategoryId=${item_categoryId}`,
                    type: 'Delete',
                    // data: { "status": y, "vendorId": Id },
                    // contentType: 'application/json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
                    },
                    dataType: 'json',
                    success: function (data, status) {
                        // auth(data.code)
                        if (data.code == 200) {
                            swal.close();
                            // window.location.reload()
                            itemCat_list();
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
function edit(item_categoryId) {
    window.location.href = '/admin/edit_ItemCat?id=' + [vendorId, item_categoryId]
}

// function addItem() {
//     window.location.href = '/admin/add_ItemCat?id=' + vendorId
// }

function itemCat_list() {
    this.setTimeout(() => {
        document.getElementById('restaurant-nav')?.classList.add("active");
    }, 1500)
    var obj = {
        'page': 1,
        'perPage': 20,
        'vendorId': vendorId
    }
    // document.getElementById('dynamic').innerHTML = ''

    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: `${host}/api/v1/admin/item_category/ItemCategoryList?page=${obj.page}&perPage=${obj.perPage}&vendorId=${obj.vendorId}`,
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
                    length: 20,
                    prev: 'Previous',
                    next: 'Next',
                    click: function (options, $target) {
                        let obj = {
                            'page': options.current,
                            'perPage': options.length,
                            'vendorId': vendorId
                        }

                        $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                        $.ajax({
                            url: `${host}/api/v1/admin/item_category/ItemCategoryList?page=${obj.page}&perPage=${obj.perPage}&vendorId=${obj.vendorId}`,
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
                                    for (var i = 0; i < data.data.array.length; i++) {
                                        let item = ''
                                        if (data.data.array[i].itemDetails.length) {
                                            for (var j = 0; j < data.data.array[i].itemDetails.length; j++) {
                                                if (data.data.array[i].itemDetails[j].available == true) {
                                                    var available = 'Available'
                                                } else {
                                                    var available = 'Unavailable'
                                                }
                                                if (data.data.array[i].itemDetails[j].menuType == 'veg') {
                                                    var body = `<div class="cardRightIcon">
                                                        <div class="centerIcon"></div>
                                                        <small>Veg</small>
                                                    </div>`
                                                } else {
                                                    var body = `<div class="cardRightIcon1">
                                                    <div class="centerIcon1"></div>
                                                    <small>Non-Veg</small>
                                                </div>`
                                                }
                                                // item += '<div class="col-12 col-sm-6 col-md-3 col-lg-3 my-3"><div class="d-flex align-items-center shadow-lg py-2 px-3 "><div class="d-flex flex-column align-items-center"><img src= ' + data.data.array[i].itemDetails[j].image + ' style="background-color: red;width: 55px;height:55px"> <p class="fw-bold fs-base">' + data.data.array[i].itemDetails[j].name + '</p> <div class="d-flex gap-2"><button type=" button" class="btn btn-sm btn-info"onclick="editItem(' + '\'' + data.data.array[i].itemDetails[j]._id + '\'' + ');"><strong><img src="../../admin/assets/img/editpen.svg"></strong></button> <button style="margin-left: 4px;" type=" button" class="btn btn-sm btn-danger" onclick="deleteItem(' + '\'' + data.data.array[i].itemDetails[j]._id + '\'' + ');"><strong><img style="color: white;" src="../../admin/assets/img/delete.svg" width="16px" height="20px"></strong></button></div><button class="btn btn-success" style="margin-top: 3px;width:130px" onclick="addons(' + '\'' + data.data.array[i].itemDetails[j]._id + '\'' + ')"><strong>Manage Addons</strong></button></div> <div class="right" style="margin-left: 33px;"> <div class="d-flex"> <span style="margin-top: 30px;"><button class="btn btn-info" disabled><strong>' + available + '</strong></button></span><span></span></div> <div class="d-flex"> <h2 class=""><strong>Price: </strong><span>' + data.data.array[i].itemDetails[j].price + " " + 'USD' + '</span></h2></div><div class="d-flex"> <h2><strong>Calories:</strong> <span>N/A</span></h2></div> <div class="d-flex"> <h2><strong>Addons: </strong><span>0</span></h2></div></div></div></div>'
                                                item += `<div class="col-12 col-sm-6 col-md-6 col-lg-3 my-3">
                                                <div class="d-flex justify-content-between shadow-lg py-3 px-2"
                                                    style="border-radius: 10px;">
                                                    <div class="d-flex flex-column align-items-center">
                                                        <img src=${data.data.array[i].itemDetails[j].image}
                                                            style="background-color: red;width: 62px;height:50px">
                                                        <p class="fw-bold fs-base pt-4 pb-0 m-0 "><strong>${data.data.array[i].itemDetails[j].name}</strong></p>
                                                        <div class="d-flex gap-2">
                                                            <button type=" button" class="btn btn-sm btn-white" style="background-color:rgba(210, 129, 30, 0.955);"
                                                                onclick="editItem('${data.data.array[i].itemDetails[j]._id}');"><strong><img
                                                                        src="../../admin/assets/img/editpen.svg"></strong></button>
                                                            <button style="margin-left: 4px;" type=" button"
                                                                class="btn btn-sm btn-danger" onclick="deleteItem('${data.data.array[i].itemDetails[j]._id}');"><strong><img
                                                                        style="color: white;"
                                                                        src="../../admin/assets/img/icons8-delete-50.png" width="16px"
                                                                        height="20px"></strong></button>
                                                        </div>
                                                        <button style="margin-top: 3px;" class="btn btn-info" onclick="manageSize('${data.data.array[i].catDetails.vendorId},${data.data.array[i].itemDetails[j]._id}')">Manage
                                                        Size</button>
                                                        <button style="margin-top: 3px;" class="btn btn-primary" onclick="addons('${data.data.array[i].catDetails.vendorId},${data.data.array[i].itemDetails[j].name},${data.data.array[i].itemDetails[j]._id}')">Manage
                                                            Addons</button>
                                                           
                                                    </div>
                                                    <div class="right">
                                                        <div class="d-flex">
                                                            <span><button class="btn btn-info"
                                                                    disabled><strong>${available}</strong></button></span>
                                                            <span></span>
                                                        </div>
                                                        <div class="d-flex mt-3">
                                                            <h3><strong>Price: </strong><span>${data.data.array[i].itemDetails[j].price} MKD</span></h3>
                                                        </div>
                                                        <div class="d-flex mt-2">
                                                            <h3><strong>Calories:</strong> <span>N/A</span></h3>
                                                        </div>
                                                        <div class="d-flex mt-2">
                                                            <h3><strong>Addons: </strong><span>${data.data.array[i].itemDetails[j].menuSize_count}</span></h3>
                                                        </div>
                                                    </div>
                                                    ${body}
                                                </div>
                                            </div>`
                                            }
                                        } else {
                                            item = `<div class="col-12 col-sm-6 col-md-9 col-lg-9 my-3"><h3 class="d-flex justify-content-center">No menu items</h3></div>`
                                        }
                                        // document.getElementById('dynamic').innerHTML += '<div class="col-lg-12 mt-4"><div class="ibox-title d-flex align-items-center justify-content-between"style="background-color: blue;"><h3 style="color: white;"><strong>Category:<span>' + data.data.array[i].catDetails.name + '</span></strong></h3><div><button type=" button" class="btn btn-sm btn-danger" onclick="deleteCat(' + '\'' + data.data.array[i].catDetails._id + '\'' + ');"><strong><img style="color: white;" src="../../admin/assets/img/delete.svg" width="16px" height="20px"></strong></button> <button type=" button" class="btn btn-sm btn-info" onclick="edit(' + '\'' + data.data.array[i].catDetails._id + '\'' + ');"><strong><img src="../../admin/assets/img/editpen.svg"></strong></button></div></div><div class="row m-0 w-100"><div class="py-2 px-3 col-12 col-sm-6 col-md-3 col-lg-3 my-2"><button class="addBtn" onclick="addItem(' + '\'' + data.data.array[i].catDetails.vendorId + "," + data.data.array[i].catDetails.name + '\'' + ')"><img src="../../admin/assets/img/plus_icon.svg" width="70px"></button></div>' + item
                                        document.getElementById('dynamic').innerHTML += `<div class="col-lg-12 mt-4">
                                        <div class="ibox-title d-flex align-items-center justify-content-between"style="background-color: blue;"><h3 style="color: white;"><strong>Category:<span>${data.data.array[i].catDetails.name}</span></strong></h3>
                                        <div><button type=" button" class="btn btn-sm btn-danger" onclick="deleteCat('${data.data.array[i].catDetails._id}');">
                                        <strong><img style="color: white;" src="../../admin/assets/img/delete.svg" width="16px" height="20px"></strong></button> 
                                        <button type=" button" class="btn btn-sm btn-info" onclick="edit('${data.data.array[i].catDetails._id}');"><strong><img src="../../admin/assets/img/editpen.svg"></strong></button>
                                        </div></div><div class="row m-0 w-100"><div class="py-2 px-3 col-12 col-sm-6 col-md-3 col-lg-3 my-2"><button style="border-radius:10px" class="addBtn" onclick="addItem('${data.data.array[i].catDetails.vendorId},${data.data.array[i].catDetails.name}')"><img src="../../admin/assets/img/plus_icon.svg" width="70px"></button></div>` + item

                                    }
                                }
                            }
                        })
                        $target.next(".show").text('Current: ' + options.current);
                    }
                })
                $("#dynamic").html(' ');
                for (var i = 0; i < data.data.array.length; i++) {
                    let item = ''
                    if (data.data.array[i].itemDetails.length) {
                        for (var j = 0; j < data.data.array[i].itemDetails.length; j++) {
                            if (data.data.array[i].itemDetails[j].available == true) {
                                var available = 'Available'
                            } else {
                                var available = 'Unavailable'
                            }
                            if (data.data.array[i].itemDetails[j].menuType == 'veg') {
                                var body = `<div class="cardRightIcon">
                                    <div class="centerIcon"></div>
                                    <small>Veg</small>
                                </div>`
                            } else {
                                var body = `<div class="cardRightIcon1">
                                <div class="centerIcon1"></div>
                                <small>Non-Veg</small>
                            </div>`
                            }
                            // item += '<div class="col-12 col-sm-6 col-md-3 col-lg-3 my-3"><div class="d-flex align-items-center shadow-lg py-2 px-3 "><div class="d-flex flex-column align-items-center"><img src= ' + data.data.array[i].itemDetails[j].image + ' style="background-color: red;width: 55px;height:55px"> <p class="fw-bold fs-base">' + data.data.array[i].itemDetails[j].name + '</p> <div class="d-flex gap-2"><button type=" button" class="btn btn-sm btn-info"onclick="editItem(' + '\'' + data.data.array[i].itemDetails[j]._id + '\'' + ');"><strong><img src="../../admin/assets/img/editpen.svg"></strong></button> <button style="margin-left: 4px;" type=" button" class="btn btn-sm btn-danger" onclick="deleteItem(' + '\'' + data.data.array[i].itemDetails[j]._id + '\'' + ');"><strong><img style="color: white;" src="../../admin/assets/img/delete.svg" width="16px" height="20px"></strong></button></div><button class="btn btn-success" style="margin-top: 3px;width:130px" onclick="addons(' + '\'' + data.data.array[i].itemDetails[j]._id + '\'' + ')"><strong>Manage Addons</strong></button></div> <div class="right" style="margin-left: 33px;"> <div class="d-flex"> <span style="margin-top: 30px;"><button class="btn btn-info" disabled><strong>' + available + '</strong></button></span><span></span></div> <div class="d-flex"> <h2 class=""><strong>Price: </strong><span>' + data.data.array[i].itemDetails[j].price + " " + 'USD' + '</span></h2></div><div class="d-flex"> <h2><strong>Calories:</strong> <span>N/A</span></h2></div> <div class="d-flex"> <h2><strong>Addons: </strong><span>0</span></h2></div></div></div></div>'
                            item += `<div class="col-12 col-sm-6 col-md-6 col-lg-3 my-3">
                            <div class="d-flex justify-content-between shadow-lg py-3 px-2"
                                style="border-radius: 10px;">
                                <div class="d-flex flex-column align-items-center">
                                    <img src=${data.data.array[i].itemDetails[j].image}
                                        style="background-color: red;width: 62px;height:50px">
                                    <p class="fw-bold fs-base pt-4 pb-0 m-0 "><strong>${data.data.array[i].itemDetails[j].name}</strong></p>
                                    <div class="d-flex gap-2">
                                        <button type=" button" class="btn btn-sm btn-white" style="background-color:rgba(210, 129, 30, 0.955);"
                                            onclick="editItem('${data.data.array[i].itemDetails[j]._id}');"><strong><img
                                                    src="../../admin/assets/img/editpen.svg"></strong></button>
                                        <button style="margin-left: 4px;" type=" button"
                                            class="btn btn-sm btn-danger" onclick="deleteItem('${data.data.array[i].itemDetails[j]._id}');"><strong><img
                                                    style="color: white;"
                                                    src="../../admin/assets/img/icons8-delete-50.png" width="16px"
                                                    height="20px"></strong></button>
                                    </div>
                                    <button style="margin-top: 3px;" class="btn btn-info" onclick="manageSize('${data.data.array[i].catDetails.vendorId},${data.data.array[i].itemDetails[j]._id}')">Manage
                                    Size</button>
                                    <button style="margin-top: 3px;" class="btn btn-primary" onclick="addons('${data.data.array[i].catDetails.vendorId},${data.data.array[i].itemDetails[j].name},${data.data.array[i].itemDetails[j]._id}')">Manage
                                        Addons</button>
                                       
                                </div>
                                <div class="right">
                                    <div class="d-flex">
                                        <span><button class="btn btn-info"
                                                disabled><strong>${available}</strong></button></span>
                                        <span></span>
                                    </div>
                                    <div class="d-flex mt-3">
                                        <h3><strong>Price: </strong><span>${data.data.array[i].itemDetails[j].price} MKD</span></h3>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <h3><strong>Calories:</strong> <span>N/A</span></h3>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <h3><strong>Addons: </strong><span>${data.data.array[i].itemDetails[j].menuSize_count}</span></h3>
                                    </div>
                                </div>
                                ${body}
                            </div>
                        </div>`
                        }
                    } else {
                        item = `<div class="col-12 col-sm-6 col-md-9 col-lg-9 my-3"><h3 class="d-flex justify-content-center">No menu items</h3></div>`
                    }
                    // document.getElementById('dynamic').innerHTML += '<div class="col-lg-12 mt-4"><div class="ibox-title d-flex align-items-center justify-content-between"style="background-color: blue;"><h3 style="color: white;"><strong>Category:<span>' + data.data.array[i].catDetails.name + '</span></strong></h3><div><button type=" button" class="btn btn-sm btn-danger" onclick="deleteCat(' + '\'' + data.data.array[i].catDetails._id + '\'' + ');"><strong><img style="color: white;" src="../../admin/assets/img/delete.svg" width="16px" height="20px"></strong></button> <button type=" button" class="btn btn-sm btn-info" onclick="edit(' + '\'' + data.data.array[i].catDetails._id + '\'' + ');"><strong><img src="../../admin/assets/img/editpen.svg"></strong></button></div></div><div class="row m-0 w-100"><div class="py-2 px-3 col-12 col-sm-6 col-md-3 col-lg-3 my-2"><button class="addBtn" onclick="addItem(' + '\'' + data.data.array[i].catDetails.vendorId + "," + data.data.array[i].catDetails.name + '\'' + ')"><img src="../../admin/assets/img/plus_icon.svg" width="70px"></button></div>' + item
                    document.getElementById('dynamic').innerHTML += `<div class="col-lg-12 mt-4">
                    <div class="ibox-title d-flex align-items-center justify-content-between"style="background-color: blue;"><h3 style="color: white;"><strong>Category:<span>${data.data.array[i].catDetails.name}</span></strong></h3>
                    <div><button type=" button" class="btn btn-sm btn-danger" onclick="deleteCat('${data.data.array[i].catDetails._id}');">
                    <strong><img style="color: white;" src="../../admin/assets/img/delete.svg" width="16px" height="20px"></strong></button> 
                    <button type=" button" class="btn btn-sm btn-info" onclick="edit('${data.data.array[i].catDetails._id}');"><strong><img src="../../admin/assets/img/editpen.svg"></strong></button>
                    </div></div><div class="row m-0 w-100"><div class="py-2 px-3 col-12 col-sm-6 col-md-3 col-lg-3 my-2"><button style="border-radius:10px" class="addBtn" onclick="addItem('${data.data.array[i].catDetails.vendorId},${data.data.array[i].catDetails.name}')"><img src="../../admin/assets/img/plus_icon.svg" width="70px"></button></div>` + item

                }
            } else {
                document.getElementById('loader1').style.display = 'none'

                // $("#table2").addClass("hide");
                $("#dynamic").html(' ');
                document.getElementById('noData').style.display = 'block'
                $("#page1").hide();
            }
        }
    });
}

function addItem(vendorId) {
    window.location.href = '/admin/addMenuItem?id=' + vendorId
}

function editItem(itemId) {
    window.location.href = '/admin/editMenuItem?id=' + [vendorId, itemId]
}

function deleteItem(itemId) {
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
                    url: `${host}/api/v1/admin/menuItem/DeleteItemMenu?vendorId=${vendorId}&itemId=${itemId}`,
                    type: 'Delete',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
                    },
                    dataType: 'json',
                    success: function (data, status) {
                        if (data.code == 200) {
                            swal.close();
                            itemCat_list();
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
    localStorage.setItem('itemId', split[2])
    window.location.href = '/admin/addonsCatList?id=' + [split[0], split[2]]
}

function manageSize(vendorId) {
    window.location.href = '/admin/sizeList?id=' + vendorId
}