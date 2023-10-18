import {
  Dispatch,
  FC,
  Fragment,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useRef,
} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {
  IoAlertOutline,
  IoCheckmark,
  IoInformation,
  IoWarningOutline,
} from 'react-icons/io5';
import classNames from '~/util/classNames';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type?: 'info' | 'danger' | 'success';
  icon?: ReactNode;
  title: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: MouseEventHandler<HTMLButtonElement>;
  onSecondaryClick?: MouseEventHandler<HTMLButtonElement>;
};

const ConfirmationModal: FC<Props> = ({
  open,
  setOpen,
  type = 'info',
  icon,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className={classNames(
                        'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
                        type === 'danger'
                          ? 'bg-red-100'
                          : type === 'success'
                          ? 'bg-green-100'
                          : 'bg-blue-100',
                      )}>
                      {icon ||
                        (type === 'danger' ? (
                          <IoWarningOutline
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        ) : type === 'success' ? (
                          <IoCheckmark
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <IoInformation
                            className="h-6 w-6 text-blue-600"
                            aria-hidden="true"
                          />
                        ))}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      {description && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={classNames(
                      'inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto',
                      type === 'danger'
                        ? 'bg-red-600 hover:bg-red-500'
                        : type === 'success'
                        ? 'bg-green-600 hover:bg-green-500'
                        : 'bg-blue-600 hover:bg-blue-500',
                    )}
                    onClick={onPrimaryClick || (() => setOpen(false))}>
                    {primaryButtonText || 'Okay'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onSecondaryClick || (() => setOpen(false))}
                    ref={cancelButtonRef}>
                    {secondaryButtonText || 'Cancel'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfirmationModal;
