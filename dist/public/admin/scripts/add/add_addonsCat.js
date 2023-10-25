var currentLocation = window.location.href;
var url = new URL(currentLocation);
var vendorId = url.searchParams.get("id");

$(document).ready(function () {
    // When the document is ready, attach a submit event handler to the form
    $('#form_addonsCat').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log('enter')
        const data = document.getElementById('addButton')
        data.disabled = true
        data.innerHTML = 'Submiting ---'
        // var formData = new FormData(this);
        // formData.append('vendorId', vendorId)
        var obj = {
            name: document.getElementById('name').value,
            meso_name: document.getElementById('meso_name').value,
            position: document.getElementById('position').value,
            quantity: document.getElementById('quantity').value,
            vendorId: vendorId
        }
        console.log(obj,"slsls")
        $.ajax({
            url: host + '/api/v1/admin/addons_cat/add',
            type: 'Post',
            data: obj,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
        }).done(function (data) {
            // alert('Category Successfully Added')
            data.disabled = false
            data.innerHTML = 'Add Addon Category'
            window.location.href = '/admin/addonsCatList?id=' + [vendorId, localStorage.getItem('itemId')]
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error)
            data.disabled = false
            data.innerHTML = 'Add Addon Category'
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