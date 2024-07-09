package com.example.demo.web;

import com.openapi.gen.springboot.api.PatientsApiDelegate;
import com.openapi.gen.springboot.dto.Patient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PatientDelegateImpl implements PatientsApiDelegate {
    @Override
    public ResponseEntity<Patient> createPatient(Patient patient) {
        return PatientsApiDelegate.super.createPatient(patient);
    }

    @Override
    public ResponseEntity<Void> deletePatient(Integer patientID) {
        return PatientsApiDelegate.super.deletePatient(patientID);
    }

    @Override
    public ResponseEntity<Patient> getPatientById(Integer patientID) {
        return PatientsApiDelegate.super.getPatientById(patientID);
    }

    @Override
    public ResponseEntity<List<Patient>> getPatients(Integer patientID, String patientName, String gender, Integer age, String email, String phone) {
        return PatientsApiDelegate.super.getPatients(patientID, patientName, gender, age, email, phone);
    }

    @Override
    public ResponseEntity<Patient> updatePatient(Integer patientID, Patient patient) {
        return PatientsApiDelegate.super.updatePatient(patientID, patient);
    }
}
