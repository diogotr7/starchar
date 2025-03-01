use wasm_bindgen::prelude::*;
extern crate console_error_panic_hook;

#[wasm_bindgen(start)]
pub fn init() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn compress(data: &[u8]) -> Vec<u8> {
    chf_rs_lib::compress(data).unwrap()
}

#[wasm_bindgen]
pub fn decompress(data: &[u8]) -> Vec<u8> {
    chf_rs_lib::decompress(data).unwrap()
}

#[wasm_bindgen]
pub fn chf_to_json(data: &[u8]) -> String {
    chf_rs_lib::chf_to_json(data).unwrap()
}

#[wasm_bindgen]
pub fn json_to_chf(data: &str) -> Vec<u8> {
    chf_rs_lib::json_to_chf(data).unwrap()
}

#[wasm_bindgen]
pub fn get_chf_contents(data: &[u8]) -> Vec<u8> {
    chf_rs_lib::get_chf_contents(data).unwrap()
}

#[wasm_bindgen]
pub fn get_chf_from_contents(data: &[u8]) -> Vec<u8> {
    chf_rs_lib::get_chf_from_contents(data).unwrap()
}

#[wasm_bindgen]
pub fn crc32c(data: &[u8]) -> u32 {
    chf_rs_lib::crc32c_bytes(data)
}
