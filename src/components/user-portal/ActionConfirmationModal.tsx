import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const ConfirmationModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-cardsDark shadow-lg w-[550px] h-48 flex rounded-10 opacity-95 relative">
        <FontAwesomeIcon
          icon={faXmark}
          className="text-offwhite z-20 absolute top-0 right-0 mr-6 mt-4"
          size="xl"
        />
        <div className="relative flex items-center justify-center w-1/4">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="text-orange-500 z-20 absolute"
            size="2xl"
          />
          <div className=" bg-skyblue opacity-30 w-full h-full rounded-l-10"></div>
        </div>
        <div className="flex flex-col justify-around p-4 w-full">
          <h2 className="text-md mt-4">Remove guest?</h2>
          <p className="text-base font-extralight text-offwhite text-sm -mt-4">
            This action will revoke their access to your card.
          </p>
          <div className="flex justify-end mt-4">
            <button className=" text-primary font-extralight py-px mr-6 border-b border-skyblue">
              Remove guest
            </button>
            <button className=" text-primary text-base font-extralight py-px mr-2  border-b border-rose-600">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
