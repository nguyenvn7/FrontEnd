import CommentBox from "./CommentBox";
import ListComment from "./ListComment";
import { useEffect, useState, memo } from "react";
import { getComments } from "../../Api/Comment";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Comment() {
   const { query } = useLocation();
   const idsp = query?.idsp;
   const [state, setState] = useState({
      comments: [],
      isLoadEffect: false
   });
   const handleLoadEffect = () => {
      setState({
         comments: [],
         isLoadEffect: !state.isLoadEffect
      })
   }
   const [notice, setNotice] = useState(true);

   useEffect(() => {
      console.log("comment")
      getComments(idsp)
         .then(res => res.json())
         .then(data => {
            setState({
               ...state,
               comments: data
            })
         })
   }, [state.isLoadEffect])

   return (
      <>
         <section className="comment ">
            <div className="comment-wrap">
               <CommentBox handleLoadEffect={handleLoadEffect} />
               <ListComment state={state} handleLoadEffect={handleLoadEffect} />
            </div>
         </section>
        
      </>
   );
}
export default memo(Comment);

