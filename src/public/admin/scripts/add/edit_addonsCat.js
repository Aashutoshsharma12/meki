var currentLocation = window.location.href;
var url = new URL(currentLocation);
var id = url.searchParams.get("id");
const split = id.split(',')
const vendorId = split[0]
const catId = split[1]

$(document).ready(function () {
    // When the document is ready, attach a submit event handler to the form
    $('#form_editAddonsCat').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const data = document.getElementById('addButton')
        data.disabled = true
        data.innerHTML = 'Updating ---'
        // var formData = new FormData(this);
        // formData.append('vendorId', vendorId)
        var obj = {
            name: document.getElementById('name').value,
            meso_name: document.getElementById('meso_name').value,
            position: document.getElementById('position').value,
            quantity: document.getElementById('quantity').value,
            vendorId: document.getElementById('vendorId').value,
            catId:document.getElementById('addonsCatId').value
        }
        console.log(obj, "slsls")
        $.ajax({
            url: host + '/api/v1/admin/addons_cat/edit',
            type: 'Put',
            data: obj,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
        }).done(function (data) {
            // alert('Category Successfully Added')
            data.disabled = false
            data.innerHTML = 'Edit Addon Category'
            window.location.href = '/admin/addonsCatList?id=' + [vendorId, localStorage.getItem('itemId')]
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error)
            data.disabled = false
            data.innerHTML = 'Edit Addon Category'
        })
    });
});

function back() {
    window.location.href = '/admin/addonsCatList?id=' + [vendorId, localStorage.getItem('itemId')]
}

function classActive() {
    this.setTimeout(() => {
        document.getElementById('restaurant-nav')?.classList.add("active");
    }, 1500)
}


function addons_catDetails() {
    $.ajax({
        type: "get",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/admin/addons_cat/get?vendorId=${vendorId}&catId=${catId}`,
    }).done(function (data) {
        // If successful
        console.log(data.data, "slsls")
        document.getElementById('name').value = data.data.result.name ? data.data.result.name : "N/A",
            document.getElementById('meso_name').value = data.data.result.meso_name ? data.data.result.meso_name : "N/A",
            document.getElementById('position').value = data.data.result.position ,
            document.getElementById('quantity').value = data.data.result.quantity 
        document.getElementById('vendorId').value = data.data.result.vendorId,
            document.getElementById('addonsCatId').value = data.data.result._id
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        // alert(jqXHR.responseJSON.error)
        alert("Data Not Found")

    });
}

