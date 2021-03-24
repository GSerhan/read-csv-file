import React from "react";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import NewDataToCsv from "./NewDataToCsv";
import { CSVLink } from "react-csv";
import ChartCsvData from "./ChartCsvData";
import {useDispatch, useSelector} from "react-redux";
import {ADD_DATA, ADD_COLUMNS, SHOW_MODAL} from "../store/action";
import './CsvReader.css';

const CsvFile = () => {
    //data from store
    const dataTable = useSelector(state => state.dataTable);
    const columns = useSelector(state => state.columns);
    const showModalAddData = useSelector(state => state.showModalAddData);
    const dispatch = useDispatch();

    // process CSV data
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(
            /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
        );

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(
                /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
            );
            if (headers && row.length == headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] == '"') d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        obj[headers[j]] = d;
                    }
                }
                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
        }

        // prepare columns list from headers
        const columns = headers.map(c => ({
            name: c,
            selector: c
        }));

        //send data to store
        dispatch(ADD_DATA(list));
        dispatch(ADD_COLUMNS(columns));
    };

    // handle file upload
    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = evt => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const dataTable = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(dataTable);
        };
        reader.readAsBinaryString(file);
    };

    const showNewDataForm = () => {
        dispatch(SHOW_MODAL(true));
    };
    const closeModal = () => {
        dispatch(SHOW_MODAL(false));
    };
    const handleAddedData = value => {
        dispatch(ADD_DATA([value]));
    };

    return (
        <div className="read-csv h-100">
            <div className="container">
                <h3 className="w-100 text-center mb-5">
                    Read CSV file in React
                </h3>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="input-group">
                        <label className="input-group-text cursor-pointer" htmlFor="uploadCsv">Upload</label>
                        <input className="form-control" type="file" accept=".csv" id="uploadCsv" onChange={handleFileUpload} />
                    </div>
                    <div className="w-100 text-right">
                        {dataTable.length !== 0 && <button type="button" className="btn btn-primary" onClick={() => showNewDataForm()}>Add new data</button>}
                    </div>
                </div>
                {dataTable.length !== 0 && <button type="button" className="btn btn-outline-primary mt-3"><CSVLink data={dataTable}>Download me</CSVLink></button>}
                {dataTable.length !== 0 &&
                <div className="csv-chart">
                    <ChartCsvData
                        chartData={dataTable}
                    />
                </div>}
                <DataTable highlightOnHover pagination={true} columns={columns} data={dataTable} />
                <div>
                    {showModalAddData &&
                    <NewDataToCsv
                        showModalAddData={showModalAddData}
                        sendDataToParent={handleAddedData}
                        stateOfModalData={closeModal}
                    />}
                </div>
            </div>
        </div>
    );
};

export default CsvFile;
