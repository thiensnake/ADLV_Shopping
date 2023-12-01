import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const contacts = [
  {
    locations: [
      '01 Ho Thi Ky, Q10',
    '52 Ben Van Don, Q4',
    ],
    phones: [`028.7712.7712`, `028.5757.5757 `],
    socialMedia: [<FacebookIcon />, <InstagramIcon />],
  }
];

const Footer = () => {
  const ContactInfo = contacts.map(contact => 
    <div className='footer'>
      <div>
        <h5>Location</h5>
        <p>{contact.locations[0]}</p>
        <p>{contact.locations[1]}</p>
      </div>
      <div>
        <h5>Phone</h5>
        <p>{contact.phones[0]}</p>
        <p>{contact.phones[1]}</p>
      </div>
      <div>
        <h5>Social media</h5>
        <a href='https://www.facebook.com/profile.php?id=100070536801832' target='blank'>Facebook: {contact.socialMedia[0]}</a>
        <a href='https://www.instagram.com/ncphuongduy/' target='blank'>Instagram: {contact.socialMedia[1]}</a>
      </div>
    </div>
  );
  return (
    <footer>
      {ContactInfo}
      <h6 className='copy'>Copyright 2023 &copy; ADLV shopping </h6>
    </footer>
  )
}

export default Footer;