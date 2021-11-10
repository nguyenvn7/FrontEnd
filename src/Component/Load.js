import Lottie from "react-lottie";
import animbook from "../lottie/11793-books-stack.json";

function Load() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animbook,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
        
        <div className="Load">
            <Lottie
                options={defaultOptions}
                isClickToPauseDisabled={true}
         />
        </div>
         
     );
}

export default Load;