use anchor_lang::prelude::*;

// Include the dummy file
include!(concat!(env!("OUT_DIR"), "/dummy.rs"));

declare_id!("9hJYuQXybHoguzW5gxBcx2iFbgWzGvYUX6SzXLEA77gD");

#[program]
pub mod certificate {
    use super::*;

    pub fn issue_certificate(
        ctx: Context<IssueCertificate>,
        student_name: String,
        student_id: String,
        institution_name: String,
        course_name: String,
        grades: String,
        date_of_issue: String,
        unique_identifier: String,
    ) -> Result<()> {
        let certificate = &mut ctx.accounts.certificate;
        certificate.student_name = student_name;
        certificate.student_id = student_id;
        certificate.institution_name = institution_name;
        certificate.course_name = course_name;
        certificate.grades = grades;
        certificate.date_of_issue = date_of_issue;
        certificate.unique_identifier = unique_identifier;
        Ok(())
    }

    pub fn verify_certificate(ctx: Context<VerifyCertificate>, unique_identifier: String) -> Result<()> {
        let certificate = &ctx.accounts.certificate;
        if certificate.unique_identifier == unique_identifier {
            Ok(())
        } else {
            Err(ErrorCode::InvalidCertificate.into())
        }
    }
}

#[derive(Accounts)]
pub struct IssueCertificate<'info> {
    #[account(init, payer = user, space = 8 + 32 + 32 + 32 + 32 + 32 + 32 + 32)]
    pub certificate: Account<'info, Certificate>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyCertificate<'info> {
    pub certificate: Account<'info, Certificate>,
}

#[account]
pub struct Certificate {
    pub student_name: String,
    pub student_id: String,
    pub institution_name: String,
    pub course_name: String,
    pub grades: String,
    pub date_of_issue: String,
    pub unique_identifier: String,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid certificate")]
    InvalidCertificate,
}