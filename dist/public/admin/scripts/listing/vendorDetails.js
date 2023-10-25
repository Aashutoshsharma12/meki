
//***********User view Details*********/
var currentLocation = window.location.href;
var url = new URL(currentLocation);
var vendorId = url.searchParams.get("id");

function vendorDetails() {
    this.setTimeout(() => {
        if (document.getElementById('users').className == 'nav nav-second-level collapse' || document.getElementById('users').className == 'nav nav-second-level collapse in')
            document.getElementById('users')?.classList.add("in");
        document.getElementById('users-nav')?.classList.add("active");
        document.getElementById('vendor-nav')?.classList.add("active");
    }, 1500);
    $.ajax({
        url: `${host}/api/v1/admin/user/vendorDetails?&vendorId=${vendorId}`,
        type: 'Get',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
    }).done(function (data) {
        if (data.code == 200) {
            document.getElementById('name').innerHTML = data.data.profile_details.name
            document.getElementById('email').innerHTML = data.data.profile_details.email
            document.getElementById('phoneNumber').innerHTML = data.data.profile_details.countryCode + " " + data.data.profile_details.phoneNumber
            document.getElementById('name').innerHTML = data.data.profile_details.name
            document.getElementById('image').src = data.data.profile_details.image ? data.data.profile_details.image : '../../admin/assets/img/profileImage.png'
            function getStars(rating) {
                rating = Math.round(rating * 2) / 2;
                let output = [];
                for (var i = rating; i >= 1; i--)
                    output.push('<img style="width: 20px;" src="../../../admin/assets/img/full.svg" />&nbsp;');
                if (i == .5) output.push('<img style="width:20px;" src="../../../admin/assets/img/halfstar.svg" />&nbsp;');
                return output.join('');
            }
            const stars = getStars(data.data.profile_details.rating)

            if (data.data.profile_details.document_status == true) {
                var data1 = `<div class = "d-flex align-items-center"><img src =${data.data.profile_details.documents ? data.data.profile_details.documents : "../../admin/assets/img/emptyphoto.png"} style = "height: 50px;width: 65px;"><h3 style="margin-left:10px">Verified</h3></div>`
            } else {
                var data1 = '<h4 style="padding-top:0px">Document not uploaded</h4><div class="d-flex align-items-center"><input type="file" name="image" id="imageInput" accept="image/*" onchange="readURL(this);"><div id="loader1" class="loader10" style="display: none;"></div></div><div><button type="button" style="margin-top:5px" class="btn btn-sm btn-primary" id="upload_image" disabled onclick= upload(' + '\'' + data.data.profile_details._id + '\'' + ')> Upload </button></div>'
            }
            if (data.data.profile_details.branchNo) {
                var branchNo = "#" + data.data.profile_details.branchNo
            } else {
                var branchNo = '#0000'
            }
            const obj = {
                vendorId: data.data.profile_details._id,
                name: data.data.profile_details.restaurantName
            }
            if (data.data.profile_details.status == 'Approved') {
                var status = '<div class="switch-button switch-button-lg switch-button-yesno"><input type="checkbox" name="a" id="a" onclick="updateStatus(' + '\'' + data.data.profile_details._id + '\'' + "," + '\'' + data.data.profile_details.status + '\'' + ')" checked><span><label for="a"></label></span></div>'
            } else {
                var status = '<div class="switch-button switch-button-lg switch-button-yesno"><input type="checkbox" name="a" id="a" onclick="updateStatus(' + '\'' + data.data.profile_details._id + '\'' + "," + '\'' + data.data.profile_details.status + '\'' + ')" ><span><label for="a"></label></span></div>'
            }
            document.getElementById('table').innerHTML += '<tr>' +
                '<td><strong>' + branchNo + '</strong>' +
                '<td>' + `<img src =${data.data.profile_details.restaurantImage ? data.data.profile_details.restaurantImage : "../../admin/assets/img/emptyphoto.png"} style = "height: 50px;width: 65px;">` +
                '<td><strong>' + (data.data.profile_details.restaurantName) + '</strong><div><b><span id=stars>' + stars + '</span></b></div>' +
                '<td>' + status + '</td>' +
                '<td>' + data1 +
                '<td style="width:17%;"><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" onclick= edit(' + '\'' + data.data.profile_details._id + '\'' + ')><strong>' + 'Branches' + '</strong></button>' +
                '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-info"  onclick= remove(' + '\'' + data.data.profile_details._id + '\'' + ')><strong>' + 'Revenue' + '</strong></button>' +
                '<button style="margin-left: 1px;margin-top:3px;" type="button" class="btn btn-sm btn-danger"  onclick= remove(' + '\'' + data.data.profile_details._id + '\'' + ')><strong>' + 'Cancelled' + '</strong></button>' +
                '<td style="width:17%;"><button type="button" class="btn btn-sm btn-warning" data-toggle="modal"  onclick= view(' + '\'' + data.data.profile_details._id + '\'' + ')><strong>' + 'Views' + '</strong></button>' +
                '<button style="margin-left: 5px;" type="button" class="btn btn-sm btn-primary"  onclick= branches(' + '\'' + data.data.profile_details._id + '\'' + ')><strong>' + 'Branches' + '</strong></button>' +
                '<button style="margin-left: 1px;margin-top:3px;" type="button" class="btn btn-sm btn-danger"  onclick= menuItems(\'' + encodeURIComponent(JSON.stringify(obj)) + '\')><strong>' + 'Menu' + '</strong></button>' +
                '</tr>'
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        document.getElementById('loader').style.display = 'none'
        alert(jqXHR.responseJSON.error)
    })
}

function view(restaurantId) {
    window.location.href = host + "/admin/restaurantView?id=" + restaurantId
}

function branches(restaurantId) {
    window.location.href = host + "/admin/branchList?id=" + restaurantId
}

function menuItems(vendorId) {
    const jsonString = decodeURIComponent(vendorId);
    const details = JSON.parse(jsonString)
    localStorage.setItem('restaurantName', details.name)
    window.location.href = '/admin/list_ItemCat?id=' + details.vendorId
}

function readURL(input) {
    document.getElementById('loader1').style.display = 'block'
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
        document.getElementById('loader1').style.display = 'none'
        document.getElementById("upload_image").disabled = false
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

function updateStatus(Id, status) {
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
            if (data.code == 201) {
                // restaurantList();
                console.log('success')
            } else {
                console.log("error")
                alert("Something Wrong, Try again")
            }
        }
    })

}