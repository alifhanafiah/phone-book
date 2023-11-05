import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { GET_CONTACT_DETAIL } from '../apollo/queries';
import img from '../assets/images/google-contacts.png';
import Loading from '../components/Loading';

type ContactData = {
  contact_by_pk: {
    last_name: string;
    id: number;
    first_name: string;
    created_at: string;
    phones: {
      number: string;
    }[];
  };
};

const contactDetailPage = {
  container: css({
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
    backgroundColor: '#1f2937',
    borderRadius: '2rem',
    paddingInline: '.75rem',
    paddingBlock: '.5rem',
    marginTop: '3rem',
  }),

  image: css({
    width: '5rem',
    marginTop: '-3rem',
  }),

  divider: css({
    width: '4rem',
    border: `2px solid #a3a3a3`,
    borderRadius: '1rem',
    marginBlock: '1rem',
  }),

  data: css({
    marginBlock: '.5rem',

    '& p:first-of-type': {
      color: '#9ca3af',
    },
  }),
};

const ContactDetailPage = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery<ContactData>(GET_CONTACT_DETAIL, {
    variables: {
      id,
    },
  });

  if (loading) return <Loading height="20vh" />;
  if (error) return `Error! ${error.message}`;

  const contact = data?.contact_by_pk;

  // Default value in case created_at is undefined
  let formattedDate = 'Date not available';
  if (contact && contact.created_at) {
    const date = new Date(contact.created_at);
    formattedDate = date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <div css={contactDetailPage.container}>
      <img src={img} css={contactDetailPage.image} />

      <hr css={contactDetailPage.divider} />

      <h2>
        {contact?.first_name} {contact?.last_name}
      </h2>

      <div css={contactDetailPage.data}>
        <p>Phone(s)</p>
        {contact?.phones.map((phone, index) => {
          return <p key={index}>{phone.number}</p>;
        })}
      </div>

      <div css={contactDetailPage.data}>
        <p>Created at</p>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default ContactDetailPage;
