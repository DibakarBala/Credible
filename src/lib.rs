use anchor_lang::prelude::*;
use reclaim::cpi;  // This should now resolve
use reclaim_solana;  // This should now resolve

// Remove any #[global_allocator] attribute if present
// #[global_allocator]
// static ALLOC: ...

// Implement required traits for EpochConfig and Epoch
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct EpochConfig {
    // Your fields here
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct Epoch {
    // Your fields here
}

// Implement AccountSerialize and AccountDeserialize for EpochConfig and Epoch
impl anchor_lang::AccountSerialize for EpochConfig {}
impl anchor_lang::AccountDeserialize for EpochConfig {}

impl anchor_lang::AccountSerialize for Epoch {}
impl anchor_lang::AccountDeserialize for Epoch {}

// Your program logic here
// ...

// To reduce stack usage, consider using heap allocation for large data structures
// For example:
fn some_function_with_large_data() {
    let large_data = Box::new([0u8; 1000]); // Allocate on the heap instead of the stack
    // Use large_data...
}

use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    program_error::ProgramError,
};
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Credential {
    pub hashed_data: Vec<u8>,
    pub zk_proof: Vec<u8>,
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let credential_account = next_account_info(accounts_iter)?;
    let authority = next_account_info(accounts_iter)?;

    if !authority.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    let credential = Credential::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    credential.serialize(&mut &mut credential_account.data.borrow_mut()[..])?;

    msg!("Credential stored successfully");
    Ok(())
}