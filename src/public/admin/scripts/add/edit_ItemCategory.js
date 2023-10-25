var currentLocation = window.location.href;
var url = new URL(currentLocation);
var Id = url.searchParams.get("id");
const ArrayId = Id.split(',')
const vendorId = ArrayId[0]
const itemCatId = ArrayId[1]
function itemCategoryDetails() {
    $.ajax({
        type: "get",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/admin/item_category/getItemCategoryDetails?vendorId=${vendorId}&itemCategoryId=${itemCatId}`,
    }).done(function (data) {
        // If successful
        console.log(data.data, "slsls")
        document.getElementById('name').value = data.data.name ? data.data.name : "N/A",
            document.getElementById('mesoName').value = data.data.meso_name ? data.data.meso_name : "N/A",
            document.getElementById('position').value = data.data.position ? data.data.position : "N/A"
        document.getElementById('vendorId').value = data.data.vendorId,
            document.getElementById('itemCatId').value = data.data._id
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        // alert(jqXHR.responseJSON.error)
        alert("Data Not Found")

    });
}
function classActive() {
    this.setTimeout(() => {
        document.getElementById('restaurant-nav')?.classList.add("active");
    }, 1500)
}

$(document).ready(function () {
    // When the document is ready, attach a submit event handler to the form
    $('#form1').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // var formData = new FormData(this);
        // formData.append('vendorId', vendorId)
        const data = document.getElementById('editButton')
        data.disabled = true
        data.innerHTML = 'Updating ---'
        var obj = {
            name: document.getElementById('name').value,
            meso_name: document.getElementById('mesoName').value,
            position: document.getElementById('position').value,
            vendorId: document.getElementById('vendorId').value,
            itemCategoryId: document.getElementById('itemCatId').value
        }
        console.log(localStorage.getItem('token'), "slslslsls")
        $.ajax({
            url: host + '/api/v1/admin/item_category/EditItemCategory',
            type: 'Put',
            data: obj,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
        }).done(function (data) {
            alert('Category Successfully Added')
            data.disabled = false
            data.innerHTML = 'Edit Menu Category'
            window.location.href = '/admin/list_ItemCat?id=' + vendorId
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error)
            data.disabled = false
            data.innerHTML = 'Edit Menu Category'
        })
    });
});

function menuItem(){
    window.location.href = '/admin/list_ItemCat?id='+vendorId
}
