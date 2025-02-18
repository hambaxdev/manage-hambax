export const initialState = {
    eventData: {
        title: '',
        eventType: '',
        description: '',
        eventDate: '',
        startTime: '',
        ageRestriction: '',
        eventImage: '',
        address: {
            street: '',
            building: '',
            city: '',
            country: '',
            postalCode: '',
        },
        pricing: {
            activeTab: 0,
        },
    },
    fixedPriceData: {
        ticketPrice: '',
        limitTickets: false,
        ticketLimit: '',
    },
    ticketPoolsData: [
        { name: '', price: '', quantity: '', startDate: '', endDate: '', limitTickets: false },
        { name: '', price: '', quantity: '', startDate: '', endDate: '', limitTickets: false },
    ],
    errors: {},
};

export const eventReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_EVENT':
            return { ...state, eventData: { ...state.eventData, ...action.payload } };
        case 'UPDATE_ADDRESS':
            return { ...state, eventData: { ...state.eventData, address: action.payload } };
        case 'UPDATE_FIXED_PRICE':
            return { ...state, fixedPriceData: { ...state.fixedPriceData, ...action.payload } };
        case 'UPDATE_TICKET_POOLS':
            return { ...state, ticketPoolsData: action.payload };
        case 'SET_ERRORS':
            return { ...state, errors: action.payload };
        default:
            return state;
    }
};
