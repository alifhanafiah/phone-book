import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_CONTACT_DETAIL } from '../queries';

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

const ContactDetailPage = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery<ContactData>(GET_CONTACT_DETAIL, {
    variables: {
      id,
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data?.contact_by_pk);

  return <div>{id}</div>;
};

export default ContactDetailPage;
