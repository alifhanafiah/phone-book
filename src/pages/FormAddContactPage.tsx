import { useMutation, useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ADD_CONTACT_WITH_PHONES } from '../apollo/mutations';
import { GET_CONTACT_NAMES_LIST } from '../apollo/queries';

type Contact = {
  first_name: string;
  last_name: string;
};

const formContact = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
    textAlign: 'center',
    backgroundColor: '#1f2937',
    borderRadius: '2rem',
    paddingInline: '2rem',
    paddingTop: '1rem',
    paddingBottom: '2rem',
  }),

  input: css({
    padding: '0.5rem',
    border: '2px solid #ccc',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s',

    '&:focus': {
      borderColor: '#007bff',
    },
  }),

  phone: css({
    display: 'flex',
    gap: '1rem',
  }),

  button: css({
    paddingBlock: '.7rem',
    marginTop: '1.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '.5rem',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'background 0.3s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

    '&:hover': {
      background: '#1c76c8',
    },
  }),

  buttonDel: css({
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '.5rem',
    cursor: 'pointer',
    transition: 'background 0.3s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

    '&:hover': {
      background: '#c0392b',
    },
  }),

  cancelButton: css({
    padding: '.7rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '.5rem',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'background 0.3s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

    '&:hover': {
      background: '#c0392b',
    },
  }),
};

const FormAddContactPage = () => {
  const navigate = useNavigate();
  const specialCharacterPattern = /[^a-zA-Z0-9 ]/; // Regular expression to check for special characters

  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);

  const { data } = useQuery(GET_CONTACT_NAMES_LIST);

  const [addContact, { loading: loadingSubmit, error: errorSubmit }] =
    useMutation(ADD_CONTACT_WITH_PHONES);

  if (errorSubmit) {
    setErrorMessage('Make sure the field all valid');
  }

  // Define a function to check if a contact name exists in the list
  const isContactNameInList = (contactList: Contact[], contactName: string) => {
    return contactList.some((contact) => {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      return fullName === contactName;
    });
  };

  const handleAddPhone = () => {
    if (phoneNumbers[phoneNumbers.length - 1] !== '') {
      setPhoneNumbers([...phoneNumbers, '']);
    } else {
      setErrorMessage('You have to fill the phone number to add more');
    }
  };

  const handleDeletePhone = (indexToDelete: number) => {
    const updatedPhoneNumbers = phoneNumbers.filter(
      (_, index) => index !== indexToDelete
    );
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleSubmit = async () => {
    // Validate contact name
    if (
      specialCharacterPattern.test(firstName) ||
      specialCharacterPattern.test(lastName)
    ) {
      // Handle special characters not allowed
      setErrorMessage(
        'Contact name contains special characters. Only alphanumeric and spaces are allowed.'
      );
    } else {
      // Check for uniqueness
      const contactList = data.contact;
      const contactNameToCheck = `${firstName} ${lastName}`;
      if (isContactNameInList(contactList, contactNameToCheck)) {
        // Handle non-unique contact name
        setErrorMessage(
          'Contact name is not unique. Please choose a different name.'
        );
      } else {
        // Contact name is unique, proceed with saving it
        try {
          await addContact({
            variables: {
              first_name: firstName,
              last_name: lastName,
              phones: phoneNumbers.map((number) => ({ number })),
            },
          });
          // Handle success or clear form
          setErrorMessage('');
          navigate('/');
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div css={formContact.container}>
      <p css={{ color: 'red' }}>{errorMessage}</p>
      <input
        css={formContact.input}
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        css={formContact.input}
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button
        css={formContact.button}
        onClick={handleAddPhone}
        style={
          loadingSubmit
            ? { backgroundColor: 'lightgray', cursor: 'not-allowed' }
            : {}
        }
      >
        Add Phone
      </button>
      {phoneNumbers.map((phoneNumber, index) => (
        <div key={index} css={formContact.phone}>
          <input
            css={formContact.input}
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(index, e.target.value)}
          />
          <button
            css={formContact.buttonDel}
            onClick={() => handleDeletePhone(index)}
            disabled={index === 0 && phoneNumber === ''}
          >
            Delete
          </button>
        </div>
      ))}
      <button
        css={formContact.button}
        onClick={handleSubmit}
        style={
          loadingSubmit
            ? { backgroundColor: 'lightgray', cursor: 'not-allowed' }
            : {}
        }
      >
        {loadingSubmit ? 'Submitting...' : 'Submit'}
      </button>

      <Link to="/" css={formContact.cancelButton}>
        Cancel
      </Link>
    </div>
  );
};

export default FormAddContactPage;
