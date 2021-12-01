// Authentication actions
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
// Login actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
// Logout actions
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
// Updating profile actions
export const PROFILE_CHANGE_SUCCESS = 'PROFILE_CHANGE_SUCCESS';
export const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS';
// Error handling
export const ERROR_SHOW = 'ERROR_SHOW';
export const ERROR_HIDE = 'ERROR_HIDE';
// Units of measure handling
export const UNITS_LOAD = 'UNITS_LOAD';
// Invoice handling
export const INVOICE_NEW_CREATE = 'INVOICE_NEW_CREATE';
export const INVOICES_LOAD_SUCCESS = 'INVOICES_LOAD_SUCCESS';
export const INVOICES_LOAD_FAIL = 'INVOICES_LOAD_FAIL';
export const INVOICES_LIST_SPINNER_SHOW = 'INVOICES_LIST_SPINNER_SHOW';
export const INVOICES_LIST_SPINNER_HIDE = 'INVOICES_LIST_SPINNER_HIDE';
export const INVOICES_CHOOSE_INVOICE = 'INVOICES_CHOOSE_INVOICE';
export const INVOICES_EDIT_INVOICE = 'INVOICES_EDIT_INVOICE';
export const INVOICES_REFRESH = 'INVOICES_REFRESH';
export const INVOICES_INVOICE_RECOUNT = 'INVOICES_INVOICE_RECOUNT';
export const INVOICES_UNLOAD = 'INVOICES_UNLOAD';
// Estimates loading handling
export const ESTIMATES_LOAD_SUCCESS = 'ESTIMATES_LOAD_SUCCESS';
export const ESTIMATES_LOAD_FAIL = 'ESTIMATES_LOAD_FAIL';
export const ESTIMATES_DATA_UNLOAD = 'ESTIMATES_DATA_UNLOAD';
export const ESTIMATES_REFRESH_NEEDED = 'ESTIMATES_REFRESH_NEEDED';
export const ESTIMATES_NON_LOAD_SUCCESS = 'ESTIMATES_NON_LOAD_SUCCESS';
// Estimates manipulation handling
export const ESTIMATE_ROW_EDIT_START = 'ESTIMATE_ROW_EDIT_START';
export const ESTIMATE_ROW_EDIT_SUCCESS = 'ESTIMATE_ROW_EDIT_SUCCESS';
export const ESTIMATE_ROW_EDIT_FAIL = 'ESTIMATE_ROW_EDIT_FAIL';
export const ESTIMATE_ROW_DELETE_START = 'ESTIMATE_ROW_DELETE_START';
export const ESTIMATE_ROW_DELETE_SUCCESS = 'ESTIMATE_ROW_DELETE_SUCCESS';
export const ESTIMATE_ROW_DELETE_FAIL = 'ESTIMATE_ROW_DELETE_FAIL';
export const ESTIMATE_ROW_ADD_SUCCESS = 'ESTIMATE_ROW_ADD_SUCCESS';
export const ESTIMATE_ROW_ADD_FAIL = 'ESTIMATE_ROW_ADD_FAIL';
// Estimates systems handling
export const ESTIMATE_SYSTEMS_LOAD_SUCCESS = 'ESTIMATE_SYSTEMS_LOAD_SUCCESS';
export const ESTIMATE_SYSTEMS_LOAD_FAIL = 'ESTIMATE_SYSTEMS_LOAD_FAIL'
// Info handling
export const INFO_PAGE_NAME_LOAD = 'INFO_PAGE_NAME_LOAD';
export const INFO_MESSAGE_SHOW = 'INFO_MESSAGE_SHOW';
export const INFO_MESSAGE_HIDE = 'INFO_MESSAGE_HIDE';
export const INFO_LOADING_SPINNER_SHOW ='INFO_LOADING_SPINNER_SHOW';
export const INFO_LOADING_SPINNER_HIDE = 'INFO_LOADING_SPINNER_HIDE';
// Snackbar handling
export const SNACK_SHOW = 'SNACK_SHOW';
export const SNACK_HIDE = 'SNACK_HIDE';
// Objects handling
export const OBJECTS_LOAD_SUCCESS = 'OBJECTS_LOAD_SUCCESS';
export const OBJECTS_LOAD_FAIL = 'OBJECTS_LOAD_FAIL';
export const OBJECTS_CHOOSE_OBJECT = 'OBJECTS_CHOOSE_OBJECT';
export const OBJECTS_EDIT_OBJECT = 'OBJECTS_EDIT_OBJECT';
export const OBJECTS_GET_SYSTEMS = 'OBJECTS_GET_SYSTEMS';
export const OBJECTS_UNLOAD = 'OBJECTS_UNLOAD';
export const OBJECTS_UNLOAD_SYSTEMS = 'OBJECTS_UNLOAD_SYSTEMS';
// Undo handling
export const UNDO_DATA_SAVE = 'UNDO_DATA_SAVE';
export const UNDO_CLEAR = 'UNDO_CLEAR';
export const UNDO_TEMP_CLEAR = 'UNDO_TEMP_CLEAR';
export const UNDO_CABLE_JOURNAL_ROW_ADD = 'UNDO_CABLE_JOURNAL_ROW_ADD';
export const UNDO_CABLE_JOURNAL_ROW_REMOVE = 'UNDO_CABLE_JOURNAL_ROW_REMOVE';
export const UNDO_CABLE_JOURNAL_ROWS_ADD_ALL = 'UNDO_CABLE_JOURNAL_ROWS_ADD_ALL';
export const UNDO_CABLE_JOURNAL_DATA_SAVE = 'UNDO_CABLE_JOURNAL_DATA_SAVE';
export const UNDO_ESTIMATES_ROW_ADD = 'UNDO_ESTIMATES_ROW_ADD';
export const UNDO_ESTIMATES_ROW_REMOVE = 'UNDO_ESTIMATES_ROW_REMOVE';
export const UNDO_ESTIMATES_DATA_SAVE = 'UNDO_ESTIMATES_DATA_SAVE';
// Search handling
export const SEARCH_ESTIMATES = 'SEARCH_ESTIMATES';
export const SEARCH_NONESTIMATES = 'SEARCH_NONESTIMATES';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_STOP = 'SEARCH_STOP';
// Contractors handling
export const CONTRACTOR_LIST_LOAD = 'CONTRACTOR_LIST_LOAD';
export const CONTRACTOR_DETAILS_LOAD = 'CONTRACTOR_DETAILS_LOAD';
export const CONTRACTOR_DETAILS_UNLOAD = 'CONTRACTOR_DETAILS_UNLOAD';
export const CONTRACTOR_DETAILS_UPDATE = 'CONTRACTOR_DETAILS_UPDATE';
export const CONTRACTOR_ADD_SUCCESS = 'CONTRACTOR_ADD_SUCCESS';
export const CONTRACTOR_TYPES_LOAD = 'CONTRACTOR_TYPES_LOAD';
export const CONTRACTOR_LIST_SPINNER_SHOW = 'CONTRACTOR_LIST_SPINNER_SHOW';
export const CONTRACTOR_LIST_SPINNER_HIDE = 'CONTRACTOR_LIST_SPINNER_HIDE';
export const CONTRACTOR_DATA_SPINNER_SHOW = 'CONTRACTOR_DATA_SPINNER_SHOW';
export const CONTRACTOR_DATA_SPINNER_HIDE = 'CONTRACTOR_DATA_SPINNER_HIDE';
export const CONTRACTOR_REPRESENTATIVES_DATA_LOAD = 'CONTRACTOR_REPRESENTATIVES_DATA_LOAD';
export const CONTRACTOR_REPRESENTATIVE_ADD = 'CONTRACTOR_REPRESENTATIVE_ADD';
export const CONTRACTOR_REPRESENTATIVE_REMOVE = 'CONTRACTOR_REPRESENTATIVE_REMOVE';
export const CONTRACTOR_REPRESENTATIVE_EDIT = 'CONTRACTOR_REPRESENTATIVE_EDIT';
// Cable journal handling
export const CABLE_JOURNAL_DEVICE_ADD = 'CABLE_JOURNAL_DEVICE_ADD';
export const CABLE_JOURNAL_DEVICE_REMOVE = 'CABLE_JOURNAL_DEVICE_REMOVE';
export const CABLE_JOURNAL_DEVICE_EDIT = 'CABLE_JOURNAL_DEVICE_EDIT';
export const CABLE_JOURNAL_ROWS_UPDATE = 'CABLE_JOURNAL_ROWS_UPDATE';
export const CABLE_JOURNAL_LOAD_SUCCESS = 'CABLE_JOURNAL_LOAD_SUCCESS';
export const CABLE_JOURNAL_DATA_UNLOAD = 'CABLE_JOURNAL_DATA_UNLOAD';
// Delete handling
export const DELETE_SNACK_SHOW = 'DELETE_SNACK_SHOW';
export const DELETE_SNACK_HIDE = 'DELETE_SNACK_HIDE';
export const DELETE_CABLE_JOURNAL_ITEM_ADD = 'DELETE_CABLE_JOURNAL_ITEM_ADD';
export const DELETE_CABLE_JOURNAL_ITEM_REMOVE = 'DELETE_CABLE_JOURNAL_ITEM_REMOVE';
export const DELETE_CABLE_JOURNAL_REMOVE_ALL = 'DELETE_CABLE_JOURNAL_REMOVE_ALL';
export const DELETE_CABLE_JOURNAL_ADD_ALL = 'DELETE_CABLE_JOURNAL_ADD_ALL';
export const DELETE_CABLE_JOURNAL_ADD_ALL_ITEMS = 'DELETE_CABLE_JOURNAL_ADD_ALL_ITEMS';
export const DELETE_ESTIMATES_ITEM_ADD = 'DELETE_ESTIMATES_ITEM_ADD';
export const DELETE_ESTIMATES_ITEM_REMOVE = 'DELETE_ESTIMATES_ITEM_REMOVE';
export const DELETE_ESTIMATES_REMOVE_ALL = 'DELETE_ESTIMATES_REMOVE_ALL';
export const DELETE_ESTIMATES_ADD_ALL = 'DELETE_ESTIMATES_ADD_ALL';
export const DELETE_ESTIMATES_ADD_ALL_ITEMS = 'DELETE_ESTIMATES_ADD_ALL_ITEMS';
// Switching between different snacks in cable journals
export const SWITCH_TO_DELETING = 'SWITCH_TO_DELETING';
export const SWITCH_TO_LENGTH = 'SWITCH_TO_LENGTH';
export const SWITCH_TO_RESISTANCE = 'SWITCH_TO_RESISTANCE';
// Editing handling
export const EDIT_START = 'EDIT_START';
export const EDIT_STOP = 'EDIT_STOP';
// Export handling
export const EXPORT_START = 'EXPORT_START';
export const EXPORT_STOP = 'EXPORT_STOP';
export const EXPORT_GET_SIGNERS = 'EXPORT_GET_SIGNERS';
// Purchases handling
export const PURCHASES_GET_ESTIMATES_BY_OBJECT = 'PURCHASES_GET_ESTIMATES_BY_OBJECT';
export const PURCHASES_GET_NONESTIMATES_BY_OBJECT = 'PURCHASES_GET_NONESTIMATES_BY_OBJECT';
export const PURCHASES_UNLOAD = 'PURCHASES_UNLOAD';
export const PURCHASES_UNLOAD_EVERYTHING = 'PURCHASES_UNLOAD_EVERYTHING';
export const PURCHASES_REFRESH = 'PURCHASES_REFRESH';
export const PURCHASES_GET_PURCHASES_BY_INVOICE = 'PURCHASES_GET_PURCHASES_BY_INVOICE';
export const PURCHASES_GET_PURCHASES_BY_ESTIMATE_ITEM = 'PURCHASES_GET_PURCHASES_BY_ESTIMATE_ITEM';
export const PURCHASES_GET_PURCHASES_BY_NONESTIMATE_ITEM = 'PURCHASES_GET_PURCHASES_BY_NONESTIMATE_ITEM';
export const PURCHASES_GET_NOT_ASSIGNED_COUNT = 'PURCHASES_GET_NOT_ASSIGNED_COUNT';
export const PURCHASES_GET_NOT_RECEIVED_COUNT = 'PURCHASES_GET_NOT_RECEIVED_COUNT';
export const PURCHASES_GET_NOT_ASSIGNED_AND_RECEIVED_COUNT = 'PURCHASES_GET_NOT_ASSIGNED_AND_RECEIVED_COUNT';
export const PURCHASES_GET_PURCHASE_DATA_BY_ID = 'PURCHASES_GET_PURCHASE_DATA_BY_ID';
export const PURCHASES_GET_REFERENCES = 'PURCHASES_GET_REFERENCES';
export const PURCHASES_UNLOAD_REFERENCES = 'PURCHASES_UNLOAD_REFERENCES';
// Back button handling
export const BACK_ACTIVATE = 'BACK_ACTIVATE';
export const BACK_DEACTIVATE = 'BACK_DEACTIVATE';
export const BACK_CLICKED = 'BACK_CLICKED';