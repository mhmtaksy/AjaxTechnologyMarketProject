$(document).ready(function () {


    ShowEmpData();
});



function ShowEmpData() {

    var url = $('#urlEmployeeData').val();
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
                object += '<td>' + item.age + '</td>';
                object += '<td>' + item.phone + '</td>';
                object += '<td>' + item.email + '</td>';
                object += '<td>' + item.salary + '</td>';
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


$('#btnAddEmployee').click(function () {
    ClearTextBox();
    $('#EmployeeModal').modal('show');
    $('#empId').hide();
    $('#AddEmployee').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#employeeHeading').text('Çalışan Ekleme Sayfası');
})
function AddEmployee() {

    var objData = {
        Name: $('#Name').val(),
        Age: $('#Age').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Salary: $('#Salary').val()

    }

    $.ajax({

        url: '/Employee/AddEmployee',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        dataType: 'json',
        success: function () {

            alert('Kayıt Başarılı');
            ShowEmpData();
            ClearTextBox();
            HideModalPopUp();
        }, error: function () {
            alert("Kayıt Başarısız");
        }

    })
}

function ClearTextBox() {

    $('#EmployeeId').val('');
    $('#Name').val('');
    $('#Age').val('');
    $('#Phone').val('');
    $('#Email').val('');
    $('#Salary').val('');


}


function HideModalPopUp() {

    $('#EmployeeModal').modal('hide');
}

function Delete(id) {
    if (confirm('silmek istediğinden emin misin?')) {

        $.ajax({
            url: '/Employee/Delete?id=' + id,
            success: function () {

                alert("Silme başarılı");
                ShowEmpData();
            },
            error: function () {

                alert("Silme başarısız");
            }


        })
    }


}

function Edit(id) {
    $.ajax({
        url: '/Employee/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {

            $('#EmployeeModal').modal('show');
            $('#EmployeeId').val(response.id);
            $('#Name').val(response.name);
            $('#Age').val(response.age);
            $('#Phone').val(response.phone);
            $('#Email').val(response.email);
            $('#Salary').val(response.salary);

            $('#AddEmployee').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#employeeHeading').text('Update Employee Page');

        },
        error: function () {
            alert("Veriler gelmedi");
        }



    })


}


function UpdateEmployee() {

    var objData = {


        Id: $('#EmployeeId').val(),
        Name: $('#Name').val(),
        Age: $('#Age').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Salary: $('#Salary').val(),

    }
    $.ajax({
        url: '/Employee/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        success: function () {

            alert("veri güncellendi");
            HideModalPopUp();
            ShowEmpData();
            ClearTextBox();
        },
        error: function () {
            alert("Başarısız");
        }

    })

}




