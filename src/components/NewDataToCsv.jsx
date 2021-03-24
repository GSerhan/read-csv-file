import React, { useState } from "react";
import Select from 'react-select'
import {useSelector} from "react-redux";
import InputData from "./InputData";

const AddNewDataToCsv = props => {

    //data from store
    const mockups = useSelector(state => state.mockups);
    const dataTable = useSelector(state => state.dataTable);

    //props
    const {showModalAddData, sendDataToParent, stateOfModalData} = props;

    //data items
    const [bibNumber, setBibNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedGender, setSelectedGender] = useState(mockups.genderOptions[0]);
    const [selectedRace, setSelectedRace] = useState(mockups.raceOptions[0]);
    const [selectedCategory, setSelectedCategory] = useState(mockups.categoryOptions[0]);
    const [selectedRegistrationStatus, setSelectedRegistrationStatus] = useState(mockups.registrationStatusOptions[0]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        //check errors
        if(!verifyDataIntegrity()) return false;
        //object csv data structure
        let dataAdded = {
            BIB: bibNumber,
            'First name': firstName,
            'Last name': lastName,
            Gender: selectedGender.value,
            Race: selectedRace.value,
            Category: selectedCategory.value,
            'Registration Status': selectedRegistrationStatus.value,
        };
        //send data to parent
        sendDataToParent(dataAdded);
        //reset data
        resetAddedData();
    };

    const verifyDataIntegrity = () => {
        //check errors
        let checkBIB = new RegExp("^\\d{3}$");
        let duplicateData = false;
        dataTable.forEach(element => {
            if(parseInt(element.BIB) === parseInt(bibNumber)) duplicateData = true;
        });

        if(duplicateData) {
            alert("Data already exists");
            return false;
        }
        if(!checkBIB.test(bibNumber)) {
            alert("Please enter a 3 digit number for BIB");
            return false;
        }
        if(firstName === "" || lastName === "") {
            alert("Please enter your first name and last name");
            return false;
        }
        return true;
    };

    const resetAddedData = () => {
        //reset elements after another was added
        setBibNumber("");
        setFirstName("");
        setLastName("");
        setSelectedGender(mockups.genderOptions[0]);
        setSelectedRace(mockups.raceOptions[0]);
        setSelectedCategory(mockups.categoryOptions[0]);
        setSelectedRegistrationStatus(mockups.registrationStatusOptions[0]);
    };

    const handleInputChild = value => {
        switch (value.from) {
            case 'bib':
                setBibNumber(value.input);
                break;
            case 'firstName':
                setFirstName(value.input);
                break;
            case 'lastName':
                setLastName(value.input);
                break;
            default:
                return null
        }
    };

    return (
        <div className="modal-add-new-data">
            { showModalAddData &&
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add new data to csv</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <InputData
                                    labelName="BIB"
                                    placeholderInput="Enter BIB"
                                    inputType="number"
                                    inputUse="bib"
                                    inputValue={bibNumber}
                                    sendInputValue={handleInputChild}
                                />
                                <InputData
                                    labelName="First Name"
                                    placeholderInput="Enter first name"
                                    inputType="text"
                                    inputUse="firstName"
                                    inputValue={firstName}
                                    sendInputValue={handleInputChild}
                                />
                                <InputData
                                    labelName="Last Name"
                                    placeholderInput="Enter last name"
                                    inputType="text"
                                    inputUse="lastName"
                                    inputValue={lastName}
                                    sendInputValue={handleInputChild}
                                />
                                <div className="mb-2">
                                    <Select
                                        options={mockups.genderOptions}
                                        value={selectedGender}
                                        onChange={setSelectedGender}
                                    />
                                </div>
                                <div className="mb-2">
                                    <Select
                                        options={mockups.raceOptions}
                                        value={selectedRace}
                                        onChange={setSelectedRace}
                                    />
                                </div>
                                <div className="mb-2">
                                    <Select
                                        options={mockups.categoryOptions}
                                        value={selectedCategory}
                                        onChange={setSelectedCategory}
                                    />
                                </div>
                                <div className="mb-2">
                                    <Select
                                        options={mockups.registrationStatusOptions}
                                        value={selectedRegistrationStatus}
                                        onChange={setSelectedRegistrationStatus}
                                    />
                                </div>
                            </form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => stateOfModalData(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
};

export default AddNewDataToCsv;
