var currentLocation = window.location.href;
var url = new URL(currentLocation);
var vendorId = url.searchParams.get("id");

$(document).ready(function () {
    // When the document is ready, attach a submit event handler to the form
    $('#form_category').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log('enter')
        const data = document.getElementById('addButton')
        data.disabled = true
        data.innerHTML = 'Submiting ---'
        var formData = new FormData(this);
        formData.append('vendorId', vendorId)
        var obj = {
            name: document.getElementById('name').value,
            meso_name: document.getElementById('meso_name').value,
            position: document.getElementById('position').value,
            vendorId: vendorId
        }
        console.log(obj, "euueye")
        console.log(localStorage.getItem('token'), "slslslsls")
        $.ajax({
            url: host + '/api/v1/admin/item_category/AddItemCategory',
            type: 'Post',
            data: obj,
            // contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            // contentType: false,
            // processData: false,
            // dataType: 'json',

        }).done(function (data) {
            alert('Category Successfully Added')
            data.disabled = false
            data.innerHTML = 'Add Menu Category'
            window.location.href = '/admin/list_ItemCat?id=' + vendorId
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error)
            data.disabled = false
            data.innerHTML = 'Add Menu Category'
        })
    });
});

function back() {
    window.location.href = '/admin/list_ItemCat?id=' + vendorId
}

function classActive() {
    this.setTimeout(() => {
        document.getElementById('restaurant-nav')?.classList.add("active");
    }, 1500)
}