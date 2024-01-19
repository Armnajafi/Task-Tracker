import { Component, Fragment, useEffect, useState } from "react";
import sundate from "sundate"
import "../styles/Task.css"

export default function Task(){
        // Task base details states
        let [taskTitle , setTaskTitle] = useState("")
        let [taskStatus , setTaskStatus] = useState(0)

        let [filter , setFilter] = useState(10)

        let [taskDate , setTaskDate] = useState(sundate.now()) // sundate.now i method for get shamsi date

        // Task Edit states
        let [isEditing , setIsEditing] = useState(false)
        let [currentTask , setCurrentTask] = useState({})

        // Tasks List states
        let [tasks , setTasks] = useState([])

        // useEffect for Run on load
        useEffect( () => {

            // get tasks from browser localstorage if its exist
            const storedTasks = JSON.parse(localStorage.getItem("tasks"))
            if(storedTasks){
                setTasks(storedTasks)
            }

        } , [])

        // useEffect for Run on load
        useEffect( () => {
            // save tasks to browser localstorage in "tasks"
           localStorage.setItem("tasks" , JSON.stringify(tasks))
        } , [tasks])


        const checkDate = (date) => {
            let datePattern = /(13|14)([0-9][0-9])\/(((0?[1-6])\/((0?[1-9])|([12][0-9])|(3[0-1])))|(((0?[7-9])|(1[0-2]))\/((0?[1-9])|([12][0-9])|(30))))/
            if(!datePattern.test(date))
                {
                    return false
                } else {
                    return true
                }
        }

        // a method for reset Task base details 
        const resetInput = () => {
            setTaskTitle("")
            setTaskStatus(0)
            setTaskDate("")
        }

        // handle changing inputs and save theme in state
        const updateInput = (event) => {
            switch (event.target.id){
                case "title": setTaskTitle(event.target.value); break;
                case "status": setTaskStatus(event.target.value); break;
                case "date": setTaskDate(event.target.value); break;
                case "filter": setFilter(event.target.value); break;
                default: setFilter(10);
            }
        }

        // handle deleting task item
        const handleDeleteItem = (key) => {
            // get all items expect item.id !== key (desired item to delete) and save them in updatedList
            const updatedList = tasks.filter((item) =>  item.id !== key)
            setTasks(updatedList) // Update Tasks list
        }


        // handle add item with conditions
        // it's work when clicking 'Add Item'
        const handleAddItem =  () => {
            // if condition for check inputs its not null
            if( taskTitle !== "" &&
                taskTitle.trim() !== "" &&
                taskStatus !== ""  &&
                taskDate !== "" &&
                taskDate.trim() !== ""){

                // an object for collect task details
                const taskItem = {
                    id: Math.random(), // a random id for each item
                    title: taskTitle, // title of task
                    status: taskStatus, // status of task
                    date: taskDate, // date of task
                }

                // validate input date
                if(!checkDate(taskDate)){
                    return alert("date is invalid")
                }

                // update list
                const taskList = [...tasks]
                taskList.push(taskItem) 
                setTasks(taskList)

                // reset states
                resetInput()
            }
        }

        // That method changing isEditing to 'true' for get ready to edit item
        // and getting item details to put theme in input (current values)
        // it's work when click on the edit button in items list
        const handleEditItemBtn = (key) => {
            const taskItem = tasks.find((item) =>  item.id === key)
            setIsEditing(true)
            setCurrentTask(taskItem)

            setTaskTitle(taskItem.title)
            setTaskDate(taskItem.date)
            setTaskStatus(taskItem.status)
        }
        
        // its work when click edit task button "Edit Task"
        const handleEditItem = () => {

            // validate input date
            if(!checkDate(taskDate)){
                return alert("date is invalid")
            }
            // Check each item one by one and put in editedItem with new values
            const editedItems = tasks.map((item) =>  {


                // get the item which want to edit
                if(item.id === currentTask.id)
                {
                    // change all details with new values
                    item.title = taskTitle
                    item.date = taskDate
                    item.status = taskStatus
                }

                // return new edited item
                return item
            })

            // set editedItems and reset all inputs and editing mode
            setTasks(editedItems)
            resetInput()
            setIsEditing(false)
        }

        // a handler for cancel editing a item and reset inputs
        const handleEditCancel = () => {
            setIsEditing(false)
            resetInput()
        }

        // a method for set filter to items , Done , Undone , Doing 
        const withFilter = (status) => {
            if(status != 10){
                let filterTasks = tasks.filter((item) => {
                    if(item.status == status){
                        return item
                    }
                })
                
                return {data:filterTasks}
            } else {
                return {data:tasks}
            }
        }

        // a method for check status with number and change it to a tag for display
        // 0 - Done
        // 1 - Doing
        // 2 - Undone
        const statusCheck = (status) => {
            let output = ""
            if(status == 0){
                output = <span className="task-status task-status-done">Done</span>
            } else if(status == 1){
                output = <span className="task-status task-status-doing">Doing</span>
            } else if(status == 2){
                output = <span className="task-status task-status-undone">Undone</span>
            }
            return output
        }



        return (
            <Fragment>
            <h1> Task Tracker </h1>
             {/* {checking editing mode} */}
            {isEditing ? (
            <div>
                <input type="text" placeholder="Enter your task title" id="title" value={taskTitle} onChange={updateInput}></input>
                <select id="status" value={taskStatus} onChange={updateInput}>
                    <option value="0">Done</option>
                    <option value="1">Doing</option>
                    <option value="2">Undone</option>
                </select>
                <input type="text" placeholder="Date"  id="date" value={taskDate} onChange={updateInput} ></input>
          
                        <button className="btn btn-primary" onClick={handleEditItem}>Edit Task</button>
                        <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>
              
            </div>
            ) : (
                <div>
                    <input type="text" placeholder="Enter your task title" id="title" value={taskTitle} onChange={updateInput}></input>
                    <select id="status" value={taskStatus} onChange={updateInput}>
                        <option value="0">Done</option>
                        <option value="1">Doing</option>
                        <option value="2">Undone</option>
                    </select>
                    <input type="text" placeholder="Date"  id="date" value={taskDate} onChange={updateInput} ></input>
       
                        <button className="btn btn-success" onClick={handleAddItem}>Add Task</button>
                </div>
            )}
              <div style={{marginTop: "30px"}}>
                Filter : <select id="filter" value={filter} onChange={updateInput}>
                        <option value="10">All</option>
                        <option value="0">Done</option>
                        <option value="1">Doing</option>
                        <option value="2">Undone</option>
                </select>
                </div>
            <div className="text-center">
  
                <div className="tasks">
                    {
                        // display of all filtered items using "withFilter" method
                    withFilter(filter).data.map((item , index) => {
                        return (
                            <div className="task-item" key={item.id}>
                                <h5>{item.title}</h5>{/* {Show title} */}
                                <h5>{item.date}</h5> {/* {Show date} */}
                                {/* { Show Task Status } */}
                                {statusCheck(item.status) } 
                                <div className="task-buttons">
                                    <button className="btn btn-primary" onClick={() => handleEditItemBtn(item.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>Remove</button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        
            </Fragment>

        )
}