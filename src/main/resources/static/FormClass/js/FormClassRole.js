class FormClassRole {
    loadInitForRole = async () => {
        await this.getDataRole();
        this.createTableListRole(this.listRoleIn4);

    }

    listRoleIn4 = [];
    roleId = this.listRoleIn4;
    createTableListRole = (listRoleInformation) => {
        let tbodyContentString = '';
        listRoleInformation.forEach(e => {
            tbodyContentString +=
                '<tr>' +
                `<th scope="row">${e.roleId}</th>` +
                `<td>${e.roleName}</td>` +
                `<td>${e.description}</td>` +
                `</tr>`;
        });

        // Jquery
        $('#tbodyTableListRoleContent').html(tbodyContentString);
        let table = new DataTable('#tableListRole', {
            info: false,
            paging: true,
            ordering: false,
            lengthMenu: [
                [4, 5, 6, -1],
                [4, 5, 6, 'All']
            ]
        });

        const labelElement = document.querySelector('#tableListRole_length');
        labelElement.innerHTML = '';
        table.on('dblclick', 'tbody tr', function (x) {
            let data = table.row(this).data();
            $('#roleId').val(data[0]);
            $('#roleName').val(data[1]);
            $('#description').val(data[2]);
        });
    };
    rowLicked = (x) => {
        // kiểu dữ liệu Json {key: value}
        // js: const: hằng số
        //      var: có thể ghi đè và 1 lần khai báo
        //      let: trong 1 block
        let RoleIn4 = {
            roleId: x.querySelector('th:nth-child(1)').textContent,
            roleName: x.querySelector('td:nth-child(2)').textContent,
            description: x.querySelector('td:nth-child(3)').textContent,

        };
        this.fillFormInformationRole(RoleIn4);
    };
    fillFormInformationRole = (RoleIn4) => {
        $('#roleId').val(RoleIn4.roleId);
        $('#roleName').val(RoleIn4.roleName);
        $('#description').val(RoleIn4.description);

    }
    btnClearFormRole_click = () => {
        this.fillFormInformationRole({roleId: '', roleName: '', description: ''})


    };
    btnSaveRole_click = () => {
        var roleId = document.getElementById('roleId').value;
        var roleName = document.getElementById('roleName').value;
        var roleIn4Form = {
            roleId: roleId,
            roleName: roleName,
            description: document.getElementById('description').value,

        }

        console.log(roleIn4Form);
        if (!this.validateDataFormRole(roleIn4Form)) {
            swal("Cảnh Báo!", "Vui Lòng Nhập Đủ Thông Tin", "warning");
        } else {
            swal("Đã Nhập RoleName! " + "\n Đã Nhập Thành Công \n"
                , " Role Name-------- :" + roleIn4Form.roleName
                + " \nRole ID-------- :" + roleIn4Form.roleId + " \nDescription-------- :" + roleIn4Form.description);
        }
        // swal("Đã Nhập RoleName! "+ "\n Đã Nhập Thành Công \n"
        //     , " Role Name-------- :"+  roleIn4Form.roleName
        //     +  " \nRole ID-------- :" + roleIn4Form.roleId+  " \nDescription-------- :" + roleIn4Form.description);
    };
    validateDataFormRole = (RoleIn4) => {
        // nếu userIn4 != null || != undefined => true
        // ! => nếu userIn4 == null || == undefined => true
        if (RoleIn4.roleId == '' || RoleIn4.roleName == '' ||
            RoleIn4.description == '') {
            return false;
        }
        return true;

    }
    getDataRole = async () => {
        console.log("getDataRole");
        let {data: response} = await axios.get('http://localhost:8888/api/v1/roles/getAllRole')
        this.listRoleIn4 = response.data;
        console.log(this.listRoleIn4);
    }

//   createRole() {
//     var form = document.getElementById('createDB');
//     form.addEventListener("button",e =>{
//         e.preventDefault();
//         fetch(form.action,{
//             method : "POST",
//             body : new FormData(document.getElementById("createDB")),
//         }).then(
//             response => response.json()
//         ).then(() => {
// window.open('RoleEntry.html','blank')
//
//         }
//         )
//     })
//     }
    saveRoleEntry = async () => {
        let dataForm = {
            roleId: $('#roleId').val(),
            roleName: $('#roleName').val(),
            description: $('#description').val(),
        }
        let validateresult = this.validateDataFormRole(dataForm)
        if (!validateresult) {
            swal({
                text: validateresult.message,
                icon: "warning"

            });
        } else {
            let {data: response} = await axios.post("http://localhost:8888/api/v1/roles/postRole", dataForm);
            if (response.status) {
                var table = new DataTable('#tableListRole');
                table.destroy();
                this.loadInitForRole()
                swal({
                    text: response.message,
                    icon: "success",
                });
            } else {
                swal({
                    text: response.message,
                    icon: "Error",
                    swal:("Cảnh Báo!", "Vui Lòng Nhập Đủ Thông Tin", "warning"),
                })

            }

        }
    }


    deleteButon_Click = async () => {
        let dataForm = {
            roleId: $('#roleId').val(),
            roleName: $('#roleName').val(),
            description: $('#description').val(),
        }
        let valieDateResult = this.validateDataFormRole(dataForm)
        if (!valieDateResult) {
            swal({
                text: valieDateResult.message,
                icon: "warning"

            });
        } else {
            let {data: response} = await axios.delete("http://localhost:8888/api/v1/roles/deleteRole",{data:dataForm});
            if (response.status) {
                var table = new DataTable('#tableListRole');
                table.destroy();
                this.loadInitForRole()
                swal({
                    text: response.message,
                    icon: "success"
                });
            } else {
                swal({
                    text: response.message,
                    icon: "Error"

                })

            }

        }


    }


}











