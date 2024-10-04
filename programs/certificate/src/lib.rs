use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
    msg,
    program::invoke_signed,
};
use borsh::{BorshDeserialize, BorshSerialize};

const CERTIFICATE_SIZE: usize = 1000;

entrypoint!(process_instruction);

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Certificate {
    pub student_name: String,
    pub unique_id: String,
}

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let certificate_account = next_account_info(accounts_iter)?;
    let payer = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;

    if !payer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    let (pda, bump_seed) = Pubkey::find_program_address(&[instruction_data], program_id);
    if pda != *certificate_account.key {
        return Err(ProgramError::InvalidAccountData);
    }

    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(CERTIFICATE_SIZE);

    msg!("Creating certificate account");
    invoke_signed(
        &system_instruction::create_account(
            payer.key,
            certificate_account.key,
            rent_lamports,
            CERTIFICATE_SIZE as u64,
            program_id,
        ),
        &[payer.clone(), certificate_account.clone(), system_program.clone()],
        &[&[instruction_data, &[bump_seed]]],
    )?;

    msg!("Serializing certificate data");
    let certificate = Certificate::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    certificate.serialize(&mut &mut certificate_account.data.borrow_mut()[..])?;

    msg!("Certificate issued successfully");
    Ok(())
}