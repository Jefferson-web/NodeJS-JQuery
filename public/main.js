$(document).ready(function () {

    var users = [];

    $('#userForm').submit(function (e) {
        e.preventDefault();
        const formData = $(this).serializeArray();
        var user = {};
        $(formData).each(function (index, obj) {
            const { name, value } = obj;
            user[name] = value;
        });
        users.push(user);
        $(this).trigger("reset");
        setFocus();
        render(users);
    });

    $('.tbody-users').on('click', '.btn-delete-user', function (e) {
        const index = $(this).attr('index');
        removeUser(index);
        render(users);
    });

    $('.btn-guardar-datos').click(function (e) {
        guardarUsuarios();
    });

    function setFocus() {
        $('#userForm')[0].elements[0].focus();
    }

    function render(users) {
        let htmlCode = "";
        $(users).each(function (index, user) {
            htmlCode += `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${user.nombre}</td>
                            <td>${user.apellidos}</td>
                            <td>${user.lenguaje}</td>
                            <td>${user.direccion}</td>
                            <td>
                                <button class="btn btn-danger btn-delete-user" index="${index}">Eliminar</button>
                            </td>
                        </tr>`;
        });
        $('.tbody-users').html(htmlCode);
        if ($('.alert').get(0)) {
            $('.alert').get(0).remove();
        }
        if (users.length == 0) {
            const alert = '<div class="alert alert-danger">No hay registros en el arreglo.</div>';
            $('.alert-content').html(alert);
        }
    }

    function removeUser(index) {
        users.splice(index, 1);
    }

    function guardarUsuarios() {
        $.ajax({
            type: 'POST',
            data: { users },
            url: '/users',
            success: function (msg) {
                console.log(msg);
            }
        });
    }

});