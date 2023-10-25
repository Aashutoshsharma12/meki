var currentLocation = window.location.href;
var url = new URL(currentLocation);
var Id = url.searchParams.get("id");
const split = Id.split(',')
const vendorId = split[0]
const itemId = split[1]
function backToMenuItem() {
   window.location.href = '/admin/list_ItemCat?id=' + vendorId
}

function itemSizeList() {
   this.setTimeout(() => {
      document.getElementById('restaurant-nav')?.classList.add("active");
  }, 1500)
   var obj = {
      'page': 1,
      'perPage': 10,
      "vendorId": vendorId,
      "itemId": itemId
   }
   $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
   $.ajax({
      url: `${host}/api/v1/admin/itemSize/list?page=${obj.page}&perPage=${obj.perPage}&vendorId=${obj.vendorId}&itemId=${obj.itemId}`,
      type: 'GET',
      contentType: 'application/json',
      data: JSON.stringify(obj),
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
            $("#page1").removeClass("hide")
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
                     "vendorId": vendorId,
                     "itemId": itemId
                  }

                  $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                  $.ajax({
                     url: `${host}/api/v1/admin/itemSize/list?page=${obj.page}&perPage=${obj.perPage}&vendorId=${obj.vendorId}&itemId=${obj.itemId}`,
                     type: 'GET',
                     contentType: 'application/json',
                     data: JSON.stringify(obj),
                     beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', token);
                     },
                     dataType: 'json',
                     success: function (data, status) {
                        if (data.code == 200) {
                           $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
                           $("#table").html(' ');
                           for (var i = 0; i < data.data.result.length; i++) {
                              var index = i + 1
                              const obj = {
                                 vendorId: data.data.result[i].vendorId,
                                 menu_sizeId: data.data.result[i]._id
                              }
                              document.getElementById('table').innerHTML += '<tr>' +
                                 '<td style="vertical-align:middle;">' + index +
                                 '<td style="vertical-align:middle;">' + (data.data.result[i].name) +
                                 '<td style="vertical-align:middle;">' + (data.data.result[i].price) +
                                 '<td style="text-align: center;vertical-align:middle;"><button type="button" class="btn btn-sm btn-white" data-toggle="modal" data-target="#myModal2" onclick= edit(\'' + encodeURIComponent(JSON.stringify(obj)) + '\')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Edit' + '</button>' +
                                 '<button style="margin-left: 5px; type="button" class="btn btn-sm btn-white"  onclick= remove(\'' + encodeURIComponent(JSON.stringify(obj)) + '\')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Remove' + '</button>' + '</tr>'
                           }
                        }
                     }
                  })
                  $target.next(".show").text('Current: ' + options.current);
               }
            })
            $("#table").html(' ');
            for (var i = 0; i < data.data.result.length; i++) {
               var index = i + 1
               const obj = {
                  vendorId: data.data.result[i].vendorId,
                  menu_sizeId: data.data.result[i]._id
               }
               document.getElementById('table').innerHTML += '<tr>' +
                  '<td style="vertical-align:middle;">' + index +
                  '<td style="vertical-align:middle;">' + (data.data.result[i].name) +
                  '<td style="vertical-align:middle;">' + (data.data.result[i].price) +
                  '<td style="text-align: center;vertical-align:middle;"><button type="button" class="btn btn-sm btn-white" data-toggle="modal" data-target="#myModal2" onclick= edit(\'' + encodeURIComponent(JSON.stringify(obj)) + '\')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Edit' + '</button>' +
                  '<button style="margin-left: 5px; type="button" class="btn btn-sm btn-white"  onclick= remove(\'' + encodeURIComponent(JSON.stringify(obj)) + '\')>' + `<img src =${"../../admin/assets/img/file_icon.png"} style = "height:25px; width:35px;">` + 'Remove' + '</button>' + '</tr>'
            }
         } else {
            document.getElementById('loader').style.display = 'none'
            $("#table").html(' ');
            $("#table2").addClass("hide");
            document.getElementById('noData').style.display = 'block'
            $("#page1").hide();

         }
      }

   });
}

