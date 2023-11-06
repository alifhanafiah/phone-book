import { useMutation, useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EDIT_CONTACT_BY_ID, EDIT_PHONE_NUMBER } from '../apollo/mutations';
import { GET_CONTACT_DETAIL } from '../apollo/queries';

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

const FormEditContactPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const specialCharacterPattern = /[^a-zA-Z0-9 ]/;

  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState(['']);
  const [pkPhoneNumber, setPkPhoneNumber] = useState([]);

  const { data } = useQuery(GET_CONTACT_DETAIL, { variables: { id } });

  const [editContact, { loading: loadingUpdate }] =
    useMutation(EDIT_CONTACT_BY_ID);
  const [editPhone] = useMutation(EDIT_PHONE_NUMBER);

  useEffect(() => {
    if (data && data.contact_by_pk) {
      const contact = data.contact_by_pk;
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
      setPhoneNumbers(
        contact.phones.map((phone: { number: number }) => phone.number)
      );
      setPkPhoneNumber(
        contact.phones.map((phone: { number: number }) => phone.number)
      );
    }
  }, [data]);

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleSubmit = async () => {
    if (
      specialCharacterPattern.test(firstName) ||
      specialCharacterPattern.test(lastName)
    ) {
      setErrorMessage(
        'Contact name contains special characters. Only alphanumeric and spaces are allowed.'
      );
    } else {
      try {
        await editContact({
          variables: {
            id,
            _set: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });

        if (pkPhoneNumber) {
          pkPhoneNumber.forEach(async (_, index) => {
            await editPhone({
              variables: {
                pk_columns: {
                  contact_id: id,
                  number: pkPhoneNumber[index],
                },
                new_phone_number: phoneNumbers[index],
              },
            });
          });
        }

        setErrorMessage('');
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div css={formContact.container}>
      <p css={{ color: 'red' }}>{errorMessage}</p>

      <p>First Name</p>
      <input
        css={formContact.input}
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <p css={{ marginTop: '1rem' }}>Last Name</p>
      <input
        css={formContact.input}
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <p css={{ marginTop: '1rem' }}>Phone(s)</p>
      {phoneNumbers.map((phoneNumber, index) => (
        <div key={index} css={formContact.phone}>
          <input
            css={formContact.input}
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(index, e.target.value)}
          />
        </div>
      ))}
      <button
        css={formContact.button}
        onClick={handleSubmit}
        style={
          loadingUpdate
            ? { backgroundColor: 'lightgray', cursor: 'not-allowed' }
            : {}
        }
      >
        {loadingUpdate ? 'Updating...' : 'Update'}
      </button>

      <Link to="/" css={formContact.cancelButton}>
        Cancel
      </Link>
    </div>
  );
};

export default FormEditContactPage;
