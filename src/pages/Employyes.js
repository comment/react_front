import Employee from "../components/Employee";
import {useState} from "react";
import '../index.css'
import AddEmployee from "../components/AddEmployee";
import {v4 as uuidv4} from 'uuid';
import EditEmployee from "../components/EditEmployee";

function Employyes() {
    const [employees, setEmployees] = useState(
        [
            {
                id: 1,
                name: "Bob",
                role: "Junior",
                img: "https://images.pexels.com/photos/10897658/pexels-photo-10897658.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            },
            {
                id: 2,
                name: "Alice",
                role: "Middle",
                img: "https://images.pexels.com/photos/15977931/pexels-photo-15977931.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            },
            {
                id: 3,
                name: "Sergey",
                role: "Senior",
                img: "https://images.pexels.com/photos/15445847/pexels-photo-15445847.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            },
            {
                id: 4,
                name: "Bob",
                role: "Junior",
                img: "https://images.pexels.com/photos/5468643/pexels-photo-5468643.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            },
            {
                id: 5,
                name: "Alice",
                role: "Middle",
                img: "https://images.pexels.com/photos/8778442/pexels-photo-8778442.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            },
            {
                id: 6,
                name: "Sergey",
                role: "Senior",
                img: "https://images.pexels.com/photos/4040245/pexels-photo-4040245.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            }
        ]
    );

    function addEmployye(name, role, img) {
        const newEmployye = {
            id: uuidv4(),
            name: name,
            role: role,
            img: img
        }
        setEmployees([...employees, newEmployye])
    }

    function updateEmployee(id, newName, newRole) {
        const updateEmployess = employees.map((employee) => {
            if(id === employee.id) {
                return {...employee, name: newName, role: newRole}
            }

            return employee;
        });

        setEmployees(updateEmployess)
    }

    const showEmployees = true;

    return (
        <div className="">
            {showEmployees ?
                <>
                    <div className="flex flex-wrap justify-center">
                        {employees.map((employee) => {
                            const editEmployee = (
                                <EditEmployee
                                    id={employee.id}
                                    name={employee.name}
                                    role={employee.role}
                                    updateEmployee={updateEmployee}
                                />
                            );
                            return (
                                <Employee
                                    key={employee.id}
                                    id={employee.id}
                                    name={employee.name}
                                    role={employee.role}
                                    img={employee.img}
                                    editEmployee={editEmployee}
                                />
                            );
                        })}
                    </div>
                </>
                :
                <p>dont show Employees</p>
            }
            <center><AddEmployee addEmployye={addEmployye}/></center>
        </div>
    );
}

export default Employyes;
