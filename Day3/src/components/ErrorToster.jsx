// import { FaExclamationCircle } from "react-icons/fa";

const ErrorToster = () => {
    return (
        <div className="flex items-center justify-center mt-4">
            <div className="flex items-center gap-2 border border-red-300 bg-red-50 p-3 rounded-xl shadow-md w-fit">
                {/* <div className="text-red-500 text-xl"> </div>  */}
                <span className="text-red-700 font-semibold">
                    Enter the name first and try again.
                </span>
            </div>
        </div>
    );
};

export default ErrorToster;