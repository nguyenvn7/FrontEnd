export async function getComments(idsp) {
    const res = fetch(`http://localhost:3001/apiComment/getComments?idsp=${idsp}`);
    return res;
}
export async function adminGetComments() {
    const res = fetch(`http://localhost:3001/apiComment/adminGetComments`);
    return res;
}
export async function postComment(username, content, idsp) {
    const res = fetch("http://localhost:3001/apiComment/postComment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            content,
            idsp
        })
    });
    return res;
}
export async function deleteComment(idcmt) {
    const res = fetch("http://localhost:3001/apiComment/deleteComment", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idcmt
        })
    });
    return res;
}
export async function adminDeleteComment(idcmt) {
    const res = fetch("http://localhost:3001/apiComment/adminDeleteComment", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idcmt
        })
    });
    return res;
}