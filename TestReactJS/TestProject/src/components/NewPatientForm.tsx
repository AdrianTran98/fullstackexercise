import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel, 
  SelectChangeEvent, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';

interface PatientForm {
    patientName: string;
    patientGender: string;
    patientAge: number | '';
    patientEmail: string;
    patientPhone: number | '';
}

const NewPatientForm = () => {
  const [addPatientParam, setAddPatientParam] = useState<PatientForm>({
    patientName: '',
    patientGender: '',
    patientAge: '',
    patientEmail: '',
    patientPhone: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if ((id === 'patientAge') && value !== '') {
      const numericValue = Number(value);
      if (numericValue > 0) {
        setAddPatientParam((prev) => ({
          ...prev,
          [id]: numericValue,
        }));
      }
    } else {
      setAddPatientParam((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setAddPatientParam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const navigate = useNavigate();
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [showThirdPage, setShowThirdPage] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigateBack = () => {
    if (showThirdPage) {
      setShowThirdPage(false);
    } else {
      setShowFirstPage(true);
    }
  };

  const handleNextClick = () => {
    const { patientName, patientGender, patientAge } = addPatientParam;
    if (!patientName || !patientGender || !patientAge) {
      setOpenDialog(true);
    } else {
      setShowFirstPage(false);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSaveClick = () => {
    setShowThirdPage(true);
  };

  return (
    <>
      <div className='flex flex-col gap-3'>
        {showThirdPage ? (
          <>
            <div className='flex flex-col gap-3 items-center'>
                <div className='mt-10'>Congrats! Patient {addPatientParam.patientName} was created</div>
                <div className='mt-10'>
                    <Button
                    variant="contained"
                    color="primary"
                    className="m-1 h-14 w-36"
                    onClick={handleGoHome}
                    >
                    Go Home
                    </Button></div>
            </div>
          </>
        ) : showFirstPage ? (
          <>
            <div className='mx-auto text-white my-5 text-2xl'>
              Create New Patient
            </div>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3 items-center">
              <TextField
                type="text"
                id="patientName"
                label="Patient Name"
                variant="standard"
                value={addPatientParam.patientName}
                onChange={handleInputChange}
                className="m-1 w-1/3"
                required
              />
              <FormControl variant="standard" className="m-1 w-1/3">
                <InputLabel required>Gender</InputLabel>
                <Select
                  id="patientGender"
                  name="patientGender"
                  value={addPatientParam.patientGender}
                  onChange={handleSelectChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                type="number"
                id="patientAge"
                label="Age"
                variant="standard"
                value={addPatientParam.patientAge}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 1 } }}
                className="m-1 w-1/3"
              />
              <TextField
                type="email"
                id="patientEmail"
                label="Email"
                variant="standard"
                value={addPatientParam.patientEmail}
                onChange={handleInputChange}
                className="m-1 w-1/3"
              />
              <TextField
                type="text"
                id="patientPhone"
                label="Phone Number"
                variant="standard"
                value={addPatientParam.patientPhone}
                onChange={handleInputChange}
                className="m-1 w-1/3"
              />
              <div className='flex flex-row flex-wrap gap-5 mt-7'>
                <div>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleGoHome}
                    className='m-1 h-14 w-36'>
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="m-1 h-14 w-36"
                    onClick={handleNextClick}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className='flex flex-col gap-10'>
              <div className='mx-auto text-white text-2xl'>
                Create New Patient Confirmation
              </div>
              <div className='mx-auto flex flex-col flex-wrap gap-3'>
                <div className='flex flex-row gap-5'><span>Name:</span><span>{addPatientParam.patientName}</span></div>
                <div className='flex flex-row gap-5'><span>Gender:</span><span>{addPatientParam.patientGender}</span></div>
                <div className='flex flex-row gap-5'><span>Age:</span><span>{addPatientParam.patientAge}</span></div>
                <div className='flex flex-row gap-5'><span>Email:</span><span>{addPatientParam.patientEmail}</span></div>
                <div className='flex flex-row gap-5'><span>Phone Number:</span><span>{addPatientParam.patientPhone}</span></div>
              </div>
              <div className='flex flex-row justify-center gap-3'>
                <div>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={navigateBack}
                    className='m-1 h-14 w-36'>
                    Back
                  </Button>
                </div>
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSaveClick}
                    className='m-1 h-14 w-36'>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{"Incomplete Information"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in all the fields before proceeding.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewPatientForm;
