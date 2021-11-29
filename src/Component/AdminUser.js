import { useEffect, useState } from "react";
import { getUsers } from "../Api";


function AdminUser() {
    const [users,setUsers] = useState();
    useEffect(() => {
        getUsers()
            .then(data => data.json())
            .then(data => setUsers(data))
    }, [])

    return ( 
        <>
            <div className="Admin-header">
            <p> Họ Tên </p>
            <p> Tài Khoản </p>
            <p> Mật Khẩu </p>
            <p> Quyền </p>
            <button
            >
              Thêm Tài Khoản
            </button>
          </div>
          <div className="Admin-list">
              
          </div>
        </>
     );
}

export default AdminUser;