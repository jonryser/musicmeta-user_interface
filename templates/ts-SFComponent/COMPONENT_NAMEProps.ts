export default interface COMPONENT_NAMEProps {
    options?: COMPONENT_NAMEOptions;
    data: COMPONENT_NAMEData;
}

// NOTE: This interface should include all and only data that is being passed into the component
export interface COMPONENT_NAMEData { }

// This interface should include all the events that are needed to notify the parent component
// Events should include functions and in case of arguments to be passed EventArgs class should be used
export interface COMPONENT_NAMEEvents {}

// NOTE: This interface should include all and only the options that change the style/behavior of the component
export interface COMPONENT_NAMEOptions { }
