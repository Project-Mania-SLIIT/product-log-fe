import { Toaster as HotToaster, toast } from "react-hot-toast";

const Toaster = () => {
    return <HotToaster toastOptions={{ duration: 1500 }} />;
};

export default Toaster;
export { toast as Toast };
