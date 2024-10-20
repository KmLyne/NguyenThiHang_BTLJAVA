export interface Page<T> {
    content: T[];           // Danh sách đối tượng (sản phẩm) của trang hiện tại
    totalPages: number;     // Tổng số trang
    totalElements: number;  // Tổng số phần tử (sản phẩm) trong tất cả các trang
    size: number;           // Kích thước của một trang (số sản phẩm mỗi trang)
    number: number;         // Số trang hiện tại (bắt đầu từ 0)
  }
  