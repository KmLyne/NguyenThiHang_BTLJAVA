--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-10-20 14:42:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 16877)
-- Name: chitietdonhang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chitietdonhang (
    mact integer NOT NULL,
    madh integer,
    masp integer,
    user_id integer,
    tongtien integer,
    soluong integer,
    anhsp character varying(255),
    gia character varying(255),
    ngaydathang character varying(255),
    tenkh character varying(255),
    tensp character varying(255),
    trangthai character varying(255)
);


ALTER TABLE public.chitietdonhang OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16876)
-- Name: chitietdonhang_mact_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chitietdonhang_mact_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chitietdonhang_mact_seq OWNER TO postgres;

--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 227
-- Name: chitietdonhang_mact_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chitietdonhang_mact_seq OWNED BY public.chitietdonhang.mact;


--
-- TOC entry 226 (class 1259 OID 16868)
-- Name: donhang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.donhang (
    madh integer NOT NULL,
    ngaydathang character varying(255),
    tenkh character varying(255),
    diachi character varying(255),
    sdt character varying(255),
    email character varying(255),
    ghichu character varying(255),
    trangthai character varying(255),
    tongtien integer
);


ALTER TABLE public.donhang OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16867)
-- Name: donhang_madh_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.donhang_madh_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.donhang_madh_seq OWNER TO postgres;

--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 225
-- Name: donhang_madh_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.donhang_madh_seq OWNED BY public.donhang.madh;


--
-- TOC entry 222 (class 1259 OID 16845)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    role_id integer NOT NULL,
    role_name character varying(255) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16844)
-- Name: role_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_role_id_seq OWNER TO postgres;

--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 221
-- Name: role_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_role_id_seq OWNED BY public.role.role_id;


--
-- TOC entry 220 (class 1259 OID 16826)
-- Name: sanpham; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sanpham (
    masp integer NOT NULL,
    tensp character varying(255),
    anhsp character varying(255),
    soluong integer,
    gia integer,
    mota character varying(255),
    math integer,
    maxx integer
);


ALTER TABLE public.sanpham OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16825)
-- Name: sanpham_masp_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sanpham_masp_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sanpham_masp_seq OWNER TO postgres;

--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 219
-- Name: sanpham_masp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sanpham_masp_seq OWNED BY public.sanpham.masp;


--
-- TOC entry 224 (class 1259 OID 16852)
-- Name: taikhoan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taikhoan (
    user_id integer NOT NULL,
    tennd character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    matkhau character varying(255) NOT NULL,
    role_id integer
);


ALTER TABLE public.taikhoan OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16851)
-- Name: taikhoan_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.taikhoan_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.taikhoan_user_id_seq OWNER TO postgres;

--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 223
-- Name: taikhoan_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.taikhoan_user_id_seq OWNED BY public.taikhoan.user_id;


--
-- TOC entry 216 (class 1259 OID 16812)
-- Name: thuonghieu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thuonghieu (
    math integer NOT NULL,
    tenth character varying(255)
);


ALTER TABLE public.thuonghieu OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16811)
-- Name: thuonghieu_math_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.thuonghieu_math_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.thuonghieu_math_seq OWNER TO postgres;

--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 215
-- Name: thuonghieu_math_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.thuonghieu_math_seq OWNED BY public.thuonghieu.math;


--
-- TOC entry 218 (class 1259 OID 16819)
-- Name: xuatxu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.xuatxu (
    maxx integer NOT NULL,
    tenxx character varying(255)
);


ALTER TABLE public.xuatxu OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16818)
-- Name: xuatxu_maxx_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.xuatxu_maxx_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.xuatxu_maxx_seq OWNER TO postgres;

--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 217
-- Name: xuatxu_maxx_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.xuatxu_maxx_seq OWNED BY public.xuatxu.maxx;


--
-- TOC entry 4724 (class 2604 OID 16880)
-- Name: chitietdonhang mact; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chitietdonhang ALTER COLUMN mact SET DEFAULT nextval('public.chitietdonhang_mact_seq'::regclass);


