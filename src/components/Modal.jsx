import React, { useRef, useState } from 'react';

function Modal({ setShowModal, setMessage }) {
    const modalRef = useRef();
    const currentDate = new Date().toLocaleDateString();

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * (99999999 - 1 + 1)) + 1;
    };

    const [taskFormData, setTaskFormData] = useState({
        title: "",
        desc: "",
        team: [],
        assignees: [],
        priority: "",
        status: "Pending",
        currentDate: currentDate,
        endDate: null,
        id: generateRandomNumber()
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === "team" || name === "assignees") {
            const arrayValue = value.split(",");
            setTaskFormData({ ...taskFormData, [name]: arrayValue });
        } else {
            setTaskFormData({ ...taskFormData, [name]: value });
        }
    };

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingData = JSON.parse(localStorage.getItem('formData')) || [];
        const updatedData = [...existingData, taskFormData];
        localStorage.setItem('formData', JSON.stringify(updatedData));

        setShowModal(false);
        setMessage('Task Added Successfully');
    };

    return (
        <div ref={modalRef} onClick={closeModal} className='popUp'>
            <div className="heading">
                <h3 className='m-0 fw-bold'>CREATE THE TASK</h3>
                <button onClick={() => setShowModal(false)}><i className="fa-solid fa-xmark fs-3"></i></button>
            </div>
            <form onSubmit={handleSubmit} className='AddingForm'>
                <div className="title my-3">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name='title' id='title' value={taskFormData.title} onChange={handleFormChange} required />
                </div>
                <div className="desc my-3">
                    <label htmlFor="desc">Description:</label>
                    <textarea name="desc" id="desc" value={taskFormData.desc} onChange={handleFormChange} required></textarea>
                </div>
                <div className="team my-3">
                    <label htmlFor="team">Team:</label>
                    <input type="text" name='team' id='team' value={taskFormData.team} onChange={handleFormChange} required />
                </div>
                <div className="assignees my-3">
                    <label htmlFor="assignees">Assignees:</label>
                    <input type="text" name='assignees' id='assignees' value={taskFormData.assignees} onChange={handleFormChange} required />
                </div>
                <div className="priority my-3">
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" id="priority" value={taskFormData.priority} onChange={handleFormChange} required>
                        <option value="">Select Priority</option>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select>
                </div>
                <button type="submit"><i className="fa-solid fa-plus"></i></button>
            </form>
        </div>
    );
}

export default Modal;
