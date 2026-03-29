use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn init() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn chf_to_json(data: &[u8]) -> Result<String, JsError> {
    starbreaker_chf::chf_to_json(data).map_err(|e| JsError::new(&e.to_string()))
}

#[wasm_bindgen]
pub fn json_to_chf(data: &str) -> Result<Vec<u8>, JsError> {
    starbreaker_chf::json_to_chf(data).map_err(|e| JsError::new(&e.to_string()))
}

#[wasm_bindgen]
pub fn decompress_chf(data: &[u8]) -> Result<Vec<u8>, JsError> {
    starbreaker_chf::decompress_chf(data).map_err(|e| JsError::new(&e.to_string()))
}

#[wasm_bindgen]
pub fn compress_chf(data: &[u8]) -> Result<Vec<u8>, JsError> {
    starbreaker_chf::compress_chf(data).map_err(|e| JsError::new(&e.to_string()))
}

#[wasm_bindgen]
pub fn parse_dna_hex(hex: &str) -> Result<String, JsError> {
    let bytes = hex_decode(hex)?;
    let dna = starbreaker_chf::parse_dna(&bytes)
        .map_err(|e| JsError::new(&e.to_string()))?;
    serde_json::to_string(&dna).map_err(|e| JsError::new(&e.to_string()))
}

#[wasm_bindgen]
pub fn write_dna_hex(json: &str) -> Result<String, JsError> {
    let dna: starbreaker_chf::Dna = serde_json::from_str(json)
        .map_err(|e| JsError::new(&e.to_string()))?;
    let bytes = starbreaker_chf::write_dna(&dna);
    Ok(hex_encode(&bytes))
}

#[wasm_bindgen]
pub fn crc32c(data: &[u8]) -> u32 {
    crc32c::crc32c(data)
}

fn hex_decode(hex: &str) -> Result<Vec<u8>, JsError> {
    if hex.len() % 2 != 0 {
        return Err(JsError::new("hex string has odd length"));
    }
    (0..hex.len())
        .step_by(2)
        .map(|i| {
            u8::from_str_radix(&hex[i..i + 2], 16)
                .map_err(|e| JsError::new(&format!("invalid hex: {e}")))
        })
        .collect()
}

fn hex_encode(bytes: &[u8]) -> String {
    bytes.iter().map(|b| format!("{b:02x}")).collect()
}