--
-- TOC entry 4723 (class 2604 OID 16871)
-- Name: donhang madh; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donhang ALTER COLUMN madh SET DEFAULT nextval('public.donhang_madh_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 16848)
-- Name: role role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN role_id SET DEFAULT nextval('public.role_role_id_seq'::regclass);


--
-- TOC entry 4720 (class 2604 OID 16829)
-- Name: sanpham masp; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sanpham ALTER COLUMN masp SET DEFAULT nextval('public.sanpham_masp_seq'::regclass);


--
-- TOC entry 4722 (class 2604 OID 16855)
-- Name: taikhoan user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taikhoan ALTER COLUMN user_id SET DEFAULT nextval('public.taikhoan_user_id_seq'::regclass);


--
-- TOC entry 4718 (class 2604 OID 16815)
-- Name: thuonghieu math; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thuonghieu ALTER COLUMN math SET DEFAULT nextval('public.thuonghieu_math_seq'::regclass);


--
-- TOC entry 4719 (class 2604 OID 16822)
-- Name: xuatxu maxx; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.xuatxu ALTER COLUMN maxx SET DEFAULT nextval('public.xuatxu_maxx_seq'::regclass);


--
-- TOC entry 4903 (class 0 OID 16877)
-- Dependencies: 228
-- Data for Name: chitietdonhang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chitietdonhang (mact, madh, masp, user_id, tongtien, soluong, anhsp, gia, ngaydathang, tenkh, tensp, trangthai) FROM stdin;
1	3	3	\N	300000	1	\N	\N	\N	\N	\N	\N
5	7	2	\N	100000	1	\N	\N	\N	\N	\N	\N
12	8	1	\N	800000	1	\N	\N	\N	\N	\N	\N
13	9	5	1	500000	1	\N	\N	\N	\N	\N	\N
14	10	1	1	800000	1	\N	\N	\N	\N	\N	\N
15	11	5	3	500000	1	\N	\N	\N	\N	\N	\N
16	12	8	3	3100000	1	\N	\N	\N	\N	\N	\N
17	13	7	6	790000	1	\N	\N	\N	\N	\N	\N
\.


--
-- TOC entry 4901 (class 0 OID 16868)
-- Dependencies: 226
-- Data for Name: donhang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.donhang (madh, ngaydathang, tenkh, diachi, sdt, email, ghichu, trangthai, tongtien) FROM stdin;
3	2024-10-17T12:06:41.575Z	Nguyễn Thị Mộng Cầm	Đồng Tháp	0587757485	nguyenvana@example.com	Ghi chú 1	Chờ xử lý	300000
7	2024-10-18T02:30:43.445Z	Nguyễn Thị Mộng Cầm	Đồng Tháp	0587757485	nguyenvana@example.com	ghichu2	Chờ xử lý	100000
8	2024-10-18T05:42:36.185Z	Nguyễn Thị Mộng Cầm	Đồng Tháp	0587757485	nguyenvana@example.com	123123	Chờ xử lý	800000
9	2024-10-18T06:10:38.656Z	Nguyễn Thị Hằng	Đồng Tháp	0706444212	nguyenvana@example.com	ghichu111	Chờ xử lý	500000
10	2024-10-18T06:38:46.291Z	Nguyễn Thị Mộng Cầm	Ở trọ Nguyễn Bửu Lâm	0587757485	nguyenthimongcam0301@gmail.com	ghi chu 4	Chờ xử lý	800000
11	2024-10-18T10:25:57.150Z	Nguyễn Thị Mộng Cầm	Ở trọ Nguyễn Bửu Lâm	0587757485	mongcam030102@gmail.com	đơn hàng chưa giao	Chờ xử lý	500000
12	2024-10-19T02:43:33.479Z	Vy	Đồng 	0786423121	vy@gmail.com	ghichu123	Chờ xử lý	3100000
13	2024-10-19T08:54:12.134Z	Nguyễn Kim Liên	Đồng Tháp	0789323110	nkl11@gmail.com	ghi chú 6	Đang xử lý	790000
\.


--
-- TOC entry 4897 (class 0 OID 16845)
-- Dependencies: 222
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (role_id, role_name) FROM stdin;
1	admin
2	user
\.


--
-- TOC entry 4895 (class 0 OID 16826)
-- Dependencies: 220
-- Data for Name: sanpham; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sanpham (masp, tensp, anhsp, soluong, gia, mota, math, maxx) FROM stdin;
1	Dior Sauvage EDP	sp1.jpg	12	800000	Như đêm người đàn ông trở về những ngày rong ruổi trên bát kẽ nẻo đường, lửa trái đêm bùng lên tí tách từng vệt đỏ tía, nước hoa Dior Sauvage EDP dành cho nam nhấn nhủm cho ta sự tò mò.	2	1
2	Versace Pour Homme EDT	sp2.jpg	15	100000	Nước hoa nam Versace Pour Homme EDT chính là mảnh ghép còn thiếu để tạo nên bức tranh hoàn hảo về người đàn ông hiện đại, lôi cuốn và tràn đầy sự nam tính.  	3	2
3	Mancera Paris Cedrat Boise EDP	sp3.jpg	7	300000	Hầu hết review nước hoa Mancera Cedrat Boise đều đánh giá đây chính là sản phẩm mang đến cho người dùng một trải nghiệm mùi hương vô cùng tuyệt vời và khó quên.	4	3
4	Creed Silver Mountain Water	sp4.jpg	10	1000000	Nước hoa này được thiết kế để gợi nhớ đến hình ảnh những dòng suối trong lành ở dãy núi Swiss Alps. Với hương thơm tươi mát, sản phẩm mang lại cảm giác thoải mái.	5	4
5	Creed Aventus For Men EDP	sp5.jpg	12	500000	Nước hoa này được xem như "vua" của nước hoa nam, mang đến sự sang trọng và hiện đại. Hương thơm của Creed Aventus thể hiện phong cách giản dị nhưng mạnh mẽ.	6	2
6	Acqua di Gio	sp6.jpg	3	2300000	Đây là một trong những sản phẩm nước hoa nổi tiếng, thường được biết đến với hương thơm tươi mát và quyến rũ, thích hợp cho cả nam và nữ.	7	2
7	Bleu de Chanel	sp7.jpg	1	790000	Đây là một sản phẩm nước hoa nổi tiếng với hương thơm nam tính, thường được mô tả là tươi mát và quyến rũ.	1	3
8	Yves Saint Laurent	sp14.jpg	5	3100000	Đây là một sản phẩm nổi tiếng với hương thơm ngọt ngào và quyến rũ, thường được mô tả là mang lại cảm giác lãng mạn và hiện đại.	8	1
\.


--
-- TOC entry 4899 (class 0 OID 16852)
-- Dependencies: 224
-- Data for Name: taikhoan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.taikhoan (user_id, tennd, email, matkhau, role_id) FROM stdin;
1	Nguyễn Văn A	nguyenvana@example.com	123	2
2	Nguyễn Thị Hằng	nth08051116@gmail.com	111	1
3	Nguyễn Thị Mộng Cầm	mongcam030102@gmail.com	00000	2
5	Nguyễn Văn B	nguyenvanb@gmail.com	22222	2
6	Nguyễn Kim Liên	nkl11@gmail.com	1122	2
9	Trần Thị Be	tranthib12@gmail.com	333	2
10	Nguyễn Văn Aa		12345	2
12	Nguyễn Thị Hằng	nthang@gmail.com	11111	2
\.


--
-- TOC entry 4891 (class 0 OID 16812)
-- Dependencies: 216
-- Data for Name: thuonghieu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thuonghieu (math, tenth) FROM stdin;
1	CHANEL
2	DIOR
3	ROJA DOVE
4	VERSACE
5	CREED
6	XERJOFF
7	GIORGIO ARMAINI
8	YSL
\.


--
-- TOC entry 4893 (class 0 OID 16819)
-- Dependencies: 218
-- Data for Name: xuatxu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.xuatxu (maxx, tenxx) FROM stdin;
1	PHÁP
2	Ý
3	ANH
4	USA
\.


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 227
-- Name: chitietdonhang_mact_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chitietdonhang_mact_seq', 18, true);


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 225
-- Name: donhang_madh_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.donhang_madh_seq', 14, true);


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 221
-- Name: role_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_role_id_seq', 2, true);


--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 219
-- Name: sanpham_masp_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sanpham_masp_seq', 10, true);


--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 223
-- Name: taikhoan_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.taikhoan_user_id_seq', 12, true);


--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 215
-- Name: thuonghieu_math_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.thuonghieu_math_seq', 10, true);


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 217
-- Name: xuatxu_maxx_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.xuatxu_maxx_seq', 6, true);


--
-- TOC entry 4740 (class 2606 OID 16882)
-- Name: chitietdonhang chitietdonhang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chitietdonhang
    ADD CONSTRAINT chitietdonhang_pkey PRIMARY KEY (mact);


--
-- TOC entry 4738 (class 2606 OID 16875)
-- Name: donhang donhang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donhang
    ADD CONSTRAINT donhang_pkey PRIMARY KEY (madh);


--
-- TOC entry 4732 (class 2606 OID 16850)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4730 (class 2606 OID 16833)
-- Name: sanpham sanpham_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sanpham
    ADD CONSTRAINT sanpham_pkey PRIMARY KEY (masp);


--
-- TOC entry 4734 (class 2606 OID 16861)
-- Name: taikhoan taikhoan_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taikhoan
    ADD CONSTRAINT taikhoan_email_key UNIQUE (email);


--
-- TOC entry 4736 (class 2606 OID 16859)
-- Name: taikhoan taikhoan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taikhoan
    ADD CONSTRAINT taikhoan_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4726 (class 2606 OID 16817)
-- Name: thuonghieu thuonghieu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thuonghieu
    ADD CONSTRAINT thuonghieu_pkey PRIMARY KEY (math);


--
-- TOC entry 4728 (class 2606 OID 16824)
-- Name: xuatxu xuatxu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.xuatxu
    ADD CONSTRAINT xuatxu_pkey PRIMARY KEY (maxx);


--
-- TOC entry 4744 (class 2606 OID 16883)
-- Name: chitietdonhang chitietdonhang_madh_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chitietdonhang
    ADD CONSTRAINT chitietdonhang_madh_fkey FOREIGN KEY (madh) REFERENCES public.donhang(madh);


--
-- TOC entry 4745 (class 2606 OID 16888)
-- Name: chitietdonhang chitietdonhang_masp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chitietdonhang
    ADD CONSTRAINT chitietdonhang_masp_fkey FOREIGN KEY (masp) REFERENCES public.sanpham(masp);


--
-- TOC entry 4746 (class 2606 OID 16893)
-- Name: chitietdonhang chitietdonhang_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chitietdonhang
    ADD CONSTRAINT chitietdonhang_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.taikhoan(user_id);


--
-- TOC entry 4741 (class 2606 OID 16834)
-- Name: sanpham sanpham_math_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sanpham
    ADD CONSTRAINT sanpham_math_fkey FOREIGN KEY (math) REFERENCES public.thuonghieu(math);


--
-- TOC entry 4742 (class 2606 OID 16839)
-- Name: sanpham sanpham_maxx_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sanpham
    ADD CONSTRAINT sanpham_maxx_fkey FOREIGN KEY (maxx) REFERENCES public.xuatxu(maxx);


--
-- TOC entry 4743 (class 2606 OID 16862)
-- Name: taikhoan taikhoan_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taikhoan
    ADD CONSTRAINT taikhoan_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(role_id);


-- Completed on 2024-10-20 14:42:35

--
-- PostgreSQL database dump complete
--

