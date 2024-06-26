import React, { memo } from 'react'

import { useNavigate } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { useGetTasksQuery } from './tasksApiSlice'


import { useStateContext } from '../../context/ContextProvider';


function Task({taskId}) {
    const { task } = useGetTasksQuery("tasksList", {
        selectFromResult:({data}) => ({
            task:data?.entities[taskId]
        }),
    })

    const navigate = useNavigate()
    
 if (task){
    const created = new Date(task.createdAt).toLocaleString('en-UK', {day:'numeric', month:'long'})

    const updated = new Date(task.updatedAt).toLocaleString('en-UK', {day:'numeric', month:'long'})
    const handleEdit = () => navigate(`/tasks/${taskId}`)
    

   return (
        <tr key={taskId} className='datatable  table__row task'>
            <td className={`text-left border-[1px]  border-solid p-[0.5em] font-bold `}>{task.completed ? <span className=" text-[#32cd32]">Completed</span> : <span className='text-[#b22222]'>Open</span>}</td>
            <td className={`text-left border-[1px]  border-solid p-[0.5em] hidden md:block`}> {created}</td>
            <td className={`text-left border-[1px]  border-solid p-[0.5em] hidden md:block`}> {updated}</td>
            <td className={`text-left border-[1px]  border-solid p-[0.5em] font-semibold`}> {task.title}<br/> <span style={{fontWeight:"400"}}>{task.text}</span></td>
            <td className={`text-left border-[1px]  border-solid p-[0.5em] hidden md:block`}> {task.username}</td>
            <td className={`text-left border-[1px]   border-solid p-[0.5em] grid place-content-center`}>
                <button className=' p-[0.25em] text-[1.5rem]' onClick={handleEdit}>
                    <FaRegEdit/>
                </button>
            </td>
        </tr>
    )

 } else return null
}
const memoizedTask = memo(Task)
export default memoizedTask