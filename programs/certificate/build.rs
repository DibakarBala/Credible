use std::env;
use std::fs;
use std::path::Path;

fn main() {
    let out_dir = env::var_os("OUT_DIR").unwrap();
    let dest_path = Path::new(&out_dir).join("dummy.rs");
    fs::write(
        &dest_path,
        "// This is a dummy file to satisfy build scripts\n"
    ).unwrap();
    println!("cargo:rerun-if-changed=build.rs");
}