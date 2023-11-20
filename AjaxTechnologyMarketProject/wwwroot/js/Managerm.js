$(document).ready(function () {


    ShowManData();
});



function ShowManData() {

    var url = $('#urlManagerData').val();
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',

        success: function (result, statu, xhr) {
            var object = '';
            $.each(result, function (index, item) {

                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.phone + '</td>';
                object += '<td>' + item.address + '</td>';
                object += '<td>' + item.expertise + '</td>';
           
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.id + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.id + ');">Delete</a></td>';
                object += '</tr>';


            });
            $('#table_data').html(object);
        },
        error: function () {



            alert("Veri getirilemedi");
        }


    });

}


$('#btnAddManager').click(function () {
    ClearTextBox();
    $('#ManagerModal').modal('show');
    $('#manId').hide();
    $('#AddManager').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#managerHeading').text('Yönetici Ekleme Sayfası');
})
function AddManager() {

    var objData = {
        Name: $('#Name').val(),
        Age: $('#Age').val(),
        Phone: $('#Phone').val(),
        Address: $('#Address').val(),
        Expertise: $('#Expertise').val()

    }

    $.ajax({

        url: '/Manager/AddManager',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        dataType: 'json',
        success: function () {

            alert('Kayıt Başarılı');
            ShowManData();
            ClearTextBox();
            HideModalPopUp();
        }, error: function () {
            alert("Kayıt Başarısız");
        }

    })
}

function ClearTextBox() {

    $('#ManagerId').val('');
    $('#Name').val('');
    $('#Phone').val('');
    $('#Address').val('');
    $('#Expertise').val('');
   


}


function HideModalPopUp() {

    $('#ManagerModal').modal('hide');
}

function Delete(id) {
    if (confirm('silmek istediğinden emin misin?')) {

        $.ajax({
            url: '/Manager/Delete?id=' + id,
            success: function () {

                alert("Silme başarılı");
                ShowManData();
            },
            error: function () {

                alert("Silme başarısız");
            }


        })
    }


}

function Edit(id) {
    $.ajax({
        url: '/Manager/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {

            $('#ManagerModal').modal('show');
            $('#ManagerId').val(response.id);
            $('#Name').val(response.name);
            $('#Phone').val(response.phone);
            $('#Address').val(response.address);
            $('#Expertise').val(response.expertise);
            

            $('#AddManager').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#managerHeading').text('Yönetici Güncelleme Sayfası');

        },
        error: function () {
            alert("Veriler gelmedi");
        }



    })


}


function UpdateManager() {

    var objData = {


        Id: $('#ManagerId').val(),
        Name: $('#Name').val(),
        Phone: $('#Phone').val(),
        Address: $('#Address').val(),
        Expertise: $('#Expertise').val(),
     

    }
    $.ajax({
        url: '/Manager/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        success: function () {

            alert("veri güncellendi");
            HideModalPopUp();
            ShowManData();
            ClearTextBox();
        },
        error: function () {
            alert("Başarısız");
        }

    })

}




