const domID = (id) => {
    return document.getElementById(id);
}

// Function 1: lấy danh sách SV từ back-end

let studentList = [];
studentList = [
    {
        "MaSV": "101",
        "HoTen": "Vân Anh",
        "Email": "vananh@gmail.com",
        "SoDT": "0912300400",
        "CMND": "",
        "DiemToan": 9,
        "DiemLy": 8,
        "DiemHoa": 6,
    },
    {
        "MaSV": "202",
        "HoTen": "Thanh Thanh",
        "Email": "thanhthanh@gmail.com",
        "SoDT": "0803100300",
        "CMND": "",
        "DiemToan": 7,
        "DiemLy": 7.5,
        "DiemHoa": 8,
    },
]

const fetchStudents = () => {
    // dùng thư viện Axios để gửi request lên back-end
    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
        method: "GET",
    })
        .then((res) => {
            // studentList = res.data;
            console.log(studentList);
            renderStudents();
        })
        .catch((err) => {
            console.log({ ...err }); // spread operator in ES6
        });
};

// Function 2' Hiển thị danh sách SV ra màn hình
const renderStudents = () => {
    // duyệt studentList, có bao nhiêu SV => tạo động ra bấy nhiêu <tr>
    let htmlContent = "";

    for (let student of studentList) {  // for of in ES6
        console.log(student);
        htmlContent += `
        <tr>
            <td>${student.MaSV}</td>
            <td>${student.HoTen}</td>
            <td>${student.Email}</td>
            <td>${student.SoDT}</td>
            <td>${student.DiemToan}</td>
            <td>${student.DiemLy}</td>
            <td>${student.DiemHoa}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteStudent('${student.MaSV} ')">Delete</button>
            </td>
        </tr>`;
    }
    domID("tableDanhSach").innerHTML = htmlContent;
}

// Function 3 : thêm SV
const addStudent = () => {
    const studentId = domID("id").value;
    const name = domID("name").value;
    const email = domID("email").value;
    const phone = domID("phone").value;
    const idCard = domID("idCard").value;
    const math = domID("math").value;
    const physics = domID("physics").value;
    const chemistry = domID("chemistry").value;

    const newStudent = new Student(studentId, name, email, phone, idCard, math, physics, chemistry);

    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
        method: "POST",
        data: newStudent,
    })
        .then((res) => {
            // console.log(res);
            fetchStudents();
        })
        .catch((err) => {
            console.log(err);
        })
};

// Function 4 : Xóa SV
const deleteStudent = (id) => {
    console.log("Delete button pressed")
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
        method: "DELETE"
    })
        .then((res) => {
            // console.log(res);
            fetchStudents();
        })
        .catch((err) => {
            console.log(err);
        });

};

fetchStudents();