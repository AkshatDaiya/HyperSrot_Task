
import React, { useEffect, useState } from 'react'
import Modal from './components/Modal'
import Swal from 'sweetalert2';
import PandingData from './partials/PandingData.jsx';
import ProgressData from './partials/ProgressData.jsx';
import CompletedData from './partials/CompletedData.jsx';
import DeployedData from './partials/DeployedData.jsx';
import DeferredData from './partials/DeferredData.jsx';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [message, setMessage] = useState('')
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState();

  {/* Added data________________________________________-- */ }
  const localStorageData = localStorage.getItem('formData')
  useEffect(() => {
    const formData = JSON.parse(localStorageData) || [];
    setData(formData);
  }, [localStorageData]);

  {/* Remove alert Section________________________________________-- */ }
  setTimeout(() => {
    setMessage('')
  }, 3000);

  {/* Delete task function________________________________________-- */ }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        const _data = data.filter((data) => data.id !== id);
        localStorage.setItem("formData", JSON.stringify(_data));
        setData(_data);
      }
    });
  };

  {/* Filter task function________________________________________-- */ }
  const handleAssigneeName = (value) => {
    const filteredAssigneeData = data.filter((task) =>
      task.assignees.some((assignee) => assignee.toLowerCase() === value.toLowerCase())
    );
    setFilteredData(filteredAssigneeData);
  };

  const handlePriority = (value) => {
    const filteredPriorityData = data.filter((task) =>
      task.priority.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredPriorityData);
  };


  return (
    <main id='main'>
      {/* Nav Section________________________________________-- */}

      <nav className='nav container px-4'>
        <div className="pageName">
          <h3>Task Board</h3>
        </div>

        <div className="userIcon">
          <i className="fa-solid fa-user"></i>
        </div>

      </nav>

      {/* Main Section________________________________________-- */}

      <div className="taskPage container p-3 my-4">

        {/* Remove Section________________________________________-- */}
        {message.length > 0 ?
          <h3 className='text-center alert alert-success position-absolute w-100'>{message}</h3>
          : <></>
        }

        {/* Filter Section________________________________________-- */}

        <div className="filter">
          <form onSubmit={(e) => { e.preventDefault() }}>
            <div className='add'>

              <div className='taskName me-3'>
                <label htmlFor="addData" className='p-3'>Filter By:</label>
                <input type="text" name="TaskName" id="addData" placeholder='Assignee Name' onChange={(e) => handleAssigneeName(e.target.value)} />
              </div>

              <select name="Priority" id="addData" onChange={(e) => handlePriority(e.target.value)}>
                <option value="">Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
          </form>

          {/* Add Task Button________________________________________-- */}

          <button type="button" onClick={() => setShowModal(true)}>Add New Task</button>

          {/* _______________________________________________________________________________ */}

        </div>

        {/* Priority sorting form________________________________________-- */}

        <div className="sort">
          <label htmlFor="sort" className='p-3'>Sort By:</label>
          <select name="sort" id="sort" onChange={(e) => handlePriority(e.target.value)}>
            <option value="">Priority</option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>

        {/* _______________________________________________________________________________ */}


        <div className="addTask">
          {showModal &&
            <Modal setShowModal={setShowModal} setMessage={setMessage} />
          }
        </div>
        {/* AllTask Section________________________________________-- */}

        {data.length > 0 ?
          <div className="allTask">
            <div className="pending">
              <h3 className='heading text-center'>Pending</h3>
              <PandingData data={data} updateModal={updateModal} setUpdateModal={setUpdateModal} selectedItemIndex={selectedItemIndex} setSelectedItemIndex={setSelectedItemIndex} setMessage={setMessage} handleDelete={handleDelete} filteredData={filteredData} />
            </div>

            <div className="inProgress">
              <h3 className='heading text-center'>In Progress</h3>
              <ProgressData data={data} updateModal={updateModal} setUpdateModal={setUpdateModal} selectedItemIndex={selectedItemIndex} setSelectedItemIndex={setSelectedItemIndex} setMessage={setMessage} handleDelete={handleDelete} filteredData={filteredData} />
            </div>

            <div className="completed">
              <h3 className='heading text-center'>Completed</h3>
              <CompletedData data={data} updateModal={updateModal} setUpdateModal={setUpdateModal} selectedItemIndex={selectedItemIndex} setSelectedItemIndex={setSelectedItemIndex} setMessage={setMessage} handleDelete={handleDelete} filteredData={filteredData} />
            </div>

            <div className="deployed">
              <h3 className='heading text-center'>Deployed</h3>
              <DeployedData data={data} updateModal={updateModal} setUpdateModal={setUpdateModal} selectedItemIndex={selectedItemIndex} setSelectedItemIndex={setSelectedItemIndex} setMessage={setMessage} handleDelete={handleDelete} filteredData={filteredData} />
            </div>

            <div className="deferred">
              <h3 className='heading text-center'>Deferred</h3>
              <DeferredData data={data} updateModal={updateModal} setUpdateModal={setUpdateModal} selectedItemIndex={selectedItemIndex} setSelectedItemIndex={setSelectedItemIndex} setMessage={setMessage} handleDelete={handleDelete} filteredData={filteredData} />
            </div>
          </div>
          :
          <div className="emptyMessage">
            <h1 className='text-center'>Please Add New Tasks...</h1>
          </div>
        }

      </div>

    </main>
  )
}

export default App