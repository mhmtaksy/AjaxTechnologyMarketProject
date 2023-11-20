$(document).ready(function () {


    ShowComData();
});



function ShowComData() {

    var url = $('#urlCompanyData').val();
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
                object += '<td>' + item.companyName + '</td>';
                object += '<td>' + item.address + '</td>';
                object += '<td>' + item.phone + '</td>';
                object += '<td>' + item.center + '</td>';
          
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


$('#btnAddCompany').click(function () {
    ClearTextBox();
    $('#CompanyModal').modal('show');
    $('#comId').hide();
    $('#AddCompany').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#companyHeading').text('Firma Ekleme Sayfası');
})
function AddCompany() {

    var objData = {
        CompanyName: $('#CompanyName').val(),
        Address: $('#Address').val(),
        Phone: $('#Phone').val(),
        Center: $('#Center').val(),
       

    }

    $.ajax({

        url: '/Company/AddCompany',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        dataType: 'json',
        success: function () {

            alert('Kayıt Başarılı');
            ShowComData();
            ClearTextBox();
            HideModalPopUp();
        }, error: function () {
            alert("Kayıt Başarısız");
        }

    })
}

function ClearTextBox() {

    $('#CompanyId').val('');
    $('#CompanyName').val('');
    $('#Address').val('');
    $('#Phone').val('');
    $('#Center').val('');
 


}


function HideModalPopUp() {

    $('#CompanyModal').modal('hide');
}

function Delete(id) {
    if (confirm('silmek istediğinden emin misin?')) {

        $.ajax({
            url: '/Company/Delete?id=' + id,
            success: function () {

                alert("Silme başarılı");
                ShowComData();
            },
            error: function () {

                alert("Silme başarısız");
            }


        })
    }


}

function Edit(id) {
    $.ajax({
        url: '/Company/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {

            $('#CompanyModal').modal('show');
            $('#CompanyId').val(response.id);
            $('#CompanyName').val(response.companyName);
            $('#Address').val(response.address);
            $('#Phone').val(response.phone);
            $('#Center').val(response.center);
        

            $('#AddCompany').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#companyHeading').text('Firma Güncelleme Sayfası');

        },
        error: function () {
            alert("Veriler gelmedi");
        }



    })


}


function UpdateCompany() {

    var objData = {


        Id: $('#CompanyId').val(),
        CompanyName: $('#CompanyName').val(),
        Address: $('#Address').val(),
        Phone: $('#Phone').val(),
        Center: $('#Center').val()
      

    }
    $.ajax({
        url: '/Company/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        success: function () {

            alert("veri güncellendi");
            HideModalPopUp();
            ShowComData();
            ClearTextBox();
        },
        error: function () {
            alert("Başarısız");
        }

    })

}




