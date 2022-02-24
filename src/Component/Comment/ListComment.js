import { deleteComment } from "../../Api/Comment";
import { useState } from "react";
import {AuthState} from "../../context/context";

function ListComment({state: {comments},handleLoadEffect}) {
    
    const {auth} = AuthState();

    const handleDeleteComment = (idcmt)=>{
        deleteComment(idcmt).then(() => handleLoadEffect());
    }

    return (
        <>
        <div className="comment-listComment">
            {comments?.length && comments?.map(value =>       
                <div className="comment-listComment-item" key={value.idcmt}>
                    <div className="user">
                        <div className="left">
                            <img
                                src={value.img}
                                alt=""
                            />
                        </div>
                        <div className="right">
                            <p>{value.fullname}</p>
                            <p>{value.ngaydang}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p>
                            {value.content}
                        </p>
                    </div>
                    {value?.username === auth?.username &&  <button className="comment-delete" onClick={()=>{
                        handleDeleteComment(value.idcmt);
                    }}>Xoá</button>}
                </div>
            ) || <p>Không Có Bình Luận</p>}
        </div>
        </>
    );
}

export default ListComment;