$(document).ready(function () {
   $("#addform").submit(function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      const obj = {
         name: document.getElementById('name').value,
         meso_name: document.getElementById('meso_name').value,
         price: document.getElementById('price').value,
         vendorId: vendorId,
         itemId: itemId
      }
      document.getElementById('cancel').disabled = true
      const submitButton = document.getElementById("Submit");
      submitButton.disabled = true;
      submitButton.innerHTML = "Submitting...";
      $.ajax({
         url: host + `/api/v1/admin/itemSize/add`,
         type: 'Post',
         data: obj,
         beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
         },
         // contentType: false,
         // processData: false,
      }).done(function (data) {
         // If successful
         document.getElementById('cancel').disabled = false
         const submitButton = document.getElementById("Submit");
         submitButton.disabled = false;
         submitButton.innerHTML = "Add";
         $('#myModal5').modal('hide');
         itemSizeList();
         // window.location.reload();
      }).fail(function (jqXHR, textStatus, errorThrown) {
         // If fail
         document.getElementById('cancel').disabled = false
         const submitButton = document.getElementById("Submit");
         submitButton.disabled = false;
         submitButton.innerHTML = "Add";
         alert(jqXHR.responseJSON.error)
      })
   });
})

$(document).ready(function () {
   $("#editform").submit(function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      const obj = {
         name: document.getElementById('name1').value,
         meso_name: document.getElementById('meso_name1').value,
         menu_sizeId: document.getElementById('menu_sizeId').value,
         price: document.getElementById('price1').value,
         vendorId: document.getElementById('vendorId').value
      }
      document.getElementById('cancel1').disabled = true
      const submitButton = document.getElementById("Submit1");
      submitButton.disabled = true;
      submitButton.innerHTML = "Updating...";
      $.ajax({
         url: host + `/api/v1/admin/itemSize/edit`,
         type: 'Put',
         data: obj,
         beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
         },
         // contentType: false,
         // processData: false,
      }).done(function (data) {
         // If successful
         document.getElementById('cancel1').disabled = false
         const submitButton = document.getElementById("Submit1");
         submitButton.disabled = false;
         submitButton.innerHTML = "Edit";
         $('#myModal2').modal('hide');
         itemSizeList();
         // window.location.reload();
      }).fail(function (jqXHR, textStatus, errorThrown) {
         // If fail
         document.getElementById('cancel1').disabled = false
         const submitButton = document.getElementById("Submit1");
         submitButton.disabled = false;
         submitButton.innerHTML = "Edit";
         alert(jqXHR.responseJSON.error)

      })
   });
})

function edit(obj) {
   const jsonString = decodeURIComponent(obj);
   const details = JSON.parse(jsonString)
   $.ajax({
      url: host + `/api/v1/admin/itemSize/get?vendorId=${details.vendorId}&menu_sizeId=${details.menu_sizeId}`,
      type: 'Get',
      // data: obj,
      beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', token);
      },
      // contentType: false,
      // processData: false,
   }).done(function (data) {
      // If successful
      document.getElementById('name1').value = data.data.result.name
      document.getElementById('meso_name1').value = data.data.result.meso_name
      document.getElementById('menu_sizeId').value = data.data.result._id
      document.getElementById('price1').value = data.data.result.price
      document.getElementById('vendorId').value = data.data.result.vendorId
   }).fail(function (jqXHR, textStatus, errorThrown) {
      // If fail
      alert(jqXHR.responseJSON.error)

   })
}

//Remove explore
function remove(obj) {
   const jsonString = decodeURIComponent(obj);
   const details = JSON.parse(jsonString)
   swal({
      title: "Are you want to remove this category?",
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
               type: "DELETE",
               // data: { status, catId },
               dataType: 'json',
               beforeSend: function (xhr) {
                  xhr.setRequestHeader('Authorization', token);
               },
               url: host + `/api/v1/admin/itemSize/delete?vendorId=${details.vendorId}&menu_sizeId=${details.menu_sizeId}`,
            }).done(function (data) {
               // If successful
               swal.close();
               itemSizeList();
            }).fail(function (jqXHR, textStatus, errorThrown) {
               // If fail
               alert(jqXHR.responseJSON.error)
            })
         } else {
            swal("Cancelled", "Your explore is safe :");
         }
      });
}
