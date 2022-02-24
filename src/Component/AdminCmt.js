import { useEffect, useState } from "react";
import { adminDeleteComment, adminGetComments } from "../Api/Comment";

function AdminCmt() {
    const [listCmt, setListCmt] = useState();
    const [isEffect, setIsEffect] = useState(false);
    const handleDelete = (idcmt)=>{
        adminDeleteComment(idcmt).then(()=> setIsEffect(!isEffect));
    }
    useEffect(() => {
        adminGetComments().then(res => res.json()).then(data => setListCmt(data))
    }, [isEffect])
    return (
        <>
            <div className="Admin-header Admin-header-P-U">
                <p> Tài Khoản </p>
                <p> Nội Dung Bình Luận </p>
                <p> Ngày Đăng </p>
                <p>ID Sản Phẩm</p>
                <p> Thao Tác </p>
            </div>
            <div className="Admin-List Admin-List-P-U" >
                {listCmt?.map(value =>
                    <div className="Admin-Item Admin-Item-P-U" key={value.idcmt} >
                        <div className="Admin-fullname">
                            <p>{value.username}</p>
                        </div>
                        <div className="Admin-sdt">{value.content}</div>
                        <div className="Admin-address">{value.ngaydang}</div>
                        <div className="Admin-role">{value.idsp}</div>
                        <div className="Admin-btn">
                            <button
                                className="fas fa-trash-alt delete"
                                onClick={()=> handleDelete(value.idcmt)}
                            ></button>
                        </div>
                    </div>)}
            </div>
        </>
    );
}

export default AdminCmt;