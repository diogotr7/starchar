pub mod chf;
mod cig_guid;
mod color;
mod dna;
mod hash;
mod item_port;
mod materials;

use chf::{Chf, ChfContainer};
use crc32c::{crc32c, crc32c_append};
use deku::prelude::*;
use std::io;
use zstd;

pub fn compress(data: &[u8]) -> io::Result<Vec<u8>> {
    zstd::encode_all(data, 3)
}

pub fn decompress(data: &[u8]) -> io::Result<Vec<u8>> {
    zstd::decode_all(data)
}

pub fn crc32c_bytes(data: &[u8]) -> u32 {
    crc32c(data)
}

pub fn chf_to_json(data: &[u8]) -> Result<String, anyhow::Error> {
    let container = ChfContainer::from_bytes((data, 0))?.1;
    let crc = crc32c(&container.data);
    let crc = crc32c_append(crc, &container.rest);
    if crc != container.crc32c {
        return Err(anyhow::anyhow!("CRC32C mismatch"));
    }

    let decompressed = zstd::decode_all(container.data.as_slice())?;
    let chf_result = Chf::from_bytes((&decompressed, 0))?;
    let chf = chf_result.1;
    let json = serde_json::to_string(&chf)?;

    Ok(json)
}

pub fn json_to_chf(data: &str) -> Result<Vec<u8>, anyhow::Error> {
    let chf: Chf = serde_json::from_str(data)?;
    let chf_bytes = chf.to_bytes()?;

    println!("{:?}", chf_bytes);
    let data = zstd::encode_all(chf_bytes.as_slice(), 3)?;

    let remaining = 4096 // chf file size
        - 2 // magic
        - 2 // magic2
        - 4 // crc32c
        - 4 // compressed_size
        - 4 // decompressed_size
        - data.len();

    let rest = vec![0; remaining];
    let crc32c = crc32c(&data);
    let crc32c = crc32c_append(crc32c, &rest);

    let container = ChfContainer {
        magic: 0x4242,
        magic2: 0,
        crc32c,
        compressed_size: data.len() as u32,
        decompressed_size: chf_bytes.len() as u32,
        data,
        rest,
    };

    let container_bytes = container.to_bytes()?;

    Ok(container_bytes)
}

pub fn get_chf_contents(data: &[u8]) -> Result<Vec<u8>, anyhow::Error> {
    let container = ChfContainer::from_bytes((data, 0))?.1;

    let decompressed = zstd::decode_all(container.data.as_slice())?;

    Ok(decompressed)
}

pub fn get_chf_from_contents(data: &[u8]) -> Result<Vec<u8>, anyhow::Error> {
    let data = zstd::encode_all(data, 3)?;

    let remaining = 4096 // chf file size
        - 2 // magic
        - 2 // magic2
        - 4 // crc32c
        - 4 // compressed_size
        - 4 // decompressed_size
        - data.len();

    let rest = vec![0; remaining];
    let crc32c = crc32c(&data);
    let crc32c = crc32c_append(crc32c, &rest);

    let container = ChfContainer {
        magic: 0x4242,
        magic2: 0,
        crc32c,
        compressed_size: data.len() as u32,
        decompressed_size: data.len() as u32,
        data,
        rest,
    };

    let container_bytes = container.to_bytes()?;

    Ok(container_bytes)
}
