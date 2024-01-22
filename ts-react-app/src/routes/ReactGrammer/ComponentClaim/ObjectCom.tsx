import React from 'react';

const MyComponents = {
  DatePicker: (props: { color: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

const BlueDatePicker = () => {
  return <MyComponents.DatePicker color="blue" />;
}


export default BlueDatePicker;