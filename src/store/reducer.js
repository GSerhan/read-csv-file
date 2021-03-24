const initialState = {
    columns: [],
    dataTable: [],
    showModalAddData: false,
    mockups: {
        genderOptions: [
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
        ],
        raceOptions: [
            {value: '10k', label: '10k'},
            {value: '21k', label: '21k'},
            {value: '42k', label: '42k'}
        ],
        categoryOptions: [
            {value: 'F-18-34', label: 'F-18-34'},
            {value: 'F35', label: 'F35'},
            {value: 'M18-34', label: 'M18-34'},
            {value: 'M35', label: 'M35'}
        ],
        registrationStatusOptions: [
            {value: 'New', label: 'New'},
            {value: 'Confirmed', label: 'Confirmed'},
            {value: 'Canceled', label: 'Canceled'},
        ]
    }

};

const importCsvReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_DATA":
            return {
                ...state,
                dataTable: [...state.dataTable, ...action.payload]
            };
        case "ADD_COLUMNS":
            return {
                ...state,
                columns: action.payload
            };
        case "SHOW_MODAL":
            return {
                ...state,
                showModalAddData: action.payload
            };
        default:
            return state;
    }
};

export default importCsvReducer;
