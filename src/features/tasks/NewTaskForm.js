import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewTaskMutation } from "./tasksApiSlice";
import { FaRegSave, FaTasks } from "react-icons/fa";
import BounceLoader from "react-spinners/BounceLoader";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../../context/ContextProvider";

const NewTaskForm = ({ users }) => {
  const [addNewTask, { isLoading, isSuccess, isError, error }] =
    useAddNewTaskMutation();
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/tasks");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveTaskClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewTask({ title, text, user: userId });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass = isError
    ? "bg-white text-[#F00] p-[0.25em] mb-[0.5em] inline-block"
    : "offscreen";

  const validTitleClass = !title
    ? "border border-[#F00] border-solid outline-[1px_solid_#F00]"
    : "border-solid border-1 border-black ";

  const validTextClass = !text
    ? "border border-[#F00] border-solid outline-[1px_solid_#F00]"
    : "border-solid border-1 border-black ";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form
        className="flex [flex-flow:column_nowrap] gap-[0.75em] max-w-[800px] relative"
        onSubmit={onSaveTaskClicked}
      >
        {isLoading && (
          <div
            className={`absolute inset-0 flex items-center justify-center z-10 m-2 max-w-[800px] md:m-10 p-2 md:p-10 rounded-3xl dark:text-${currentColor} dark:bg-secondary-dark-bg`}
          >
            <BounceLoader color={currentColor} />
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="font-bold">New Task Form</h2>
          <div className="flex justify-end items-center gap-[0.5em] rounded-[15px] absolute right-[0.5em]">
            {canSave && (
              <TooltipComponent content="Save" position="Top">
                <button className="text-[2rem]" disabled={!canSave}>
                  <FaRegSave className="text-[2rem] hover:text-[2.2rem] cursor-pointer" />
                </button>
              </TooltipComponent>
            )}
            <TooltipComponent content="Go Back" position="Top">
              <button onClick={() =>navigate('/tasks')} className="text-[2rem]">
                <FaTasks className="text-[2rem] hover:text-[2.2rem] cursor-pointer" />
              </button>
            </TooltipComponent>
          </div>
        </div>
        <label htmlFor="title" className="form__label font-semibold">
          Title :
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`p-[0.5em]  rounded-[15px] ${validTitleClass}`}
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="text" className="form__label font-semibold">
          Text :
        </label>
        <input
          type="text"
          id="text"
          name="text"
          className={`p-[0.5em] rounded-[15px]  ${validTextClass}`}
          autoComplete="off"
          value={text}
          onChange={onTextChanged}
        />

        <label className="form__label font-semibold" htmlFor="username">
          ASSIGNED TO:
        </label>
        <select
          name="username"
          id="username"
          className={`w-full p-[0.5em] rounded-md `}
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

export default NewTaskForm;
