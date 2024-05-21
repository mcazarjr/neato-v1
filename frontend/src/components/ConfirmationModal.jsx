import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react';

const ConfirmationModal = ({ ConfirmationModalClose }) => {

  const navigate = useNavigate();

  const closeFunc = () => {
    ConfirmationModalClose();
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={ConfirmationModalClose}>
        <div className="flex items-center justify-center min-h-screen pt-5 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4
                            text-left overflow-hidden shadow-xl transform transition-all
                            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 md:max-w-4xl md:max-h-[800px]">

              <div className="flex justify-center flex-col gap-4 items-center py-[8rem]">
                <h1 className="text-4xl font-semibold text-[#31B58D] w-52 h-52 flex items-center
                                justify-center border-[1.7rem] border-[#31B58D] p-[3rem] rounded-full">
                                  100%
                </h1>
                <p className="font-bold text-2xl">Task Completed!</p>
                <button className="mt-2 w-full inline-flex justify-center rounded-md border
                        border-transparent shadow-sm px-[3rem] py-2 bg-[#31B58D] text-base font-medium
                        text-white focus:outline-none sm:w-auto sm:text-sm"
                        onClick={ () => {closeFunc(); navigate(0)}}>
                          Back to DashBoard
                </button>
              </div>
              
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfirmationModal;
