import React, { useEffect, useRef, useState } from 'react';

function UpdatedModal({ setUpdateModal, index, setMessage }) {
    const [singleData, setSingleData] = useState({
        title: '',
        desc: '',
        team: '',
        assignees: '',
        priority: 'P0',
        status: ''
    });
    const modalRef = useRef();
    const endDate = new Date().toLocaleDateString();

    const findDataByIndex = (index) => {
        const dataArray = JSON.parse(localStorage.getItem('formData')) || [];
        const singleItem = dataArray.find(item => item.id === index);
        return singleItem || {};
    };

    useEffect(() => {
        const dataAtIndex = findDataByIndex(index);
        setSingleData(dataAtIndex);
    }, [index]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setSingleData({
            ...singleData,
            [name]: value
        });
    };

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setUpdateModal(false);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const existingData = JSON.parse(localStorage.getItem('formData')) || [];

        const updatedData = existingData.map((item) => {
            if (item.id === index) {
                if (singleData.status === "Completed") {
                    return {
                        ...item,
                        priority: singleData.priority,
                        status: singleData.status,
                        endDate: endDate
                    };
                } else {
                    return {
                        ...item,
                        priority: singleData.priority,
                        status: singleData.status
                    };
                }
            }
            return item;
        });

        localStorage.setItem('formData', JSON.stringify(updatedData));

        setMessage('Data updated successfully:');
        setUpdateModal(false);
    };

    return (
        <div ref={modalRef} onClick={closeModal} className='popUp'>
            <div className="heading">
                <h3 className='m-0 fw-bold'>UPDATE THE TASK</h3>
                <button onClick={() => setUpdateModal(false)} className='bg-transparent text-light'><i className="fa-solid fa-xmark fs-3"></i></button>
            </div>
            <form onSubmit={handleUpdate} className='AddingForm'>
                <div className="title my-3">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name='title' id='title' value={singleData.title} onChange={handleFormChange} disabled />
                </div>

                <div className="desc my-3">
                    <label htmlFor="desc">Description:</label>
                    <textarea name="desc" id="desc" value={singleData.desc} onChange={handleFormChange} disabled></textarea>
                </div>

                <div className="team my-3">
                    <label htmlFor="team">Team:</label>
                    <input type="text" name='team' id='team' value={singleData.team} onChange={handleFormChange} disabled />
                </div>

                <div className="assignees my-3">
                    <label htmlFor="assignees">Assignees:</label>
                    <input type="text" name='assignees' id='assignees' value={singleData.assignees} onChange={handleFormChange} disabled />
                </div>

                <div className="priority my-3">
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" id="priority" value={singleData.priority} onChange={handleFormChange} >
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select>
                </div>

                <div className="status my-3">
                    <label htmlFor="status">Status:</label>
                    <select name="status" id="status" value={singleData.status} onChange={handleFormChange} >
                        <option value="">status</option>
                        <option value="Pending">Pending</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Deployed">Deployed</option>
                        <option value="Deferred">Deferred</option>
                    </select>
                </div>

                <button type="submit"><i className="fa-solid fa-plus"></i></button>
            </form>
        </div>
    );
}

export default UpdatedModal;
