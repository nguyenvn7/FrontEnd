import { useState, memo } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { AuthState } from "../../context/context.js";
import { postComment } from "../../Api/Comment";
import { checkBuyProduct } from "../../Api/index.js";

function CommentBox({ handleLoadEffect }) {

    const [content, setContent] = useState();
    const { auth } = AuthState();
    const history = useHistory();
    const { query } = useLocation();
    const [notice, setNotice] = useState({
        text: '',
        isNotice: false
    });

    const idsp = query?.idsp;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (auth?.username) {
            if(content){
                checkBuyProduct(auth.username, idsp).then(data => {
                    if(data.status === 200){
                        postComment(auth.username, content, idsp).then(() => handleLoadEffect());
                    }else setNotice({
                        text: 'Bạn chưa mua sản phầm này!',
                        isNotice: true
                    })
                })
            }else {
                setNotice({
                    text: 'Bạn chưa nhập nội dung!',
                    isNotice: true
                })
            }
        } else history.push("/login");
    }

    return (
        <>
            <div className="comment-box" onSubmit={e => handleSubmit(e)}>
                <form action="#">
                    <p contentEditable className="input" onInput={e => setContent(e.target.textContent)}></p>
                    <button>Bình Luận</button>
                </form>
            </div>
            {notice.isNotice && (
                <div className="Cart-modal settingAccModal">
                    <div className="close-s">
                        <i
                            onClick={() => setNotice(false)}
                            className="fas fa-times-circle "
                        ></i>
                    </div>
                    <p>{notice.text}</p>
                </div>
            )}
        </>
    );
}

export default memo(CommentBox);