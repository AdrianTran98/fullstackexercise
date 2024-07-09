package com.example.demo.web;

import com.openapi.gen.springboot.api.PatientsApiDelegate;
import com.openapi.gen.springboot.dto.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class PatientDelegateImpl implements PatientsApiDelegate {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public ResponseEntity<Patient> createPatient(Patient patient) {
        String sql = "INSERT INTO patients (patientName, gender, age, email, phone) VALUES (?, ?, ?, ?, ?) RETURNING patientID";
        try {
            Integer patientID = jdbcTemplate.queryForObject(sql, new Object[]{
                    patient.getPatientName(),
                    patient.getGender(),
                    patient.getAge(),
                    patient.getEmail(),
                    patient.getPhone()
            }, Integer.class);

            if (patientID != null) {
                patient.setPatientID(patientID);
                return ResponseEntity.status(201).body(patient);
            } else {
                return ResponseEntity.status(400).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).build();
        }
    }

    @Override
    public ResponseEntity<Void> deletePatient(Integer patientID) {
        String sql = "DELETE FROM patients WHERE patientID = ?";
        int rowsAffected = jdbcTemplate.update(sql, patientID);
        if (rowsAffected == 0) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(204).build();
    }

    @Override
    public ResponseEntity<Patient> getPatientById(Integer patientID) {
        String sql = "SELECT * FROM patients WHERE patientID = ?";
        try {
            Patient patient = jdbcTemplate.queryForObject(sql, new Object[]{patientID}, new PatientRowMapper());
            if (patient != null) {
                return ResponseEntity.ok(patient);
            } else {
                return ResponseEntity.status(404).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).build();
        }
    }

    @Override
    public ResponseEntity<List<Patient>> getPatients(Integer patientID, String patientName, String gender, Integer age, String email, String phone) {
        String sql = "SELECT * FROM patients WHERE " +
                "(? IS NULL OR patientID = ?) AND " +
                "(? IS NULL OR patientName LIKE ?) AND " +
                "(? IS NULL OR gender = ?) AND " +
                "(? IS NULL OR age = ?) AND " +
                "(? IS NULL OR email LIKE ?) AND " +
                "(? IS NULL OR phone LIKE ?)";
        List<Patient> patients = jdbcTemplate.query(sql, new Object[]{
                patientID, patientID,
                patientName, patientName != null ? "%" + patientName + "%" : null,
                gender, gender,
                age, age,
                email, email != null ? "%" + email + "%" : null,
                phone, phone != null ? "%" + phone + "%" : null
        }, new PatientRowMapper());
        return ResponseEntity.ok(patients);
    }

    @Override
    public ResponseEntity<Patient> updatePatient(Integer patientID, Patient patient) {
        String sql = "UPDATE patients SET patientName = ?, gender = ?, age = ?, email = ?, phone = ? WHERE patientID = ?";
        int rowsAffected = jdbcTemplate.update(sql,
                patient.getPatientName(),
                patient.getGender(),
                patient.getAge(),
                patient.getEmail(),
                patient.getPhone(),
                patientID);
        if (rowsAffected == 0) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(patient);
    }

    private static class PatientRowMapper implements RowMapper<Patient> {
        @Override
        public Patient mapRow(ResultSet rs, int rowNum) throws SQLException {
            Patient patient = new Patient();
            patient.setPatientID(rs.getInt("patientID"));
            patient.setPatientName(rs.getString("patientName"));
            patient.setGender(rs.getString("gender"));
            patient.setAge(rs.getInt("age"));
            patient.setEmail(rs.getString("email"));
            patient.setPhone(rs.getString("phone"));
            return patient;
        }
    }
}
