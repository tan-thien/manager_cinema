import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { serviceService } from "../../../services/ServiceService";
import type { Service } from "../../../types/Service";

const ServiceDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);

    const formatDate = (date?: string) => (date ? new Date(date).toLocaleString() : "Chưa có");

    useEffect(() => {
        if (id) {
            serviceService.getById(id).then(setService);
        }
    }, [id]);

    if (!service) return <div style={{ padding: 24 }}>Đang tải...</div>;

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            maxWidth: 600,
            margin: "40px auto",
            padding: 24,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            backgroundColor: "#fff",
            fontFamily: "Arial, sans-serif",
        },
        title: {
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            background: "linear-gradient(to right, #3b82f6, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        },
        infoBox: {
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
        },
        imageWrapper: {
            width: 120,
            height: 120,
            overflow: "hidden",
            borderRadius: 12,
            border: "1px solid #ddd",
            alignSelf: "center",
        },
        image: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
        label: { fontWeight: 600 },
        btnGroup: { display: "flex", justifyContent: "center", gap: 12, marginTop: 20 },
        editBtn: {
            background: "linear-gradient(to right, #3b82f6, #f97316)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 12,
            textDecoration: "none",
            fontWeight: 600,
        },
        backBtn: {
            backgroundColor: "#aaa",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 12,
            textDecoration: "none",
            fontWeight: 600,
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Chi tiết dịch vụ</h2>
            <div style={styles.infoBox}>
                <p><span style={styles.label}>Tên dịch vụ:</span> {service.TenDichVu}</p>
                <div style={styles.imageWrapper}>
                    <img src={service.HinhAnh} alt={service.TenDichVu} style={styles.image} />
                </div>
                <p><span style={styles.label}>Mô tả:</span> {service.MoTa}</p>
                <p><span style={styles.label}>Giá:</span> {service.Gia.toLocaleString()} VND</p>
                <p><span style={styles.label}>Trạng thái:</span> {service.TrangThai ? "Đang hoạt động" : "Ngừng"}</p>
                <p><span style={styles.label}>Ngày tạo:</span> {formatDate(service.createdAt)}</p>
                <p><span style={styles.label}>Cập nhật:</span> {formatDate(service.updatedAt)}</p>
            </div>

            <div style={styles.btnGroup}>
                <Link to={`/admin/services/edit/${service.id}`} style={styles.editBtn}>Sửa</Link>
                <Link to="/admin/services" style={styles.backBtn}>Quay lại</Link>
            </div>
        </div>
    );
};

export default ServiceDetailPage;
