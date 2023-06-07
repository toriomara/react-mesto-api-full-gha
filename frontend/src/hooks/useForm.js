// import { useState } from 'react';

// export function useForm(inputValues = {}, onSubmit) {
//   const [values, setValues] = useState(inputValues);

//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//     // const { value, name } = e.target;
//     // setValues({ ...values, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit?.(values);
//   };

//   return { values, handleChange, handleSubmit };
// }

// import { useState } from 'react';

// export const useForm = (submitCallback) => {
//   const [values, setValues] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     submitCallback?.();
//   };

//   const handleChange = (e) => {
//     e.persist();
//     setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
//   };

//   return { values, handleChange, handleSubmit };
// };

import { useState } from 'react';

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return { values, handleChange, setValues };
}
