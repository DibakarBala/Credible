import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';

export interface Certificate {
  studentName: string;
  studentId: string;
  institutionName: string;
  courseName: string;
  grades: string;
  dateOfIssue: string;
  uniqueIdentifier: string;
}

export const CERTIFICATE_SIZE = 1000; // Adjust this based on your actual data size

export function createCertificateProgramInterface(program: Program) {
  return {
    issueCertificate: async (
      certificate: Certificate,
      certificatePda: anchor.web3.PublicKey,
      issuer: anchor.web3.PublicKey
    ) => {
      await program.rpc.issueCertificate(
        certificate.studentName,
        certificate.studentId,
        certificate.institutionName,
        certificate.courseName,
        certificate.grades,
        certificate.dateOfIssue,
        certificate.uniqueIdentifier,
        {
          accounts: {
            certificate: certificatePda,
            issuer: issuer,
            systemProgram: anchor.web3.SystemProgram.programId,
          },
        }
      );
    },

    verifyCertificate: async (certificatePda: anchor.web3.PublicKey) => {
      return await program.account.certificate.fetch(certificatePda);
    },
  };
}