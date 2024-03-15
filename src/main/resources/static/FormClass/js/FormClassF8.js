class FormClassF8 {
    loadInit = async () => {
        await this.getDataUser();
        this.createTableListUser(this.listUserIn4);
    }

    // loadInitForRole = async () => {
    //     await this.getDataRole();
    //     this.createTableListRole(this.listRoleIn4);
    // }
    //
    // listRoleIn4 = [];
    //
    // createTableListRole = (listRoleInformation) => {
    //     let tbodyContentString = '';
    //     listRoleInformation.forEach(e => {
    //         tbodyContentString +=
    //             '<tr>' +
    //             `<th scope="row">${e.roleId}</th>` +
    //             `<td>${e.roleName}</td>` +
    //             `<td>${e.description}</td>` +
    //             `</tr>`;
    //     });

        // Jquery
    //     $('#tbodyTableListRoleContent').html(tbodyContentString);
    //     let table = new DataTable('#tableListRole', {
    //         info: false,
    //         paging: true,
    //         ordering: false,
    //         lengthMenu: [
    //             [4, 5, 6, -1],
    //             [4, 5, 6, 'All']
    //         ]
    //     });
    //
    //     const labelElement = document.querySelector('#tableListRole_length');
    //     labelElement.innerHTML = '';
    //     table.on('dblclick', 'tbody tr', function (x) {
    //         let data = table.row(this).data();
    //         $('#roleId').val(data[0]);
    //         $('#roleName').val(data[1]);
    //         $('#description').val(data[2]);
    //     });
    // };

    listUserIn4 = [];

    createTableListUser = (listUserInformation) => {
        let tbodyContentString = '';
        listUserInformation.forEach(e => {
            tbodyContentString +=
                '<tr>' +
                `<th scope="row">${e.userId}</th>` +
                `<td>${e.userName}</td>` +
                `<td>${e.role.roleId}</td>` +
                `<td>${e.role.roleName}</td>` +
                `<td>${e.age}</td>` +
                `<td>${e.gmail}</td>` +
                `<td>${e.role.description}</td>` +
                `</tr>`;
        });


        // Jquery
        $('#tbodyTableLisUserContent').html(tbodyContentString);
        let table = new DataTable('#tableListUser', {
            info: false,
            paging: true,
            ordering: false,
            lengthMenu: [
                [4, 5, 6, -1],
                [4, 5, 6, 'All']
            ]
        });

        const labelElement = document.querySelector('#tableListUser_length');
        labelElement.innerHTML = '';
        table.on('dblclick', 'tbody tr', function (x) {
                let data = table.row(this).data();
            $('#userId').val(data[0]);
            $('#userName').val(data[1]);
            $('#lastName').val(data[2]);
            $('#major').val(data[3]);
        });
    };

    rowLicked = (x) => {
        // kiểu dữ liệu Json {key: value}
        // js: const: hằng số
        //      var: có thể ghi đè và 1 lần khai báo
        //      let: trong 1 block
        let userIn4 = {
            userId: x.querySelector('th:nth-child(1)').textContent,
            firstName: x.querySelector('td:nth-child(2)').textContent,
            lastName: x.querySelector('td:nth-child(3)').textContent,
            major: x.querySelector('td:nth-child(4)').textContent
        };
        this.fillFormInformation(userIn4);
    };

    fillFormInformation = (userIn4) => {
        $('#userId').val(userIn4.userId);
        $('#firstName').val(userIn4.firstName);
        $('#lastName').val(userIn4.lastName);
        $('#major').val(userIn4.major);
    }

     btnClearForm_click = () => {
        this.fillFormInformation({userId: '', firstName: '', lastName: '', major: ''})
    }
    btnSave_click = () => {
        var userId = document.getElementById('userId').value;
        var firstName = document.getElementById('firstName').value;
        var userIn4Form = {
            userId: userId,
            firstName: firstName,
            lastName: document.getElementById('lastName').value,
            major: document.getElementById('major').value
        }
        console.log(userIn4Form);
        if (!this.validateDataFormUser(userIn4Form)) {
            swal("Cảnh Báo!", "Vui Lòng Nhập Đủ Thông Tin", "warning");
        } else {
            swal("Đã Nhập UserName!", userIn4Form.firstName);
        }
        ;
    };
    validateDataFormUser = (userIn4) => {
        // nếu userIn4 != null || != undefined => true
        // ! => nếu userIn4 == null || == undefined => true
        if (userIn4.userId == '' || userIn4.firstName == '' ||
            userIn4.lastName == '' || userIn4.major == '') {
            return false;
        }
        return true;
    };

    //Call Api by Ajax of Jquery
    // getDataUserIn4 = () => {
    //     $.ajax({
    //         type: 'GET',
    //         url: '/api/v1/users',
    //         contentType: 'application/json',
    //         success: function (data) {
    //             console.log("Call Api /api/v1/users Success");
    //             this.formatDataFromBEToFE(data);
    //         }.bind(this),
    //         error: function (error) {
    //             console.log("Call Api /api/v1/users Fail");
    //         }
    //     }, {})
    // };

    // Axios
    getDataUser = async () => {
        console.log("getDataUser");
        let {data: response} = await axios.get('http://localhost:8888/api/v1/users/getAllUser')
        this.listUserIn4 = response.data;
        console.log(this.listUserIn4);
    }
    saveUserEntry = async () => {
        let dataForm = {
            userId: $('#userId').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            major:$('#major').val(),
        }
        let validateresult = this.validateDataFormUser(dataForm)
        if (!validateresult) {
            swal({
                text: validateresult.message,
                icon: "warning"

            });
        } else {
            let {data: response} = await axios.post("http://localhost:8888/api/v1/users/postUser", dataForm);
            if (response.success) {
                this.loadInit()
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
    // getDataRole = async () => {
    //     console.log("getDataRole");
    //     let {data: response} = await axios.get('http://localhost:8888/api/v1/roles/getAllRole')
    //     this.listRoleIn4 = response.data;
    //     console.log(this.listRoleIn4);
    // }
}










