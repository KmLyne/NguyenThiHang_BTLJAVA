export interface Donhang {
    madh: number;
    ngaydathang: string;
    tenkh: string;
    diachi: string;
    sdt: string;
    email: string;
    ghichu: string;
    trangthai: string;
    tongtien: number;
    sanPhamList: Array<{
      masp: number;       // Product ID
      tensp: string;      // Product name
      soluong: number;    // Quantity
      tongtien: number;   // Total price for the product
    }>;
    
  }

  