var currentLocation = window.location.href;
var url = new URL(currentLocation);
var id = url.searchParams.get("id");
const split = id.split(',')
const vendorId = split[0]
const itemId = split[1]
const addonsCatId = split[2]

// $(document).ready(function () {
// When the document is ready, attach a submit event handler to the form
// $('#form_category').submit(function (event) {
// event.preventDefault(); // Prevent the default form submission behavior
function add() {
    const data = document.getElementById('addButton')
    data.disabled = true
    data.innerHTML = 'Submiting ---'
    // var formData = new FormData(this);
    // formData.append('vendorId', vendorId)
    var obj = {
        name: document.getElementById('name').value,
        meso_name: document.getElementById('meso_name').value,
        price: document.getElementById('price').value,
        vendorId: vendorId,
        addOns_CatId: document.getElementById('catId').value,
        itemId: itemId
    }
    $.ajax({
        url: host + '/api/v1/admin/addons/add',
        type: 'Post',
        data: obj,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
    }).done(function (data) {
        // alert('Category Successfully Added')
        data.disabled = false
        data.innerHTML = 'Add Addon'
        window.location.href = '/admin/addonsCatList?id=' + [vendorId, localStorage.getItem('itemId') ? localStorage.getItem('itemId') : itemId]
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseJSON.error)
        data.disabled = false
        data.innerHTML = 'Add Addon'
    })
}
// });
// });

function back() {
    window.location.href = '/admin/addonsCatList?id=' + [vendorId, localStorage.getItem('itemId') ? localStorage.getItem('itemId') : itemId]
}

function classActive() {
    this.setTimeout(() => {
        document.getElementById('restaurant-nav')?.classList.add("active");
    }, 1500)
}

function addonsCatList() {
    $.ajax({
        url: host + `/api/v1/admin/addons/list?vendorId=${vendorId}`,
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

function addonsDetails(){
    $.ajax({
        type: "get",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        url: `${host}/api/v1/admin/addons/get?vendorId=${vendorId}&catId=${catId}`,
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