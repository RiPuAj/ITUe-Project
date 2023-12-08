import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

export const TableEditMenu = ({ menu, handleDeleteModal, handleEditModal}) => {

    return(
        menu.length < 1 ? 
        
        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <h1 className="text-center">There are no dishes</h1>
        </div> :
        <div className='table-responsive'>

        <Table striped bordered hover >
                <thead>
                    <tr>
                        <th className="text-center">Food</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center" title={`Food: ${item.food}`}>{item.food}</td>
                            <td className="text-center" title={`Price: ${item.price}`}>{item.price}</td>
                            <td className="text-center">
                                <Button variant="success" onClick={() => handleEditModal(index, item.food, item.price)} title="Edit Button">
                                    <FaPencilAlt />
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteModal(index)} title="Delete Button">
                                    <FaRegTrashAlt />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                    </div>
    )
}