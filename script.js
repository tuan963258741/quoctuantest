const menubarBtn =document.querySelector('.header-top i')
menubarBtn.addEventListener("click", function(){
    document.querySelector('.header-top ul').classList.toggle('active')
})
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const destination = document.getElementById("destination").value;
    const people = parseInt(document.getElementById("people").value);
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!destination) {
        alert("Vui lòng chọn điểm đến.");
        return;
    }
    if (!people || people < 1) {
        alert("Vui lòng nhập số người hợp lệ.");
        return;
    }
    if (!startDate || !endDate || startDate > endDate) {
        alert("Vui lòng chọn ngày đi và ngày về hợp lệ.");
        return;
    }

    // Giá vé và số chỗ còn giả định
    const tours = {
        "Hà Nội": { price: 1000000, seats: 20 },
        "Đà Lạt": { price: 1500000, seats: 15 },
        "Đà Nẵng": { price: 1200000, seats: 18 }
    };

    if (people > tours[destination].seats) {
        alert("Số người vượt quá số chỗ còn lại.");
        return;
    }

    // Hiển thị thông tin chuyến đi
    document.getElementById("tripInfo").textContent = `Điểm đến: ${destination}, Ngày đi: ${startDate}, Ngày về: ${endDate}, Số người: ${people}`;
    document.getElementById("tripPrice").textContent = `Giá vé 1 người: ${tours[destination].price.toLocaleString()} VND`;
    document.getElementById("tripSeats").textContent = `Số chỗ còn lại: ${tours[destination].seats}`;

    document.getElementById("result").style.display = "block";
    document.getElementById("customerForm").style.display = "block";

    // Ẩn form tìm kiếm để tránh chỉnh sửa khi đã hiện kết quả
    document.getElementById("searchForm").style.display = "none";

    // Lưu thông tin cho hóa đơn
    window.bookingData = {
        destination,
        people,
        startDate,
        endDate,
        pricePerPerson: tours[destination].price,
        totalPrice: people * tours[destination].price,
        seatsLeft: tours[destination].seats
    };
});

document.getElementById("confirmBtn").addEventListener("click", function() {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();

    if (!name || !phone) {
        alert("Vui lòng nhập đầy đủ thông tin khách hàng.");
        return;
    }

    // Giảm số chỗ còn lại
    window.bookingData.seatsLeft -= window.bookingData.people;

    const invoiceHTML = `
        Khách hàng: ${name} <br>
        Số điện thoại: ${phone} <br>
        Điểm đến: ${window.bookingData.destination} <br>
        Ngày đi: ${window.bookingData.startDate} <br>
        Ngày về: ${window.bookingData.endDate} <br>
        Số người: ${window.bookingData.people} <br>
        Tổng tiền: ${window.bookingData.totalPrice.toLocaleString()} VND <br>
        Số chỗ còn lại sau khi đặt: ${window.bookingData.seatsLeft}
    `;

    document.getElementById("invoiceDetails").innerHTML = invoiceHTML;

    // Ẩn kết quả chuyến đi và form nhập khách
    document.getElementById("result").style.display = "none";
    document.getElementById("customerForm").style.display = "none";

    // Hiện hóa đơn
    document.getElementById("invoice").style.display = "block";
});

document.getElementById("backBtn").addEventListener("click", function() {
    location.reload();  // Quay về trang chủ (tải lại trang)
});
