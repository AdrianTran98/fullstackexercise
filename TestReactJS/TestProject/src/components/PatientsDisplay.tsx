import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Pagination, 
  FormControl, 
  InputLabel, 
  SelectChangeEvent, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';
import EditPatient from '../pages/EditPatient';

interface SearchParams {
  patientID: number | '';
  patientName: string;
  gender: string;
  age: number | '';
  email: string;
  phone: string;
}

interface Patient {
  patientID: number;
  patientName: string;
  gender: string;
  age: number;
  email: string;
  phone: string;
}

const PatientsDisplay: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    patientID: '',
    patientName: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPatientID, setSelectedPatientID] = useState<number | null>(null);
  const [selectedPatientName, setSelectedPatientName] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const pseudoData: Patient[] = [
        { patientID: 1, patientName: 'John Doe', gender: 'male', age: 30, email: 'john@example.com', phone: '123-456-7890' },
        { patientID: 2, patientName: 'Jane Smith', gender: 'female', age: 25, email: 'jane@example.com', phone: '234-567-8901' },
        { patientID: 3, patientName: 'Bob Johnson', gender: 'male', age: 45, email: 'bob@example.com', phone: '345-678-9012' },
        { patientID: 4, patientName: 'Alice Williams', gender: 'female', age: 35, email: 'alice@example.com', phone: '456-789-0123' },
        { patientID: 5, patientName: 'Charlie Brown', gender: 'male', age: 50, email: 'charlie@example.com', phone: '567-890-1234' },
        { patientID: 6, patientName: 'Diana Prince', gender: 'female', age: 29, email: 'diana@example.com', phone: '678-901-2345' },
        { patientID: 7, patientName: 'Evan White', gender: 'male', age: 40, email: 'evan@example.com', phone: '789-012-3456' },
        { patientID: 8, patientName: 'Fiona Green', gender: 'female', age: 33, email: 'fiona@example.com', phone: '890-123-4567' },
        { patientID: 9, patientName: 'George Black', gender: 'male', age: 38, email: 'george@example.com', phone: '901-234-5678' },
        { patientID: 10, patientName: 'Hannah Blue', gender: 'female', age: 27, email: 'hannah@example.com', phone: '012-345-6789' },
      ];
      setPatients(pseudoData);
      setFilteredPatients(pseudoData);
    };

    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if ((id === 'patientID' || id === 'age') && value !== '') {
      const numericValue = Number(value);
      if (numericValue > 0) {
        setSearchParams({
          ...searchParams,
          [id]: numericValue,
        });
      }
    } else {
      setSearchParams({
        ...searchParams,
        [id]: value,
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = patients.filter((patient) => {
      return (
        (searchParams.patientID === '' || patient.patientID === Number(searchParams.patientID)) &&
        (searchParams.patientName === '' || patient.patientName.toLowerCase().includes(searchParams.patientName.toLowerCase())) &&
        (searchParams.gender === '' || patient.gender === searchParams.gender) &&
        (searchParams.age === '' || patient.age === Number(searchParams.age)) &&
        (searchParams.email === '' || patient.email.toLowerCase().includes(searchParams.email.toLowerCase())) &&
        (searchParams.phone === '' || patient.phone.includes(searchParams.phone))
      );
    });
    setFilteredPatients(filtered);
    setCurrentPage(1);
  };

  const handleEdit = (patientID: number) => {
    const patient = patients.find((p) => p.patientID === patientID);
    if (patient) {
      setSelectedPatient(patient);
      setIsEditMode(true);
    }
  };

  const handleDelete = (patientID: number) => {
    console.log(`Delete patient with ID: ${patientID}`);
    setPatients(patients.filter(patient => patient.patientID !== patientID));
    setFilteredPatients(filteredPatients.filter(patient => patient.patientID !== patientID));
  };

  const handleDeleteDialogOpen = (patientID: number, patientName: string) => {
    setSelectedPatientID(patientID);
    setSelectedPatientName(patientName);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedPatientID(null);
    setSelectedPatientName(null);
  };

  const confirmDelete = () => {
    if (selectedPatientID !== null) {
      handleDelete(selectedPatientID);
    }
    handleDeleteDialogClose();
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  const navigateCreateUser = () => {
    navigate('/newPatient');
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  return (
    <>
      {isEditMode && selectedPatient ? (
        <EditPatient inputData={selectedPatient} onCancel={handleCancelEdit} />
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 justify-between">
            <TextField
              type="number"
              id="patientID"
              label="Patient ID"
              variant="standard"
              value={searchParams.patientID}
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: 1 } }}
              className="m-1 w-1/5"
            />
            <TextField
              type="text"
              id="patientName"
              label="Name"
              variant="standard"
              value={searchParams.patientName}
              onChange={handleInputChange}
              className="m-1 w-1/5"
            />
            <FormControl variant="standard" className="m-1 w-1/6">
              <InputLabel>Gender</InputLabel>
              <Select
                id="gender"
                name="gender"
                value={searchParams.gender}
                onChange={handleSelectChange}
                label="Gender"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="number"
              id="age"
              label="Age"
              variant="standard"
              value={searchParams.age}
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: 1 } }}
              className="m-1 w-1/6"
            />
            <TextField
              type="email"
              id="email"
              label="Email"
              variant="standard"
              value={searchParams.email}
              onChange={handleInputChange}
              className="m-1 w-1/5"
            />
            <TextField
              type="text"
              id="phone"
              label="Phone Number"
              variant="standard"
              value={searchParams.phone}
              onChange={handleInputChange}
              className="m-1 w-1/5"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="m-1 h-14"
            >
              Filter
            </Button>
          </form>

          <TableContainer component={Paper} className="mt-4">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPatients.length > 0 ? (
                  <>
                    {currentPatients.map((patient) => (
                      <TableRow key={patient.patientID}>
                        <TableCell>{patient.patientID}</TableCell>
                        <TableCell>{patient.patientName}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>
                          <div className="flex flex-row gap-3">
                            <Button
                              variant="outlined"
                              color="primary"
                              className="w-1/3"
                              onClick={() => handleEdit(patient.patientID)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              className="w-1/3"
                              onClick={() => handleDeleteDialogOpen(patient.patientID, patient.patientName)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {[...Array(patientsPerPage - currentPatients.length)].map((_, index) => (
                      <TableRow key={`empty-${index}`}>
                        <TableCell colSpan={7}>&nbsp;</TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex flex-row justify-between">
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="m-1 h-14"
                onClick={navigateCreateUser}
              >
                Add Patient
              </Button>
            </div>

            <div>
              {filteredPatients.length > 0 && (
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  className="mt-4 flex justify-center"
                />
              )}
            </div>
          </div>

          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete {selectedPatientName}'s data?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="secondary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default PatientsDisplay;
