import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import {
  useGetKanbanQuery,
  useAddNewKanbanMutation,
  useUpdateKanbanMutation,
  useDeleteKanbanMutation,
} from "./kanbanApiSlice";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const KanbanList = () => {
  const { currentMode, currentColor } = useStateContext();
  const {  id,username } = useAuth();
  const navigate = useNavigate();
  const {
    data: kanban,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetKanbanQuery();
  const [addNewKanban] = useAddNewKanbanMutation();
  const [updateKanban] = useUpdateKanbanMutation();
  const [deleteKanban] = useDeleteKanbanMutation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    Title: "",
    Summary: "",
    Status: "Open",
    user:id,
    Assignee:username,
    Type: "Story",
    Priority: "Low",
    Tags: "Analyze,Customer",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-low, e-nancy-davloio",
    Estimate:3.5
    // Add more properties as needed
  });


  const handleAdd = async () => {

    try {
      await addNewKanban({ ...newTask }).unwrap();
      setShowAddForm(false); // Hide the add form after successful addition
      setNewTask({ Title: "", Summary: "", Status: "Open" }); 
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };
  const handleUpdate = async (args) => {
    console.log("Updating:", args);
    const changedRecords = args.changedRecords[0];
    await updateKanban(changedRecords);
  };

  const handleDelete = async (args) => {
    console.log("Deleting:", args);
    const deletedRecord = args.deletedRecords[0];
    const id = deletedRecord.id;

    try {
      await deleteKanban({ id }).unwrap(); // Ensure the mutation is unwrapped
    } catch (error) {
      console.error("Failed to delete the task:", error);
    }
  };
  let content;
  if (isLoading) {
    content = (
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
        <PulseLoader color={"#000"} />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
        <p className="inline-block bg-white text-[rgb(178,34,34)]">
          {error?.data?.message}
        </p>
      </div>
    );
  } else if (isSuccess) {
    const { ids, entities } = kanban;
    const filteredIds = ids.filter((itemId) => entities[itemId].username === username);

    const filteredKanbanData = filteredIds.map((itemId) => {
      const item = entities[itemId];
      return {
        Id: "Task " + item.Id.toString(),
        Title: item.Title,
        Status: item.Status,
        Summary: item.Summary,
        Type: item.Type,
        Priority: item.Priority,
        Tags: item.Tags,
        Estimate: item.Estimate,
        Assignee: item.Assignee,
        RankId: item.RankId,
        Color: item.Color,
        ClassName: item.ClassName,
        id: item.id,
        user: item.user,
      };
    });
    content = (
      <div>
        <div className="flex justify-end mb-4">
          {!showAddForm && (
            <button
              type="button"
              style={{ backgroundColor: `${currentColor}` }}
              className={`rounded-md text-white p-2 hover:drop-shadow-xl text-md`}
              onClick={() => setShowAddForm(true)}
            >
              Add New Task
            </button>
          )}
        </div>
        {showAddForm && (
          <div className="flex flex-row gap-2 justify-center items-center h-16">
            <input
              type="text"
              placeholder="Title"
              value={newTask.Title}
              onChange={(e) =>
                setNewTask({ ...newTask, Title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Summary"
              value={newTask.Summary}
              onChange={(e) =>
                setNewTask({ ...newTask, Summary: e.target.value })
              }
            />

            <select
              value={newTask.Status}
              className="block mb-2 p-2 border border-gray-300 rounded"
              onChange={(e) =>
                setNewTask({ ...newTask, Status: e.target.value })
              }
            >
              <option value="Open">To Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Testing">Testing</option>
              <option value="Close">Done</option>
            </select>
            {/* Add more input fields for other task properties */}
            <button
              type="button"
              style={{ backgroundColor: `${currentColor}` }}
              className={`rounded-md text-white p-2 hover:drop-shadow-xl text-md mb-2`}
              onClick={handleAdd}
            >
              Add Task
            </button>
            <button
              type="button"
              style={{ backgroundColor: `${currentColor}` }}
              className={`rounded-md text-white p-2 hover:drop-shadow-xl text-md mb-2`}
              onClick={() =>setShowAddForm(false)}
            >
             Go Back
            </button>
          </div>
        )}
        <KanbanComponent
          id="kanban"
          dataSource={filteredKanbanData}
          cardSettings={{ contentField: "Summary", headerField: "Id" }}
          keyField="Status"
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
          actionComplete={(args) => {
            console.log("Action Complete:", args);
            if (args.requestType === "cardChanged") {
              handleUpdate(args);
            } else if (args.requestType === "cardRemoved") {
              handleDelete(args);
            }
          }}
        >
          <ColumnsDirective>
            <ColumnDirective
              headerText="To Do"
              keyField="Open"
              allowToggle={true}
            />
            <ColumnDirective
              headerText="In Progress"
              keyField="InProgress"
              allowToggle={true}
            />
            <ColumnDirective
              headerText="Testing"
              keyField="Testing"
              allowToggle={true}
              isExpanded={false}
            />
            <ColumnDirective
              headerText="Done"
              keyField="Close"
              allowToggle={true}
            />
          </ColumnsDirective>
        </KanbanComponent>
      </div>
    );
  }

  return content;
};

export default KanbanList;
