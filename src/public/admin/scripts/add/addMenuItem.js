var currentLocation = window.location.href;
var url = new URL(currentLocation);
var Id = url.searchParams.get("id");
const split = Id.split(',')
const vendorId = split[0]
const catName1 = split[1]
// function call(){
//     document.getElementById('catId').innerHTML = "llll"
// }

$(document).ready(function () {
    // When the document is ready, attach a submit event handler to the form
    $('#form_menuItem').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const data1 = document.getElementById('addButton')
        data1.disabled = true
        data1.innerHTML = 'Submiting ---'
        var formData = new FormData(this);
        formData.append('vendorId', vendorId)
        $.ajax({
            url: host + '/api/v1/admin/menuItem/AddItem',
            type: 'Post',
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
            data1.innerHTML = 'Add Item'
            window.location.href = '/admin/list_ItemCat?id=' + vendorId
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error)
            data1.disabled = false
            data1.innerHTML = 'Add Item'
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

function back() {
    window.location.href = '/admin/list_ItemCat?id=' + vendorId
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

function menuItem(){
    window.location.href = '/admin/list_ItemCat?id='+vendorId
}