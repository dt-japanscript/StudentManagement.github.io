// Function 1: lấy danh sách SV từ back-end

const fetchStudents = () => {
    // dùng thư viện Axios để gửi request lên back-end
    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
        method: "GET",
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log({ ...err }); // spread operator in ES6
        });
};
fetchStudents();