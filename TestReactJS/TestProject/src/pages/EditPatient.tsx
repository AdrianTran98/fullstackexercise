// EditPatient.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { 
    TextField, 
    Select, 
    MenuItem, 
    Button, 
    FormControl, 
    SelectChangeEvent,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from '@mui/material';

interface Patient {
  patientID: number;
  patientName: string;
  gender: string;
  age: number;
  email: string;
  phone: string;
}

interface EditParam {
  patientID: number;
  patientName: string;
  gender: string;
  age: number;
  email: string;
  phone: string;
}

interface EditPatientProps {
  inputData: Patient;
  onCancel: () => void;
}

const EditPatient: React.FC<EditPatientProps> = ({ inputData, onCancel }) => {
  const [editParam, setEditParam] = useState<EditParam>({ ...inputData });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if ((id === 'patientID' || id === 'age') && value !== '') {
      const numericValue = Number(value);
      if (numericValue > 0) {
        setEditParam({
          ...editParam,
          [id]: numericValue,
        });
      }
    } else {
      setEditParam({
        ...editParam,
        [id]: value,
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEditParam({
      ...editParam,
      [name]: value,
    });
  };

  const handleNext = () => {
    const { patientName, gender, age } = editParam;
    if (!patientName || !gender || !age) {
        setOpenDialog(true);
    } else {
        changeEditFirstState(false);
    }
  };

  const [editFirstState, changeEditFirstState] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const handleBack = () => {
    changeEditFirstState(true);
  };

  const handleSave = () => {
    console.log(editParam);
  };

  function capitalizeFirstLetter(string: string): string {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className='flex flex-col gap-12 items-center'>
        {editFirstState ? (
            <>
                <div className='flex flex-row gap-3'>
                    <div className='flex flex-col gap-10'>
                        <div className='h-8'>Patient ID*:</div>
                        <div className='h-8'>Name*:</div>
                        <div className='h-8'>Gender*:</div>
                        <div className='h-8'>Age*:</div>
                        <div className='h-8'>Email:</div>
                        <div className='h-8'>Phone:</div>
                    </div>
                    <div className='flex flex-col gap-10'>
                        <div className='w-56 h-8'>{editParam.patientID}</div>
                        <div className=''>
                            <TextField
                            type="text"
                            id="patientName"
                            variant="standard"
                            value={editParam.patientName}
                            onChange={handleInputChange}
                            className="w-56 h-8"
                            required
                            />
                        </div>
                        <div className=''>
                            <FormControl variant="standard" className="m-1 w-56 h-8">
                            <Select
                                id="gender"
                                name="gender"
                                value={editParam.gender}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                            </FormControl>
                        </div>
                        <div className=''>
                            <TextField
                                type="number"
                                id="age"
                                variant="standard"
                                value={editParam.age}
                                onChange={handleInputChange}
                                className="m-1 w-56 h-8"
                                required
                                />
                        </div>
                        <div className=''>
                            <TextField
                                type="email"
                                id="email"
                                variant="standard"
                                value={editParam.email}
                                onChange={handleInputChange}
                                className="m-1 w-56 h-8"
                                />
                        </div>
                        <div className=''>
                            <TextField
                                type="text"
                                id="phone"
                                variant="standard"
                                value={editParam.phone}
                                onChange={handleInputChange}
                                className="m-1 w-56 h-8"
                                />
                        </div>
                    </div>
                </div>
                <div className='flex flex-row flex-wrap gap-5'>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            className="m-1 h-14 w-36"
                            onClick={onCancel}
                            >
                            Cancel
                        </Button>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="m-1 h-14 w-36"
                            onClick={handleNext}
                            >
                            Next
                        </Button>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className='flex flex-row gap-3'>
                    <div className='flex flex-col gap-10'>
                        <div className='h-8'>Patient ID*:</div>
                        <div className='h-8'>Name*:</div>
                        <div className='h-8'>Gender*:</div>
                        <div className='h-8'>Age*:</div>
                        <div className='h-8'>Email:</div>
                        <div className='h-8'>Phone:</div>
                    </div>
                    <div className='flex flex-col gap-10'>
                        <div className='w-56 h-8'>{editParam.patientID}</div>
                        <div className='w-56 h-8'>{editParam.patientName}</div>
                        <div className='w-56 h-8'>{capitalizeFirstLetter(editParam.gender)}</div>
                        <div className='w-56 h-8'>{editParam.age}</div>
                        <div className='w-56 h-8'>{editParam.email}</div>
                        <div className='w-56 h-8'>{editParam.phone}</div>

                    </div>
                </div>

                <div className='flex flex-row flex-wrap gap-5'>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            className="m-1 h-14 w-36"
                            onClick={handleBack}
                            >
                            Back
                        </Button></div>
                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="m-1 h-14 w-36"
                            onClick={handleSave}
                            >
                            Save
                        </Button>
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
            Please fill in all the required fields before proceeding.
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
}

export default EditPatient;
