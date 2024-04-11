import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { UserInfo } from '../profile/info';
import { Dispatch, SetStateAction } from 'react';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

interface AddressProp {
  info: UserInfo | undefined;
  setInfo : Dispatch<SetStateAction<UserInfo | undefined>>;
}

export default function AddressForm({info, setInfo} : AddressProp) {

      function handleName(event: any){
        const updatedInfo = {...info!, name : event.target.value};  
        setInfo(updatedInfo);
    }
    function handleSurname(event: any){
      const updatedInfo = {...info!, surname : event.target.value};  
      setInfo(updatedInfo);
  }
  function handlePhoneNumber(event: any){
    const updatedInfo = {...info!, phoneNumber : event.target.value};  
    setInfo(updatedInfo);
}
function handleEmail(event: any){
  const updatedInfo = {...info!, email : event.target.value};  
  setInfo(updatedInfo);
}
function handleCity(event: any){
  const updatedInfo = {...info!, city : event.target.value};  
  setInfo(updatedInfo);
}
function handleStreet(event: any){
  const updatedInfo = {...info!, street : event.target.value};  
  setInfo(updatedInfo);
}
function handleNumber(event: any){
  const updatedInfo = {...info!, number : event.target.value};  
  setInfo(updatedInfo);
}

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="First Name"
          value={info?.name}
          onChange={handleName}
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last-name"
          type="last-name"
          placeholder="Surname"
          required
          onChange={handleSurname}
          value={info?.surname}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel  required>
          Email 
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={info?.email}
          onChange={handleEmail}
        />
      </FormGrid>

      <FormGrid item xs={6}>
        <FormLabel required>
          Phone Number
        </FormLabel>
        <OutlinedInput
          id="phonenumber"
          name="phonenumber"
          type="phonenumber"
          placeholder="Phone Number"
          required
          value={info?.phoneNumber}
          onChange={handlePhoneNumber}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="City"
          autoComplete="city"
          required
          value={info?.city}
          onChange={handleCity}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel required>
          Street
        </FormLabel>
        <OutlinedInput
          id="street"
          name="street"
          type="street"
          placeholder="Street"
          required
          value={info?.street}
          onChange={handleStreet}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Street Number
        </FormLabel>
        <OutlinedInput
          id="street number"
          name="street number"
          type="street number"
          placeholder="Street number"
          required
          value={info?.number}
          onChange={handleNumber}
        />
      </FormGrid>
    </Grid>
  );
}