import React from 'react'
import UpdatedModal from '../components/UpdateModal';

function DeferredData({ data, updateModal, setUpdateModal, selectedItemIndex, setSelectedItemIndex, setMessage, handleDelete, filteredData }) {
    return (
        <div className="deferredData">
            {filteredData === null || filteredData.length === 0 ? (
                data.map((item) => (
                    item.status === 'Deferred' && (
                        <div className="box" key={item.id}>
                            <div className='head'>
                                <h5 className='m-0'>{item.title}</h5>
                                <p>{item.priority}</p>
                            </div>
                            <p>{item.desc}</p>
                            <div className="editNdelete">
                                <h6 className='fw-bolder'>{item.assignees?.join(', ')}</h6>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </button>
                                    <ul className="dropdown-menu p-0">
                                        <button className="edit" onClick={() => { setUpdateModal(true); setSelectedItemIndex(item.id); }}>Edit</button><br />
                                        <hr className="m-0" />
                                        <button className="delete" onClick={() => { handleDelete(item.id) }}>Delete</button>
                                    </ul>
                                    <div className="addTask">
                                        {updateModal && selectedItemIndex === item.id &&
                                            <UpdatedModal setUpdateModal={setUpdateModal} index={item.id} setMessage={setMessage} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))
            ) : (
                filteredData.map((item) => (
                    item.status === 'Deferred' && (
                        <div className="box" key={item.id}>
                            <div className='head'>
                                <h5 className='m-0'>{item.title}</h5>
                                <p>{item.priority}</p>
                            </div>
                            <p>{item.desc}</p>
                            <div className="editNdelete">
                                <h6 className='fw-bolder'>{item.assignees?.join(', ')}</h6>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </button>
                                    <ul className="dropdown-menu p-0">
                                        <button className="edit" onClick={() => { setUpdateModal(true); setSelectedItemIndex(item.id); }}>Edit</button><br />
                                        <hr className="m-0" />
                                        <button className="delete" onClick={() => { handleDelete(item.id) }}>Delete</button>
                                    </ul>
                                    <div className="addTask">
                                        {updateModal && selectedItemIndex === item.id &&
                                            <UpdatedModal setUpdateModal={setUpdateModal} index={item.id} setMessage={setMessage} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))
            )}
        </div>
    )
}

export default DeferredData
