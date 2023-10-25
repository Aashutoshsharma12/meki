var currentLocation = window.location.href;
var url = new URL(currentLocation);
var Id = url.searchParams.get("id");
const ArrayId = Id.split(',')
const vendorId = ArrayId[0]
const itemId = ArrayId[1]

function back1() {
    window.location.href = '/admin/list_ItemCat?id=' + vendorId
}

$(document).ready(function () {
    // When the document is ready, attach a submit event handler to the form
    $('#form_menuItem').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const data1 = document.getElementById('addButton')
        data1.disabled = true
        data1.innerHTML = 'Updating ---'
        var formData = new FormData(this);
        // formData.append('vendorId', document.getElementById('vendorId').value)
        // formData.append('itemId', document.getElementById('itemId').value)
        $.ajax({
            url: host + '/api/v1/admin/menuItem/EditItem',
            type: 'Put',
            data: formData,
            // contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            contentType: false,
            processData: false,
            // dataType: 'json',

        }).done(function (data) {
            data1.disabled = false
            data1.innerHTML = 'Edit Item'
            window.location.href = '/admin/list_ItemCat?id=' + vendorId
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, "slsl")
            alert(jqXHR.responseJSON.error)
            data1.disabled = false
            data1.innerHTML = 'Edit Item'
        })
    });
});
function categoryList() {
    $.ajax({
        url: host + `/api/v1/admin/menuItem/catList?vendorId=${vendorId}`,
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
                for (var i = 0; i < data.data.result.length; i++) {
                    var option = document.createElement("option"),
                        txt = document.createTextNode(data.data.result[i].name);
                    option.appendChild(txt);
                    option.setAttribute("value", data.data.result[i]._id);
                    option.selected = data.data.result[i]._id === catId ? true : false
                    select.insertBefore(option, select.lastChild);
                }
            } else {
                document.getElementById('table').innerHTML = ''
            }
        }
    });
}


function classActive() {
    this.setTimeout(() => {
        document.getElementById('restaurant-nav')?.classList.add("active");
    }, 1500)
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah1')
                .attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function details() {
    $.ajax({
        url: host + `/api/v1/admin/menuItem/getItemDetails?vendorId=${vendorId}&itemId=${itemId}`,
        type: 'Get',
        // data: formData,
        // contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        contentType: false,
        processData: false,
        // dataType: 'json',

    }).done(function (data) {
        document.getElementById('name').value = data.data.name ? data.data.name : "N/A"
        document.getElementById('meso_name').value = data.data.meso_name ? data.data.meso_name : "N/A"
        document.getElementById('description').value = data.data.description ? data.data.description : "N/A"
        document.getElementById('meso_description').value = data.data.meso_description ? data.data.meso_description : "N/A"
        document.getElementById('price').value = data.data.price ? data.data.price : "N/A"
        document.getElementById('menuType').value = data.data.menuType
        document.getElementById('available').value = data.data.available
        document.getElementById('blah1').src = data.data.image
        document.getElementById('catId').value = data.data.catId.name
        document.getElementById('vendorId').value = data.data.vendorId
        document.getElementById('itemId').value = data.data._id
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseJSON.error)
    })
}

function menuItem(){
    window.location.href = '/admin/list_ItemCat?id='+vendorId
}