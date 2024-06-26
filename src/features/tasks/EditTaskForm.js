import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateTaskMutation, useDeleteTaskMutation } from "./tasksApiSlice";
import { FaRegSave, FaTrash, FaTasks } from "react-icons/fa";
import BounceLoader from "react-spinners/BounceLoader";
import { useStateContext } from "../../context/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import useAuth from "../../hooks/useAuth";

const EditTaskForm = ({ task, users }) => {
  const [updateTask, { isLoading, isSuccess, isError, error }] =
    useUpdateTaskMutation();
  const [
    deleteTask,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteTaskMutation();
  const { currentColor } = useStateContext();
  const { isAdmin, isManager } = useAuth();

  const navigate = useNavigate();

  const [title, setTitle] = useState(task.title);
  const [text, setText] = useState(task.text);
  const [userId, setUserId] = useState(task.user);
  const [completed, setCompleted] = useState(task.completed);

  useEffect(() => {
    // console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUserId("");
      setTitle("");
      setText("");
      navigate("/tasks");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const onCompleteChanged = () => setCompleted((prev) => !prev);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const onSaveTaskClicked = async (e) => {
    if (canSave) {
      await updateTask({ id: task.id, user: userId, title, text, completed });
    }
  };
  const onDeleteTaskClicked = async () => {
    await deleteTask({ id: task.id });
  };

  const created = new Date(task.createdAt).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const updated = new Date(task.updatedAt).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
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

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  const handleUserChange = (e) => {
    if (isAdmin || isManager) {
      onUserIdChanged(e);
    }
  };

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form
        className="flex [flex-flow:column_nowrap] gap-[0.75em] max-w-[800px] relative"
        onSubmit={(e) => e.preventDefault()}
      >
        {isLoading && (
          <div
            className={`absolute inset-0 flex items-center justify-center z-10 m-2 max-w-[800px] md:m-10 p-2 md:p-10 rounded-3xl dark:text-${currentColor} dark:bg-secondary-dark-bg`}
          >
            <BounceLoader color={currentColor} />
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="font-bold">Edit Task #{task.ticket}</h2>
          <div className="position-static flex gap-[0.5em]">
            <TooltipComponent content="Go Back" position="Top">
              <button
                className="text-[2rem]"
                title="Go Back"
                onClick={() => navigate("/tasks")}
              >
                <FaTasks className="text-[2rem] hover:text-[2.2rem]  cursor-pointer" />
              </button>
            </TooltipComponent>
            {canSave && (
              <TooltipComponent content="Save" position="Top">
                <button
                  className="text-[2rem]"
                  title="Save"
                  onClick={onSaveTaskClicked}
                  disabled={!canSave}
                >
                  <FaRegSave className="text-[2rem] hover:text-[2.2rem] cursor-pointer" />
                </button>
              </TooltipComponent>
            )}
            {(isAdmin || isManager) && (
              <TooltipComponent content="Delete" position="Top">
                <button
                  className="text-[2rem]"
                  title="Delete"
                  onClick={onDeleteTaskClicked}
                >
                  <FaTrash className="text-[2rem] hover:text-[2.2rem]  cursor-pointer" />
                </button>
              </TooltipComponent>
            )}
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
        <div className="flex [flex-flow:row_nowrap] gap-[5em]">
          <div className="flex [flex-flow:column_nowrap] gap-[0.5em]">
            <label
              htmlFor="note-completed"
              className="form__label font-semibold  flex items-center gap-[0.5em] w-fit"
            >
              WORK COMPLETE:
              <input
                className="w-[24px] h-[24px]"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompleteChanged}
              />
            </label>
            <label
              className="form__label font-semibold form__checkbox-container"
              htmlFor="note-username"
            >
              ASSIGNED TO:
            </label>
            <select
              name="username"
              id=" note-username"
              className={`w-full p-[0.5em] rounded-md`}
              value={userId}
              onChange={handleUserChange}
            >
              {options}
            </select>
          </div>
          <div className="flex [flex-flow:column_nowrap] gap-[0.5em]">
            <p className="form__created">
              Created: <br /> {created}
            </p>
            <p className="form__updated">
              Updated: <br /> {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditTaskForm;
