import { toast } from "react-toastify";

function ToastEmitter(props) {
  // documentation for any changes
  //https://fkhadra.github.io/react-toastify/introduction/
  const { msg, type } = props;

  const _type = type ? type : "success";
  toast(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: _type,
  });
}

export default ToastEmitter;
