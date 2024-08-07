import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTriangleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { AlertModalType } from '@/types/AlertModalType';

const AlertModal = ({
  title,
  textBody,
  onClose,
}: AlertModalType & { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-cardsDark shadow-lg w-[550px] h-72 flex rounded-10 opacity-95 relative">
        <FontAwesomeIcon
          icon={faXmark}
          className="text-offwhite z-20 absolute top-0 right-0 mr-6 mt-4 cursor-pointer"
          size="xl"
          onClick={onClose}
        />
        <div className="relative flex items-center justify-center w-1/4">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-skyblue z-20 absolute"
            size="2xl"
          />
          <div className="bg-skyblue opacity-30 w-full h-full rounded-l-10"></div>
        </div>
        <div className="flex flex-col justify-around p-4 w-full">
          <h2 className="text-lg text-offwhite mt-4">{title}</h2>
          <p className="text-md font-extralight text-offwhite -mt-7">
            {textBody}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
